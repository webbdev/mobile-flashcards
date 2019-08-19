import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { addDeck } from "../utils/api";

export default class AddDeckScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    What's the title of your new deck?
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Deck Title'
                    onChangeText={(text) => this.setState({title: text})}
                    value={this.state.title}
                    editable={true}
                />
                <TouchableOpacity
                    style={styles.btn}
                    text='Create Deck'
                    disabled={this.state.title === ''}
                    onPress={() => {
                        addDeck(this.state.title);
                        this.props.navigation.navigate('DeckView', {
                            deckID: this.state.title,
                        });
                    }}
                >
                    <Text style={styles.btnText}>Create Deck</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10
    },
    input: {
      backgroundColor: '#fff',
      width: 300,
      height: 46,
      fontSize: 17,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      marginTop: 15,
      marginBottom: 20
    },
    btn: {
        backgroundColor: '#1300a9',
        padding: 15,
        margin: 10,
        width: 200,
        /*shadowOffset: { width: 3, height: 3 },
        shadowColor: 'rgba(0, 0, 0, .4)',
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 3*/
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
});

