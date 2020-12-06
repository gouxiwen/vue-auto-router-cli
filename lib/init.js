const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const {logyellow, loggreen} = require('./log');
const {clone} = require('./download');
const open = require('open');
module.exports = async name => {
  // 清除日志
  clear();
  // 欢迎页
  const data = await figlet('Welcome')
  logyellow(data);
  // 克隆github项目
  await clone('github:gouxiwen/vue-template', name);
   // 安装依赖
  logyellow('开始安装依赖');
  await spawn('cnpm', ['install'], {cwd: `./${name}`})
  loggreen(
      `
=================================
+                               +
+           依赖安装完成          +
+                               +
=================================
      `
   )
   logyellow('打开浏览器');
   open('http://localhost:8080');
   await spawn('npm', ['run','serve'], {cwd: `./${name}`})
}

function spawn(...args) {
  const {spawn} = require('child_process');
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stderr.pipe(process.stderr)
    proc.stdout.pipe(process.stdout)
    proc.on('close', () => {
      resolve()
    })
  })
}