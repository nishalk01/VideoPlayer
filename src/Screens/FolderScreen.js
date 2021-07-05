import React,{useEffect,useState} from 'react';
import {Paragraph,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { View} from 'react-native'
import Navbar from '../Components/Navbar';
import  {ExternalStorageDirectoryPath, readdir,readDir} from 'react-native-fs';

import {isVideo,getExtension,walkDir} from '../Helper'
 var  VideoListObj=[]
let VideoFolders=[]
export default function FolderScreen() {
  const [VideoUniqueFolder, setVideoUniqueFolder] = useState([])
    // useEffect(async () => {
    //     // console.log(ExternalStorageDirectoryPath)

    //    const allFolders=await readdir(ExternalStorageDirectoryPath)
    // //    handlException
     
   
    //    await allFolders.map(folder=>{
     
    //     //TODO goes only one folder deep use walker 
    //     readDir(`${ExternalStorageDirectoryPath}/${folder}`)
    //       .then(res=>{
          
    //       res.map(eachFile=>{
            
    //        if(eachFile.isFile() && isVideo(eachFile.name)){
    //         //  create a josn object with key has foldername and path has a value to key
 
    //         // check if the key exists 
    //        if(VideoListObj.some(e=>e.hasOwnProperty(folder))){
    //       // key exists in array
    //       //  loop through array,compare key,if key===folder,then push to value array
    //       VideoListObj.map(EachObj=>{
    //          if(Object.keys(EachObj)[0]===folder){
    //            EachObj[folder].push(eachFile)

    //          }
    //       })

    //        }
    //        else{
    //         obj=new Object()
    //         obj[folder]=[eachFile]
    //         VideoListObj.push(obj)
    //        }
   
           

           
           
    //        }
    //       })
         
    //       setVideoObj(VideoListObj)
    //         }
    //         )
    //       .catch(err=>{
    //         console.log(err)
    //         // console.log("its an error"+String(err))  
    //     })
    // })
   
    // }, [])

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
       onPress={() => console.log(`${ExternalStorageDirectoryPath}/${eachUFolder}`)}
       rippleColor="rgba(0, 0, 0, .2)"
     >
         <View style={{  paddingHorizontal:10,width:100,height:100}}>
          <Icon name="folder-video" size={90} color="gray" />
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



 // if(VideoListObj.hasOwnProperty(folder)){

            //   VideoListObj[folder].push(eachFile)
            // }
            // else
            // {
            //   VideoListObj[folder]=[eachFile]
            // }



 // https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/
    // Object.keys(empty).length === 0 && empty.constructor === Object;
    // const DisplayFolders=Object.keys(VideoObj).length?(
     
    //   Object.keys(VideoObj).map(eachFolder=>{
    //     console.log(eachFolder)
    //     return(
    //       <Paragraph>{eachFolder}</Paragraph>
    //     )

    //   })
    // ):(<Paragraph>No folder contains video</Paragraph>)




  // console.log(VideoListObj.length)
          // console.log("====================================================")
          // console.log(JSON.stringify(VideoListObj, null, 2))
          // console.log("****************************************************")
          // setVideoObj(VideoListObj)