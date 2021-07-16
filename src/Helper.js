import {readDir} from 'react-native-fs';
import {ToastAndroid} from 'react-native';

//src:  https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
export const getExtension = filename => {
  var parts = filename.split('.');
  return parts[parts.length - 1];
};

export function isVideo(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
      return true;
  }
  return false;
}

/* src : https://allenhwkim.medium.com/nodejs-walk-directory-f30a2d8f038f 
this below is function nothing but react-native-fs version of the above article

*/
export function walkDir(dir, callback) {
  readDir(dir).then(res => {
    res.forEach(f => {
      let dirPath = `${dir}/${f.name}`;
      f.isDirectory()
        ? walkDir(dirPath, callback)
        : callback(`${dir}/${f.name}`);
    });
  });
}

// for toast messages

export const showToastWithGravityAndOffset = message => {
  ToastAndroid.showWithGravityAndOffset(
    String(message),
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

// src: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// src: https://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss for converting seconds to duration
export function secondsToHms(d) {
  d = Number(d);

  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}
