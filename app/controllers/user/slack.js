var validator = require('validator'),
        async = require('async');
var request = require('request');

module.exports = function (opts) {
    return {
        "post#slack/requestAuth": function (req, res) {
            console.log("calling requestAuth...");
            request.get({
                url: 'https://slack.com/oauth/authorize?client_id=146827931650.146151726865&scope=identity.basic'
            }, function (err, response) {
                if(err)
                    console.log("err = ", err);
                else
                    console.log("response = ", response);
            });
        },
        "get#slack/auth" : function (req, res, next) {
            console.log("1111111");
            console.log("code = " + req.param('code'));
            request.get({
                url: 'https://slack.com/api/oauth.access?client_id=146827931650.146151726865&client_secret=80c8c252dabe4cbc46cfe0e29fb6272c&code=' + req.param('code')
            }, function (err, response) {
                if(err)
                    console.log("err = ", err);
                else
                    console.log("response = ", response);
            });

//            console.log("req = ", req);
//            console.log("res= ", res);
//            console.log("next= ", next);
        },
        "get#slack/authtoken" : function (req, res, next) {
            console.log("1111111");
            console.log("to = " + req.param('code'));
            request.get({
                url: 'https://slack.com/api/oauth.access?client_id=146827931650.146151726865&scope=identity.basic&code=' + req.param('code')
            }, function (err, response) {
                if(err)
                    console.log("err = ", err);
                else
                    console.log("response = ", response);
            });
        }
    }
}