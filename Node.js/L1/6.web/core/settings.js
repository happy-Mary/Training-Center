function getEnvVar(varName, needLog) {
    if (process.env.hasOwnProperty(varName)) {
        needLog && console.info(varName, "is", process.env[varName]);
        return process.env[varName];
    } else {
        console.error(varName, "is not configured in environment. Terminating process.");
        process.exit(1);
    }
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

var server = {
    environment: getEnvVar('NODE_ENV') || 'dev',
    PORT: normalizePort(process.env.PORT || '3000'),
    facebook: {
        appId: getEnvVar('fbAppId'),
        appSecret: getEnvVar('fbAppSecret')
    },
};

var client = {
    server: server.SERVER,
    environment: server.environment,
};

module.exports = {
    server: server,
    client: client
};