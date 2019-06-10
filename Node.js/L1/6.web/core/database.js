var firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "AIzaSyDYr3-NDUNTliOrF1zRrR1GfJFjnYUkjjU",
    authDomain: "vladimir-yurkevich.firebaseapp.com",
    databaseURL: "https://vladimir-yurkevich.firebaseio.com",
    projectId: "vladimir-yurkevich",
    storageBucket: "vladimir-yurkevich.appspot.com",
    messagingSenderId: "87323632171"
});

module.exports = firebase.database(app);