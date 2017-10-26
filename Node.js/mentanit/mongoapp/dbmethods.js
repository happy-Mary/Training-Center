var mongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/usersdb";
let users = [{name: "Bob", age: 34} , {name: "Alice", age: 21}, {name: "Tom", age: 45}];
let user = {name: "Mary", age: 25};

mongoClient.connect(url, function(err, db) {
    if(err) {return console.log(err);}

    console.log("Connected correctly to server");

    let col = db.collection('users');
    
    col.insertOne(user, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('added one:');
            //  console.log(result);
             db.close();
        }
    });

    col.insertMany(users, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('added many:');
            //  console.log(result);
             db.close();
        }
    });

    col.find().toArray(function(err, results) {
        console.log('USERS in DB: ')
        console.log(results);
        db.close();
    });

    col.find({name: "Tom", age: 23}).toArray(function(err, results) {
        console.log('The users Tom 23 are: ');
        // console.log(results);
        db.close();
    });

    col.findOne(function(err, doc) {  
        console.log('Find one, first: ');
        console.log(doc);
        db.close();
    });

    col.findOne({name: "Bob"}, function(err, doc){
        console.log('Find custom one Bob: ');
        console.log(doc);
        db.close();
    });

    col.deleteMany({name: 'Tom'}, function(err, result) {
        console.log('deleting many: ');
        // console.log(result);
        db.close();
    });

    col.deleteOne({name: "Bob"}, function(err, result) {
        console.log('deleting one: ');
        // console.log(result);
        db.close();
    });

    col.findOneAndDelete({age: 21}, function(err, result) {
        console.log('delete one and return it: ');
        // console.log(result);
        db.close();
    });


    col.findOneAndUpdate(
        {age: 21}, // критерий выборки
        { $set: {age: 25}}, // параметр обновления
        function(err, result){
             
            console.log(result);
            db.close();
    });

    col.updateMany(
        {name: "Sam"},              // критерий фильтрации
        { $set: {name: "Bob"}},     // параметр обновления
        function(err, result) {         
            console.log(result);
            db.close();
    });

    col.updateOne(
        {name: "Tom"}, 
        { $set: {name: "Tom Junior", age:33}},
        function(err, result) {
            console.log(result);
            db.close();
    });

    col.drop(function(err, result) {
        console.log('clear database: ');
        console.log(result);
        db.close();
    });
});
