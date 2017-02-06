var http = require('http')

var server = http.createServer((req, res) => {
    res.end('acca')
})

server.listen(3000)