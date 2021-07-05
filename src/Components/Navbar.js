import React from 'react';
import {Appbar} from 'react-native-paper';

export default function Navbar() {
    return (
        <Appbar.Header dark={true}>
        {/* <Appbar.BackAction onPress={()=>{console.log("helo")}} /> */}
        <Appbar.Content  title="VideoPlayer 📽"  />
        <Appbar.Action icon="dots-vertical" onPress={()=>console.log("hello")} />
        {/* <Menu
            ref={MenuRef}
            button={<Appbar.Action icon="dots-vertical" onPress={showMenu} />}
          >
            <MenuItem onPress={hideMenu}>New Group</MenuItem>
            <MenuItem onPress={hideMenu}>New Broadcast</MenuItem>
            <MenuItem onPress={hideMenu}>Settings</MenuItem>
            <MenuItem onPress={gotoQRscan}>Scan QRCode</MenuItem>
          </Menu> */}
      </Appbar.Header>
    )
}
