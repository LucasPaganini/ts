# Contributing to the Codebase

Thank you so much for for your interest in contributing to the codebase! We do our best to make the contributing experience easy and clear, if you have any feedback, please contact us via [Twitter](https://twitter.com/LucasPaganini), [Instagram](https://www.instagram.com/lucaspaganini/) or [email (me@lucaspaganini.com)](mailto:me@lucaspaganini.com).

## Development Environment

We use Docker containers to provide a normalized development experience to all collaborators. Follow these steps to use it:

1. [Install Docker](https://docs.docker.com/get-docker/)
2. [Install VSCode](https://code.visualstudio.com/download)
3. Install the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
4. Open the VSCode command palette (CMD/CTRL + SHIFT + P)
5. Run "Remote-Containers: Open Folder in Container", then select the project root folder

## Commands

- `npm clean-install` for a clean install.
- `npm test` to execute the tests.
- `npm run build` to build the project for production. The build artifacts will be stored in the `dist/` directory.
- `npm run lint` to lint the codebase with Prettier, ESLint and TSLint.
- `npm run format` to automatically apply some style conventions.

## Github Workflow

Before starting any work, make sure there's a [Github issue](https://github.com/LucasPaganini/ts-utils/issues) describing what will be done (if there's none, [create one](https://github.com/LucasPaganini/ts-utils/issues/new)). In that issue, assign yourself as the responsible and tag it with `"In progress"`.

With an existing issue associated with your work, create a branch for your work using the following convention:

- `hotfix/{issue}` for hotfixes
- `fix/{issue}` for fixes
- `feature/{issue}` for features

Other branch conventions are:

- `dev` for the latest development version
- `master` for the latest general released version
- `release/{version}` for released versions

Once your work is done and [conforms with our style conventions](#manually-verified-style-conventions):

1. Create a pull request (PR)
2. Link the issue
3. Tag the issue with `"To verify"`
4. Untag the issue with `"In progress"`
5. Assign yourself as the responsible for the PR
6. Assign [@lucaspaganini](https://github.com/LucasPaganini) to review you work
7. Once it's approved, it can be merged by anyone with access.

## Manually Verified Style Conventions

Some style conventions are not verified by `npm run lint` but should be followed nonetheless.

| What       | Convention |
| :--------- | :--------- |
| File names | Kebab case |

### File names, kebab case

All lowercase, use `-` for spaces.

Do:

- `some-file.ts`
- `some-test.spec.ts`

Don't:

- `someFile.ts`
- `some-test.Spec.ts`

Exceptions:

- `Dockerfile`
- `README.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
