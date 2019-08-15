#! /bin/sh
set -eux

npm t

# TODO read these vars from js into yaml
commit="$(git rev-parse --short HEAD)"
tag="$(git tag --points-at HEAD)"
export VERSION="$tag#$commit"

node_modules/.bin/serverless deploy
