const fs =  require('fs')
const path = require('path')
// 图片目录
const picDir = path.join(__dirname, '../', './resources/album')
// 缓存目录
const cacheDir = path.join(__dirname, '../', './cache/')
// 视频输出目录
const outputDir = path.join(__dirname, '../', './public/')
// 配置信息
const videoConfig = {
  // creator配置
  creatorConfig: {
    cacheDir,
    outputDir,
    width: 640, // 视频宽度
    height: 352, // 视频高度
  },
  // 相册列表
  albumList: fs.readdirSync(picDir).map(item => path.join(picDir, item))
}

module.exports = videoConfig
