/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
 

} from 'react-native';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';

import FolderScreen from './src/Screens/FolderScreen'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.primary,
    primary: '#1aa3ff',
    // accent: '#ff9900',
  },
};

const App=() => {
 

  return (
    <PaperProvider theme={theme}>
       
  <FolderScreen/>
  </PaperProvider>
  );
};


export default App;
