var express = require("express"),
    config  = require("./config.js"),
    utils   = require("./utils.js"),
    async = require("async"),
    strategies = require("./strategies.js"),
    passport = require("passport"),
    redisStore = require('connect-redis')(express),
    nodemailer = require("nodemailer"),
    emailTemplates = require('email-templates'),
    path = require('path');
    var imageModel = require('./app/models/Imagestore');
    var app       = express(),
    secretKey = "hJKQg7dxMGzEWqf",
    smtpTransport = nodemailer.createTransport("SMTP", config.smtpOptions),
    templatesDir = path.join(__dirname, "emails");

var WebClient = require('@slack/client').WebClient;
var SlackStrategy = require('passport-slack').Strategy;
//var Slack = require('slack-node');


if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var store = new redisStore({
        host : rtg.hostname,
        port : rtg.port,
        pass : rtg.auth.split(":")[1] 
    });
} else {
    var store = new redisStore();
}

app.configure("development", function () {
    app.set("port", config.devPort);
    app.use(express.logger());
});

app.configure("production", function () {
    app.set("port", config.prodPort);
});

app.configure(function () {
    //Public--------------------------------------
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
//    app.use(express.session({ secret: secretKey, store: store, cookie: { secure: false, maxAge: 86400000 }, maxAge: 360*5}));
    app.use(express.cookieSession({ secret: secretKey, store: store, cookie: { secure: false, maxAge: 86400000 }, maxAge: 360*5}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    app.use(function (req, res, next) {
        req.sendEmail = function (options,  cb) {
            smtpTransport.sendMail(options, cb);
        }

        next();
    });

    emailTemplates(templatesDir, function(err, template) {
        if (err) {
            console.log(err);
        } else {
            app.use(function (req, res, next) {
                req.template = template;
                next();
            });
        }
    });

    var clientID ="138423090594.145329929105",
        clientSecret = "2cee7f73e16f6a949b20b81551d9cce0",
        callback = "https://galdraland-1-0.herokuapp.com/api/callback/slack";
    passport.use(new SlackStrategy({
        clientID: clientID, // need change to real id (this is test clientID)
        clientSecret: clientSecret, // need change to real secret (this is test secretKey)
        callbackURL: callback // need change to real local or remote domain
    }, function(accessToken, refreshToken, profile, done) {
        console.log("accessToken = ", accessToken);
        console.log("refreshToken = ", refreshToken);
        console.log("profile = ", profile);
        console.log("done = ", done);
    }));

// path to start the OAuth flow
    app.get('/auth/slack', passport.authorize('slack'));

// OAuth callback url
    app.get('/auth/slack/callback',
        passport.authorize('slack', { failureRedirect: '/login' }),
        function (req, res) {res.redirect('/')}
    );
});

var startApp = function (err) {
    if (err) {
        console.log(err);
    } else {
        app.listen(app.get("port"), function () {
           console.log("App started on port: " + app.get("port"));
           app.get("/*", function (req, res) {
               res.sendfile(__dirname + "/views/index.html");
           });
        });
		
		app.listen(app.post("port"), function () {
           console.log("App started on port: " + app.get("port"));
           
           app.post("/*", function (req, res) {
               res.sendfile(__dirname + "/views/index.html");
           });
        });
    }
}

async.parallel([
    function (callback) {
        utils.loadMiddlewares({}, callback);
    },
    function (callback) {
        utils.loadModels({ dbConnection : config.dbConnection }, callback);
    },
    function (callback) {
        utils.loadControllers({}, callback);
    }
    ], function (err, results) {
    async.parallel([
        function (callback) {
            utils.sync(app, results, callback);
        },
        function (callback) {
            strategies.facebook({ models : results[1] }, callback);
        }
//        },
//        function (callback) {
//            strategies.slack({ models : results[1] }, callback);
//        }
    ], startApp);
});