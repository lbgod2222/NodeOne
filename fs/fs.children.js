const fs = require('fs');
const assert = require('assert');
const os = require('os');

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
// fs.link(existingPath, newPath, callback)
// fs.linkSync(existingPath, newPath)
// fs.mkdir(PATH, ...mode, callback)
// fs.mkdirSync(PATH, ...mode)


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
//   console.log(fs.readFile('./temp/heyo', 'utf8'));
  // 获得对象文件的文件描述符
//   const fd = fs.openSync('./temp/heyo', 'r+');
  // 从第三个字符截断文件
//   fs.ftruncate(fd, 3, (err) => {
//       assert.ifError(err);
//       console.log(fs.readFile('./temp/heyo', 'utf8'));
//   });
// fs.ftruncateSync(fd, ...len) // 缩短文件  同步版本

// fs.futimes(fd, atime, mtime, callback) // 改变文件描述符指向对象的文件系统时间戳 =》 fs.utimes()
// fs.futimesSync(fd,atime,mtime) // futimes 的同步版本


// fs.mkdtemp(prefix, ...options, callback) //options: encoding 创建一个唯一的临时目录，生成六位随机字符在prefix后，路径传回到cb的第二个参数, 如果prefix未以路径开头创建目录在当前的路径的同级
// 同级设置临时文件夹
// fs.mkdtemp('tempFolder', (err, folder) => {
//     if (!err) {
//       console.log(folder);
//     } else {
//       console.log('Something wrong');
//     }
// })
// 指定路径
const temDir_mkdtemp = os.tmpdir(); // 指向系统临时文件区域
const { sep } = require('path');
console.log(sep, '---','this is sep');  // 返回 '\'  直接替换未 \ 也可以
fs.mkdtemp(`${temDir_mkdtemp}${sep}`, (err, folder) => {
    if (!err) {
        console.log(folder);
      } else {
        console.log('Something wrong');
      }
})
// fs.mkdtempSync(prefix, ...options) // 临时文件夹创造同步版


// fs.open(path, flags, ...model, callback(err, fd)) // 返回文件操作符 fs.writeFile()\fs.readFile() 基于fs.open
// flag: 
// 'r' -> 读取模式
// 'r+' -> 读写模式
// 'rs+' -> 同步读写模式 // 跳过本地缓存 有性能负面影响
// 'w' -> 写入模式如果没有就创建
// 'wx' -> 写入模式如果没有就创建 与path不能共存
// 'w+' -> 读写模式，不存在就创建
// 'wx+' -> 读写模式，不存在就创建 与path不能共存
// 'a' -> 追随模式如果没有就创建
// 'ax' -> 追随模式如果没有就创建 与path不能共存
// 'a+' -> 读取和追随模式如果没有就创建 // 在linux中位置参数会被忽略，因此会加入的文件末尾
// 'ax+' -> 读取和追随模式如果没有就创建 与path不能共存
fs.open('./temp/heyo', 'r', (err, fd) => {
    if (err) {
        throw err;
    } else {
        let tempFile = Buffer.alloc(20); // from 空数组会显示内存不足
        console.log('look at your fd:',fd) //标识符是为int
        // fs.read(fd, buffer, offset,lenght,position,callback(err, bytesRead, buffer))
        fs.read(fd, tempFile, 1, 19, 0, (err, bytesRead, buffer) => (
            // 读取长度不得长于buffer长度
            console.log(buffer.toString('utf8'))
        ))
        // fs.readSync(fd, buffer, offset, length, position) // 返回bytesRead 的数量
    }
})
// fs.openSync(path, flags,...mode) // fs.open()的同步版本

// fs.readdir(path, ...options, callback(err, file))  // 读取目录内容，file是包含内容文件名的数组
fs.readdir('./temp', (err, file) => {
    if (err) {
        throw err;
    } else {
        console.log('file in temp folder: ', file) //file in temp folder:  [ 'heyo', 'heyo_come_from_temp2', 'innnerfolder' ]        
    }
})
// fs.readdirSync(path, ...options) 同步版


// fs.readFile(path, ...options, callback(err, data)) // 读取文件的全部内容, 返回(buffer)
fs.readFile('./temp/heyo','utf8', (err, data) => {
    if (err) {
        throw err;
    } else {
        console.log('----',data,'--- content from heyo')
    }
})
// fs.readFileSync(path, ...options) //同步版


