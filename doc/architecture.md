# Architecture

The Caliopen client is using angularjs 1.x following @toddmotto [styleguide](https://github.com/toddmotto/angular-styleguide#angular-1x-styleguide-es2015) (with some adjustments)

## File structure

```
-+ src
 |+js
  |-action: all redux actions used by the app available with angular DI services (to be refactored)
  |-common: reusable module components application specific
  |-component: full feature module components, coupling should be avoid; it is the home of routed components
  |-config: third party modules with global configuration
  |-middleware: all redux middlewares used by the app configured with angular DI factory (to be refactored)
  |-reducer: all redux reducers (to be refactored)
  |-service: repositories and helpers (to be refactored)
  |+app.component.js: the root component
  |+app.js: the bootstrap
```

## Significant differences with styleguide

* the module components stored in `component` folder have a lot of dependencies that must be declared in module definition.
* those components is still coupled to main app since it uses redux (it needs to be refactored).
* redux's side effects are managed at the same place as the other action, this needs to be refactored.
* `common` folder contain modules that can be components or simple directives or filters etc.
* component's controller is in the same file as its component. Controllers as strong relation because of bindings.

## Work in progress

* scss files are still centralized in one place, it should be placed in related components. Eventually it can be transformed in inline css.
* translations are still centralized.
* assets are still centralized.
* `filter` folder to refactor
