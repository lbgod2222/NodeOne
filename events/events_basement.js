// 基础示例
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('a event detected!');
})
myEmitter.on('delay', () => {
    console.log('a delay event detected!');
    setTimeout(function(){console.log('delayed log')},2000);
})
myEmitter.emit('event');
setTimeout(function(){myEmitter.emit('delay')},2000);


// emit 可以携带参数， on监听可接收
const myEmitter2 = new MyEmitter();
myEmitter2.on('event', function(a,b) {
    console.log(a,b,this);
    // this 指向监听器附近的eventEmitter
})
myEmitter2.emit('event','arg1','arg2');
