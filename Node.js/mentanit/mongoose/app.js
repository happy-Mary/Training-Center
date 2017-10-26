const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// установка схемы
var userScheme = new Schema({
    name: String,
    age: Number
});
 
// подключение
mongoose.connect("mongodb://localhost:27017/usersdb");

let User = mongoose.model("User", userScheme);

let user = new User({
    name: "Bill",
    age: 41
});

user.save()
.then(function(doc){
    console.log("Сохранен объект", doc);
    mongoose.disconnect();  // отключение от базы данных
})
.catch(function (err){
    console.log(err);
    mongoose.disconnect();
});