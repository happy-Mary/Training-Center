module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      jshint: {
          files: ['gruntfile.js', 'src/**/*.js']
      },
      jsdoc: {
          dist: {
              src: ['src/**/*.js'],
              options: {
                  destination: 'doc'
              }
          }
      },
      postcss: {
          options: {
              map: true,

              processors: [
                  require('pixrem')(),
                  require('autoprefixer')({browsers: 'last 2 versions'}),
                  require('cssnano')()
              ]
          },
          dist: {
              src: 'src/*.css'
          }
      },
  });

  grunt.registerTask('default', ['jshint']);
}