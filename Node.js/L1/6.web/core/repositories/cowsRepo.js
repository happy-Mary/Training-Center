var db = require('../database');

module.exports = {
    getCows: function () {
        return db.ref('cows').once('value');
    },
    addCow: function(cow) {
        return db.ref('cows').push(cow);
    }
};