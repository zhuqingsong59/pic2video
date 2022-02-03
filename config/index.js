const fs =  require('fs')
const path = require('path')
// 图片目录
const picDir = path.join(__dirname, '../', './resources/album/hmm')
// 缓存目录
const cacheDir = path.join(__dirname, '../', './cache/')
// 视频输出目录
const outputDir = path.join(__dirname, '../', './public/')
// 封面
const cover = path.join(__dirname, '../', './resources/cover/hmm.jpg')
// 背景音乐
const audio = path.join(__dirname, '../', './resources/audio/bg.mp3');
// 配置信息
const videoConfig = {
  // creator配置
  creatorConfig: {
    cover,
    cacheDir,
    outputDir,
    width: 320, // 视频宽度
    height: 600, // 视频高度
  },
  audio,
  albumHeight: 569,
  albumWidth: 320,
  // 相册列表
  albumList: fs.readdirSync(picDir).map(item => path.join(picDir, item))
}

module.exports = videoConfig
