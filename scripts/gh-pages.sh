#!/usr/bin/env bash

rm -rf ./public
NODE_ENV=production npm run build
cd public
git init
git remote add origin git@github.com:funag/funag.github.io.git
git add --all
git commit -m 'publish to gh-pages'
git push origin master --force
cd ..
