var express = require("express");
var app = express();


//405
app.post('/', function(req, res) {
    send405response(res);
});

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.sendfile('SPA.html');
 });

//404, this app.get always at the end!
app.get('*', function(req, res){
  send404response(res);
});


var port = 8080;
app.listen(port, function() {
   console.log("Listening on " + port);
});

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

/* pozabla na seznam, ni treba da ti da stran, ampak bi ti moglo dat seznam datotek, imas na server.js imas seznam na console.log,
+ ce zahtevas datoteko ti more dat kodo, kar pa dela*/