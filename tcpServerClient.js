const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('server connected');
  c.on('end', () => {
    console.log('server disconnected');
  });
  c.write('serverTcp\n');
  c.on('data', (data) => {
    console.log(data.toString() + 'client发送来');
  })
  // c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});


var client = net.connect({port: 8124}, function() {
    console.log('client connected');
    client.write('clientTcp123\n')
});

client.on('data', (data) => {
    console.log(data.toString() + 'server发送来');
    client.end()
})
client.on('end', () => {
    console.log('client disconnect');
})