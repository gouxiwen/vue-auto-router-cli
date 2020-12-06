const { promisify } = require('util');
const {logyellow, loggreen} = require('./log');
module.exports.clone = async (repo, desc) => {
  // 用来下载git项目
  const download = promisify(require('download-git-repo'));
  // 进度条
  const ora = require('ora');
  const process = ora(`download from ${repo}...`);
  logyellow('开始下载模版');
  process.start();
  await download(repo, desc);
  process.succeed()
  loggreen('下载模版完成');
 

}
