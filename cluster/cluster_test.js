const cluster = require('cluster');
const http = require('http');
const numCPUS = require('os').cpus().length;

// 分发工作进程实例
if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 运作良好`);

    // 衍生工作进程？
    for (let i = 0; i < numCPUS; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    // 工作进程可以共享任何TCP连接
    // 这里共享的是一个HTTP服务器
    http.createServer((req,res) => {
        res.writeHead(200);
        res.end('Hey there' + process.pid);
    }).listen(process.pid);

    console.log(`工作进程 ${process.pid} 启动`);
}

// 通过主进程的消息来关闭工作进程
// if (cluster.isMaster) {
//     const worker = cluster.fork();
//     let timeout;
  
//     worker.on('listening', (address) => {
//       worker.send('shutdown');
//     //   worker.disconnect();
//       timeout = setTimeout(() => {
//         worker.kill(); // kill 将终止进程 体现在cmd
//       }, 2000);
//     });
  
//     worker.on('disconnect', () => {
//       clearTimeout(timeout);
//     });
  
//   } else if (cluster.isWorker) {
//     console.log(`this is the worker ${cluster.worker.process.pid}`)
//     const net = require('net');
//     const server = net.createServer((socket) => {
//       // 连接永远不会结束
//     });
  
//     server.listen(8000);
  
//     process.on('message', (msg) => {
//       if (msg === 'shutdown') {
//         // 将所有与服务器的连接优雅关闭
//         console.log(`worker ${cluster.worker.process.pid} is gonna close`)
//         // cluster.worker.disconnect()
//       }
//     });
//   }


  // 监听事件列表： 对象： Worker 某些方面 worker = cluster.fork()
  // disconnect: 
  // error: 
  // exit(code, signal): 正常退出显示code退出码， 否则显示进程被KILL的signal
  // listening(address):
  // message(message, handle)：
  // online:


// 利用message 机制来实现主进程统计cluster中请求数量的功能 为何每次都是+2？
  // if (cluster.isMaster) {

  //   // 跟踪 http 请求
  //   let numReqs = 0;
  //   setInterval(() => {
  //     console.log(`numReqs = ${numReqs}`);
  //   }, 1000);
  
  //   // 计算请求数目
  //   function messageHandler(msg) {
  //     if (msg.cmd && msg.cmd === 'notifyRequest') {
  //       numReqs += 1;
  //     }
  //   }
  
  //   // 启动 worker 并监听包含 notifyRequest 的消息
  //   // const numCPUs = require('os').cpus().length;
  //   for (let i = 0; i < numCPUS; i++) {
  //     cluster.fork();
  //   }

  //   // 遍历绑定监听事件
  //   for (const id in cluster.workers) {
  //     cluster.workers[id].on('message', messageHandler);
  //   }
  
  // } else {
  
  //   // Worker 进程有一个http服务器
  //   http.Server((req, res) => {
  //     res.writeHead(200);
  //     res.end('hello world\n');
  
  //     // 通知 master 进程接收到了请求
  //     process.send({ cmd: 'notifyRequest' });
  //   }).listen(8000);
  // }



  // worker工作进程方法：
  // worker.disconnect()  // 工作进程worker里有很多 server，server 上运行着许多连接，server.close() 后不接受新的连接，静静等待死亡，所有server死亡后worker才会disconnect
  // worker.exitedAfterDisconnect //true / false, worker被处理后是否保留该worker，这决定了cluster是否产生新的worker
  // worker.id //number
  // worker.isConnected() // true / false
  // worker.isDead() // true / false
  // worker.kill(signal)
  // worker.process // 所有worker都是由child_process.fork()创建，
  // worker.send(message, sendHandle, callback)  // return true/false,发送message给主进程或其他worker，可附带handle  



  // cluster主进程事件：
  // disconnect(worker)
  // exit(worker, code, signal)
  // fork(worker)
  // listening(worker, address)
  // message(worker, message, handle)
  // online(worker)
  // setup(settings)

  // cluster主进程方法：
  // cluster.disconnect(cb)
  // cluster.fork(env) // key/value
  // cluster.isMaster() // true/false
  // cluster.isWorker() // true/false
  // cluster.schedulingPolicy() // 调度策略详情见官网http://nodejs.cn/api/cluster.html#cluster_cluster_schedulingpolicy
  // cluster.setting(execArgv, exec, args, silent, stdio, uid, gid, inspectPort) //设置项
  // cluster.worker // 当前工作进程的引用
  // cluster.workers // 返回一个哈希表， worker.id 为 key