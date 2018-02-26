const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

process.on('uncaughtException', (err) => {
    console.error('Something wrong!');
})

myEmitter.emit('error', new Error('No!!!'));

// 始终要为error事件注册监听器