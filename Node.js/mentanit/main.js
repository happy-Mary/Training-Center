let http = require("http");
let os = require("os");
let greetier = require("./greeting");
let User = require("./user.js");

let eugene = new User("Eugene", 32);
eugene.sayHi();

http.createServer(function(request,response){
    response.end("Hello NodeJS!");
     
}).listen(3000,function() {
    console.log("Сервер начал прослушивание запросов на порту 3000");
});

let userName = os.userInfo().username;

console.log(`Time of request ${greetier.date}`);
console.log(`Message: ${greetier.greet(userName)}`);




