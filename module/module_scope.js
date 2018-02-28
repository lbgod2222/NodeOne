const path = require('path');
const fake = require('./module_fake');
// 以下是在模块作用域的方法

// __dirname 返回当前模块的目录文件夹
console.log(__dirname); 
console.log(path.dirname(__filename));
// 两者等价


// __filename 返回当前模块的目录+文件名称
console.log(__filename);

// exports 是 module.exports的更简短引用形式

// require() 引入模块
// require(string)  require.cache
// 所有被引入的模块都进入该cache，将模块键值从该对象中删除会使得模块在下一次require重载
// 重载： 1.将require写入函数中，调用函数 2.像上条方法

// require.resolve(request, ...[options])
// request 为需要解析的模块路径, 当需要绝对路径的时候，调用path.join(__dirname, 'address/to/the/path'), 直接用require.resolve('address/to/the/path'),更方便，切能报错
// 切当文件不存在时会直接报错

// 以下是module对象详情
// module 是指向当前模块作用域的对象
// module.children // 该模块引用模块的集合数组
// module.expoets 暴露对象的赋值必须在源文件立即赋予, 同时相同关键字只能赋值一次
// exports 等价于 module.exports
// module.filename 功能上等价于 __filename
console.log(module.filename)
fake.test();
console.log(fake.test2);
console.log(module)
console.log(module.children);

// module.id 体现为相对于本模块的绝对路径+文件名， 如果为本文件则是'.'
// console.log(module.id)
console.log(module, 'try this time')

// module.loaded 判断模块是否被加载完成（最后一行都被执行完毕），用module.children调查似乎会调用另一副本，显示loaded为false

// module.paths 枚举该模块的搜索路径的数组集合，（逐层搜索node_modules）