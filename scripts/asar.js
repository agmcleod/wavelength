const asar = require('asar');
const ncp = require('ncp').ncp;
const del = require('del');
const exec = require('child_process').exec;
const packager = require('electron-packager');

function promiseNcp (from, to) {
  return new Promise((res, rej) => {
    ncp(from, to, (err) => {
      if (err) {
        return rej(err);
      }
      res();
    });
  });
}

function promiseExec (command, opts) {
  return new Promise((res, rej) => {
    exec(command, opts, (err, stdout, stderr) => {
      if (err) {
        return rej(err);
      }

      res(stdout, stderr);
    });
  });
}

del(['dist/build/*', 'dist/backend', 'dist/out']).then(() => {
  return promiseNcp('build', 'dist/build');
}).then(() => {
  return promiseNcp('backend', 'dist/backend');
}).then(() => {
  return promiseNcp('main.js', 'dist/main.js');
}).then(() => {
  return promiseNcp('package.json', 'dist/package.json');
}).then(() => {
  return promiseExec('npm install --production', { cwd: 'dist/' });
}).then(() => {
  packager({ dir: 'dist/', asar: true, out: 'dist/out' }, (err) => {
    if (err) {
      console.error(err);
      return process.exit(1);
    }

    process.exit(0);
  });
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
