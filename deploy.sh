#! /bin/sh
set -eux

npm t

commit="$(git rev-parse --short HEAD)"
tag="$(git tag --points-at HEAD)"
export VERSION="$tag#$commit"

node_modules/.bin/serverless deploy
