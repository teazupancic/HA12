var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var express = require('express');
var app = express();

var pathname;




//404 response
function send404response(response){
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("Error 404: Page not found!");
    response.end();
}
//405 response
function send405response(response){
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("Error 405: Method not allowed!");
    response.end();
}

function onRequest (request, response) {
    //console.log(request.url);
    //pathname = (url.parse(request.url).pathname); 
    //if (fs.existsSync(pathname) ){
        if (request.method != 'GET'){
            send405response(response);
        }
        
        if (request.url == '/'){
            response.writeHead(200, {"Content-Type":"text/html"});
            fs.createReadStream("./SPA.html").pipe(response);
            
            //console.log("\nFiles in that folder are:");
            fs.readdir("../nodejsServer/", (err, files) => {
              files.forEach(file => {
                //console.log(file);
                
              });
            });
        }
       
        
        
        else  {
            //console.log(request.url);
            pathname = url.parse(request.url).pathname; 
            //console.log('pred fs...');
            //var splits = pathname.split('/');
            //console.log(splits);
            var extension = path.extname(pathname);
            //console.log(extension);
            var conType;
            if (extension == '.css'){
                response.writeHead(200, {"Content-Type":"text/css"});
                //conType = "text/css";
            }
            if (extension == '.js'){
                response.writeHead(200, {"Content-Type":"text/javascript"});
                //conType = "text/javascript";
            }
            if (extension == '.jpg'){
                response.writeHead(200, {"Content-Type":"image/jpg"});
                //conType = "image/jpg";
            }
            else {
                response.writeHead(200,{"Content-Type":"text/plain"});
                //conType ="text/html";
            }
            
            try{
            //response.writeHead(200,{"Content-Type":conType});
            
            fs.createReadStream(pathname.substring(1)).pipe(response);
            
            }
            catch(err){
                console.log("faking shit");
            }
            response.end();
            
        }
        /*var filename = path.join(process.cwd(), uri);
        path.exists(filename, function(exists) {
            if(!exists) {
                send404response();
            }
        });*/
        
    /*}
    else {
        send404response(response);
    }*/


    
}


http.createServer(onRequest).listen(8080);
console.log("The server is now running");
