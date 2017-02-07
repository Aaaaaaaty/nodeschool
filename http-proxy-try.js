// http代理实现思路
// 1.拦截客户端发起请求
// 2.拿到客户端请求进行对应修改
// 3.转发客户端请求
// 4.拿到服务端返回请求
// 5.返回修改后的服务端返回值

var http = require('http')
var through = require('through2')
var url = require('url')

var proxyServer = new http.Server()
var port = 3000
proxyServer.listen(port, () => {
	console.log('中间人监听成功，端口号:', port);
})

proxyServer.on('request', (req, res) => {
	let urlObj = url.parse(req.url)
	// console.log(urlObj);
	let type = req.headers['content-type']
	let options = {
		protocol: 'http:',
		method: req.method,
		hostname: req.headers.host.split(':')[0],
		port: req.headers.host.split(':')[1] || 80,
		path: urlObj.path,
		headers: req.headers
	}
	console.log(`请求方式：${options.method}，请求地址：${options.hostname}:${options.port}${options.path}`);
	// console.log(options);
	var realReq = http.request(options, (realRes) => {
		// 这里出现会出现编码问题，返回utf8，但页面编码是grk
		// 设置客户端响应的http头部
        Object.keys(realRes.headers).forEach(function(key) {
            res.setHeader(key, realRes.headers[key]);
        });
        // res.setHeader('content-type','text/html; charset=gb2312')
        // 设置客户端响应状态码
        res.writeHead(realRes.statusCode);

		if(/html/i.test(realRes.headers['content-type'])) {
			realRes.pipe(through(function(chunk, enc, callback) {
				let script = '<script>alert("what are u looking")</script>'
				chunk = chunk.toString().replace(/<\/head>/ig, (match) => {
					return script + match
				})
				this.push(chunk)
				callback()
			})).pipe(res)
		} else {
			realRes.pipe(res)
		}
	})
	// realReq返回正在处理的请求，将请求写入req
	req.pipe(realReq)

	realReq.on('error', (e) => {
		console.log(e)
	})
	// realReq.end()
})