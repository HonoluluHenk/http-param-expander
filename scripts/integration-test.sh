#!/usr/bin/env bash
set -Eeup

cd example/example-app
npm ci
npm run test -- --watch=false --browsers=ChromeHeadless
