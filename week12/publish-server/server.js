const http = require('http')
//const fs = require('fs')
const unzipper = require('unzipper')

http.createServer(function(req, res) {
    console.log(req.headers)
    //let outFile = fs.createWriteStream('../server/public/sample.zip')
    //req.pipe(outFile)

    req.pipe(unzipper.Extract({path: '../server/public/'}))

    /*
     * 用pipe以后，不再用事件。
    req.on('data', chunk => {
        outFile.write(chunk)
    })
    req.on('end', () => {
        outFile.end()
        res.write('success')
    })
    */
}).listen(8082)
