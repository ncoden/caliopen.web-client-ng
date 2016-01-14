# Contributing

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## Installation

Please follow http://caliopen.github.io/ instructions. The followings commands are for information purpose

* `git clone https://github.com/CaliOpen/caliopen.web-client-ng.git` web-client-ng
* cd web-client-ng
* `npm install && npm run build`

## Running / Development

* `npm run dev`
* Visit your app cf. http://caliopen.github.io/

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

| Scopes      | Descriptions                                        |
|-------------|-----------------------------------------------------|
| various     | Everything which does'nt feet to following scopes   |
| discussions | All about discussions                               |
| thread      | All about a thread                                  |
| contact     | All about contacts                                  |
| design      | All about design & UX                               |
| wording     | All about l10n or i18n                              |
| pi-imp      | All about Privacy index or Importance level         |
| build       | All about tooling (used with **chore**)             |
| test        | All about tests (used with  **chore**)              |

## Deploying

Update changelog then tag

* `npm run release`

## Troubleshoutings

**I can't have things working with docker**

In this you can bypass this container and use your own tools to build the application (cf. Installation, Building sections).

```
cd ../bin
docker-compose stop web-client-ng
```

_The `dist` directory is shared with `web` so it is probably enough to do._
