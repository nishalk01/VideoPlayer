import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar,Menu} from 'react-native-paper';
import { navigate } from '../RootNavigation';



export default function Navbar({ openFolderPicker }) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header dark={true}>
      <Appbar.Content title="VideoPlayer 📽" />
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
          <Menu.Item onPress={openFolderPicker} title="Choose Folder" />
          <Menu.Item onPress={()=>navigate("ServePage")} title="Start Server" />
        </Menu>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  menuoption: {
    paddingVertical: 10,
  },
  menutxt: {
    textAlign: 'center',
  },
});
