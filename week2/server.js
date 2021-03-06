const http = require("http");

const server = http.createServer((req, res) => {
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
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end(
    `<html maaa=a >
    <head>
      <style>
        body div #myid{
          width:100px;
          background-color:#ff5000;
        }
        body div img{
          width:30px;
          background-color:#ff1111;
        }
      </style>
    </head>
    <body>
      <div>
        <img id="myid"/>
        <img />
      </div>
    </body>
    </html>`);
  });
});
console.log("server started");
server.listen(8088);
