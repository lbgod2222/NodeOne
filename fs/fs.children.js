const fs = require('fs');
const assert = require('assert');

// 同步函数都返回 undefined

// fs.access(path, [mode], callback)  // 测试指定文件或目录的用户权限
// path: 指定文件或目录的用户权限
// mode: fs.constants.F_OK => 默认，可见程度，用于确认文件是否存在
//       fs.constants.R_OK => 可读取
//       fs.constants.W_OK => 可写入
//       fs.constants.X_OK => 可执行 对window无用
// 检测是否可以被进程读取和写入
fs.access('./temp/heyo', fs.constants.W_OK, (err) => {
  // err 可能返回可能不能返回 // heyo是显示不能写入的
  console.log(err ? 'no access!' : 'can read/write');
//   console.log(err);
});
// 不推荐在读写操作前调用，因很有可能在这之间文件属性发生变化

// fs.accessSync(path, [mode]) // 测试同步版本， 访问失败即报错

// fs.appendFile(file, data, ...options,callback) 异步追加一个数据到文件，如果没有就创建 options => encoding 如果file被指定为file，则不会自动关闭
// fs.appendFile('./temp/heyo', 'data to append', (err) => {
//     // 可写入heyo
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });
// fs.appendFileSync(file, data, ...options) 写入同步版本 返回undefined

// Linux 内置重制？ 
// fs.chmod(path, mode, callback)
// fs.chmodSync(path, mode)
// fs.chown(path, uid, gid, callback)
// fs.chownSync(path, uid, gid)
// fs.close(fd, callback)
// fs.closeSync(fd)
// fs.fchmod(fd, mode, callback)
// fs.fchmodSync(fd, mode)
// fs.fchown(fd, uid, gid, callback)
// fs.fchownSync(fd, uid, gid)
// fs.fdatasync(fd, callback)
// fs.fdatasyncSync(fd)
// fs.fstat(fd, callback) // => return (err, stats) fs.Stats对象
// fs.fstatSync(fd) // => return fs.stats实例
// fs.fsync(fd, callback)
// fs.fsyncSync(fd)

// fs.constants  // 返回一个包含文件系统操作的常量的对象

// fs.copyFile(src, dest, ...flags, callback) // 复制文件到目标地址
fs.copyFile('./temp2/heyo2', './temp/heyo_come_from_temp2', (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Copied successed!');
    }
});
// fs.copyFileSync(src, dest, ...flags) 拷贝同步版本

// fs.createReadStream(path, ...options) // 返回一个新建的ReadStream对象，可读流
// options examples: {
//     flags: 'r',
//     start: 0,
//     end: 10,
//     encoding: null,
//     fd: null,
//     mode: 0o666,
//     autoClose: true
// }
// const streadr = fs.createReadStream('./temp/heyo', {start: 0, end: 9});
// console.log(streadr);

//fs.createWriteStream(path, ...options) // 返回一个新建的WriteStream对象，可写流
// options example: {
//     flags: 'w',    => 如果是修改部分而不是覆写用r+
//     encoding: 'utf8',
//     fd: null,
//     mode: 0o666,
//     autoClose: true,
// }
// const streadw = fs.createWriteStream('./temp/heyo', {flags:'r+', start: 0, end: 9});
// console.log(streadw);


// fs.existsSync(path) //返回布尔， 文件是否存在， 应用access代替

// fs.ftruncate(fd,...len, callback)  // truncate(缩短) 缩减文件内容长度，len默认为0，指全删
// 删除heyo内容
  console.log(fs.readFile('./temp/heyo', 'utf8'));
  // 获得对象文件的文件描述符
  const fd = fs.openSync('./temp/heyo', 'r+');
  // 从第三个字符截断文件
  fs.ftruncate(fd, 3, (err) => {
      assert.ifError(err);
      console.log(fs.readFile('./temp/heyo', 'utf8'));
  });

