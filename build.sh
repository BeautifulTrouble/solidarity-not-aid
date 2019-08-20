#!/bin/bash

alias yarn=yarnpkg
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

MD5="$(md5sum package.json)"
git pull || exit
[ "$MD5" = "$(md5sum package.json)" ] || yarn install
yarn build
