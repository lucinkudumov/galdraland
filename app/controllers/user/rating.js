var validator = require('validator');

module.exports = function (opts) {
    var userModel = opts.models.User,
		ratingModel = opts.models.Rating;
        
    return {
        "get#getRating" : function (req, res) {
			var id = req.body.id;
            ratingModel.findById({_id: id}, function (err, rating) {
               if (err) {
                   console.log(err);
                   return res.json({ success : false });
               } else if (rating) {
                   return res.json({ success : true, rating : rating });
               } else {
                   return res.json({ success : false });
               }
            });
        },
		"post#getRatingByRefId" : function (req, res) {
			var id = req.body.id;
			var user_id = req.user._id;
			var from_user = req.body.fromMe;
			var query;
			
			if( from_user ) query = ratingModel.find({refId: id, from: user_id});
			else  query = ratingModel.find({refId: id});
			
            query.exec(function (err, ratings) {
               if (err) {
                   console.log(err);
                   return res.json({ success : false });
               } else if (ratings) {
                   return res.json({ success : true, ratings : ratings });
               } else {
                   return res.json({ success : false });
               }
            });
        },
		
        
        "post#insertRating" : function (req, res) {
            var ref_id = req.body.ref_id;
			var from = req.user._id;
			var ratingVal = req.body.rating;          
			var rating = new ratingModel;
			
			rating.refId = ref_id;
			rating.from = from;
			rating.rating = ratingVal;
			
			rating.save(function (err, r) {
			   if (err) {
				   console.log(err);
				   return res.json({ success : false });
			   } else {
				   return res.json({ success : true });
			   }
			});
        },
		
		
		"post#updateRating" : function (req, res) {
			var id = req.body.id;
			var ratingVal = req.body.rating;          
			var rating = new ratingModel;
			
			ratingModel.findOneAndUpdate({_id : id}, {rating : ratingVal}, function(err, rating){
				if(err){
					return res.json({ success: false });
				} else if( rating ){
					return res.json({ success: true, rating : rating });
				} else {
					return res.json({ success: false });
				}
			});
        },
       
    }
}
