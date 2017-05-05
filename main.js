const {app, BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const ffDownload = require('./backend/ffdownload');
const ffmpeg = require('fluent-ffmpeg');
const async = require('async');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const codecs = {
  aif: 'pcm_s32le',
  flac: 'flac',
  mp3: 'libmp3lame',
  ogg: 'libvorbis',
  wav: 'pcm_s32le'
};

function removeFileFromPath (pathName) {
  const pieces = pathName.split(path.sep);
  if (path.extname(pieces[pieces.length - 1]) !== '') {
    return pieces.slice(0, pieces.length - 1).join(path.sep);
  } else {
    return pieces.join(path.sep);
  }
}

function createWindow () {
  require('./backend/menu');
  ffDownload(app, () => {
    win.webContents.send('downloaded', true);
    ffmpeg.setFfmpegPath(path.join(app.getPath('userData'), 'ffmpeg'));
  });

  win = new BrowserWindow({width: 800, height: 600});

  // win.webContents.openDevTools();

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'build', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  ipcMain.on('convert-files', (event, arg) => {
    dialog.showOpenDialog(win, { defaultPath: removeFileFromPath(arg.files[0]), properties: ['createDirectory', 'openDirectory'] }, (target) => {
      const dirPath = target[0];
      async.each(arg.files, (filePath, cb) => {
        async.each(arg.formats, (format, cb2) => {
          const codec = codecs[format];
          if (!codec) {
            return cb(new Error(`Could not find codec: ${format}`));
          }

          const pieces = filePath.split(path.sep);
          const fullFileName = pieces[pieces.length - 1];
          const fileName = fullFileName.replace(new RegExp(`${path.extname(fullFileName)}$`), '');
          const newPath = [dirPath, `${fileName}.${format}`].join(path.sep);

          ffmpeg(filePath)
            .audioCodec(codec)
            .on('end', cb2)
            .save(newPath);
        }, cb);
      }, (err) => {
        if (err) {
          win.webContents.send('save-error', err.message);
        } else {
          win.webContents.send('save-succeeded', 'Files converted successfully!');
        }
      });
    });
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
