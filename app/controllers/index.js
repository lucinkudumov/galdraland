var passport = require("passport");
var fs = require('fs');
module.exports = function (opts) {
		var imageModel = opts.models.Imagestore;
    if (process.env.HEROKU) {
        var fail = "http://galdraland-1-0.herokuapp.com/";
    } else {
        var fail = 'http://galdraland.com:9010/';
    }

//	var fail = "http://galdraland-1-0.herokuapp.com/";
    
    return {
        "get#login/facebook" : [function(req,res,next){
            if (req.query.type == "teams")
                req.session.returnTo = "/teams/view/" + req.query.id;
            else if(req.query.type == "adventures")
                req.session.returnTo = "/adventures/view/" + req.query.id;
            else req.session.returnTo =req.query.r;
            console.log(req.query.type);
            console.log(req.query.id);
            console.log(req.query);
            next();
        },
        passport.authenticate('facebook', { scope: ['user_photos', 'email'] })],
        "get#callback/facebook" : console.log("skip...")/*passport.authenticate('facebook', { failureRedirect: fail, successRedirect : "/api/cookie" })*/,
        'get#assets/images/upload/:id':function(req,res,next){
                console.log("Uploaded Image Request...");
                var id = req.param('id');
                var newPath = "/app/public/assets/images/upload/" + id;
                fs.readFile(newPath, function (err, data) {
                	if(err)
                	{
                		imageModel.findOne({name: id},function (err, image) {
		                    if (err) return next(err);
		                // var base64 = (doc[0].img.data.toString('base64'));
		                //  res.send(base64);
		                		// console.log(image.name);
		                		// console.log(image.data);
		                    res.writeHead('200', {'Content-Type': 'image/png'});
		                    res.end(image.data.data, 'binary');
		                });
                	}
                	else
                	{
                		res.writeHead('200', {'Content-Type': 'image/png'});
		                res.end(data, 'binary');
                	}
                });
            }
    }
}