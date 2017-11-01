const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/usersdb";
 
app.use(express.static(__dirname + "/public"));

// getting data
app.get("/api/users", function(req, res) {
    
  mongoClient.connect(url, function(err, db) {
      db.collection("users").find({}).toArray(function(err, users){
          res.send(users)
          db.close();
      });
  });
});

// get user by id
app.get("/api/users/:id", function(req, res){
    const id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, db) {
      db.collection("users").findOne({_id: id}, function(err, user){
           
          if(err) return res.status(400).send();
           
          res.send(user);
          db.close();
      });
  });
});

// creating one user
app.post("/api/users", jsonParser, function (req, res) {
   
  if(!req.body) return res.sendStatus(400);
   
  const userName = req.body.name;
  const userAge = req.body.age;
  const user = {name: userName, age: userAge};
   
  mongoClient.connect(url, function(err, db){
      db.collection("users").insertOne(user, function(err, result){
           
          if(err) return res.status(400).send();
           
          res.send(user);
          db.close();
      });
  });
});

// delete one user
app.delete("/api/users/:id", function(req, res){
    
  const id = new objectId(req.params.id);
  mongoClient.connect(url, function(err, db){
      db.collection("users").findOneAndDelete({_id: id}, function(err, result){
           
          if(err) return res.status(400).send();
           
          var user = result.value;
          res.send(user);
          db.close();
      });
  });
});

// change user data
app.put("/api/users", jsonParser, function(req, res){
    
    if(!req.body) return res.sendStatus(400);

    const id = new objectId(req.body.id);
    const userName = req.body.name;
    const userAge = req.body.age;
   
    mongoClient.connect(url, function(err, db) {
      db.collection("users").findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
           {returnOriginal: false },function(err, result){
           
          if(err) return res.status(400).send();
           
          var user = result.value;
          res.send(user);
          db.close();
      });
  });
});

app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});