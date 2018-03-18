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
const net = require('net');
const url = require('url');

// 创建一个HTTP代理服务器
const proxy = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
})
proxy.on('connect', (req, cltSocket, head) => {
    // 连接一个服务器
    const srvUrl = url.parse(`http://${req.url}`);
    const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
        cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
        'Proxy-agent: Node.js-Proxy\r\n' +
        '\r\n');
        srvSocket.write(head);
        srvSocket.pipe(cltSocket);
        cltSocket.pipe(srvSocket);
    })
});

// 代理服务器
proxy.listen(1337, '127.0.0.1', () => {

    // 发送一个请求到代理服务器
    const options = {
        port: 1337,
        hostname: '127.0.0.1',
        method: 'CONNECT',
        path: 'www.baidu.com:80'
    };

    const req = http.request(options);
    req.end();

    req.on('connect', (res, socket, head) => {
        console.log('Connected!?');

        socket.write('GET / HTTP/1.1\r\n' +
        'Host: www.baidu.com:80\r\n' +
        'Connection: close\r\n' +
        '\r\n');
        socket.on('data', (chunk) => {
            console.log(chunk.toString());
        });
        socket.on('end', () => {
            proxy.close();
        });
    });
});