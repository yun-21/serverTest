const http = require('http');
const fs = require('fs');
const path = require('path');

//파일 확장자에 따라 MIME 타입 설정
const mimeType = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".ico": "image/x-icon"
};

const fileUtils = {
  getFilePath: function(url){
    let filePath;
    if(url === "/"){
      filePath = "./public/b.html";
    }
    else{
      filePath = "./public" + url;
    }
    return filePath;
  },
  getFileExtension: function(filePath){
    let ext = path.extname(filePath);
    return ext.toLowerCase();
  },
  getContentType: function(ext){
    if(mimeType.hasOwnProperty(ext)){
      return mimeType[ext];
    }
    else{
      return "text/plain";
    }
  }
};

const server = http.createServer((request,response)=>{
  console.log("URL 요청 데이터:", request.url);
  
  //파일 경로 설정
  let filePath = fileUtils.getFilePath(request.url);
  //확장자 가져오기
  let ext = fileUtils.getFileExtension(filePath);
  //컨텐츠 타입 가져오기
  let contentType = fileUtils.getContentType(ext);

  fs.readFile(filePath, (err,data)=>{
    if(err){
      if(err.code === "ENOENT"){
        response.writeHead(404, {"Content-Type":"text/html"});
        response.end("페이지를 찾을 수 없습니다.");
      }
      else{
        response.writeHead(500);
        response.end(`서버 오류: ${err.code}`);
      }
    }
    else{
      response.writeHead(200, {"Content-Type": contentType});
      response.end(data);
    }
  });
});

server.listen(8080, (err)=>{
  if(err){
    console.log("서버 안됨:", err);
  }
  else{
    console.log("서버 켜짐");
    console.log(`http://localhost:8080`);
  }
})