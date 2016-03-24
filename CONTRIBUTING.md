# Contributing

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## Installation

Please follow http://caliopen.github.io/ instructions. The followings commands are for information
purpose.

* `git clone https://github.com/CaliOpen/caliopen.web-client-ng.git` web-client-ng
* cd web-client-ng
* `npm install && npm run build`

## Running / Development

* `npm run dev`
* Visit your app cf. http://caliopen.github.io/

### Code Generators

### Running Tests

_**[TL;DR]:** Travis-CI does the job, else you can run `npm test`_

Any application should rely on tests. CaliOpen takes this very seriously.
Any contribution should provides a unit test or a functional one. But we also are pragmatic and test
might be omitted depends on the case.

**Requirements:**

* You need at least nodejs 4 (LTS) (functional tests requires Firefox and cannot be launched in a
container for the moment)
* Firefox (recent version)
* You may have file system permission issues due to docker, you need to stop the container and fix:

```
cd caliopen/
cd bin/
docker-compose stop web-client-ng
cd ../web-client-ng/
sudo chown -R ${USER} .build/ dist/ node_modules/
```

#### Unit tests

[Jasmine][1], Karma and Phantomjs will be used to execute tests. And [ngMock][4] helps to mock
services.

```
npm run test-unit
```

Source code and tests can be watched during development (usefull for TDD):

```
npm run test-watch
```

_Unit tests can be run in a container:_

```
cd bin/
docker-compose run web-client-ng npm run test-unit
```

#### Functional tests

[Jasmine][1] is used to describe user events (features) and expectations. [Protractor][2] is the
e2e framework witch communicates with selenium-webdriver. And [ngMockE2E][3] is used to mock the API.

There are two `NODE_ENV` for those tests : `test` and others.
And in the development environment, the real API will be used.

```
# first time you need to run
npm run e2e-init
# use real API
npm run e2e
```

During development you may need new requests from the API, so add the response to
`test/functional/app_test.js`. This will be used in CI or test environment:

```
# automatically set NODE_ENV and use mocks
npm run test-functional
```

#### Continuous Integration

Travis-CI is currently used to test pull-requests and master. Whole checks and tests are executed,
functional tests run with firefox in kind of headless mode.

### Building

* `npm run build`

### Commits and pull requests

- start a new branch
- commit your changes and create a pull request
- once the feature or the fix has been validated squash your commits and edit the comment following
conventional changelog with angular preset

Scopes for [conventional changelog](https://github.com/ajoslin/conventional-changelog)

| Scopes      | Descriptions                                        |
|-------------|-----------------------------------------------------|
| various     | Everything which does'nt feet to following scopes   |
| discussions | All about discussions                               |
| thread      | All about a thread                                  |
| contact     | All about contacts                                  |
| user        | All about end user                                  |
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

In this you can bypass this container and use your own tools to build the application (cf.
Installation, Building sections).

```
cd ../bin
docker-compose stop web-client-ng
```

_The `dist` directory is shared with `web` so it is probably enough to do._


[1]: http://jasmine.github.io
[2]: http://www.protractortest.org
[3]: https://docs.angularjs.org/api/ngMockE2E
[4]: https://docs.angularjs.org/api/ngMock
