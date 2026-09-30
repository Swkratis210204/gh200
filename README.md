# GitHub Actions Practice (GH-200)

Hands-on workflows built while preparing for the GH-200 certification.

## Structure

```
.github/workflows/
├── main.yml         # Experiment 1
├── matrix.yml       # Experiment 2
└── artifacts.yml    # Experiment 3
action-a/            # Custom Docker container action
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

### 4. Reusable workflows
### 5. Conditionals

