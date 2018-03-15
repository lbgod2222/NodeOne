var http = require('http')

// http.Agent 客户端管理连接的持续与复用，维护着一个等待请求的队列，
// 这样每个重复的请求就会使用同一socket，队列为空后socket将被放入连接池等待相同主机的会话（keep-alive情况下）
// 为避免服务器关闭闲置链接或拒绝同一链接有多次请求，Agent会为每个请求建立新的链接
// 当链接被关闭，会被移出链接池，内部未被使用的socket会被释放
// 当Agent实例不再被使用的时候，建议destory

// Agent对象 new Agent([options])  (keepAlive->boolean, keepAliveMsecs->指定TCP数据包的初始延迟， maxSockets-> 主机允许的最大sockets数量，maxFreeSockets-> 空闲状态下允许打开的最大socket数量，keepAlive为true的时候才有效)
const keepAliveAgent = new http.Agent({keepAlive: true})
options.agent = keepAliveAgent;
http.request(options, onResponseCallback)