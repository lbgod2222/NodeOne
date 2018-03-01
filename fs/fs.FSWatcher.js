// fs.FSWatcher 类别
// fs.watch() 返回的是该类
// fs.watch() 的 listener 回调会接受返回FSWatcher的change事件
const fs = require('fs');

// change
// 处理fs.watch监视器

// fs.watch('./temp', {encoding: 'buffer'}, (eventType, filename) => {
//     if (eventType == 'rename') {
//         console.log('something IS HAPPENING');
//         // 这时删除'./temp/heyo' 会出console信息
//     }
//     // if (filename) {
//     //     console.log(filename)
//     // }
// })


// fs.ReadStream 类别

// =》 event
// error //发生错误时触发
// open  //文件被打开时候

// -》 child content
// readStream.bytesRead // 已读取的字节数
// readStream.path // 读取流正在读取的文件路径 （string | Buffer）

// fs.Stats 类别 fs.stat().lstat().fstat() 返回的都是此类

// .isFile() / .isDirectory() / .isBlockDevice() / .isCharacterDevice() / isSymbolicLink() / isFIFO() / isSocket()
// atime > 访问时间 / mtime > 修改时间 / ctime > 变化时间 / birthtime > 创建时间 / 


// fs.WriteStream 类别

// =》 event
// close //
// open //

// =》 child content
// writeStream.bytesWritten // 已写入的字节数
// writeStream.path // 流正在写入的路径

