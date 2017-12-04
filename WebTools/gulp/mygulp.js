var fs = require('fs');

module.exports = {
    src: function(filesrc) {
        return fs.createReadStream(filesrc[0]);
    },
    
    dest: function(foldername) {
        return fs.createWriteStream(foldername + '/build.txt');
    }
}