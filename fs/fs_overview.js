// fs 所有方法都有同步/异步的形式
// 异步方法的最后一个参数都是一个回掉函数，第一个参数通常保留给异常，成功则为nill/undefined
// 同步方法，任何异常都会立即被抛出 try/catch 来处理或者让异常冒泡

const fs = require('fs');

// 异步方法 即使错误不会阻止程序继续执行
// fs.unlink('./temp/hey', (err) => {
//     if (err) {
//         console.log('no such file?');
//     }
//     console.log('删除成功 hey');
// });
// 同步Sync方法
// fs.unlinkSync('./temp/hey');
// console.log('成功同步删除');


// 异步方法不能保证顺序执行，要进行异步回掉链起来
fs.rename('./temp/hey', './temp/heyo', (err) => {
    if (err) {
        throw err;
    }
    fs.stat('./temp/heyo' ,(err, stats) => {
        if (err) {
            throw err;
        }
        console.log(`文件属性为${JSON.stringify(stats)}`)
    });
});

