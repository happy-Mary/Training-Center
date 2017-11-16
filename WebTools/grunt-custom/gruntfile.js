module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        tasksTime: {
            firstTask: { start: 0, stop: 0 },
            secondTask: { start: 0, stop: 0 }
        },
        browserify: {
            dist: {
                files: {
                  'build/script-grunt.js': ['src/js/**/*.js']
                }
            }
        }
    });

    function setStartTime(time) {
        var firstTaskStart = grunt.config.get('tasksTime.firstTask.start');
        if (!firstTaskStart) {
            grunt.config.set('tasksTime.firstTask.start', time);
        } else {
            grunt.config.set('tasksTime.secondTask.start', time);
        }
    }

    function setStopTime(time) {
        var firstTaskStop = grunt.config.get('tasksTime.firstTask.stop');
        if (!firstTaskStop) {
            grunt.config.set('tasksTime.firstTask.stop', time);
        } else {
            grunt.config.set('tasksTime.secondTask.stop', time);
        }
    }

    grunt.registerTask('write-time-file', function() {
        var currTime = new Date().getTime();
        grunt.file.write('data.txt', currTime);
    });

    grunt.registerTask('read-time-file', function() {
        var timeStart = grunt.file.read('data.txt');
        grunt.file.delete('data.txt');
        grunt.task.run('register-time:start:' + timeStart);
    });

    grunt.registerTask('register-time', function(opt, val) {
        var currTime = val || new Date().getTime();
        if (opt === 'start') {
            setStartTime(currTime);
        }
        else if (opt === 'stop')  {
            setStopTime(currTime);
        }
    });

    grunt.registerTask('count-time', function() {
        var firstTaskStart = grunt.config.get('tasksTime.firstTask.start');
        var firstTaskStop = grunt.config.get('tasksTime.firstTask.stop');
        var secondTaskStart = grunt.config.get('tasksTime.secondTask.start');
        var secondTaskStop = grunt.config.get('tasksTime.secondTask.stop');

        var firstTaskTime = firstTaskStop - firstTaskStart;
        var secondTaskTime = secondTaskStop - secondTaskStart;

        grunt.log.writeln('firstTaskExec: ' + firstTaskTime);
        grunt.log.writeln('secondTaskExec: ' + secondTaskTime);

        if (firstTaskTime > secondTaskTime) {
            grunt.log.ok('GRUNT-BROWSERIFY is faster');
        } else {
            grunt.log.ok('BROWSERIFY is faster');
        }
    });

    grunt.registerTask('start', ['write-time-file']);
    grunt.registerTask('finish', ['register-time:stop', 'read-time-file', 'register-time:start', 'browserify', 'register-time:stop', 'count-time']);
};
