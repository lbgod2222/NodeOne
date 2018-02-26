// EventEmitter 类由events定义开放
const EventEmitter = require('events');

// 这步实例化会使EventEmitter广播'newListener'事件，旗下所有监听器(.on)都可以监听
// newListener(event, listener)
myEmitter = new EventEmitter();

// 监听新实例事件
myEmitter.once('newListener', (event, listener) => {
    if (event == 'event') {
        myEmitter.on('event', () => {
            console.log('Monitor in the once');
        })
    } else {
        console.log('Not event event');
    }
})
myEmitter.on('not', () => {
    console.log('hey, not the event')
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once1');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once2');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once3');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once4');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once5');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once6');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once7');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once8');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once9');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once10');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once11');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once12');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once13');
})
myEmitter.on('event', () => {
    console.log('Monitor outside the once14');
})
myEmitter.emit('not')
myEmitter.emit('event')

// Not event event
// hey, not the event
// Monitor outside the once
// once 中只绑定一次listener事件， 即emit('not'), 之后once内部全部清除

// removeListenern(event, listener) // 在监听器被移除时触发

// myEmitter.setMaxListeners(90) // 默认单个实例默认为10，用此可扩容屏蔽错误提示 放在前面
// EventEmitter.defaultMaxListeners // 会影响到每个实例的默认监听器数量  超出数量会向stderr输出可能内存超出的警告

// myEmitter.addListener(eventName, listener) // .on的别名

// myEmitter.eventNames() // 返回所有的监听事件名称
// myEmitter.listenerCount(event) // 返回所有该事件的监听器数量

// myEmitter.listeners(eventName) // 返回名为eventName的方法数组副本

// myEmitter.prependListener() // 使用等同于.on， 会在监听序列里置顶

// myEmitter.removeAllListeners(eventName)  // 移除所有监听eventName的监视器

// myEmitter.removeListener(eventName, listener) //每次只会移除一个监听器

// 运作逻辑： 一旦emit(eventName) 触发，所有绑定的方法会依次触发，不可中途解除绑定
