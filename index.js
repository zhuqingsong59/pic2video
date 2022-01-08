// const config = require('./config')
// console.log(config)

const path = require('path');
const colors = require('colors');
const { FFScene, FFText, FFAlbum, FFImage, FFCreator } = require("ffcreator");
const outputDir = path.join(__dirname, './public/');
const cacheDir = path.join(__dirname, './cache/');

const img1 = path.join(__dirname, './resources/album/1.jpeg');
const img2 = path.join(__dirname, './resources/album/2.jpeg');
const img3 = path.join(__dirname, './resources/album/3.jpeg');
const cover = path.join(__dirname, './resources/album/5.jpeg');

const width = 640;
const height = 500;

// Create FFCreator instance
const creator = new FFCreator({
    cover,
    cacheDir,
    outputDir,
    width,
    height
});

// Create scene2
const scene1 = new FFScene();
const scene2 = new FFScene();

scene1.setBgColor("#3b3a98");
scene1.setDuration(2);
const img = new FFImage({ path: img2 });
img.setXY(width/2, height/2);                // 设置位置
img.setScale(2);                 // 设置缩放
// img.setRotate(45);                  // 设置旋转
img.setOpacity(0.3);                // 设置透明度
img.setWH(width, height);              // 设置宽高
img.addEffect('fadeInDown', 1, 0);
scene1.addChild(img);
creator.addChild(scene1);

scene2.setBgColor("#3b3a98");
scene2.setDuration(4);
scene2.setTransition("GridFlip", 2);
creator.addChild(scene2);

// Create Text
const text = new FFText({
   text: "瓜子",
   fontSize: 40,
   x: width / 2,
   y: 60
 });
text.setColor('#ffffff');
text.setBackgroundColor('#01003c');
text.addEffect('fadeInUp', 1, 0);
text.alignCenter();
text.setStyle({ padding: 10 });
scene2.addChild(text);

// Create a multi-photo Album
const album = new FFAlbum({
    list: [img1, img2, img3],   // Picture collection for album
    x: width / 2,
    y: height / 2,
    width: width,
    height: 300,
    showCover: true
});
album.setTransition('zoomIn');      // Set album switching animation
album.setDuration(1);             // Set the stay time of a single sheet
scene2.addChild(album);

creator.output(path.join(__dirname, "./public/cat.mp4"));
creator.start();        // Start processing
creator.closeLog();     // Close log (including perf)

creator.on('start', () => {
    console.log(`FFCreator start`);
});
creator.on('error', e => {
    console.log(`FFCreator error: ${JSON.stringify(e)}`);
});
creator.on('progress', e => {
    console.log(colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`));
});
creator.on('complete', e => {
    console.log(colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `));
});
