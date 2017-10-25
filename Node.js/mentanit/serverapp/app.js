const fs = require('fs');
const http = require('http');

http.createServer(function(request, response) {
    console.log(`Запрошенный адрес: ${request.url}`);

    if (request.url.startsWith("/public/")) {
       // получаем путь после слеша
       var filePath = request.url.substr(1);
       console.log(filePath);
       fs.readFile(filePath, 'utf8', function(error, data){
                
           if (error) {       
               response.statusCode = 404;
               response.end("Ресурс не найден!");
           }   
           else {
                const message = "Изучаем Node.js"; 
                const header = "Главная страница";
                data = data.replace("{header}", header).replace("{message}", message);
                response.end(data);
           }
           return;
       })
    //    loading file
    } else if(request.url=="/some.doc"){
        response.writeHead(200, {"Content-Type" : "application/msword"})
        fs.createReadStream("some.doc").pipe(response);
    }
    else {
       // во всех остальных случаях отправляем строку hello world!
       response.end("Hello World!");
    }
}).listen(3000);