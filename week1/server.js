const http = require('http');

// http的方法createServer启动一个后台服务
http.createServer((req, res) => {
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', chunk => {
    // body.push(chunk.tostring());
    body.push(chunk);
  }).on('end', () => {
    // Buffer是处理二进制数据的缓冲区
    body = Buffer.concat(body).toString();
    console.log("body:", body);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World\n');
  });
}).listen(8088);
console.log("server started");