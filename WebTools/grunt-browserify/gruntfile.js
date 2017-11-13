module.exports = function(grunt) {

    grunt.initConfig({

        browserify: {
            dist: {
                files: {
                  'build/script.js': ['src/js/**/*.js']
                }
            }
        },

        uglify: {
            main: {
                files: {
                    'build/script.min.js': 'build/script.js'
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['default'],
                options: { spawn: false, },
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['browserify', 'uglify']);
}