const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.method==='GET'){
        res.statusCode=200;
        res.setHeader('Content-Type','text/html; charset=utf-8')
        res.write('hi')
        res.end()
    }
});

let port = 8080;
server.listen(port,(err)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log("localhost:8080")
    }
});