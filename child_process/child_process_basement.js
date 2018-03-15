// child_process  // 提供了衍生紫禁城的功能
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`输出：${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`错误：${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});

// 父进程与衍生的子进程间会建立stdin/stdout/stderr管道
// chilld_process.spawn()  //会异步的衍生子进程,且不会阻塞Node事件循环
// chilld_process.spawnSync()  //会同步的衍生子进程,会阻塞事件循环,知道子进程退出或终止
// child_process模块的提供的每个替代方法都是基于以上两个方法实现

// child_process.exec() 衍生shell并在shell上运行命令,返回stdout/stderr
// child_process.execSync() //同步方法
// child_process.execFile() 无需先生成shell,直接运行命令
// child_process.execFileSync() 同步版本
// child_process.fork() 衍生新的nodejs进程,建立新的IPC通道调用制定模块,允许父进程-子进程相互发送消息
// 都会返回ChildProcess


// window 平台与其他平台的不同
// execFile() => in linux better
// exec() => in windows better

// 仅限 Windows 系统 use the 
const { spawn } = require('child_process');
const bat = spawn('cmd.exe', ['/c', 'my.bat']); // use spawn to active cmd

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.log(data.toString());
});

bat.on('exit', (code) => {
  console.log(`子进程退出码：${code}`);
});
// 或
const { exec } = require('child_process');
exec('my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

// 文件名带有空格的脚本：
const bat = spawn('"my script.cmd"', ['a', 'b'], { shell: true });
// 或：
exec('"my script.cmd" a b', (err, stdout, stderr) => {
  // ...
});


// child_process.exec(command, )
