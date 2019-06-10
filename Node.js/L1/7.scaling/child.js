process.on('message', function(message) {
    switch (message.cmd) {
        case 'sum':
            process.send({
                result: message.val1 + message.val2
            });
            break;
        case 'finish':
            process.exit();
            break;

        default:
            console.error('Invalid message.');
    }
});