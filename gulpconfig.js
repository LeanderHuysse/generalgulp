/**
 * @author: Leander Huysse (leander.huysse@sanoma.com)
 * @version: 1.0.0-Alpha.1
 * @desc: Multi-purpose gulp setup for new or existing projects
 */

/**
 * SETTINGS
 */

var options = {
  directories: {
    stylesheet: {
      input:  'scss/app.scss',
      output: '../public/css',
      watch: './scss/**/*.scss'
    },
    javascript: {
      input: 'js/**/*.js',
      output: '../public/js',
      watch: './js/**/*.js'
    },
    image: {
      input: 'images/**',
      output: '../theme/images',
      watch: './images/**'
    },
    template: {
      watch: '../template/**'
    }
  },
  settings: {
    errorReporting: 1,
    stylesheet: {
      enabled: true,
      linter: true,
      minify: true,
      concat: true,
      notify: true
    },
    javascript: {
      enabled: true,
      linter: true,
      minify: true,
      concat: false,
      notify: false
    },
    image: {
      enabled: true,
      minify: true,
      notify: false,
    },
    browsersync: {
      enabled: true,
      proxy: 'development.forum.viva.nl',
      notify: false,
    }
  }
}

module.exports = options;
