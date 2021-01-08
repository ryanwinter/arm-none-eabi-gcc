import * as fs from 'fs'
import * as path from 'path'

import fetch from 'node-fetch'
import tmp from 'tmp'

import * as gcc from '../src/gcc'
import * as setup from '../src/setup'

test('count gcc versions', () => {
  expect(gcc.availableVersions().length).toBeGreaterThan(0)
})

test('test url', () => {
  expect(gcc.distributionUrl('6-2017-q1', 'darwin')).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-mac.tar.bz2'
  )
  expect(gcc.distributionUrl('6-2017-q1', 'linux')).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-linux.tar.bz2'
  )
  expect(gcc.distributionUrl('6-2017-q1', 'win32')).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-win32-zip.zip'
  )
  expect(gcc.distributionUrl('9-2019-q4', 'linux')).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-x86_64-linux.tar.bz2'
  )
  expect(gcc.distributionUrl('9-2019-q4', 'win32')).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-win32.zip'
  )
  expect(gcc.distributionUrl('10-2020-q4', 'linux')).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-x86_64-linux.tar.bz2'
  )
  expect(gcc.distributionUrl('10-2020-q4', 'win32')).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-win32.zip'
  )
})

test('test url response', async () => {
  const url = gcc.distributionUrl('6-2017-q1', 'darwin')
  const resp = await fetch(url)
  expect(resp.status).toStrictEqual(200)
  expect(Number(resp.headers.get('Content-Length'))).toEqual(104170189)
})

function hasGcc(dir: string): boolean {
  for (const exe of ['arm-none-eabi-gcc', 'arm-none-eabi-gcc.exe']) {
    if (fs.existsSync(path.join(dir, 'bin', exe))) {
      console.log(`bin exists`)
      return true
    } else {
      const filenames = fs.readdirSync(dir)
      if (fs.existsSync(path.join(dir, filenames[0], 'bin', exe))) {
        console.log(filenames[0] + `bin exists`)
        return true
      }
    }
  }
  return false
}

async function tmpInstall(release: string, platform?: string): Promise<void> {
  const dir = tmp.dirSync()
  const gccDir = path.join(dir.name, `gcc-${release}`)
  await setup.install(release, gccDir, platform)
  // make sure there's a bin/arm-none-eabi-gcc[.exe] at gccDir
  expect(hasGcc(gccDir)).toEqual(true)
  dir.removeCallback()
}

test(
  'install',
  async () => {
    await tmpInstall('6-2017-q1', 'win32')
    await tmpInstall('10-2020-q4', 'win32')
    await tmpInstall('9-2019-q4', 'linux')
  },
  40 * 60 * 1000
)
