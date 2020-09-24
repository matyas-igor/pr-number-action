# Replaces `[#PR]` with an actual number in a pull request description

This action looks at the description of a pull-request and replaces `[#PR]` with an actual number.

## Inputs

### `github-token`

**Required** `${{ secrets.GITHUB_TOKEN }}`

## Usage

Inside `.github/PULL_REQUEST_TEMPLATE.md`:

```
Preview: https://deploy-preview-[#PR]--some-app.netlify.app
```

And inside `.github/workflows/PR.yml`:

```
name: Update PR number
on: [push]

uses: matyas-igor/pr-number-action@v1
with:
  github-token: "${{ secrets.GITHUB_TOKEN }}"
```