var EventEmitter = require('events').EventEmitter;

var getData = function(count) {
    var event = new EventEmitter();

    setTimeout(function() {
        var i = 0;

        event.emit('start');

        var t = setInterval(function() {
            event.emit('data', ++i);

            if (i === count) {
                event.emit('end', i);
                clearInterval(t);
            }
        }, 100);
    }, 0);
    
    return event;
};

var data = getData(10);

data.on('start', function() {
    console.log('Started!');
});

data.on('data', function(item) {
    console.log('   Data: ' + item);
});

data.on('end', function() {
    console.log('Ended!');
});