'use strict';
/*global module*/
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['./test/*.js', './gruntfile.js',
        './feature-toggle-client.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        nonew: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        eqnull: true,
        node: true,
        browser: true,
        strict: true,
        boss: false
      }
    },
    browserify: {
      dist: {
        files: {
          './dist/feature-toggle-client.js':
            ['./feature-toggle-client.js']
        },
        options: {
          standalone: 'setFeatures'
        }
      }
    },
    qunit: {
      all: ['test/test-client.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['jshint', 'browserify', 'qunit']);
  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('hint', ['jshint']);
};