var validator = require('validator'),
        async = require('async');
var request = require('request');

var WebClient = require('@slack/client').WebClient;

module.exports = function (opts) {
    return {
        "post#slack/requestAuth": function (req, res) {
            console.log("calling requestAuth..." + req.user._id);
            request.get({
                url: 'https://slack.com/oauth/authorize?client_id=146827931650.146151726865&scope=identity.basic&redirect_uri=https://galdraland-1-0.herokuapp.com/api/slack/auth'
            }, function (err, response) {
                if(err)
                    console.log("error");
                else
                    console.log("success");
            });
        },
        "get#slack/auth" : function (req, res, next) {
            console.log("1111111");
            if (req.param('code') != null) {
                console.log("aaaaa");
                console.log("code = " + req.param('code'));
                request.get({
                    url: 'https://slack.com/api/oauth.access?client_id=146827931650.146151726865' +
                        '&client_secret=80c8c252dabe4cbc46cfe0e29fb6272c' +
                        '&redirect_uri=https://galdraland-1-0.herokuapp.com/api/slack/auth' +
                        '&code=' + req.param('code')
                }, function (err, response) {
                    console.log("bbbbb");
                    if(err)
                        console.log("err = ", err);
                    else
                        console.log("response = ", response.body);
                });
            } else {
                console.log("bbbbb");
//                console.log("code = " + req.param('code'));
            }
        }
    }
}