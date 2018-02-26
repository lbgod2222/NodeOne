// 全局console可以被写入任何流
console.log()
console.error()
console.warn()

// Console 类
// const myConsole = new Console(out,err);
// myConsole.log()
// myConsole.err()
// myConsole.warn()

// const { Console } = require('console')

// 类定义 new Console(stdout, ...stderr)
    // 日志输出
    // const fs = require('fs');
    // const output = fs.createWriteStream('./stdout.log')
    // const erroroutput = fs.createWriteStream('./stderr.log')

    // const logger = new Console(output, erroroutput);
    // const count = 5;
    // logger.log(`count: ${count}`);


// console.assert(value, ...message, ...args)
// console.assert(false, 'This is a false alert',) // nodejs 中 会打断执行禀报出AssertionError,浏览器端则不会 下面用obj.create实现
// 可做如下修改：

// modifiedConsole.js
'user strict'
// 用不带补丁的assert实现创建一个简单的console扩展
// const myConsole = Object.create(console, {
//     assert: {
//         value: function assert(assertion, message, ...args) {
//             try {
//                 console.assert(assertion, message, ...args);
//             } catch(err) {
//                 console.error(err.stack);
//             }
//         },
//         configurable: true,
//         enumerable: true,
//         writable: true,
//     }
// })
// module.exports = myConsole;

// console.count(string) 计数器 str相同将纳入同一计数器
console.count('abc'); // abc: 1
console.count('abc'); // abc: 2
console.count('abcd'); // abcd: 1
// console.countReset(string) 计数器重置

// console.dir(obj, ...options(showHidden, depth,colors))  util.inspect()

// console.group(labels => array)

// console.info(data, ...args)

// console.time(string) / console.timeEnd(string) 同时出现，计算中间差值ms 打印到stdout
console.time('100-elements');
for (let i = 0; i < 3; i++) {}
console.timeEnd('100-elements');

// console.trace(message, ...args) 追踪console位置 打印到stderr
console.trace('LET SEE WHAT U GOT');
