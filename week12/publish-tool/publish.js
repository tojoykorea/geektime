const http = require('http')
const fs = require('fs')
const archiver = require('archiver')

let request = http.request({
    hostname: '127.0.0.1',
    port: '8082',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
}, response => {
    console.log(response)
})

const archive = archiver('zip', {
    zlib: { level: 9 }
})
archive.directory('./sample', false)
archive.finalize()
archive.pipe(request)

/*
 * 单个文件上传的代码。
let file = fs.createReadStream('./sample.html')
file.pipe(request)
file.on('end', () => {
    request.end()
})
*/
/*
 * 使用pipe后，就不再需要下面的事件代码了。
file.on('data', chunk => {
    console.log(chunk.toString())
    request.write(chunk)
})
file.on('end', chunk => {
    console.log('read finished.')
    request.end(chunk)
})
*/
