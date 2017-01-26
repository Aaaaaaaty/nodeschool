var trumpet = require('trumpet');
var fs = require('fs');
var through = require('through2')
var tr = trumpet();
fs.createReadStream('input.html').pipe(tr);
var stream = tr.select('.col').createStream();
stream.pipe(through(function(buf, _, next){
	this.push(buf.toString().toUpperCase())
	next()
})).pipe(stream)
process.stdin.pipe(stream).pipe(process.stdout)


// trumpet可做css选择器