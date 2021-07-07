import React,{useState} from 'react';
import { StyleSheet } from 'react-native'
import {Appbar,Divider,Paragraph} from 'react-native-paper';
import {
        Menu,
        MenuOption,
        MenuOptions,
        MenuTrigger
          } from 'react-native-popup-menu';


export default function Navbar() {
 
   
  return (
    <Appbar.Header dark={true}>
      {/* <Appbar.BackAction onPress={()=>{console.log("helo")}} /> */}
      <Appbar.Content title="VideoPlayer 📽" />
     
          <Menu onBackdropPress={()=>console.log("hello")}>
      <MenuTrigger>
      <Appbar.Action icon="dots-vertical"/>
      </MenuTrigger>
      <MenuOptions >
      
            <MenuOption onSelect={() => alert(`Save`)}  style={styles.menuoption}>
    
            <Paragraph style={styles.menutxt}>Select Folder</Paragraph>
    
            </MenuOption>
            <Divider/>
            <MenuOption onSelect={() => {}} style={styles.menuoption}>
              <Paragraph style={styles.menutxt}>Select File to serve</Paragraph>
            </MenuOption>
            <Divider/>
            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
     
          <MenuOption onSelect={() => {}}  style={styles.menuoption}>
    
    <Paragraph style={styles.menutxt}>yo</Paragraph>

    </MenuOption>

    
        </MenuOptions>    
  
    </Menu>
    

    </Appbar.Header>
   
  );
}


const styles=StyleSheet.create({
  menuoption:{
    paddingVertical:10
  },
  menutxt:{
    textAlign:"center"
  }
})