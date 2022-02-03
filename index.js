
const path = require('path');
const colors = require('colors');
const { FFScene, FFAudio, FFAlbum, FFCreator } = require("ffcreator");
const outputDir = path.join(__dirname, './public/');
const cacheDir = path.join(__dirname, './cache/');
const config = require('./config')
console.log(config)
// Create FFCreator instance
const creator = new FFCreator(config.creatorConfig);

creator.addAudio(new FFAudio({
  path: config.audio,
  volume: 0.9,
  fadeIn: 4,
  fadeOut: 4,
  loop: true
}));

// Create scene2
const scene = new FFScene();
scene.setDuration(config.albumList.length + 1)
creator.addChild(scene);
// Create a multi-photo Album
const album = new FFAlbum({
    list: config.albumList,   // Picture collection for album
    x: config.albumWidth / 2,
    y: config.albumHeight / 2,
    width: config.albumWidth,
    height: config.albumHeight,
    showCover: true
});
album.setTransition('zoomIn');      // Set album switching animation
album.setDuration(1);             // Set the stay time of a single sheet
scene.addChild(album);

creator.output(path.join(__dirname, "./public/hmm.mp4"));
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