// fs.readlink(path, ...options, callback)  // 不是很了解这个东西
fs.readlink('', 'utf8', (err, linkString) => {
    // if (err) {
    //     throw err;
    // } else {
        console.log(linkString, 'this is the linkstring');
    // }
})
// fs.readlinkSync(path, ...options)


// fs.realpath(path, ...options, callback) // 返回绝对路径
fs.realpath('./temp/heyo', (err, resolvedPath) => {
    if (err) {
        throw err;
    } else {
        console.log(resolvedPath, 'this is the resolvedPath')
    }
})
// fs.realpathSync(path, ...options) //同步版



// fs.rename(oldPath, newPath, callback) //修改路径名称
// fs.rename('./temp3', './temp2', (err) => {
//     throw err  //return null
// })
//fs.renamSync(去掉cb)


// fs.rmdir(path, callback) //删除一个非空文件夹
// fs.rmdir('./temp2/innerfolder', (err) => {
//     throw err
// })
// fs.rmdirSync(path) 同步版


// fs.stat(path, callback(err, stats)) // 查看文件的属性，返回stats对象
// fs.stat('./temp/heyo', (err, stats) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log(stats, '---这是个stats对象')
//     }
// })
// fs.statSync(path) //同步


// fs.symlink(target, path, ...type, callback(err)) //符号连接？
// fs.symlink(target,path, ...type)



// fs.truncate(path, ...len, callback(err)) // 缩减内容， f开头同名方法是针对当前文件编辑，需要传入文件标识符从头部开始缩减len长度
// fs.truncate(path, ...len) // 同步版本



// fs.unlink(path, callback(err)) // 删除文件(目录不能被删除)
// fs.unlink('./temp2/innerfolder/todo', (err) => {
//     if (err) {
//         throw err
//     }
// })
// fs.unlink(path) // 同步版


// fs.unwatchFile(filename, ...listeners) // 解除监视  如果指定了listener，则会针对特定监视器， 否则全部被清除
// fs.watch() 比 fs.watchFile() / fs.unwatchFile() 更高效



// fs.utimes(path, atime, mtime, callback(err)) // 改变对应文件的系统时间戳
// fs.stat('./temp/heyo', (err, stats) => {
//     if (err) {
//         throw err
//     } else {
//         console.log('before utime func works', stats)
//     }
// })
// fs.utimes('./temp/heyo', 111, 111, (err) => {
//     if (err) {
//         throw err
//     } else {
//         console.log('utime success')
//     }
// })
// fs.stat('./temp/heyo', (err, stats) => {
//     if (err) {
//         throw err
//     } else {
//         console.log('after utime func works', stats)
//     }
// })
// fs.utimesSync(path, atime, mtime) // 同步版本



// fs.watch(filename, ...options, ...listeners)
// fs.watch('./temp/heyo', {persistent: true, recursive: true, encoding: 'utf8'}, (eventType, filename) => {
//     if (eventType === 'rename') {    // rename 表达消失/出现
//         console.log('something happened!')
//     } else if (eventType === 'change') {   // change表达文件属性发生改变（stats: 上次查看时间？/更改/保存都会触发）
//         console.log('content changed!')
//     }
// })


// fs.watchFile(filename, ...options,...listener(current, preve))  监视文件变化，并体现出两者的stats变化
// 
fs.watchFile('./temp/heyo', (curr, prev) => {
    console.log('curr is this stats:', curr);
    console.log('prev is this stats:', prev);
})
// 文件删除并恢复的行为会使得curr/prev相同 -- 其次是重命名为原名称时候


// fs.write(td, buffer, ...offset, len, position, callback(err, byteWritten, buffer)) // 写入buffer到指定文件
// fs.write(td, string, ...position, ...encoding, callback(err, written, string))  // 写入string到fd指定的文件
// 如果对同一文件执行多次长时间写入不等待回调不安全，可以用fs.createWriteStream,以上两个需要td


// fs.writeFile(file, data, ...options, callback(err))  //  异步的写入数据到文件，如果已经存在，则替代文件
// fs.writeFile('message.txt', 'hey there', (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('this file is saved')
// })
// 如果file指定为fd文件描述符，则它不会被自动关闭


// fs.writeFileSync(file, data, ...options)
// fs.writeSync(fd, buffer, ...offset, ...length, ...position)
// fs.writeSync(fd, string, ...position, ...encoding)