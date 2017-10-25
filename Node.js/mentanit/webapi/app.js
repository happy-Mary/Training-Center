const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/public'));

app.get('/api/users', function(req, res) {
    const content = fs.readFileSync('users.json', 'utf8');
    const users = JSON.parse(content);
    res.send(users);
});

// 1. getting one user by id
app.get('/api/users/:id', function(req, res) {
    // getting id
    const id = req.params.id;
    const content = fs.readFileSync('users.json', 'utf8');
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(let i=0; i<users.length; i++) {
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // sending user
    if(user) {
        res.send(user);
    } else {
        res.status(400).send();
    }
});

// 2. get posted data
app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body)  return res.sendStatus(400);

    let nameUser = req.body.name;
    let ageUser = req.body.age;
    let user = {name: req.body.name, age: req.body.age};

    let data = fs.readFileSync('users.json', 'utf8');
    let users = JSON.parse(data);
    
    const id = Math.max.apply(Math, users.map(function(o){return o.id;}));
    user.id = id + 1;
    users.push(user);
    data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    res.send(user);
});

// deleting user by id
app.delete("/api/users/:id", function(req, res) {
    const id = req.params.id;
    let data = fs.readFileSync("users.json", "utf8");
    let users = JSON.parse(data);
    let index = -1;
    // finding index in array
    for(let i=0; i<users.length; i+=1) {
        if(users[i].id == id) {
            index = i;
            break;
        }
    }
    if(index > -1) {
        // deleting user
        const user = users.splice(index, 1)[0];
        let data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

// changing user
app.put("/api/users", jsonParser, function(req, res) {
    
  if(!req.body) return res.sendStatus(400);
   
  let userId = req.body.id;
  let userName = req.body.name;
  let userAge = req.body.age;
   
  let data = fs.readFileSync("users.json", "utf8");
  let users = JSON.parse(data);
  let user;
  for(let i = 0; i<users.length; i+=1) {
      if(users[i].id == userId) {
          user = users[i];
          break;
      }
  }
  // changing user data
  if(user) {
      user.age = userAge;
      user.name = userName;
      let data = JSON.stringify(users);
      fs.writeFileSync("users.json", data);
      res.send(user);
  }
  else {
      res.status(404).send(user);
  }
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});


