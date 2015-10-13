var passport = require("passport"),
    FacebookStrategy = require('passport-facebook').Strategy,
    request = require('request'),
    hat = require('hat'),
    fs   = require('fs'),
    utils = require('./utils'),
    path = require('path'),
    cloudinary = require('cloudinary');
    
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

module.exports.facebook = function (opts, cb) {
    var userModel = opts.models.User;
    var emailModel = opts.models.Email;

	if (process.env.HEROKU) {
        var clientID ="110469289012320",
            clientSecret = "1409e3c1451756d7c2ce7be7e78a20ea",
            callback = "https://galdraland-1-0.herokuapp.com/api/callback/facebook";
    } else {
		var clientID ="1406306389669359",
            clientSecret = "fa79806ce48dd6051d257b2679d566d7",
            callback = "http://galdraland.com:9010/api/callback/facebook";
    }
/*
	var clientID ="1496374667309040",
            clientSecret = "e49ac222948c70b2afdede016dbacb22",
            callback = "https://galdraland-1-0.herokuapp.com/api/callback/facebook";
*/
    passport.use(new FacebookStrategy({
        clientID: clientID, // need change to real id (this is test clientID)
        clientSecret: clientSecret, // need change to real secret (this is test secretKey)
        callbackURL: callback // need change to real local or remote domain
      }, function(accessToken, refreshToken, profile, done) {
          var profileJSON = profile._json;
		  console.log(profileJSON);
          userModel.findOne({ profileId : profileJSON.id }, function (err, user) {
              if (err) {
                  console.log(err);
                  return done(err);
              } else if (user) {
                  return done(null, user);
              } else {
                  var u = new userModel();
                  
                  u.profileId = profileJSON.id;
                  u.fullname = profileJSON.first_name + " " + profileJSON.last_name;
                  u.links     = [];
                  u.links.push({ link : profileJSON.link, name : profile.provider });
                  
                  if (profileJSON.location) {
                    u.location  = profileJSON.location.name;
                  }
                  
                  if (profileJSON.education && profileJSON.education.length > 0) {
                      for (var i = 0; i < profileJSON.education.length; i++) {
                          u.educations.push(profileJSON.education[i]);
                      }
                  }
                  
                  if (profileJSON.username) {
                      u.username = profileJSON.username;
                  }

                  var saveToUser = function (url) {
                      u.photo = url;

                      u.save(function (err, user) {
                          if (err) {
                              console.log(err);
                              return done(err);
                          } else {
                              var email = new emailModel();
                              email.userId = user._id;
                              email.email = profileJSON.email;

                              email.save(function (err, email) {
                                  if (err) {
                                      console.log(err);
                                      return done(err);
                                  } else {
                                      return done(null, user);
                                  }
                              });
                          }
                      });
                  }

				  console.log("came here");

                  if (process.env.HEROKU) {
                      cloudinary.uploader.upload("http://graph.facebook.com/" + u.profileId + "/picture?type=large", function (r) {
                          saveToUser(r.url);
                      });
                  } else {
                      var fileName = hat() + ".jpg";
                      // save image
                      utils.downloadFileFromUrl("http://graph.facebook.com/" + u.profileId + "/picture?type=large", path.join(__dirname, "public", "users", fileName), function (err) {
                          if (err) {
                              console.log(err);
                              return done(err);
                          } else {
                              saveToUser("/users/" + fileName);
                          }
                      });
                  }


/*
					cloudinary.uploader.upload("http://graph.facebook.com/" + u.profileId + "/picture?type=large", function (r) {
                         saveToUser(r.url);
                     });*/

              }
          }); 
    }));
    
    if (cb) {
        cb(null);
    }
}