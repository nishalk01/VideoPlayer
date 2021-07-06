import React,{useEffect,useState} from 'react';
import {Paragraph,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { View} from 'react-native'
import Navbar from '../Components/Navbar';
import  {ExternalStorageDirectoryPath, readdir,readDir} from 'react-native-fs';

import {isVideo,walkDir} from '../Helper'
let VideoFolders=[]
export default function FolderScreen({navigation}) {

  const [VideoUniqueFolder, setVideoUniqueFolder] = useState([])
    
// TODO ask for storage permission
    useEffect(()=>{
     
      // only goes one level deep rest of folders go undetected
       readdir(ExternalStorageDirectoryPath)
       .then(allRootFolders=>{
            allRootFolders.map(eachFolder=>{
              readDir(`${ExternalStorageDirectoryPath}/${eachFolder}`)
              .then(res=>{
                res.map(eachFile=>{
                  if(eachFile.isFile() && isVideo(eachFile.name)){
                    VideoFolders.push(eachFolder)
                  }


                })
    //src : https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
                 setVideoUniqueFolder( [...new Set(VideoFolders)])
              })
              .catch(err=>{
                // console.log(err)
              })

            })
          
          })



 // works but very slow since it looks at entire folder structure
// walkDir(ExternalStorageDirectoryPath,(filepath)=>{
//   console.log(filepath)
// })  
    },[])


    const DisplayFolders=VideoUniqueFolder.length?(
      VideoUniqueFolder.map(eachUFolder=>{
        return(
          <TouchableRipple
          key={eachUFolder}
          style={{margin:10}}
       onPress={() => {console.log(`${ExternalStorageDirectoryPath}/${eachUFolder}`)
      navigation.navigate("VideoList",{path:`${ExternalStorageDirectoryPath}/${eachUFolder}`})}
      }
       rippleColor="rgba(0, 0, 0, .2)"
     >
         <View style={{  paddingHorizontal:10,width:100,height:100}}>
          <Icon name="folder-video" size={90} color="#1aa3ff" />
          <Paragraph  numberOfLines={2} style={{ fontWeight:"bold" }} > {eachUFolder}</Paragraph>
          </View>
     </TouchableRipple>
        )
       
    })
    
    ):(<Paragraph>No Videos found in first level from root</Paragraph>)

    return (
        <>
        <Navbar/>
        {/* folder display layout */}
        <View style={{flex:1,margin:20,flexDirection:"row",flexWrap:"wrap" }}>
       {DisplayFolders}
        </View>
        
        </>
    )
}
