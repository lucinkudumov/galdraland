var passport = require("passport");

module.exports = function (opts) {
    if (process.env.HEROKU) {
        var fail = "http://galdraland-1-0.herokuapp.com/";
    } else {
        var fail = 'http://galdraland.com:9010/';
    }

//	var fail = "http://galdraland-1-0.herokuapp.com/";
    
    return {
        "get#login/facebook" : [function(req,res,next){if (req.query.type == "teams") req.session.returnTo = "/teams/view/" + req.query.id; else if(req.query.type == "adventures") req.session.returnTo = "/adventures/view/" + req.query.id; else req.session.returnTo =req.query.r; console.log(req.query.type); console.log(req.query.id); console.log(req.query); next();}, passport.authenticate('facebook', { scope: ['user_photos', 'email'] })],
        "get#callback/facebook" : passport.authenticate('facebook', { failureRedirect: fail, successRedirect : "/api/cookie" }),
    }
}