# Releasing

## Make sure everything is ok
```shell
npm run prepush
```

## No pending commits
```shell
git status
```

## Bump version and create tag
```shell
npm version patch
```

## Verification
***Check everything looks as expected in the git log!***

## Push everything
```shell
push --progress --porcelain origin refs/heads/main:main --tags
```

## Check github workflow
[Build and Publish](https://github.com/HonoluluHenk/http-param-expander/actions/workflows/build-and-publish.yml)


## Optionally: prepare next version
```shell
npm run bump-prepatch-version
git add package.json package-lock.json
git commit -m 'bump-prepatch-version';
git push
```
