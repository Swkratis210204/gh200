module.exports = async ({ github, context, core }) => {
  const issue = context.payload.issue
  const isBug = issue.title.toLowerCase().includes('bug')

  if (isBug) {
    await github.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issue.number,
      labels: ['bug']
    })
  }

  core.info(`Issue #${issue.number} classified as bug: ${isBug}`)
  return isBug ? 'bug' : 'other'
}