const ffbinaries = require('ffbinaries');

module.exports = function download (callback) {
  ffbinaries.downloadFiles(ffbinaries.detectPlatform(), { components: ['ffmpeg'] }, function () {
    callback();
  });
};
