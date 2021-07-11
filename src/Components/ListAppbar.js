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

export default function ListAppbar() {
  const [ShowSearch, setShowSearch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = React.useState('first');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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
        <Appbar.Content title="VideoPlayer 📽" subtitle={'List'} />
        <Appbar.Action
          icon={ShowSearch ? 'magnify-close' : 'magnify'}
          onPress={() => {
            setShowSearch(!ShowSearch);
          }}
        />
        <Appbar.Action icon="file-multiple" onPress={() => {}} />
        <Appbar.Action icon="sort-variant" onPress={showDialog} />
      </Appbar.Header>
      {ShowSearch ? (
        <Searchbar
          placeholder="Search"
          onChangeText={some => console.log(some)}
          value={'email'}
        />
      ) : null}
    </>
  );
}
