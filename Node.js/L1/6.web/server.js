var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var passport = require('passport');
var timeout = require('connect-timeout');
var compression = require('compression');

var authorize = require('./core/middleware/authorize');
var settings = require('./core/settings');
var client = 'angular';
var clients = {
    'react': {
        dist: path.join(__dirname, 'client-react', 'build'),
        index: path.join(__dirname, 'client-react/build', 'index.html')
    },
    'angular': {
        dist: path.join(__dirname, 'client-angular', 'dist'),
        index: path.join(__dirname, 'client-angular/dist', 'index.html')
    }
};
//var index = require('./routes/index');
var api = require('./api/routes');

var debug = require('debug')('server');
var http = require('http');

// init app
var app = express();

initViewEngine();
initSessionMiddleware();

initErrorHandlers();
initServer();
initRoutes();
initProcessExceptionHandler();

function initViewEngine() {
    app.engine('html', exphbs({}));
    app.set('views', path.join(__dirname, client));
    app.set('view engine', 'html');
}

function initServer() {
    http.createServer(app);

    app.use(compression());
    app.use(timeout('600s'));
    //app.use(favicon(path.join(__dirname, isProdEnvironment ? '/dist/assets/img/favicon.ico' : '/assets/img/favicon.ico')));

    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({extended: false, limit: '10mb'}));

    app.use(cookieParser());

    //app.use(express.static(path.join(__dirname, isProdEnvironment ? 'dist' : '')));
    app.use(express.static(clients[client].dist));

    app.listen(settings.server.PORT);
}

function initSessionMiddleware() {
    require('./core/passport')(passport);

    // required for passport
    app.use(session({
        secret: 'wermofngjqignfhsyelgmbnh',  // session secret
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
}

function initRoutes() {
    app.use('/api', authorize(), api);
    // app.use('/api', function (req, res, next) {
    //     req.reqType = 'api';
    //     next();
    // }, api);

    app.post('/login/facebook',
        passport.authenticate('facebook-token'),
        function (req, res) {
            if (!req.user) {
                return res.sendStatus(401);
            }

            return res.json(req.user);
        }
    );

    app.get('/login',
        function (req, res) {
            if (req.isAuthenticated()) {
                return res.json(req.user);
            } else {
                // if they aren't redirect them to the home page
                if (req.xhr) {
                    res.status(403);
                    res.json({error: 'Access Denied.'});
                } else {
                    res.redirect('/');
                }
            }
        }
    );

    app.all('/*', function (req, res) {
        res.sendFile(clients[client].index);
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

function initErrorHandlers() {
    app.use(logErrors);
    app.use(ajaxErrorHandler);
    app.use(errorHandler);

    function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }

    function ajaxErrorHandler(err, req, res, next) {
        console.trace(err.stack);
        res.status(err.status || 500);
        if (err.message) {
            err.msg = err.message;
        }
        if (req.xhr) {
            res.json({error: err});
        } else {
            next(err);
        }
    }

    // development error handler will print stacktrace
    function errorHandler(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: app.get('env') === 'dev' ? err : {}
        });
    }
}


function initProcessExceptionHandler() {
    process.on('uncaughtException', function (err) {
        console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
        console.error(err.stack);
    });
}