# grunt-npmshrinkwrap

Grunt wrapper for [npm-shrinkwrap](https://www.npmjs.com/package/npm-shrinkwrap) module.

This task creates an npm-shrinkwrap.json file (with optional dev dependencies).

## Installation:
```sh
% npm i pdehaan/grunt-npmshrinkwrap -D
```

## Usage:

1. Call either of the following commands from the Terminal:
    - `grunt npmShrinkwrap` &mdash; only shrinkwraps the `dependencies`
    - `grunt npmShrinkwrap:dev` &mdash; shrinkwraps both `dependencies` and `devDependencies`

2. Initialize the task using `initConfig()` and specify the `dev` and/or `lint` options:
    ```js
grunt.initConfig({
  npmShrinkwrap: {
    options: {
      dev: true,
      lint: true
    }
  }
});
```

    Specifying the Boolean`lint` option allows you to easily check your dependencies against the nodesecurity.io database for known vulnerabilities.
