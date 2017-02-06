var http = require('https')

// var server = http.createServer(function(req, res) {
// 	res.end("{'abfcuoiawbsou':'123321'}")
// })

// server.listen(3131)

http.get('www.baidu.com', function(res) {
	console.log(res);
})