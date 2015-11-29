# Caliopen.Frontend

[![Build
Status](https://travis-ci.org/CaliOpen/caliopen.ng-frontend.svg)](https://travis-ci.org/CaliOpen/caliopen.ng-frontend)

[CaliOpen](https://caliopen.org)'s User Interface project.

This project is an Angular application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## Installation

Please use caliopen.dev instructions. The followings commands are for information purpose

* `git clone https://github.com/CaliOpen/caliopen.ng-frontend.git` ng-frontend
* cd ng-frontend
* `npm install && npm run build`

## Running / Development

* `npm run dev`
* Visit your app cf. caliopen.dev

### Code Generators

### Running Tests

* `npm test`

### Building

* `npm run build`

### Commits and pull requests

- start a new branch
- commit your changes and create a pull request
- once the feature or the fix has been validated squash your commits and edit the comment following conventional changelog with angular preset

Scopes for [conventional changelog](https://github.com/ajoslin/conventional-changelog)

| Scopes      | Descriptions           |
|-------------|------------------------|
| discussions | All about discussions  |
| thread      | All about a thread     |
| contact     | All about contacts     |
| design      | All about design & UX  |
| wording     | All about l10n or i18n |
| pi-imp      | All about Privacy index or Importance level |
| build       | All about tooling (used with **chore**)     |
| test        | All about tests (used with  **chore**)      |

## Deploying

Update changelog then tag

* `npm run release`

## Further Reading / Useful Links
