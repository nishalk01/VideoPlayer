import React, {useEffect, useState, memo} from 'react';
import {View, FlatList, TouchableNativeFeedback,PermissionsAndroid,StyleSheet} from 'react-native';
import {Paragraph,Banner} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {ExternalStorageDirectoryPath, readdir, readDir} from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Navbar from '../Components/Navbar';
import {isVideo, showToastWithGravityAndOffset} from '../Helper';

let VideoFolders = [];

function add(arr, name) {
  const {length} = arr;
  const found = arr.some(el => el.foldername === name);
  if (!found) {
    arr.push({selected: 'false', foldername: name});
  }
  return arr;
}

function ifUnique(arr, name) {
  const {length} = arr;
  const found = arr.some(el => el.foldername === name);
  if (!found) {
    return true;
  }
  return false;
}

function FolderScreen({navigation}) {
  const [VideoUniqueFolder, setVideoUniqueFolder] = useState([]);
  const [visible, setVisible] = useState(false);


  // TODO ask for storage permission
  useEffect(() => {
    // only goes one level deep rest of folders go undetected 
    // callback hell
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(()=>{
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE && PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        .then(response => { 
         if(response){
          readdir(ExternalStorageDirectoryPath).then(allRootFolders => {
            allRootFolders.map(eachFolder => {
              readDir(`${ExternalStorageDirectoryPath}/${eachFolder}`)
                .then(res => {
                  res.map(eachFile => {
                    if (eachFile.isFile() && isVideo(eachFile.name)) {
                      setVideoUniqueFolder(add(VideoFolders, eachFolder));
                    }
                  });
                  //src : https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
                })
                .catch(err => {
                  console.log(err)
                });
            });
          });
    
         }
         else if(!response){
          // if permission is not given show the banner
          setVisible(true);
          
    
    
         }
        
        })
        .catch(err=>{
          console.log(err)
        })
        

      })    

      .catch(err=>{
        console.log(err)
      })
   

  

    // works but very slow since it looks at entire folder structure
    // walkDir(ExternalStorageDirectoryPath,(filepath)=>{
    //   console.log(filepath)
    // })
  }, []);

 
  const SelectFolder = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });

      const filepath = await RNFetchBlob.fs.stat(res.uri);

      // src: https://stackoverflow.com/questions/29496515/get-directory-from-a-file-path-or-url
      try {
        const selectedPath = filepath.path.split('/').slice(0, -1).join('/');
        if (ifUnique(VideoUniqueFolder, selectedPath)) {
          setVideoUniqueFolder([
            ...VideoUniqueFolder,
            {selected: 'true', foldername: selectedPath},
          ]);
        } else {
          showToastWithGravityAndOffset(
            'Folder with this video is already open',
          );
          //  show a toast with message folder already open
        }
      } catch (err) {
        // console.log(err)
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // alert("cancelled from doc picker")
      } else {
        // console.log(JSON.stringify(err))
        console.log(err)
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          if (item.selected === 'false') {
            navigation.navigate('VideoList', {
              path: `${ExternalStorageDirectoryPath}/${item.foldername}`,
            });
          } else {
            navigation.navigate('VideoList', {
              path: item.foldername,
            });
          }
        }}>
        <View style={styles.spaceBwFolder}>
          <Icon name="folder-video" size={90} color="#1aa3ff" />
          <Paragraph
            numberOfLines={1}
            ellipsizeMode="middle"
            style={styles.folderText}>
            {item.selected
              ? item.foldername.substring(item.foldername.lastIndexOf('/') + 1)
              : item.foldername}
          </Paragraph>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const NoVid = () => {
    return <Paragraph>No Videos found in first level from root</Paragraph>;
  };

  return (
    <>
      <Navbar openFolderPicker={SelectFolder} />
      <Banner
      visible={visible}
      actions={[
        {
          label: 'OK',
          onPress: () => setVisible(false),
        }
      ]}>
    <Paragraph style={styles.bannerText}> Please Provide Storage permission either by restarting the app or through settings</Paragraph>
    </Banner>
      {/* folder display layout */}
      <FlatList
        data={VideoUniqueFolder}
        renderItem={renderItem}
        keyExtractor={item => item.foldername}
        numColumns={3}
        ListEmptyComponent={NoVid}
      />
    </>
  );
}

export default memo(FolderScreen);


const styles= StyleSheet.create({
  bannerText:{
    fontSize:15,
    fontStyle:"italic",
    fontWeight:"700"
  },
  folderText:{
    fontWeight: 'bold', 
    textAlign: 'center'
  },
  spaceBwFolder:{
    paddingHorizontal: 18}
})