const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const app = express();
// устанавливаем путь к каталогу с частичными представлениями
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getTime", function(){
   let myDate = new Date();
   let hour = myDate.getHours();
   let minute = myDate.getMinutes();
   let second = myDate.getSeconds();
   if (minute < 10) {
       minute = "0" + minute;
   }
   if (second < 10) {
       second = "0" + second;
   }
   return `Current time: ${hour}:${minute}:${second} \n Today: ${myDate.toLocaleDateString()}`;
});

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
    response.render("home.hbs");
});
// app.post("/register", urlencodedParser, function(request, response){
//     if(!request.body) return response.sendStatus(400);
//     console.log(request.body);
//     response.send(`${request.body.userName} - ${request.body.userAge}`);
// });
app.get('/contact', function(request, response) {
    response.render("contact.hbs", {
        title: "Мои контакты",
        emailsVisible: true,
        emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        phone: "+1234567890"
    });
});
app.post('/user', jsonParser, function(request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.json(`${request.body.userName.toUpperCase()} - ${request.body.userAge}`);
});
app.listen(3000);