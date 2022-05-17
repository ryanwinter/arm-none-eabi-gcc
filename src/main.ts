import * as core from '@actions/core'

import * as setup from './setup'

async function run(): Promise<void> {
  try {
    const release = core.getInput('release')
    if (!release) {
      throw new Error('missing release')
    }
    await setup.install(release)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('unknown error')
    }
  }
}

run()
