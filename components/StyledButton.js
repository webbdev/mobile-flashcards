import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const StyledButton = (props) => (
  <TouchableOpacity 
    style={styles.button}
    onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 15,
    margin: 10,
    backgroundColor: '#1300a9',
    width: 200,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'rgba(0, 0, 0, .4)',
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 3
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  }
});

export default StyledButton;