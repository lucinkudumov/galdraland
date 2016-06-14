module.exports = function (opts) {
		var imageModel = opts.models.Image;
    return function (req, res, next) {
        //Image loading from DB.
           app.get('assets/images/upload/:id', function(req, res) {
                console.log(req);
                imageModel.findOne({name: req.id},function (err, image) {
                    if (err) return next(err);
                // var base64 = (doc[0].img.data.toString('base64'));
                //  res.send(base64);
                    res.writeHead('200', {'Content-Type': 'image/png'});
                    res.end(image.data.data, 'binary');
                });
            });
    }
}
