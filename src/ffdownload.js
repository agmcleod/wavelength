const ffbinaries = require('ffbinaries');

export function download (callback) {
  ffbinaries.downloadFiles(ffbinaries.detectPlatform(), { components: ['ffmpeg'] }, function () {
    callback();
  });
}
