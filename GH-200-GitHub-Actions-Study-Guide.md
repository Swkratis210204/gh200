# GH-200 GitHub Actions: Study Plan

**Exam:** 100 min · multiple choice · pass at 700 · ~$99 · book through MS Learn / Pearson VUE
**Official objectives (Jan 2026 version):** [MS Learn study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200)
**Concepts course:** [MS Learn path][MSL] · **Exact syntax:** the GitHub docs pages linked below

**How to use this:** go through each domain row by row. Read the linked page, do the practice task in a free GitHub repo, then tick the box.

---

## Domain 1: Author and manage workflows (20–25%)

| ✓ | Learn | Read | Practice |
|---|---|---|---|
| ☐ | Triggers: push/PR filters, `schedule`, `workflow_dispatch` inputs, webhook events | [Events], [Syntax] | Build one workflow with 3 triggers and branch/path filters; add a manual trigger with choice and boolean inputs |
| ☐ | Jobs, steps, `needs`, `if:` conditions | [Syntax], [Expressions] | Make 3 jobs where job C needs A and B; add a step with `if: failure()` |
| ☐ | Contexts and `${{ }}` expressions | [Contexts], [Expressions] | Print `github`, `runner`, and `matrix` values with `toJSON()` |
| ☐ | Environment variables and configuration variables (`env`, `vars`) | [Variables] | Set the same variable at workflow, job, and step level; see which value wins |
| ☐ | Workflow commands: `GITHUB_OUTPUT`, `GITHUB_ENV`, `GITHUB_STEP_SUMMARY` | [Commands] | Pass a value from step to step and from job to job; write a job summary |
| ☐ | Matrix: include/exclude, `fail-fast`, `max-parallel` | [Syntax] | Test on 2 operating systems × 2 language versions and exclude one combination |
| ☐ | Caching and artifacts, retention | [Cache], [Artifacts] | Cache your dependencies; upload a build output and download it in another job |
| ☐ | Service containers | [Services] | Run tests against a Postgres service container |
| ☐ | YAML anchors and aliases | [Syntax] | Reuse one block of steps with `&` and `*` |
| ☐ | Status badges and environment protections | [Environments] | Add a badge to the README; create a `prod` environment with a required reviewer |
| ☐ | Publishing: GHCR, GitHub Packages, releases, CodeQL | [MS Learn path][MSL] | Push a Docker image to GHCR; create a release from a tag; add the CodeQL starter workflow |

## Domain 2: Consume and troubleshoot workflows (15–20%)

| ✓ | Learn | Read | Practice |
|---|---|---|---|
| ☐ | Reading a YAML file and saying what it does and when it runs | [Events], [Syntax] | Read 5 workflows in popular open-source repos and explain each one |
| ☐ | Diagnosing failures from logs and debug logging | [Monitor] | Break a workflow on purpose; turn on `ACTIONS_STEP_DEBUG`; re-run with debug logging |
| ☐ | Getting logs and artifacts in the UI and through the REST API | [Monitor] | Download logs with `gh api repos/OWNER/REPO/actions/runs/ID/logs` |
| ☐ | Matrix failures; re-running a single job | [Monitor] | Make one matrix combination fail and re-run only that job |
| ☐ | Starter workflow vs reusable workflow vs composite action | [Reuse], [Templates] | Make a table for yourself with the differences |
| ☐ | Organization workflow templates | [Templates] | Make a free org, add a template to its `.github` repo, and use it |
| ☐ | Disabling vs deleting a workflow | [Monitor] | Disable a workflow in the Actions tab, then enable it again |
| ☐ | Trustworthy actions and pinning versions (tag vs SHA) | [Security] | Pin `actions/checkout` to a full commit SHA |

## Domain 3: Author and maintain actions (15–20%)

| ✓ | Learn | Read | Practice |
|---|---|---|---|
| ☐ | Action types: JavaScript, Docker, composite (and when to use each) | [CreateActions] | Build one of each (a small "hello" is enough) |
| ☐ | `action.yml`: inputs, outputs, `runs`, `branding` | [Metadata] | Add an input and an output to your action and use them from a workflow |
| ☐ | Workflow commands and exit codes inside actions | [Commands] | Make the action fail with a non-zero exit code; add an `::error::` annotation |
| ☐ | Troubleshooting JavaScript and Docker actions | [CreateActions] | Leave out `node_modules`/`dist` and watch it fail; get a Docker action running |
| ☐ | Versioning: `v1.0.0` release tags and a moving `v1` | [Release] | Tag v1.0.0 and v1; release v1.1.0 and move v1 to it |
| ☐ | Distribution: public, private/internal, Marketplace | [Release], [Marketplace] | Publish one action to the Marketplace from a public repo |

## Domain 4: Manage GitHub Actions for the enterprise (20–25%)

