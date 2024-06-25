const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const server = http.createServer((req,res)=>{
    if(req.method==='GET'&&req.url==='/'){
        const test = fs.readFileSync('./public/indexTest.html','utf-8')
        res.statusCode=200;
        res.setHeader('Content-Type','text/html; charset=utf-8')
        res.write(test)
        res.end()
    }
    else if(req.method==='POST'){
        if(req.url==='/test'){
            res.statusCode=200;
            res.setHeader('Content-Type','text/html; charset=utf-8')
            let body = "";
            req.on('data',(data)=>{
                body += data
            })
            req.end('end',()=>{
                const test = qs.parse(body)
                console.log(test)
            })
        }
    }
});

let port = 8080;
server.listen(port,(err)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log("http://localhost:8080")
    }
});