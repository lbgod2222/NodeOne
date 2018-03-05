// process 对象是一个全局变量，不用require

// event=》 
// process
// process对象是EventEmitter实例

// beforeExit
// node'js事件循环数组为空结束时候会触发，进程结束会被延迟，用process.exit(会直接停止)

// disconnect
// IPC通道？ 通道关闭会触发这个

// exit
// // 只有自定退出码作为参数
// process.on('exit', (code) => {
//     console.log('exit code: ', code)
//     // 此间操作只能是同步操作
// })

// // message
// process.on('message', (message, sendHandle) => {
//     //message : JSoN 或原始值
//     // sendHandle: net.socket / net.Server对象 
// })

// // rejectionHandled
// // 当promise 被 reject 后被错误处理器处理，会触发此
// const unhandledRejections = new Map();
// process.on('unhandledRejection', (reason, p) => {
//   unhandledRejections.set(p, reason);
//   //这个是减量的
// });
// process.on('rejectionHandled', (p) => {
//   unhandledRejections.delete(p);
// });

// uncaughtException
// 一般有未捕获异常会冒泡，循环推出，为其添加监听器会覆盖此默认事件
// process.on('uncaughtException', (err) => {
//     fs.writeSync(1, `捕获到异常：${err}\n`);
//   });
  
//   setTimeout(() => {
//     console.log('这里仍然会运行。');
//   }, 500);
  
  // 故意调用一个不存在的函数，应用会抛出未捕获的异常。
  // nonexistentFunc();
  // console.log('这里不会运行。');
  // 官方推荐其使用场景是在出现错误后进行紧急资源分配保存，而不是任程序继续运行下去

// // unhandledRejection
// // process.on('unhandledRejection', (reason, p) => {
// //     console.log('未处理的 rejection：', p, '原因：', reason);
// //     // 记录日志、抛出错误、或其他逻辑。
// //   });
  
//   somePromise.then((res) => {
//     return reportToUser(JSON.pasre(res)); // 故意输错 `pasre`。
//   }); // 没有 `.catch` 或 `.then`。

// // 如下代码也会触发'unhandledRejection'事件

// function SomeResource() {
//   // 将 loaded 的状态设置为一个 rejected promise。
//   this.loaded = Promise.reject(new Error('错误信息'));
// }

// const resource = new SomeResource();
// // resource.loaded 上没有 .catch 或 .then


// // warning
// //  一旦探测到可能导致应用性能问题，缺陷或安全隐患相关的代码实践，Node.js就可发出告警。
// process.on('warning', (warning) => {
//   console.warn(warning.name);
//   console.warn(warning.message);
//   console.warn(warning.stack);  // 包含代码位置的堆栈信息
// })


// // 信号事件   系列标准POSIX信号名称
// process.on('SIGINT', () => {
//   console.log('use the SIGINT')
// })
// SIGUSR1 保留用于启动调试器  可以改绑
// SIGTERM WINDOW不支持,可绑定监听器
// SIGINT CTRL+C
// SIGBREAK WINDOW:CTRL+BREAK  非window可绑定但不能触发
// SIGWINCH console被resize的时候会触发
// SIGKILL 不能绑定监听器,出现会使node无条件终止
// SIGSTOP 不能绑定



// process.abort() 会使Node进程立即结束,并生成一个core文件


// process.arch() 返回处理器构架的str


// process.argv
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
// $ node process_basement.js one two=three 4
// 0: C:\Program Files\nodejs\node.exe    node position
// 1: D:\worktemp\NodeOne\process\process_basement.js    文件 position
// 2: one       第三个参数
// 3: two=three    第四个参数
// 4: 4      第五个参数


// process.argv0  // 保存node启动的时候参数值的第一个只读副本