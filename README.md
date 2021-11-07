# arm-none-eabi-gcc

[![CI](https://github.com/ryanwinter/arm-none-eabi-gcc/workflows/CI/badge.svg)](https://github.com/ryanwinter/arm-none-eabi-gcc/actions)

Install `arm-non-eabi-gcc` and add to the path. Supports Windows, Linux and macOS.

## Usage

Add the following to your GitHub workflow:

```yaml
    steps:
      - name: arm-none-eabi-gcc
        uses: ryanwinter/arm-none-eabi-gcc@master
        with:
          release: '10-2021.07' # The arm-none-eabi-gcc release to use.
      
      - run: ...
```

## Releases

* 10-2021.10
* 10-2021.07
* 10-2020-q4
* 9-2020-q2
* 9-2019-q4
* 8-2019-q3
* 8-2018-q4
* 7-2018-q2
* 7-2017-q4
* 6-2017-q2
* 6-2017-q1
* 6-2016-q4
* 5-2016-q3
* 5-2016-q2
* 5-2016-q1
* 5-2015-q4
* 4.9-2015-q3
* 4.9-2015-q2
* 4.9-2015-q1
* 4.9-2014-q4
* 4.8-2014-q3
* 4.8-2014-q2
* 4.8-2014-q1
* 4.7-2014-q2
* 4.8-2013-q4
* 4.7-2013-q3
* 4.7-2013-q2
* 4.7-2013-q1
* 4.7-2012-q4
