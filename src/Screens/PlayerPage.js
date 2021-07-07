import React,{useRef,useEffect, useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';


function PlayerPage({route,navigation}) {
    const videoPlayer = useRef(null);

    const [duration,setDuration]=useState(0);
    const [loading,setLoading]=useState(false);
    const [Paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [isFullScreen, setIsFullScreen] = useState(false);


    const onEnd=()=>{
        console.log("has ended")
    }

    const onLoad=(data)=>{
        setDuration(data.duration);
        setLoading(false);
    }
    const onLoadStart=()=>{
        console.log("video startted?")
    }
    const onError=(err)=>{
        console.log(err)

    }
    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!loading && playerState !== PLAYER_STATES.ENDED) {
          setCurrentTime(data.currentTime);
        }
      };



    // media controls
    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!Paused);
        setPlayerState(playerState);
      };

      const renderToolbar = () => (
        <View>
          <Text style={styles.toolbar}> toolbar </Text>
        </View>
      );


      const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
      };
      const onSeeking = (currentTime) => setCurrentTime(currentTime);
     
      const onFullScreen = () => {
          
        setIsFullScreen(!isFullScreen);
        // if (screenType == 'content') setScreenType('cover');
        // else setScreenType('content');
      };

    return (
        <View style={{ flex:1,backgroundColor:"#273242" }}>
          <Video
    onEnd={onEnd}
    onLoad={onLoad}
    onLoadStart={onLoadStart}
    onProgress={onProgress}
    onError={onError}
    paused={Paused}
    // controls={true}
    fullscreen={true}
    fullscreenOrientation="landscape"
    ref={videoPlayer}
    // onFullScreen={isFullScreen}
    source={{
      uri: String(route.params.uri)
    }}
    style={styles.backgroundVideo}
    volume={10}
/>

{/* 
<MediaControls
    duration={duration}
    isLoading={loading}
    mainColor="#333"
    onPaused={onPaused}
    progress={currentTime}
    // onReplay={this.onReplay}
    onSeek={onSeek}
    onFullScreen={onFullScreen}
    onSeeking={onSeeking}
    playerState={playerState}
    toolbar={renderToolbar}
/> */}
        </View>
    )
}

export default PlayerPage



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