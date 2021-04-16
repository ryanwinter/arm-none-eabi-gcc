import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as fs from 'fs'
import * as path from 'path'

import * as gcc from './gcc'

export async function install(release: string, platform?: string): Promise<string> {
  const gccUrl = gcc.distributionUrl(release, platform || process.platform)
  const cacheKey = 'gcc-arm-none-eabi'

  /* eslint-disable no-console */
  console.log(`downloading gcc ${release} from ${gccUrl}`)

  let gccPath = tc.find(cacheKey, release)

  if (gccPath === '') {
    console.log('GCC ARM cache miss')
    const downloadPath = await tc.downloadTool(gccUrl)

    let extractedFolder
    switch (gccUrl.substr(gccUrl.length - 3)) {
      case 'zip':
        extractedFolder = await tc.extractZip(downloadPath)
        break
      case 'bz2':
        extractedFolder = await tc.extractTar(downloadPath, undefined, 'xj')
        break
      default:
        throw new Error(`can't decompress archive`)
    }

    gccPath = await tc.cacheDir(extractedFolder, cacheKey, release)
  }

  // Find and add the bin directory to the path
  let binPath = path.join(gccPath, 'bin')
  if (!fs.existsSync(binPath)) {
    const filenames = fs.readdirSync(gccPath)
    binPath = path.join(gccPath, filenames[0], 'bin')
  }

  core.addPath(binPath)
  return binPath
}

async function run(): Promise<void> {
  try {
    const release = core.getInput('release')
    if (!release) {
      throw new Error('missing release')
    }

    await install(release)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
