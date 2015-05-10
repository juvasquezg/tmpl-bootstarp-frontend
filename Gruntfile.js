// File: Gruntfile.js
'use strict';

var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      vendor: {
        files: [
          {
            expand: true, cwd: 'node_modules/bootstrap/',
            src: ['js/**', 'less/**'], dest: 'public/vendor/bootstrap/'
          },
          {
            expand: true, cwd: 'node_modules/bootstrap/',
            src: ['fonts/**'], dest: 'public/'
          },
          {
            expand: true, cwd: 'node_modules/backbone/',
            src: ['backbone.js'], dest: 'public/vendor/backbone/'
          },
          {
            expand: true, cwd: 'node_modules/jquery/dist/',
            src: ['jquery.js'], dest: 'public/vendor/jquery/'
          },
          {
            expand: true, cwd: 'node_modules/underscore/',
            src: ['underscore.js'], dest: 'public/vendor/underscore/'
          }
        ]
      }
    },
    // connect livereload
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'public/'
        }
      }
    },
    watch: {
      project: {
        files: ['public/**/*.js', 'public/**/*.css', 'public/**/*.html', 'public/**/*.json'],
        options: {
          livereload: true
        }
      },
      clientJS: {
        files: [
          'public/js/**/*.js', '!public/js/**/*.min.js'
        ],
        tasks: ['newer:uglify', 'newer:jshint:client']
      },
      clientLess: {
        files: [
          'public/less/**/*.less'
        ],
        tasks: ['newer:less']
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: function(filePath) {
          return filePath + '.map';
        }
      },
      layouts: {
        files: {
          'public/js/core.min.js': [
            'public/vendor/jquery/jquery.js',
            'public/vendor/underscore/underscore.js',
            'public/vendor/backbone/backbone.js',
            'public/vendor/bootstrap/js/affix.js',
            'public/vendor/bootstrap/js/alert.js',
            'public/vendor/bootstrap/js/button.js',
            'public/vendor/bootstrap/js/carousel.js',
            'public/vendor/bootstrap/js/collapse.js',
            'public/vendor/bootstrap/js/dropdown.js',
            'public/vendor/bootstrap/js/modal.js',
            'public/vendor/bootstrap/js/tooltip.js',
            'public/vendor/bootstrap/js/popover.js',
            'public/vendor/bootstrap/js/scrollspy.js',
            'public/vendor/bootstrap/js/tab.js',
            'public/vendor/bootstrap/js/transition.js'
          ],
          'public/js/main.min.js': ['public/js/main.js']
        }
      }
    },
    jshint: {
      client: {
        options: {
          jshintrc: '.jshintrc-client',
          ignores: [
            'public/js/**/*.min.js',
          ]
        },
        src: [
          'public/js/**/*.js'
        ]
      },
    },
    less: {
      options: {
        compress: true
      },
      layouts: {
        files: {
          'public/css/core.min.css': [
            'public/less/bootstrap-build.less',
            'public/less/core.less'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-newer');


  // livereload
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy:vendor', 'newer:uglify', 'newer:less', 'connect', 'watch']);
  grunt.registerTask('lint', ['jshint']);

};