| ✓ | Learn | Read | Practice |
|---|---|---|---|
| ☐ | Sharing reusable workflows and actions across an org | [Reuse], [Templates] | Call a reusable workflow in one repo from another repo in your org |
| ☐ | Usage policies (which actions are allowed) | [Policies] | Org settings → Actions → allow only selected actions |
| ☐ | GitHub-hosted vs self-hosted runners; preinstalled software | [Hosted], [Runners] | Check the runner image's software list in the job log |
| ☐ | Self-hosted runner setup: labels, proxy, networking | [Runners] | Install a runner on your laptop or a VM; add a custom label and target it with `runs-on` |
| ☐ | Runner groups; monitoring and troubleshooting runners | [Runners] | Create a runner group in your org and move a runner into it |
| ☐ | IP allow lists | [Runners] | Reading only (needs a paid plan) |
| ☐ | Secrets and variables at org, repo, and environment level | [Secrets], [Variables] | Create the same secret at all 3 levels and see which one is used; try `gh secret set` |

## Domain 5: Secure and optimize automation (10–15%)

| ✓ | Learn | Read | Practice |
|---|---|---|---|
| ☐ | `GITHUB_TOKEN` and `permissions:`, compared with a PAT | [Token] | Set `permissions: {}`, watch a step fail, then grant only the scope it needs |
| ☐ | Script injection | [Security] | Echo `${{ github.event.issue.title }}` directly, then fix it by passing it through an `env:` variable |
| ☐ | OIDC for cloud login | [OIDC] | Log in to Azure/AWS/GCP with OIDC (free tier), or just read the page |
| ☐ | Pinning actions to a SHA; action allow lists | [Security], [Policies] | Pin every third-party action in your repo to a SHA |
| ☐ | Environments and approval gates | [Environments] | Make a deploy job wait for your approval |
| ☐ | Artifact attestations | [Attest] | Add `actions/attest-build-provenance`; check it with `gh attestation verify` |
| ☐ | Cost and speed: cache, retention, concurrency | [Cache], [Syntax] | Add `concurrency` with `cancel-in-progress`; shorten artifact retention |

---

## Test yourself
- **Official MS Learn practice assessment** (free, on the GH-200 page). Repeat it until you reliably score 85%+.
- **Exam sandbox:** https://aka.ms/GHExamDemo-enu
- **Free questions:** https://ghcertified.com
- **Summary notes:** [12zamu GitHub Actions guide](https://github.com/12zamu/github-certification-preparation-guide/blob/main/content/exams/github-actions.md)
- For every question you get wrong, find the answer in the docs and note it.

## 4-week plan (~1 h/day)
| Week | Focus |
|---|---|
| 1 | MS Learn path + Domain 1 |
| 2 | Domains 2–3 |
| 3 | Domains 4–5 |
| 4 | Practice tests, fix weak spots, book the exam |

---
<!-- Doc links (if one has moved, search the page title on docs.github.com) -->
[MSL]: https://learn.microsoft.com/en-us/training/paths/github-actions/
[Syntax]: https://docs.github.com/actions/writing-workflows/workflow-syntax-for-github-actions
[Events]: https://docs.github.com/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows
[Contexts]: https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs
[Expressions]: https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/evaluate-expressions-in-workflows-and-actions
[Commands]: https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions
[Variables]: https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables
[Secrets]: https://docs.github.com/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions
[Cache]: https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows
[Artifacts]: https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow
[Services]: https://docs.github.com/actions/use-cases-and-examples/using-containerized-services/about-service-containers
[Environments]: https://docs.github.com/actions/managing-workflow-deployments/managing-deployments/managing-environments-for-deployment
[Reuse]: https://docs.github.com/actions/sharing-automations/reusing-workflows
[Templates]: https://docs.github.com/actions/sharing-automations/creating-workflow-templates-for-your-organization
[Monitor]: https://docs.github.com/actions/monitoring-and-troubleshooting-workflows
[CreateActions]: https://docs.github.com/actions/sharing-automations/creating-actions/about-custom-actions
[Metadata]: https://docs.github.com/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions
[Release]: https://docs.github.com/actions/sharing-automations/creating-actions/releasing-and-maintaining-actions
[Marketplace]: https://docs.github.com/actions/sharing-automations/creating-actions/publishing-actions-in-github-marketplace
[Hosted]: https://docs.github.com/actions/using-github-hosted-runners
[Runners]: https://docs.github.com/actions/hosting-your-own-runners
[Policies]: https://docs.github.com/enterprise-cloud@latest/admin/enforcing-policies/enforcing-policies-for-your-enterprise/enforcing-policies-for-github-actions-in-your-enterprise
[Security]: https://docs.github.com/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
[Token]: https://docs.github.com/actions/security-for-github-actions/security-guides/automatic-token-authentication
[OIDC]: https://docs.github.com/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect
[Attest]: https://docs.github.com/actions/security-for-github-actions/using-artifact-attestations
