import React, {useEffect, useState, memo} from 'react';
import {
  Image,
  View,
  TouchableNativeFeedback,
  Platform,
  FlatList,
  StyleSheet,
} from 'react-native';
import {readDir} from 'react-native-fs';

import {isVideo} from '../Helper';
import {Paragraph,ProgressBar,Colors} from 'react-native-paper';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import ListAppbar from '../Components/ListAppbar';

let VidListArray;

// {route.params.path}

function VideoList({route, navigation}) {
  const [FileList, setFile] = useState([]);
  const [ShowAppBar, setShowAppBar] = useState(null);
  const [ShowFilteredData,setShowFilteredData]=useState(false);
  const [FilteredData,setFilteredData]=useState([]);


  useEffect(() => {
    VidListArray = [];
    console.log(route.params.path)
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
        onPress={() =>
          navigation.navigate('Player', {uri: item.path, filename: item.name})
        }
        onLongPress={() => {
          setShowAppBar(item.id);
        }}>
        <View
          style={[
            styles.card,
            ShowAppBar === item.id ? styles.selectedCard : null,
          ]}>
          <Image
            source={{uri: `file://${item.path}`}}
            resizeMode="cover"
            style={styles.image}
          />
          <Paragraph numberOfLines={3}> {item.name}</Paragraph>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const EmptyVideo = () => {
    return <Paragraph>No video Found in this folder</Paragraph>;
  };
  

  const FilterChange=(data)=>{
    setFilteredData(data);
    setShowFilteredData(true)

  }
  const OnSort=(data)=>{
    setFile(data)
  }
  const onSearchBarClosed=(ShowSearch)=>{
    setShowFilteredData(!ShowSearch);
  }

  return (
    <View style={{flex: 1}}>
      <OrientationLocker orientation={PORTRAIT} />
      <ListAppbar FileList={FileList} onFilterChange={FilterChange} onSearchBarClosed={onSearchBarClosed} OnSort={OnSort}  />
      <FlatList
        // src: https://stackoverflow.com/questions/51742856/sorting-react-native-flatlist/51743104 in next line
        data={!ShowFilteredData?FileList:FilteredData}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        numColumns={2}
        ListEmptyComponent={EmptyVideo}
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
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

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 160,
    margin: 10,
    justifyContent: 'center',
  },
  image: {
    height: 110,
    borderRadius: 10,
  },
  selectedCard: {
    backgroundColor: 'rgba(0, 0, 1, .4)',
  },
});

