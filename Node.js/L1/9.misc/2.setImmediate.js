setTimeout(() => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate 2');
    });
}, 0);

setImmediate(() => {
    console.log('immediate 1');
});