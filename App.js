import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {setNotification} from "./utils/notifications";

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    setNotification();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar barStyle="dark-content" />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
