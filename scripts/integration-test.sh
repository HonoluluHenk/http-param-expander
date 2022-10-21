#!/usr/bin/env bash
set -Eeup

cd example/example-app
npm install
npm run test -- --watch=false
