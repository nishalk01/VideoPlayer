import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Appbar,
  RadioButton,
  Searchbar,
  Portal,
  Dialog,
  Paragraph,
  Button,
} from 'react-native-paper';
import filter from 'lodash.filter';
import {goBack} from '../RootNavigation';

export default function ListAppbar({
  FileList,
  onFilterChange,
  onSearchBarClosed,
  OnSort,
  OnselectCopy,
  OnDeleteFiles,
}) {
  const [ShowSearch, setShowSearch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Query, setQuery] = useState('');
  const [sort, setSort] = useState(null);
  const [selectDelete, setSelectDelete] = useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const contains = ({name}, query) => {
    //src: https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric for the below regex
    const afterFormattingName = name.replace(/[^a-z0-9]/gi, '').toLowerCase();
    if (afterFormattingName.includes(query)) {
      return true;
    }
    return false;
  };
  //src: https://blog.crowdbotics.com/add-search-bar-flatlist-react-native-apps/ for search bar logic
  const handleSearch = query => {
    const FormattedQuery = query.toLowerCase();
    const data = filter(FileList, eachVid => {
      return contains(eachVid, FormattedQuery);
    });
    onFilterChange(data);
    setQuery(query);
  };

  const onSelectSort = () => {
    // also change order if sort is not null
    if (sort != null) {
      let afterSortList;

      if (sort === 'time') {
        afterSortList = FileList.sort((a, b) => {
          const val = Date.parse(b.mtime) - Date.parse(a.mtime);
          return val;
        });
        OnSort(afterSortList);
      } else if (sort === 'alphabet') {
        afterSortList = FileList.sort((a, b) => a.name.localeCompare(b.name));
        OnSort(afterSortList);
      }

      hideDialog();
    }
  };
  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Select Sort by</Dialog.Title>
          <Dialog.Content>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="time"
                status={sort === 'time' ? 'checked' : 'unchecked'}
                onPress={() => setSort('time')}
              />
              <Paragraph>TIME</Paragraph>
            </View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="alphabet"
                status={sort === 'alphabet' ? 'checked' : 'unchecked'}
                onPress={() => setSort('alphabet')}
              />
              <Paragraph>NAME</Paragraph>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onSelectSort}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        {/* TODO add ref to get navigation */}
        <Appbar.Content title="VideoPlayer 📽" subtitle={'List'} />
        <Appbar.Action
          icon={ShowSearch ? 'magnify-close' : 'magnify'}
          onPress={() => {
            setShowSearch(!ShowSearch);
            if (ShowSearch === true) {
              setQuery('');
              onSearchBarClosed(ShowSearch);
            }
          }}
        />
        <Appbar.Action
          icon={selectDelete ? 'cancel' : 'file-multiple'}
          onPress={() => {
            OnselectCopy();
            setSelectDelete(!selectDelete);
          }}
        />

        <Appbar.Action
          icon={selectDelete ? 'delete' : 'sort-variant'}
          onPress={
            // delete action
            () => {
              if (!selectDelete) {
                showDialog();
              } else {
                console.log('do deleting');
                OnDeleteFiles()
              }
            }
          }
        />
      </Appbar.Header>
      {ShowSearch ? (
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={Query}
        />
      ) : null}
    </>
  );
}
