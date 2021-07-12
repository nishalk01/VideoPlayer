import React, {useState} from 'react';
import {
  Appbar,
  RadioButton,
  Searchbar,
  Portal,
  Dialog,
  Paragraph,
  Button,
} from 'react-native-paper';
import filter from 'lodash.filter'
import {goBack} from '../RootNavigation';

export default function ListAppbar({FileList,onFilterChange,onSearchBarClosed}) {
  const [ShowSearch, setShowSearch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState('first');
  const [Query,setQuery]=useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const contains=({name},query)=>{
    //src: https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric for the below regex
    const afterFormattingName=name.replace(/[^a-z0-9]/gi,'').toLowerCase();
    if(afterFormattingName.includes(query)){
      return true
    }
    return false

  }
//src: https://blog.crowdbotics.com/add-search-bar-flatlist-react-native-apps/ for search bar logic
  const handleSearch=query=>{
    const FormattedQuery=query.toLowerCase()
    const data=filter(FileList,eachVid=>{
      return contains(eachVid,FormattedQuery)
    })
    onFilterChange(data)
    setQuery(query)

  }

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />

            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
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
            if(ShowSearch==true){
              setQuery("")
              onSearchBarClosed(ShowSearch)

            }
          }}
        />
        <Appbar.Action icon="file-multiple" onPress={() => {}} />
        <Appbar.Action icon="sort-variant" onPress={showDialog} />
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
