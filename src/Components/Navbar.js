import React, {useState} from 'react';
import {Appbar, Menu} from 'react-native-paper';

export default function Navbar({openFolderPicker}) {
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
      </Menu>
    </Appbar.Header>
  );
}

