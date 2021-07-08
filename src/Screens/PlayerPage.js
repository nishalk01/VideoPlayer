import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar,Animated} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import Video from 'react-native-video';
import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import {
  TapGestureHandler,
  State,
  PanGestureHandler,
} from 'react-native-gesture-handler';

function PlayerPage({route, navigation}) {
  const videoPlayer = useRef(null);
  // const fadeAnim = useRef(new Animated.Value(0)).current 

  const [isPaused, setisPaused] = useState(false);
  const [Rotate, setRotate] = useState(false);
  const [ShowControls, setShowControls] = useState(true);
  const [CurrentDuration, setCurrentDuration] = useState(0);

  const onEnd = () => {
    console.log('has ended');
  };

  const onLoad = data => {
    // console.log(data.duration);
    
    

  };
  const onLoadStart = () => {
    // console.log('video startted?');
  };
  const onError = err => {
    console.log(err);
  };
  const onProgress = data => {
    // Video Player will progress continue even if it ends
      setCurrentDuration(data.currentTime)
  };



  // media controls

  useEffect(() => {
    return () => {
      setRotate(false);
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <TapGestureHandler
        onHandlerStateChange={(e) =>{
          if (e.nativeEvent.state === State.ACTIVE) {
             
            //  Animated.timing(
            //   fadeAnim,
            //   {
            //     toValue: 1,
            //     duration: 10000,
            //   }
            // ).start();
            setShowControls(!ShowControls)
          }
        }
         
        }>
        <View style={{flex: 1}}>
          <StatusBar hidden={true} />
          <OrientationLocker
            orientation={Rotate ? LANDSCAPE : PORTRAIT}
            // onChange={orientation => console.log('onChange', orientation)}
          />

          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            onError={onError}
            paused={isPaused}
            // controls={true}
            fullscreen={Rotate}
            fullscreenAutorotate={true}
            resizeMode="contain" //provide options for selection if its in fullscreen mode
            fullscreenOrientation="landscape"
            ref={videoPlayer}
            // onFullScreen={isFullScreen}
            source={{
              uri: String(route.params.uri),
            }}
            style={styles.backgroundVideo}
            // playInBackground={true}
            volume={10}
          />
        </View>
      </TapGestureHandler>
{ShowControls?( <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, .2)',
          borderColor: 'white',
          borderStyle: 'solid',
          borderTopWidth: 1,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
          
        <IconButton
          icon="fast-forward"
          color={Colors.white}
          style={{ transform:[{ rotateZ:"180deg" }]}}
          size={40}
          onPress={() => videoPlayer.current.seek(CurrentDuration-10)}
        />
        <IconButton
          icon={isPaused ? 'play' : 'pause'}
          color={Colors.white}
          size={40}
          onPress={() => setisPaused(!isPaused)}
        />
        <IconButton
          icon="fast-forward" 
          color={Colors.white}
          size={40}
          onPress={() => videoPlayer.current.seek(CurrentDuration+10)}
        />
      </View>):null}
     
     

     {ShowControls?(<IconButton
        icon="screen-rotation"
        color={Rotate?Colors.blue400:Colors.grey700}
        size={30}
        style={{ position:"absolute",top:50,left:5 }}
        onPress={() => setRotate(!Rotate)}
      />):null} 

    </View>
  );
}

export default PlayerPage;

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
