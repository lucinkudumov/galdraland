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
//            console.log("req = ", req);
//            console.log("res= ", res);
//            console.log("next= ", next);
        }
    }
}