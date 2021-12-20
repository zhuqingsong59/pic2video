const { watch, src, series } = require('gulp')
const browserSync = require("browser-sync").create()
const exec = require('child_process').exec
// 编译文件
function compile (cb) {
  exec('npm start', function(error, stdout, stderr) {
    if(error) {
      console.error('error: ' + error)
      return
    }
    browserSyncReload()
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
  })
  cb()
}
// 初始化静态服务
function initServer(cb) {
  browserSync.init({
    server: 'public',
    ui: false,
    notify: false,
    port: 8000
  })
  cb()
}
// 浏览器reload
function browserSyncReload(){
  browserSync.reload()
}
// 默认任务
function defaultTask(cb) {
  watch('./index.js', compile)
  cb()
}

exports.default = series(initServer, defaultTask)
