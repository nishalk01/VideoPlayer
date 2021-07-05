

import { readDir } from "react-native-fs";

//src:  https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
export const getExtension=(filename)=>{
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

export function isVideo(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
      case 'pdf':
        return true;
    }
    return false;
  }
  
/* src : https://allenhwkim.medium.com/nodejs-walk-directory-f30a2d8f038f 
this below is function nothing but react-native-fs version of the above article

*/
export function walkDir(dir,callback){
  readDir(dir).then(res=>{
    res.forEach(f=>{
      let dirPath=`${dir}/${f.name}`
      f.isDirectory()?
      walkDir(dirPath,callback):callback(`${dir}/${f.name}`);
    })
  })
}