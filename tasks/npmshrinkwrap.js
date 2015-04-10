'use strict';

var npmShrinkwrap = require('npm-shrinkwrap');
var P = require('promise');

npmShrinkwrap = P.denodeify(npmShrinkwrap);

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-nsp-shrinkwrap');

  /**
   * Register the `npm-shrinkwrap` Grunt task. This task creates an npm-shrinkwrap.json file (with optional dev dependencies).
   *
   * Usage:
   * 1. Call either of the following commands from the Terminal:
   *   - `grunt npmShrinkwrap` - only shrinkwraps the `dependencies`
   *   - `grunt npmShrinkwrap:dev` - shrinkwraps both `dependencies` and `devDependencies`.
   * 2. Initialize the task using `initConfig()` and specify the `dev` and/or `lint` options:
   * ```js
   * grunt.initConfig({
   *   npmShrinkwrap: {
   *     options: {
   *       dev: false,
   *       lint: false
   *     }
   *   }
   * });
   * ```
   *
   * Specifying the Boolean`lint` option allows you to easily check your dependencies against the nodesecurity.io database for known vulnerabilities.
   *
   * @param  {String} dev  The string "dev", or an empty string.
   */
  grunt.registerTask('npmShrinkwrap', 'Create an npm-shrinkwrap.json file', function (dev) {
    var done = this.async();
    var options = this.options();

    var isDev = !!options.dev || (dev === 'dev');

    npmShrinkwrap({
      dirname: process.cwd(),
      dev: isDev
    }).then(function (optionalWarnings) {
      var msg = (isDev) ? '(with devDependencies)' : '';
      grunt.log.subhead('wrote npm-shrinkwrap.json %s', msg);

      optionalWarnings.forEach(function (warning) {
        grunt.log.writeln(warning.message);
      });
    }).then(function () {
      if (!!options.lint) {
        grunt.log.subhead('validating npm-shrinkwrap.json against nodesecurity.io');
        grunt.option('force', true);
        grunt.task.run('validate-shrinkwrap');
      }
    }).then(done).catch(function (err) {
      grunt.log.error(err.toString());
      done(false);
    });
  });
};
