import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Divider,Menu} from 'react-native-paper';


export default function Navbar() {
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
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
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
