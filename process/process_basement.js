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
// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });
// // $ node process_basement.js one two=three 4
// 0: C:\Program Files\nodejs\node.exe    node position
// 1: D:\worktemp\NodeOne\process\process_basement.js    文件 position
// 2: one       第三个参数
// 3: two=three    第四个参数
// 4: 4      第五个参数


// process.argv0  // 保存node启动的时候参数值的第一个只读副本


// process.channel IPC的引用,如没有  undefined


// process.chdir(directory)  // 变更node当前的工作目录,如果失败会抛出异常
// console.log(`Starting directory: ${process.cwd()}`);
// try {
//   process.chdir('./children'); // 如果没有则报错
//   console.log(`New directory: ${process.cwd()}`);
// } catch (err) {
//   console.error(`chdir: ${err}`);
// }
// console.log(process.config)



// process.config // 返回一个js对象,当前执行程序涉及的配置项信息,并非只读


// process.connected   // IPC通道断开就会返回false, 此时不能使用process.send()发送消息


// process.cpuUsage(process.cpuUsage())   // 当前用户cpu和系统CPU事件的对象 执行用户程序和系统程序的时间(微秒)
// const startUsage = process.cpuUsage();
// console.log(startUsage);
// // { user: 38579, system: 6986 }

// // spin the CPU for 500 milliseconds
// const now = Date.now();
// while (Date.now() - now < 500);

// console.log(process.cpuUsage(startUsage));
// // { user: 514883, system: 11226 }


// process.cwd()  // current working directory 目前工作目录


// process.disconnect()  // 优雅关闭子进程,同ChildProcess.disconnect


// process.emitWarning(warning, ...options)  用于定制或应用特定的进程警告, 可通过process.on('warning')
// options:{type, code, ctor, detail}
// Emit a warning with a code and additional detail.
// process.emitWarning('Something happened!', {
//   code: 'MY_WARNING',
//   detail: 'This is some additional information'
// });
// // Emits:
// // (node:56338) [MY_WARNING] Warning: Something happened!
// // This is some additional information

// process.on('warning', (warning) => {
//   console.warn(warning.name);    // 'Warning'
//   console.warn(warning.message); // 'Something happened!'
//   console.warn(warning.code);    // 'MY_WARNING'
//   console.warn(warning.stack);   // Stack trace
//   console.warn(warning.detail);  // 'This is some additional information'
// });


// //避免同种报错
// function myErrorEmitter() {
//   if (!myErrorEmitter.warned) {
//     myErrorEmitter.warned = true; // switch 设置
//     process.emitWarning('已被报出一次')
//   }
// }


// // process.env  // 返回包含用户环境信息的对象
// process.env.abise = 'abise' // 可以设置env的属性


// process.execArgv //收录执行node的选项,但忽略这之后执行对象的内容
// $ node --harmony script.js --version //只会收录 --harmony
// 而process.argv则会全部收录,但第一项返回的是node运行地址


// process.exit(code)
// code 默认为0,设置为1则用failure结束状态码结束
// if (someConditionNotMet()) {
//   printUsageToStdout();
//   process.exit(1);
// }  // 强制结束会导致异步操作尚未完成被中断

// if (someConditionNotMet()) {
//   printUsageToStdout();
//   process.exitCode = 1;
// }  // 这样就会优雅退出


// process.exitCode  // 退出码,可以被process.on('exit', (code))监听
// 可以被覆盖 


// 在POSIX平台才有效
// process.getegid() / process.geteuid() / process.getgid() / process.getgroups() / process.getuid() / process.initgroups(user, extra_group)   // 似乎都是标明用户组



// process.hrtime(process.hrtime())   // 与上次调用进行差值计算, 用于衡量间隔操作的性能(单位: nanosecond : 皮秒)
// let nanosecond = 1e9;
// let time = process.hrtime();
// console.log('ONly hrtime(): ', time);  // 返回array, len = 2, [底数, 余数] 

// setTimeout(() => {
//   let diff = process.hrtime(time);
//   console.log('After hrtime(): ', diff);
//   console.log(`Time between two actions took ${diff[0] * nanosecond + diff[1]}`)
// }, 1000);


// process.kill(pid, ...signal)   // 将signal发送给pid标识的进程
// signal: SIGINT / SIGTERM 等



// process.mainModule  // 获取require.main


// process.memoeryUsage()  // 内存使用状况


// process.nextTick(callback, [...args])  // 将callback添加到next tick队列,一旦当前事件轮询任务全部完成,next tick 队列中的callback会被依次调用,  
// function definitelyAsync(arg, cb) {
//   if (arg) {
//     process.nextTick(cb);
//     return;
//   }

//   fs.stat('file', cb);
// }
// 完全同步/异步时候的调用是很好的,nextTick梯队会在当前循环和下一个循环缝隙间优先执行



// process.pid   //返回进程PID


// process.platfrom   // 返回系统的信息


// process.release  // 显示当前发布包的信息


// process.send(message, ...sendHandle, ...options, callback)  // 进程产生自进程间通信, process.send()方法可以用来给父进程发送消息
// 收到的消息被视为父进程ChildProcess对象上的一个'message'事件



// process.setegid(id)  /  process.seteuid(id)  /  process.setgroups(groups)   /  process.setuid(id)


// process.stderr  // 链接到fd(2), 是一个net.Socket, 可用data监听


// process.stdin  // 链接到stdin(fd(2)), 是一个net.Socket, 可用readable监听
// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });


// process.stdout  // 链接到stdout(1)流, 可用data监听
/*1:声明变量*/
// var num1, num2;
// /*2：向屏幕输出，提示信息，要求输入num1*/
// process.stdout.write('请输入num1的值：');
// /*3：监听用户的输入*/
// process.stdin.on('data', function (chunk) {
//     if (!num1) {
//         num1 = Number(chunk);
//         /*4：向屏幕输出，提示信息，要求输入num2*/
//         process.stdout.write('请输入num2的值');
//     } else {
//         num2 = Number(chunk);
//         process.stdout.write('结果是：' + (num1 + num2));
//     }
// });


// process.title  // 设置当前进程在PS命令中显示的进程名字


// process.umask([mask])  // 文件的权限掩码


// process.uptime()  // 返回当前进程运行时长


// process.version // 返回node的版本信息


// 退出代码  => Exit Codes
// 正常情况下Node.js会以0退出
// 1 未捕获异常
// 2 未被使用(Bash)
// 3 内部JS分析错误
// 4 内部JS执行失败
// 5 致命错误 V8引擎中的致命错误,典型的是以FATALERROR从stderr打印出来的
// 6 非函数的内部异常处理, 发生了一个内部异常, 或者某个函数不能被调用
// 7 内部异常处理运行时失败  有不能被捕获的异常,在试图处理异常时处理函数本身抛出错误
// 8 未被使用
// 9 不可用参数 某个未知项没有确定,或者没有给必要的选项填值
// 10 内部JS运行时失败
// 12 不可用的调试参数