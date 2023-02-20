const core = require('@actions/core')
const github = require('@actions/github')

// Toolkit docs: https://github.com/actions/toolkit

async function run() {
  try {
    const inputs = {
      token: core.getInput('github-token', { required: true }),
      pattern: core.getInput('pattern', { required: true }),
    }

    // Pull-request format: https://developer.github.com/v3/pulls/#response
    const variables = {
      number: github.context.payload.pull_request.number,
    }

    const octokit = github.getOctokit(inputs.token)

    // Pull-request GET format: https://developer.github.com/v3/pulls/#get-a-pull-request
    const {
      data: { body },
    } = await octokit.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: github.context.payload.pull_request.number,
    })

    if (!body) {
      return
    }

    const response = await octokit.pulls.update({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: github.context.payload.pull_request.number,
      body: body.replace(new RegExp(inputs.pattern, 'g'), variables.number),
    })

    if (response.status !== 200) {
      throw new Error(`Updating the pull-request finished with status: [${response.status}]`)
    }
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
