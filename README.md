# arm-none-eabi-gcc

[![CI](https://github.com/ryanwinter/arm-none-eabi-gcc/workflows/CI/badge.svg)](https://github.com/ryanwinter/arm-none-eabi-gcc/actions)

This action downloads and sets up arm-none-eabi-gcc, adding it to the PATH. It works on Windows, Linux and macOS.

## Usage

```yaml
steps:
- name: arm-none-eabi-gcc
  uses: ryanwinter/arm-none-eabi-gcc@master
  with:
    release: '10-2020-q4' # The arm-none-eabi-gcc release to use.
- run: ...
```
