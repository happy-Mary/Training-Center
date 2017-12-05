var fs = require('fs');
var Readable = require('stream').Readable;

var extension = '';

module.exports = {
    src: function(filesrc) {
        extension = filesrc[0].split('.')[filesrc.length - 1];

        var rs = new Readable;
        for(var i = 0; i < filesrc.length; i+=1) {
            var text = fs.readFileSync(filesrc[i],'utf8');
            rs.push(text);
        }
        rs.push(null);
        return rs;
    },
    
    dest: function(foldername) {
        return fs.createWriteStream(foldername + '/build.' + extension);
    }
}