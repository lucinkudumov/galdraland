//2, fix stuff to call each handler, for each property of obj
function stuff(obj, handlers, cb) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        var name = keys[i],
            value = obj[keys[i]];
	console.log(name, value);
        value = handlers[name](value);
	console.log("here");
        obj[name] = value;
	console.log(obj);
        cb(obj);
    }
}

var obj = {
    one: 1,
    two: 2,
    three: 3
};

var handlers = {
    one: function(num) { return num+1 },
    two: function(num) { return num+2 },
    three: function(num) { return num+3 },
}
 
//1, call stuff, passing the object
stuff(obj, handlers, function() {
    console.log('updated:', obj);
});
