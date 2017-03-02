var validator = require('validator'),
        async = require('async');
var request = require('request');

module.exports = function (opts) {
    return {
        "post#slack/requestAuth": function (req, res) {
            console.log("calling requestAuth...");
            request.get({
                url: 'https://slack.com/oauth/authorize?client_id=146827931650.146151726865&team=galdralandmarketing&scope=identity.basic'
            }, function (err, response) {
                console.log(JSON.parse(response.body));
            });
        },
        "get#slack/auth" : function (req, res, next) {
            console.log("1111111");
            console.log("res = ", JSON.parse(res.body));
        }
    }
}