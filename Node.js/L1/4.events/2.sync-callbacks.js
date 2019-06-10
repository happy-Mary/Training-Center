function doWhenReady(callback) {
    for (var i = 0; i < 1000000; i++) {

    }

    callback('Done!');
}

doWhenReady(console.log);

/// or

[1, 2, 3].forEach(function(val){
    console.log(val);
});