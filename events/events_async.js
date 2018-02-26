const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// 会根据顺序同步
const myEmitter = new MyEmitter();
myEmitter.on('event', (a,b) => {
    setImmediate(() => {
        console.log('This gonna be not async');
    });
    // isntead of setTimeOut(fn,0)
})
myEmitter.emit('event', 'a', 'b');