# Replaces `[#PR]` with an actual number in a pull request description

This action looks at the description of a pull-request and replaces `[#PR]` with an actual number.

## Inputs

### `github-token`

**Required** `${{ secrets.GITHUB_TOKEN }}`

### `pattern`

Pattern to use for ID replacement.

_Optional_ `[#PR]`

## Usage

Inside `.github/PULL_REQUEST_TEMPLATE.md`:

```
Preview: https://deploy-preview-[#PR]--some-app.netlify.app
```

And inside `.github/workflows/PR.yml`:

```
name: Update PR number
on: [pull_request]

jobs:
  update:
    name: Update PR number
    runs-on: ubuntu-latest
    steps:
    - uses: matyas-igor/pr-number-action@v1
      with:
        github-token: "${{ secrets.GITHUB_TOKEN }}"
        # pattern: "[#PR]"
```
