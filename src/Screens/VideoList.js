import React, {useEffect, useState, memo} from 'react';
import {
  Image,
  View,
  TouchableNativeFeedback,
  Platform,
  FlatList,
} from 'react-native';
import {readDir} from 'react-native-fs';

import {isVideo} from '../Helper';
import {Paragraph, Badge} from 'react-native-paper';
// import MediaMeta from 'react-native-media-meta';

let VidListArray;

// {route.params.path}

function VideoList({route, navigation}) {
  // console.log(route.params.path)
  const [FileList, setFile] = useState([]);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    VidListArray=[]
    console.log('hello');
    readDir(route.params.path)
      .then(res => {
        res.map((eachFile, index) => {
          if (isVideo(eachFile.name) && eachFile.isFile()) {
            eachFile['id'] = String(index);
            VidListArray.push(eachFile);
          }
        });
        setFile(VidListArray);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const renderVideoItem = ({item}) => {
    return (
      <TouchableNativeFeedback
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackground()
            : ''
        }
        onPress={() => navigation.navigate('Player', {uri: item.path})}>
        <View
          style={{
            width: 170,
            height: 160,
            margin: 10,
            justifyContent: 'center',
            borderRadius: 30,
          }}>
          <Image
            source={{uri: `file://${item.path}`}}
            resizeMode="cover"
            style={{height: 110, borderRadius: 10}}
          />
          <Badge
            visible={true}
            style={{
              color: 'white',
              fontWeight: 'bold',
              backgroundColor: 'gray',
              bottom: 50,
              position: 'absolute',
            }}>
            12:30
          </Badge>
          <Paragraph numberOfLines={2}> {item.name}</Paragraph>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const EmptyVideo = () => {
    return <Paragraph>No video Found in this folder</Paragraph>;
  };

  return (
    <View style={{flex: 1}}>
      {/* <Button
        mode="contained"
        onPress={() => {
          MediaMeta.get(
            '/storage/emulated/0/Download/AnimePahe_Vivy_-_Fluorite_Eyes_Song_-_10_720p_SubsPlease.mp4',
          )
            .then(metadata => console.log(metadata))
            .catch(err => console.error(err));
        }}>
        ckick to get meta
      </Button> */}

      <FlatList
        // src: https://stackoverflow.com/questions/51742856/sorting-react-native-flatlist/51743104 in next line
        data={FileList.sort((a, b) => a.name.localeCompare(b.name))}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        numColumns={2}
        ListEmptyComponent={EmptyVideo}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 160,
          offset: 160 * index,
          index,
        })}
      />
    </View>
  );
}

export default memo(VideoList);
