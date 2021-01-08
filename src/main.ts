import * as core from '@actions/core'
import * as path from 'path'
import * as fs from 'fs'

import tmp from 'tmp'

import * as setup from '../src/setup'

async function run(): Promise<void> {
  try {
    const release = core.getInput('release')
    if (!release) {
      throw new Error('missing release')
    }
    let directory = core.getInput('directory')
    if (!directory) {
      const tmpDir = tmp.dirSync()
      directory = path.join(tmpDir.name, `gcc-${release}`)
    }
    await setup.install(release, directory)

    if (fs.existsSync(path.join(directory, 'bin'))) {
      core.addPath(path.join(directory, 'bin'))
    } else {
      const filenames = fs.readdirSync(directory)
      core.addPath(path.join(directory, filenames[0], 'bin'))
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
