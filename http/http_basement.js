var http = require('http')

// http.Agent 客户端管理连接的持续与复用，维护着一个等待请求的队列，
// 这样每个重复的请求就会使用同一socket，队列为空后socket将被放入连接池等待相同主机的会话（keep-alive情况下）
// 为避免服务器关闭闲置链接或拒绝同一链接有多次请求，Agent会为每个请求建立新的链接
// 当链接被关闭，会被移出链接池，内部未被使用的socket会被释放
// 当Agent实例不再被使用的时候，建议destory

// Agent对象 new Agent([options])  (keepAlive->boolean, keepAliveMsecs->指定TCP数据包的初始延迟， maxSockets-> 主机允许的最大sockets数量，maxFreeSockets-> 空闲状态下允许打开的最大socket数量，keepAlive为true的时候才有效)
// const keepAliveAgent = new http.Agent({keepAlive: true})
// options.agent = keepAliveAgent;
// http.request(options, onResponseCallback)

// agent.createConnection(options, ...(err, cb))
// 创建一个用于http请求的socket

// agent.keepSocketAlive(socket)
// 请求分离socket？

// agent.reuseSocket(socket, request)
// 新增方法， 看不懂

// agent.destory()
// 销毁当前正在被代理使用的任何socket， 常常用keepalive， 当不再被使用时最好显示的关闭，否则socket可能会长时间alive

// agent.freeSockets
// 返回包含sockets的数组

// agent.getName(options(host, port, localAddress))
// 返回唯一的名称，判断一个链接是否可复用， http/https返回不同

// agent.maxFreeSockets  256 in default
// 设置已启用keepalive的agent要保留的空闲sockets最大数量

// agent.maxSockets
// 可设置代理为每个来源打开的并发的socket的最大数量，来源指的是agent.getName()返回值

// agent.requests
// 返回所有请求的对象

// agent.sockets
// 返回正在被当前代理使用的数组


// 类
// http.ClientRequest 类
// 在http.requert()创建并返回， 表示一个正在处理的请求
// 这时仍然可以用setHeader（）/ getHeader() / removeHeader() 进行修改，
// 实际它会在第一个数据块或request.end()发送

// 可监听事件： 
// abort  请求被客户端终止时候触发

// connect 每当服务器响应connect请求时触发，如果未监听，接收到connect会使客户端关闭
// 以下是客户端和服务端的演示

// const http = require('http');
// const net = require('net');
// const url = require('url');

// // 创建一个HTTP代理服务器
// const proxy = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('okay');
// })
// proxy.on('connect', (req, cltSocket, head) => {
//     // 连接一个服务器
//     const srvUrl = url.parse(`http://${req.url}`);
//     const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
//         cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
//         'Proxy-agent: Node.js-Proxy\r\n' +
//         '\r\n');
//         srvSocket.write(head);
//         srvSocket.pipe(cltSocket);
//         cltSocket.pipe(srvSocket);
//     })
// });

// // 代理服务器
// proxy.listen(1337, '127.0.0.1', () => {

//     // 发送一个请求到代理服务器
//     const options = {
//         port: 1337,
//         hostname: '127.0.0.1',
//         method: 'CONNECT',
//         path: 'www.baidu.com:80'
//     };

//     const req = http.request(options);
//     req.end();

//     req.on('connect', (res, socket, head) => {
//         console.log('Connected!?');

//         socket.write('GET / HTTP/1.1\r\n' +
//         'Host: www.baidu.com:80\r\n' +
//         'Connection: close\r\n' +
//         '\r\n');
//         socket.on('data', (chunk) => {
//             console.log(chunk.toString());
//         });
//         socket.on('end', () => {
//             proxy.close();
//         });
//     });
// });


// countinue 服务器发送了 100 Continue 的响应时触发， 通常是因为请求包含Expect: 100-continue，这是客户端将要发送请求主体的指令

// response 请求的响应被接收到的时候触发， 只触发一次

// socket 当socket被分配到请求后触发

// timeout 事件 socket 超时的时候触发

// upgrade  
// 创建一个 HTTP 服务器
const srv = http.createServer( (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  });
  srv.on('upgrade', (req, socket, head) => {
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
                 'Upgrade: WebSocket\r\n' +
                 'Connection: Upgrade\r\n' +
                 '\r\n');
  
    socket.pipe(socket);
  });
  
  // 服务器正在运行
  srv.listen(1337, '127.0.0.1', () => {
  
    // 发送一个请求
    const options = {
      port: 1337,
      hostname: '127.0.0.1',
      headers: {
        'Connection': 'Upgrade',
        'Upgrade': 'websocket'
      }
    };
  
    const req = http.request(options);
    req.end();
  
    req.on('upgrade', (res, socket, upgradeHead) => {
      console.log('got upgraded!');
      socket.end();
      process.exit(0);
    });
  });

  // request.abort() 使响应中剩余的数据被丢弃且socket被损毁

  // request.aborted 返回被终止的时间

  // request.connection => request.socket

  // request.end(data, ...encoding, cb)
  // 结束发送请求

  // request.flushHeader
  // 刷新请求头， 通常会缓存请求头直到request.end()被调用或者第一块请求数据被写入，
  // node 会将请求头和数据一并打包成单一的TCP数据包， 刷新可以提前开始请求1

  // request。getHeader(name)  读出请求头 大小写敏感
  const contentType = request.getHeader('Content-Type')

  // request.removeHeader(name)  删除header内容

  // request.setHeader(name, value) 为header设置单一的header值，有则会替换
  request.setHeader('Content-Type', 'application/json');
  request.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);

  // request.setNoDelay([noDelay]) socket 被分配请求且已连接，socket.setNoDelay()会被调用

  // request.setSocketKeepAlive(enable, [initialDelay])  socket 被分配请求且已连接, socket.setKeepAlive() 会调用

  // request.setTimeout(timeout, ...callback) 触发条件同上

  // request.socket 引用底层socket， request。end后为null，也可通过request.connection 访问socket
  const options = {
    host: 'nodejs.cn',
  };
  const req = http.get(options);
  req.end();
  req.once('response', (res) => {
    const ip = req.socket.localAddress;
    const port = req.socket.localPort;
    console.log(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);
    // consume response object
  });

  // request.write(chunk, ...encoding, cb)
  // 发送请求主体的一个数据块， 通过多次调用该方法， 一个请求主体可被发送到一个服务器，这种情况下，当创建请求时，建议使用['Transfer-Encoding', 'chunked']请求头


  // http.Server 类
  