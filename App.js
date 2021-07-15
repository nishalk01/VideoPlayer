/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
// screens
import FolderScreen from './src/Screens/FolderScreen';
import VideoList from './src/Screens/VideoList';
import PlayerPage from './src/Screens/PlayerPage';

import { navigationRef } from './src/RootNavigation';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1aa3ff',
    accent: '#ff9900',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
      <PaperProvider theme={theme}>
          <StatusBar backgroundColor="#1aa3ff" hidden={false} />
        <NavigationContainer ref={navigationRef}>
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
            />

            <Stack.Screen
              name="Player"
              options={{headerShown: false}}
              component={gestureHandlerRootHOC(PlayerPage)}
            />
          
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
};

export default App;
