process.on('message', function(e) {
	console.log('Childprocess', e);
})
process.send({foo: 'bar'})