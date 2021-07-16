import React, {useEffect, useState, memo} from 'react';
import {
  Image,
  View,
  TouchableNativeFeedback,
  Platform,
  FlatList,
  StyleSheet,
} from 'react-native';
import {readDir, unlink} from 'react-native-fs';
import filter from 'lodash.filter';

import {isVideo, showToastWithGravityAndOffset, formatBytes} from '../Helper';
import {
  Paragraph,
  Portal,
  Dialog,
  Button,
  Subheading,
} from 'react-native-paper';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import ListAppbar from '../Components/ListAppbar';

let VidListArray;

// {route.params.path}

function VideoList({route, navigation}) {
  const [FileList, setFile] = useState([]);
  const [ShowFilteredData, setShowFilteredData] = useState(false);
  const [FilteredData, setFilteredData] = useState([]);
  const [SelectedCopy, setSelectedCopy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [FileInfo, setFileInfo] = useState(null);
  const showModal = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    VidListArray = [];
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
        // console.log(err);
      });
  }, []);

  const multiListSelect = id => {
    if (!ShowFilteredData) {
      let renderData = [...FileList];
      for (let data of renderData) {
        if (data.id == id) {
          data.selected = data.selected == null ? true : !data.selected;
          break;
        }
      }
      setFile(renderData);
    } else {
      showToastWithGravityAndOffset(
        'Cannot select files when search is in progress',
      );
    }
  };

  const renderVideoItem = ({item}) => {
    return (
      <TouchableNativeFeedback
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackground()
            : ''
        }
        onPress={() => {
          if (!SelectedCopy) {
            //selected for deletion
            navigation.navigate('Player', {
              uri: item.path,
              filename: item.name,
            });
          } else {
            multiListSelect(item.id);
          }
        }}
        onLongPress={() => {
          setFileInfo(item);
          showModal();
        }}>
        <View
          style={[
            styles.card,
            item.selected && SelectedCopy ? styles.selectedCard : null,
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

  const FilterChange = data => {
    setFilteredData(data);
    setShowFilteredData(true);
  };
  const OnSort = data => {
    setFile(data);
  };
  const onSearchBarClosed = ShowSearch => {
    setShowFilteredData(!ShowSearch);
  };

  const OnselectCopy = () => {
    setSelectedCopy(!SelectedCopy);
  };

  const OnDeleteFiles = () => {
    // start deleting files here

    let renderData = [...FileList];

    const FilteredData = filter(renderData, EachVidData => {
      if (EachVidData.selected) {
        unlink(EachVidData.path)
          .then(() => {
            return false;
          })
          .catch(err => {
            // console.log(err.message)
          });
      } else {
        return true;
      }
    });
    setFile(FilteredData);
    // setFile(FilteredData);
  };

  const getDate = str => {
    return String(new Date(str));
  };
  return (
    <View style={{flex: 1}}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>File info</Dialog.Title>
          <Dialog.Content>
            {FileInfo ? (
              <>
                <Subheading style={styles.DialogContentStyle}>Name:</Subheading>
                <Paragraph>{FileInfo.name}</Paragraph>
                <Subheading style={styles.DialogContentStyle}>
                  FileSize:
                </Subheading>
                <Paragraph>{formatBytes(FileInfo.size)}</Paragraph>
                <Subheading
                  style={[styles.DialogContentStyle, {fontStyle: 'italic'}]}>
                  PATH:
                </Subheading>
                <Paragraph>{FileInfo.path}</Paragraph>
                <Subheading style={styles.DialogContentStyle}>
                  LAST MODIFIED TIME:
                </Subheading>
                <Paragraph>{getDate(FileInfo.mtime)}</Paragraph>
              </>
            ) : (
              <Paragraph>Something went wrong</Paragraph>
            )}
            <Paragraph></Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <OrientationLocker orientation={PORTRAIT} />
      <ListAppbar
        FileList={FileList}
        onFilterChange={FilterChange}
        onSearchBarClosed={onSearchBarClosed}
        OnSort={OnSort}
        OnselectCopy={OnselectCopy}
        OnDeleteFiles={OnDeleteFiles}
      />
      <FlatList
        // src: https://stackoverflow.com/questions/51742856/sorting-react-native-flatlist/51743104 in next line
        data={!ShowFilteredData ? FileList : FilteredData}
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
  DialogContentStyle: {
    fontWeight: '800',
    fontSize: 17,
    textDecorationLine: 'underline',
    paddingTop: 8,
  },
});
