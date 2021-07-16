import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {IconButton, Colors, Paragraph} from 'react-native-paper';
import Video from 'react-native-video';
import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import {
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Slider from 'react-native-slider';
import GestureRecognizer from 'react-native-swipe-gestures';

import { secondsToHms } from '../Helper';

function PlayerPage({route, navigation}) {
  const videoPlayer = useRef(null);
  // const fadeAnim = useRef(new Animated.Value(0)).current

  const [isPaused, setisPaused] = useState(false);
  const [Rotate, setRotate] = useState(false);
  const [ShowControls, setShowControls] = useState(true);
  const [CurrentDuration, setCurrentDuration] = useState(0);
  const [SliderValue, setSliderValue] = useState(1);

  const [Duration, setDuration] = useState(0);
  const [Locked, setLocked] = useState(false);
  // for hiding lock after 2 second timeout
  const [HideLockTime, setHideLockTime] = useState(false);
  const [VideoWidth, setVideoWidth] = useState(0);
  const onEnd = () => {
    if (videoPlayer) {
      videoPlayer.current.seek(0);
      setSliderValue(0);
    }

  
  };

  const onLoad = data => {
    setDuration(data.duration);
  };
  const onLoadStart = () => {
    // console.log('video startted?');
  };
  const onError = err => {
    console.log(err);
  };
  const onProgress = data => {
    // Video Player will progress continue even if it ends
    setCurrentDuration(data.currentTime);
    const single_val = Duration / 100;
    setSliderValue(CurrentDuration / single_val);
  };

  const slideToChangeTime = sliderVal => {
    setSliderValue(sliderVal);
    const x = Duration / 100;

    //75 is val of slider that will be 75*x of the video duration ,100 is max value of slider
    try {
      videoPlayer.current.seek(Number((x * sliderVal).toFixed(0)));
    } catch (err) {
      console.log(err);
    }
  };
  // media controls

  // useEffect(() => {
  //   const unsubscribe=navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  //     if (Locked===false) {
  //             navigation.navigate("VideoList")
  //       // If we don't have unsaved changes, then we don't need to do anything
  //       return;
  //     }
  //     else if(Locked===true){

  //       // if lock button is active then avoid user from exiting the page
  //       showToastWithGravityAndOffset("Please unlock to exit video")

  //     }

  //   })
  //   return unsubscribe;

  // }, [navigation,Locked])

  const changeVidWidth =
    VideoWidth == 0 ? 'contain' : VideoWidth == 1 ? 'cover' : 'stretch';

  return (
    <View style={styles.container}>
      {ShowControls ? (
        <View
          style={styles.controlContainer}>
          <IconButton
            icon="arrow-left"
            color={Colors.white}
            size={30}
            onPress={() => navigation.goBack()}
          />

          <Paragraph
            numberOfLines={1}
            style={{flex: 3, marginRight: 10, color: 'white'}}>
            {route.params.filename}
          </Paragraph>
        </View>
      ) : null}

      <TapGestureHandler
        onHandlerStateChange={e => {
          if (e.nativeEvent.state === State.ACTIVE) {
            if (Locked === false) {
              setShowControls(!ShowControls);
            } else if (Locked === true) {
              setHideLockTime(!HideLockTime);
            }
          }
        }}>
        <View style={{flex: 1}}>
          <StatusBar hidden={true} />
          <OrientationLocker orientation={Rotate ? PORTRAIT : LANDSCAPE} />
          <GestureRecognizer
            style={{flex: 1}}
            onSwipeLeft={gestureState => {
              const val_scale = (10 * (Math.abs(gestureState.dx) - 28)) / 778;
              videoPlayer.current.seek(CurrentDuration - 50 * val_scale);
            }}
            // 28 and 750

            onSwipeRight={gestureState => {
              const val_scale = (10 * (Math.abs(gestureState.dx) - 28)) / 778;
              videoPlayer.current.seek(CurrentDuration + 50 * val_scale);
            }}
            >
            <Video
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              onProgress={onProgress}
              onError={onError}
              paused={isPaused}
              fullscreen={Rotate}
              fullscreenAutorotate={true}
              resizeMode={changeVidWidth}
              //provide options for selection if its in fullscreen mode
              fullscreenOrientation="landscape"
              ref={videoPlayer}
              source={{
                uri: String(route.params.uri),
              }}
              style={styles.backgroundVideo}
              // playInBackground={true}
            />
            {/* volume slider */}
          </GestureRecognizer>
        </View>
      </TapGestureHandler>

      {ShowControls ? (
        <View
          style={styles.bottomSildeControls}>
          <View
            style={styles.SilderContainer}>
            <Text  style={{ color:"white"}}> {secondsToHms(CurrentDuration)}</Text>
            <Slider
              maximumValue={100}
              minimumValue={0}
              minimumTrackTintColor="#1aa3ff"
              maximumTrackTintColor="#ffffff"
              thumbTintColor="#1aa3ff"
              value={SliderValue}
              disabled={false}
              tapToSeek={true}
              style={{width: '90%', flex: 1, marginHorizontal: 1}}
              onValueChange={slideToChangeTime}
            />
            <Text style={{ color:"white"}}>{ secondsToHms(Duration)}</Text>
          </View>

          <View
            style={styles.bottomIconContainer}>
            <IconButton
              icon="lock"
              color={Colors.white}
              size={30}
              style={{alignSelf: 'center'}}
              onPress={() => {
                setLocked(true);
                setShowControls(false);
                setTimeout(() => {
                  setHideLockTime(false);
                }, 2000);
              }}
            />

            <IconButton
              icon="skip-previous"
              color={Colors.white}
              size={40}
              onPress={() => {
                if (CurrentDuration > 1) {
                  setCurrentDuration(CurrentDuration - 10);
                  videoPlayer.current.seek(CurrentDuration - 10);
                } else if (CurrentDuration < 1) {
                  setCurrentDuration(0);
                  //  and go to previous video
                }
              }}
            />
            <IconButton
              icon={isPaused ? 'play' : 'pause'}
              color={Colors.white}
              size={40}
              onPress={() => {
                setisPaused(!isPaused);
              }}
            />
            <IconButton
              icon="skip-next"
              color={Colors.white}
              size={40}
              onPress={() => {
                setCurrentDuration(CurrentDuration + 10);
                videoPlayer.current.seek(CurrentDuration + 10);
              }}
            />
            <IconButton
              icon="arrow-all"
              color={Colors.white}
              size={35}
              onPress={() => {
                if (VideoWidth < 2) {
                  // means its passed the max choice
                  setVideoWidth(VideoWidth + 1);
                } else if (VideoWidth >= 2) {
                  setVideoWidth(0);
                }
              }}
              style={styles.skipStyles}
            />
          </View>
        </View>
      ) : null}

      <View style={styles.SRIcon}>
        {ShowControls ? (
          <IconButton
            icon="screen-rotation"
            color={!Rotate ? Colors.blue400 : Colors.grey700}
            size={30}
            onPress={() => setRotate(!Rotate)}
          />
        ) : null}

        {/* also hide after timeout */}
        {Locked && HideLockTime ? (
          <IconButton
            icon="lock"
            color={Colors.white}
            size={35}
            onPress={() => {
              setLocked(false);
              setShowControls(true);
            }}
          />
        ) : null}
      </View>
    </View>
  );
}

export default PlayerPage;

var styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: 'black'
  },
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
  controlContainer:{
    
      width: '100%',
      height: 55,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      top: 0,
      position: 'absolute',
      zIndex: 10,
      flexDirection: 'row',
      alignItems: 'center',
    
  },
  bottomSildeControls:{
      backgroundColor: 'rgba(0, 0, 0, .4)',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'flex-start',
    
  },
  SilderContainer:{
    
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    
  },
  bottomIconContainer:{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      height: 65,
    
  },
  skipStyles:{
    alignSelf: 'center', 
    transform: [{rotateZ: '45deg'}]
  },
  SRIcon:{
    position: 'absolute',
    top: 50,
    left: 5
  }

});
