const fs = require('fs');
// handlebars模版库，利用模板生成文件
const handlebars = require('handlebars');
const {logyellow, loggreen} = require('./log');
module.exports = async () => {
  // 获取页面列表
  const list = fs.readdirSync('./src/views')
  .filter(v => v !== 'Home.vue')
  .map(v => ({
    name: v.replace('.vue', '').toLowerCase(),
    file: v
  }))

  // 生成路由定义
  compile({ list }, './src/router.js', './template/router.js.hbs')

  // 生成菜单
  compile({ list }, './src/App.vue', './template/App.vue.hbs')
/**
 * 编译模版文件
 * @param {*} meta 数据定义
 * @param {*} filePath 目标文件路径
 * @param {*} templatePath 模版文件路径
 */
  function compile(meta, filePath, templatePath) {
    if(fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(filePath, result)
      loggreen(`🚀${filePath}创建成功`)
    }
  }
}