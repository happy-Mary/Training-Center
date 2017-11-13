module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            libs: {
                src: 'js/libs/**/*.js',
                dest: 'build/libs.js'
            },
            main: {
                src: [
                    'js/mylibs/**/*/js',
                    'js/main.js'
                ],
                dest: 'build/scripts.js'
            }
        },

        uglify: {
            main: {
                files: {
                    'build/scripts.min.js': '<%= concat.main.dest %>' // template
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: { sapwn: false, },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}