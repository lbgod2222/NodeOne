// process 对象是一个全局变量，不用require

// event=》 
// process
// process对象是EventEmitter实例

// beforeExit
// node'js事件循环数组为空结束时候会触发，进程结束会被延迟，用process.exit(会直接停止)

// disconnect
// IPC通道？ 通道关闭会触发这个

// exit
// 只有自定退出码作为参数
process.on('exit', (code) => {
    console.log('exit code: ', code)
    // 此间操作只能是同步操作
})

// message
process.on('message', (message, sendHandle) => {
    //message : JSoN 或原始值
    // sendHandle: net.socket / net.Server对象 
})

// rejectionHandled
// 当promise 被 reject 后被错误处理器处理，会触发此
const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
  unhandledRejections.set(p, reason);
  //这个是减量的
});
process.on('rejectionHandled', (p) => {
  unhandledRejections.delete(p);
});

// uncaughtException
// 一般有未捕获异常会冒泡，循环推出，为其添加监听器会覆盖此默认事件
process.on('uncaughtException', (err) => {
    fs.writeSync(1, `捕获到异常：${err}\n`);
  });
  
  setTimeout(() => {
    console.log('这里仍然会运行。');
  }, 500);
  
  // 故意调用一个不存在的函数，应用会抛出未捕获的异常。
  nonexistentFunc();
  console.log('这里不会运行。');
  // 官方推荐其使用场景是在出现错误后进行紧急资源分配保存，而不是任程序继续运行下去

// unhandledRejection
process.on('unhandledRejection', (reason, p) => {
    console.log('未处理的 rejection：', p, '原因：', reason);
    // 记录日志、抛出错误、或其他逻辑。
  });
  
  somePromise.then((res) => {
    return reportToUser(JSON.pasre(res)); // 故意输错 `pasre`。
  }); // 没有 `.catch` 或 `.then`。

// 如下代码也会触发'unhandledRejection'事件

function SomeResource() {
  // 将 loaded 的状态设置为一个 rejected promise。
  this.loaded = Promise.reject(new Error('错误信息'));
}

const resource = new SomeResource();
// resource.loaded 上没有 .catch 或 .then。