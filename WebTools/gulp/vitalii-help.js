var actualDataReader = require('./actualDataReader');
var Transform = require('readable-stream').Transform;
var util = require('util');
 
var TransformStream = function(options) {
  if (!(this instanceof Transform)) {
    return new TransformStream(options);
  }

  if (!options) options = {
  	objectMode : true, 
  	highWaterMark : 128 * 1024,
  };
  
  Transform.call(this, options);
};

util.inherits(TransformStream, Transform);

TransformStream.prototype._transform = function(chunk, encoding, callback) {
  	var data = JSON.parse(chunk);
  	var result = [];
  	data.ListData.Row.forEach(function(elem) {
  		var newElem = {
			href: actualDataReader.getHref(elem),
			id: actualDataReader.getId(elem)
		};
		result.push(newElem);
  	});
  	this.push(JSON.stringify(result, null , 4));
	callback();
};
 
module.exports = TransformStream;