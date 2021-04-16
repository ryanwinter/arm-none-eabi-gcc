import * as fs from 'fs'
import * as path from 'path'
import fetch from 'node-fetch'

import * as gcc from '../src/gcc'
import * as main from '../src/main'

process.env['RUNNER_TOOL_CACHE'] = path.join(__dirname, 'CACHE')
process.env['RUNNER_TEMP'] = path.join(__dirname, 'TEMP')

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
    if (fs.existsSync(path.join(dir, exe))) {
      return true
    }
  }
  return false
}

async function tmpInstall(release: string, platform?: string): Promise<void> {
  const gccDir = await main.install(release, platform)
  expect(hasGcc(gccDir)).toEqual(true)
}

test(
  'install',
  async () => {
    await tmpInstall('10-2020-q4', 'win32')
    //    await tmpInstall('9-2019-q4', 'linux')
  },
  40 * 60 * 1000
)
