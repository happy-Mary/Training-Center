module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        tasksTime: {
            firstTask: { start: 0, stop: 2 },
            secondTask: { start: 0, stop: 4 }
        },
        browserify: {
            dist: {
                files: {
                  'build-script/script-grunt.js': ['src/js/**/*.js']
                }
            }
        }
    });

    grunt.registerTask('register-time', function(opt) {
        var currTime = new Date().getTime();
        if (opt === 'start') {
            grunt.log.writeln('COUNT START ' + currTime);
            grunt.config.set('tasksTime.firstTask.start', currTime);
            grunt.option('test', 'good');
        }
        else if (opt === 'stop')  {
            grunt.log.writeln('COUNT STOP ' + currTime);
            grunt.config.set('tasksTime.firstTask.stop', currTime);
        }
    });

    grunt.registerTask('count-time', function() {
        grunt.log.writeln(grunt.option('test'));
        grunt.log.writeln('firstTaskStart: ' + grunt.config.get('tasksTime.firstTask.start'));
        grunt.log.writeln('firstTaskEnd: ' + grunt.config.get('tasksTime.firstTask.stop'));
        grunt.log.writeln('secondTaskStart: ' + grunt.config.get('tasksTime.secondTask.start'));
        grunt.log.writeln('secondTaskEnd: ' + grunt.config.get('tasksTime.secondTask.stop'));
    });

    grunt.registerTask('default', ['register-time:start', 'count-time', 'register-time:stop', 'count-time']);

    grunt.registerTask('start', ['register-time:start']);
    grunt.registerTask('finish', ['register-time:stop', 'count-time']);
};


//     // function setglobalTimeStart() {
//     //     var currglobalTime = new Date().getglobalTime();
//     //     // if (!globalTime.firstTask.start) {
//     //         globalTime.firstTask.start = currglobalTime;
//     //     // } else {
//     //         // globalTime.secondTask.start = currglobalTime;
//     //     // }
//     // }

//     // function setglobalTimeStop() {
//     //     var currglobalTime = new Date().getglobalTime();
//     //     // if (!globalTime.firstTask.stop) {
//     //         globalTime.firstTask.stop = currglobalTime;
//     //     // } else {
//     //         // globalTime.secondTask.stop = currglobalTime;
//     //     // }
//     // }

// module.exports = function(grunt) {
    
//         grunt.initConfig({
//             tasksTime: {
//                 firstTask: { start: 0, stop: 2 },
//                 secondTask: { start: 0, stop: 4 }
//             }
//         });
        
//         grunt.registerTask('set', function(opt) {
//             // Change name of first person
//             if (opt === 'start') grunt.config.set('tasksTime.firstTask.start', 44);
//             else if (opt === 'stop') grunt.config.set('tasksTime.firstTask.stop', 45);
//         });

//         grunt.registerTask('get', function() {
//             grunt.log.writeln('Name: ' + grunt.config.get('tasksTime.firstTask.start'));
//             grunt.log.writeln('sir: ' + grunt.config.get('tasksTime.firstTask.stop'));
//             grunt.log.writeln('Name2: ' + grunt.config.get('tasksTime.secondTask.start'));
//             grunt.log.writeln('sir: ' + grunt.config.get('tasksTime.secondTask.stop'));
//         });

//         grunt.registerTask('default', ['set:start', 'get', 'set:stop', 'get']);
//     };