/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import FolderScreen from './src/Screens/FolderScreen';
import VideoList from './src/Screens/VideoList';
import PlayerPage from './src/Screens/PlayerPage';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.primary,
    primary: '#1aa3ff',
    // accent: '#ff9900',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <MenuProvider>

   
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="FolderScreen"
            options={{headerShown: false}}
            component={FolderScreen}
          />
          <Stack.Screen
            name="VideoList"
            options={{headerShown: false}}
            component={VideoList}
            options={{
              animationEnabled: false,
            }}
          />

        <Stack.Screen
            name="Player"
            options={{headerShown: false}}
            component={PlayerPage}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </MenuProvider>
  );
};

export default App;
