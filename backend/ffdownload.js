const ffbinaries = require('ffbinaries');

module.exports = function download (app, callback) {
  ffbinaries.downloadFiles(ffbinaries.detectPlatform(), { components: ['ffmpeg'], destination: app.getPath('userData') }, function () {
    callback();
  });
};
