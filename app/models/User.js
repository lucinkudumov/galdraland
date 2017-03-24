var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        profileId: {
            type: String,
            required: true,
            unique: true
        },
        fullname: {
            type: String,
            required: true
        },
        links: {
            type: [{
                name: String,
                link : {
                    type: String,
                    reqired: true
                }
            }],
            required: true
        },
        likes: {
            type: [{
                like : {
                    type: String,
                    reqired: true
                }
            }]
        },
        dislikes: {
            type: [{
                dislike : {
                    type: String,
                    reqired: true
                }
            }]
        },
        skills: {
            type: [{
                skill : {
                    type: String,
                    reqired: true
                }
            }]
        },
        looks: {
            type: [{
                look : {
                    type: String,
                    reqired: true
                }
            }]
        },
        roles: {
            type: [{
                role : {
                    type: String,
                    reqired: true
                }
            }]
        },
        location: {
            type: String
        },
        username: {
            type: String
        },
        educations: {
            type: [mongoose.Schema.Types.Mixed]
        },
        email: {
            type: String
        },
        signin: {
            type: Date,
            required: true,
            "default": Date.now
        },
        photo : {
            type: String
        },
        skype : {
            type: String
        },
        experience : {
            type: String
        },
        goals : {
            type: String
        },
		categories : {
			type: String
		},
		bio : {
			type: String
		},
        interests: {
            type: [{
                topic : {
                    type: mongoose.Schema.ObjectId,
					ref: 'Topic',
                    required: true
                },
                information : {
                    type: String
                }
            }]
        },
        slackUser : {
            type: String
        },
        slackToken : {
            type: String
        },
        homeview: {
            type: Boolean,
            "default": true
        }
    });
    
    return Schema;
}