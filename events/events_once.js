const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
    console.log(++m)
})
myEmitter.emit('event')
// only 1
myEmitter.emit('event')
myEmitter.emit('event')
myEmitter.emit('event')
myEmitter.emit('event')