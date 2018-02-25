// Buffer 为全局变量，无需require，缓存

ArrayBuffer.allocUnsafe(size)
ArrayBuffer.allocUnsafeSlow(size)
// 两者并不安全，内存总量固定，这两者从总量中分出未初始化的内存，可能会导致上次信息泄露，但是性能佳

// Buffer.from(array/arrayBuffer/buffer/string, ...arrayBuffer:byteOffset/...string:encoding, ...arrayBuffer:length)
// 编码 encoding ascii/utf8/utf16le/usc2/base64/latin1/binary/hex
const buf = Buffer.from('hello world', 'ascii');
// 输出 68656c6c6f20776f726c64
console.log(buf.toString('hex'));
// 输出 aGVsbG8gd29ybGQ=
console.log(buf.toString('base64'));
//输出 hellow world
console.log(buf.toString('utf8'));


// 可使用迭代器 ES6
const buf = Buffer.from([1,2,3]);
for (const b of buf) {
    console.log(b);
} // 1 , 2 , 3      .values() .keys() entries()

// Buffer.alloc(size, ...fill, ...encoding) 默认用0填充
const buf = Buffer.alloc(5);

// Buffer.byteLength(str, ...encoding)
Buffer.byteLength('love', 'utf8') // 计算arg1的字节长度，String.length返回的是字符数

// Buffer.compare(buf1,buf2) return int
const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];
console.log(arr.sort(Buffer.compare)); // [buf2, buf2]

// Buffer.concat(list, ...length)
const buffTotal = Buffer.concat([buf1,buf2,buf3]) // 返回一个合并后的新BUFFER

// Buffer.from(arrayBuffer, ...byteOffset, ...length)  引用的与arrayBuffer同一内存
const arr = new Uint16Array(2)
arr[0] = 5000;
arr[1] = 6000;
const buf = Buffer.from(arr.buffer);
// Buffer.isBuffer(obj)
Buffer.isBuffer(obj) // return true/ false

// Buffer.isEncoding(encoding)
Buffer.isEncoding(encoding) // return true /false 

// Buffer.poolSize
Buffer.poolSize // 8192 in deafault, 实例池大小的字节数，可修改

// 以下方法皆为非类方法，是实例方法（const buf = Buffer.from(blabla)）
//buf.compare
buf.compare(targetBuf, ...targetStart,targetEnd,sourceStart,sourceEnd)

// buf.copy
buf.copy(target,...targetStart,sourceStart,sourceEnd) // 复制到target

// buf.entries()
buf.entries() // return [index, key] 的迭代器（iterator）

// buf.equals(otherBuffer)
buf1.equals(buf2) // return true / false

// buf.fill(value, ...offset,...end,...encoding)
buf.fill(0) // 用0填充

// buf.includes(value, ...byteOffset, encoding)
buf.includes('str') // str被找到返回true，否则false

// buf.indexOf(value,...byteOffset,...encoding)
// 毋庸细谈

// buf.keys() / buf.values()
// return 键名的迭代器

// buf.lastIndexOf(value)
// same staff, 从后向前搜索

// buf.length()
// return buf长度

// buf.slice(start, ...end)
buf.slice() // 0,buf.length in default

// buf.toJSON()
// RETURN buf 的JSON格式，
const strBuf = JSON.stringify(buf); // 此时JSON.stringify会隐式的调用该方法

// buf.toString(encoding,...start,...end)
buf.toString('utf8',0,6); //return 0-6的编码后string

// buf.write(str, ...offset, ...length, ...encoding)
// return 写入的字节数