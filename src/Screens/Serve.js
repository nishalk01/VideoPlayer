import StaticServer from 'react-native-static-server';
import {ExternalStorageDirectoryPath} from 'react-native-fs'
import React,{useEffect} from 'react'
import {View,Text} from 'react-native';

let path = ExternalStorageDirectoryPath 


function Serve() {
    useEffect(() => {
        let server = new StaticServer(8080, path);
        server.start().then((url) => {
            console.log("Serving at URL", url);
          });
        return () => {
            server.stop();
        }
    }, [])

    return (
        <View>
            <Text>Im probably serving </Text>
        </View>
    )
}

export default Serve
