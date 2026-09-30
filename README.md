# GitHub Actions Practice (GH-200)

Hands-on workflows built while preparing for the GH-200 certification.

## Structure

```
.github/workflows/
├── main.yml             # Experiment 1
├── matrix.yml           # Experiment 2
├── artifacts.yml        # Experiment 3
├── reusable-greet.yml   # Experiment 4 (reusable workflow)
├── call-reusable.yml    # Experiment 4 (caller)
├── conditions.yml       # Experiment 5
├── pr.yml               # Experiment 6
└── env.yml              # Experiment 7
.github/scripts/
└── deploy.sh            # Script used by Experiment 7
action-a/                # Custom Docker container action
├── action.yml
├── Dockerfile
└── entrypoint.sh
```

## Custom action: `action-a`

A Docker container action that greets someone. Runs on Linux runners only.

- **`action.yml`**: the action's definition. Declares the input `MY_NAME` (default `World`) and the output `time`, and tells GitHub to run it with Docker (`using: docker`, `image: Dockerfile`).
- **`Dockerfile`**: the environment. Starts from Alpine Linux, copies in `entrypoint.sh`, makes it executable, and sets it as the command to run when the container starts.
- **`entrypoint.sh`**: the code. Reads the input from `$INPUT_MY_NAME`, prints `Hello <name>`, writes the greeting to `greeting.txt` in the workspace, and sets the output `time` via `$GITHUB_OUTPUT`.

Used from a workflow like this:

```yaml
- uses: actions/checkout@v4
- id: greet
  uses: ./action-a
  with:
    MY_NAME: "Flash"
```

## Experiments

### 1. `main.yml`: triggers, jobs, action inputs and outputs

- **Triggers:** push and pull_request to `main`, plus `workflow_dispatch` with form inputs (`name`, `level`).
- **`hello`**: checks out the repo, runs `action-a` with the name from the form, then reads its output (`steps.greet.outputs.time`) and the file it wrote (`greeting.txt`).
- **`info`**: runs in parallel with `hello`; prints the event, branch and commit, and lists the (empty) workspace, since there's no checkout.
- **`after`**: waits for both (`needs: [hello, info]`).

### 2. `matrix.yml`: matrix strategy

- **`greet-many`**: runs `action-a` once per name (`Mona`, `Flash`, `Octocat`), giving 3 jobs.
- **`os-check`**: runs on `ubuntu-latest` and `windows-latest` × versions `1` and `2`, giving 4 jobs.
- 7 jobs in total, all running in parallel.

### 3. `artifacts.yml`: artifacts and separate build and test jobs

- **`build`**: runs `action-a`, creates `dist/` (`greeting.txt` + `version.txt`), and uploads it as the artifact `my-build` (kept for 5 days).
- **`test`**: waits for `build`, downloads `my-build` onto a fresh runner, and checks the content with `grep`.
- **`no-artifact`**: has no download, so `dist/` doesn't exist there. Files only move between jobs through artifacts.

### 4. `reusable-greet.yml` + `call-reusable.yml`: reusable workflows

- **`reusable-greet.yml`**: made callable with `on: workflow_call`. Takes the input `name`, runs `action-a` with it, and returns the output `time`, passed up from step → job → workflow.
- **`call-reusable.yml`**: calls the reusable workflow twice at the job level (`uses: ./.github/workflows/reusable-greet.yml`), once with `Mona` and once with `Flash`. The two calls run in parallel.
- **`show-results`**: waits for both calls and prints their returned values with `needs.<job>.outputs.time`.

### 5. `conditions.yml`: conditionals and failure handling

- **Trigger:** `workflow_dispatch` with a boolean input `break_build` that makes the build fail on purpose.
- **`build`**: shows step conditions. The default `success()` step is skipped after a failure, `if: failure()` sends an alert, and `if: always()` runs clean-up regardless.
- **`flaky`**: a failing step with `continue-on-error: true`; the job still passes.
- **`deploy`**: `needs: build`, so it's skipped when the build fails.
- **`report`**: `if: always()` at job level; prints each job's result with `needs.<job>.result`.
- **`only-on-push`**: `if: github.event_name == 'push'`, so it's skipped on manual runs.

### 6. `pr.yml`: pull request events

- **Trigger:** `pull_request` with `types: [opened, synchronize, reopened, closed]`.
- **`pr-info`**: prints the activity (`github.event.action`), PR number, title, source and target branch (`head_ref` → `base_ref`), and whether it was merged.
- The PR title is passed through `env:` instead of being put directly into `run:`, to prevent script injection.
- Tested with a real PR from `test-pr` into `main`: synchronize (new commit), closed, reopened, and closed with merged = true. The `main.yml` checks also ran on the PR (pull_request) and after the merge (push).

### 7. `env.yml`: variables, secrets and environments

- **Settings used:** repository variable `APP_NAME` and secret `API_KEY`; environment `staging` (1-minute wait timer, `SERVER_URL`); environment `production` (required reviewer, `main` branch only, its own `SERVER_URL` and `API_KEY`).
- **`variables`**: shows the three `env` scopes and that the most specific wins (step > job > workflow), default variables vs contexts (`$GITHUB_REF_NAME` vs `github.ref_name`), setting a value at run time with `$GITHUB_ENV` (visible only in later steps), and reading `vars` and a masked secret. `vars.SERVER_URL` is empty here because the job has no environment.
- **`deploy-staging`**: `environment: staging` waits 1 minute, then runs `.github/scripts/deploy.sh` with staging's `SERVER_URL`, passed to the script through `env:`.
- **`deploy-production`**: `environment: production` with a `url`; only allowed from `main` and waits for manual approval. Uses production's `SERVER_URL`, and its `API_KEY` overrides the repository secret of the same name (confirmed by the secret's length).