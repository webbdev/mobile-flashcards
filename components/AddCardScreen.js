import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { addCard } from "../utils/api";

export default class AddCardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Add Card'
        }
    }

    render() {
        const { navigation } = this.props;
        const deckID = navigation.getParam('deckID', '');
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Question'
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}
                    editable={true}
                 />
                <TextInput
                    style={styles.input}
                    placeholder='Answer'
                    onChangeText={(text) => this.setState({answer: text})}
                    value={this.state.answer}
                    editable={true}
                />
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.btn}
                        disabled={this.state.answer === '' || this.state.question === ''}
                        onPress={() => {
                            addCard(deckID, {
                                question: this.state.question,
                                answer: this.state.answer,
                            });
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff7f7'
    },
    error: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'red'
    },
    input: {
        backgroundColor: '#fff',
        width: 300,
        height: 46,
        fontSize: 17,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 20,
        marginBottom: 15
    },
    buttonWrapper: {
      alignItems: "center",
      marginTop: 15
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
    }
});
