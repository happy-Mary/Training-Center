var fs = require('fs');
var Stream = require('stream');

var extension = '';

module.exports = {
    src: function(filesrc) {
        extension = filesrc[0].split('.')[filesrc.length - 1];

        var t = fs.createReadStream(filesrc[0]);
        return t;

        // return t.on('data', (chunk) => {
        //     console.log(`Received ${chunk.length} bytes of data.`);
        // });
        
        // var liner = new Stream.Transform( { objectMode: true } )
        // liner.push(filesrc[0]); 
        // console.log(liner);
        // return liner;

        // var rs = new Stream.Readable({objectMode: false});
        // filesrc.forEach(item => rs.push(item));
        // rs.push(null);
        // console.log(rs);
        // return rs;

        
        // for(var i = 0; i < filesrc.length; i+=1) {
        //     var text = fs.readFileSync(filesrc[i],'utf8');
        //     rs.push(text);
        // }
        // rs.push(null);
        // return rs.pipe(process.stdout);
        // return rs;

    },
    
    dest: function(foldername) {
        return fs.createWriteStream(foldername + '/build.' + extension);
    }
}