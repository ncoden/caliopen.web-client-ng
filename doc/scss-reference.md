# CaliOpen Scss reference

A CSS architecture is subject to two opposing interests. For one hand, we want a set of **generic and modular** components we can use freely and easily maintain. On the other hand, we want an ergonomic interface and a semantic code, so **specific** to each task or showed information.

An unorganized CSS will tend to have across all components a high specificity. The presented architecture aims to enable a complex interface to have **a modular, a generic, and therefore a maintainable code**.

1. [Organization](#organization)
    - [Layout](#layout)
    - [Section](#section)
    - [Module](#module)
2. [Development rules](#development-rules)
    - [Components](#components)
    - [Placeholders, variables, and mixins](#placeholders-variables-and-mixins)
3. [Examples](#examples)

## Organization

Each element used in the HTML is a component.

A component must:
- follow the **BEM method** (*block* having *elements* and *modifiers*) with *states*
- be an semantic or interactive object (not an utility)
- be simple (always split a component into several when possible)
- only manage its own internal properties (no `position` or `float` on himself) or those of its *elements*
- if possible, modify its sub-components with only their own *modifiers*

Components are divided into several categories: `layout`, `section` and `module`, and respectively prefixed with `l-`, `s-` and `m-`. Each category have a specific approach.

### Layout
An element composing the static part of the application.

A layout component must:
- does not have a parent component
- define its own positioning, disposition
- define its behaviour (standard and responsive) and its direct sub-components's one

### Section
A semantic set, which does not have meaning outside of the application, but is still functional.

A section must:
- be modular, reusable
- define its behaviour (standard and responsive) and its direct sub-components's one

### Module
An atomic and generic component, independent of the application meaning.

A module must:
- be atomic, re-used as much as possible
- be generic, have a simple and no-responsive behaviour
- provide modifiers (allowing among other things to make itself responsive)


## Development rules

### Components

A component must apply the following naming rules:
- Only uses `.classes`, not `#IDs`
- BEM syntax: `component`, `component__element`, `component--modifier`
- Component prefixed following its category: `l-`, `s-` or `m-`
- *State* prefixed by `is-`: `component.is-state`

**Note**:
If a component assume that one of its **elements** is a component (generally by applying on it a modifier), this *element* must be named as this component (prefix included).


### Placeholders, variables, and mixins

A module must provide:
- a placeholder, which only bring the standard behaviour and modifiers
- a placeholder (if possible) and a mixin for each of its modifiers

**Variables, placeholders and mixins must follow a BEM-like syntax:**

If they are globals (configuration or utilities):
- variable: `$namespace__variable--variant`
- placeholder: `%namespace--variant`
- mixin: `namespace--variant()`

If they are related to a component:
- variable: `$component__variable--variant`
- placeholder: `%component--modifier`
- mixin: `component--modifier()`

All variable, placeholder or mixin which shouldn't be used outside of a component declaration is considered as "private" and must be prefixed with an underscore (`_`).


##Examples

-- To do --

