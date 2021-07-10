import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Animated} from 'react-native';
import {IconButton, Colors,Paragraph} from 'react-native-paper';
import Video from 'react-native-video';
import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
import {
  TapGestureHandler,
  State,
  Swipeable,
} from 'react-native-gesture-handler';
import Slider from 'react-native-slider';

function PlayerPage({route, navigation}) {
  const videoPlayer = useRef(null);
  // const fadeAnim = useRef(new Animated.Value(0)).current

  const [isPaused, setisPaused] = useState(false);
  const [Rotate, setRotate] = useState(false);
  const [ShowControls, setShowControls] = useState(true);
  const [CurrentDuration, setCurrentDuration] = useState(0);
  const [SliderValue, setSliderValue] = useState(1);
  const [Volume, setVolume] = useState(10);
  const [Duration,setDuration]=useState(0);

  const onEnd = () => {
    if(videoPlayer){
      videoPlayer.current.seek(0)
    }
   
    console.log('has ended');
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
  };
  
  const slideToChangeTime=(sliderVal)=>{
   
   
     setSliderValue(sliderVal);
     const x=Duration/100;
  
     //75 is val of slider that will be 75*x of the video duration ,100 is max value of slider
     try{
      videoPlayer.current.seek(Number(((x*sliderVal).toFixed(0))))
     }
     catch(err){
       console.log(err)
     
     }
   


  }
  // media controls

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {ShowControls ? (
        <View
          style={{
            width: '100%',
            height: 55,
            backgroundColor: 'rgba(0, 0, 0, .4)',
            top: 0,
            position: 'absolute',
       
            zIndex: 10,
            flexDirection:"row",
            alignItems:"center",
           
          }}>
             <IconButton
              icon="arrow-left"
              color={Colors.white}
              size={30}
              onPress={() => navigation.goBack()}
            />
           
            <Paragraph numberOfLines={1} style={{ flex:3,marginRight:10 }}>{route.params.filename}</Paragraph>
            <View  style={{ flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",marginLeft:20 }}>
            <IconButton
            
            icon="arrow-left"
            color={Colors.white}
            size={30}
            onPress={() => setisPaused(!isPaused)}
          />
          
            <IconButton
              icon="music-note-eighth"
              // icon={Mute?"music-note-off":"music-note-eighthmusic-note-eighth"}
              color={Colors.white}
              size={30}
              onPress={() => console.log("nute")}
            />
             <IconButton
              icon="arrow-left"
              color={Colors.white}
              size={30}
              onPress={() => setisPaused(!isPaused)}
            />
             </View>
          </View>
      ) : null}

      <TapGestureHandler
        onHandlerStateChange={e => {
          if (e.nativeEvent.state === State.ACTIVE) {
            //  Animated.timing(
            //   fadeAnim,
            //   {
            //     toValue: 1,
            //     duration: 10000,
            //   }
            // ).start();
            setShowControls(!ShowControls);
          }
        }}>
        <View style={{flex: 1}}>
          <StatusBar hidden={true} />
          <OrientationLocker
            orientation={Rotate ? PORTRAIT : LANDSCAPE}
            // onChange={orientation => console.log('onChange', orientation)}
          />
          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            onError={onError}
            paused={isPaused}
            muted={false}
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

      {ShowControls ? (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, .4)',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text >43:22</Text>
            <Slider
              maximumValue={100}
              minimumValue={1}
              minimumTrackTintColor="#1aa3ff"
              maximumTrackTintColor="#ffffff"
              thumbTintColor="#1aa3ff"
              value={SliderValue}
              disabled={false}
              tapToSeek={true}
              style={{width: '90%',flex:1,marginHorizontal:1}}
              onValueChange={slideToChangeTime}
            />
           <Text >43:22</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              height: 65,
            }}>
            <IconButton
              icon="lock"
              color={Colors.white}
              size={30}
              style={{alignSelf: 'center'}}
            />

            <IconButton
              icon="skip-previous"
              color={Colors.white}
              size={40}
              onPress={() => videoPlayer.current.seek(CurrentDuration - 10)}
            />
            <IconButton
              icon={isPaused ? 'play' : 'pause'}
              color={Colors.white}
              size={40}
              onPress={() => setisPaused(!isPaused)}
            />
            <IconButton
              icon="skip-next"
              color={Colors.white}
              size={40}
              onPress={() => videoPlayer.current.seek(  CurrentDuration + 10)}
            />
            <IconButton
              icon="arrow-all"
              color={Colors.white}
              size={35}
              onPress={() => videoPlayer.current.seek(CurrentDuration + 10)}
              style={{alignSelf: 'center', transform: [{rotateZ: '45deg'}]}}
            />
          </View>
        </View>
      ) : null}

      {ShowControls ? (
        <IconButton
          icon="screen-rotation"
          color={!Rotate ? Colors.blue400 : Colors.grey700}
          size={30}
          style={{position: 'absolute', top: 50, left: 5}}
          onPress={() => setRotate(!Rotate)}
        />
      ) : null}
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
