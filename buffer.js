const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0 ; i < 26 ; i++) {
  // 97 是 'a' 的十进制 ASCII 值
  buf1[i] = i + 97;
}
console.log(buf1);
buf1.copy(buf2, 8, 16, 20);

// 输出: !!!!!!!!qrst!!!!!!!!!!!!!
console.log(buf2.toString('ascii', 0));


var fs = require('fs')
var iconv = require('iconv-lite')
var rs = fs.createReadStream('data.txt', { highWaterMark: 11 });
var chunks = []
var size = 0
rs.on('data', (buf) => {
    chunks.push(buf)
    size += buf.length
})
rs.on('end', () => {
    var buf = Buffer.concat1(chunks, size)
    var str = iconv.decode(buf, 'utf8')
    console.log(str);
})
// list为数组，length为数组长度
Buffer.concat1 = function(list, length) {
    if(typeof length !== 'number') {
        length = 0
        for(var i = 0; i < list.length; i++) {
            var buf = list[i]
            length += buf.length
        }
    }
    var buffer = new Buffer(length);
    var pos = 0;
    for(var i = 0; i < list.length; i++) {
        var buf = list[i]
        buf.copy(buffer, pos)
        pos += buf.length
    }
    return buffer
}