import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getDeck} from "../utils/api";
import { clearNotification, setNotification } from "../utils/notifications";
import StyledButton from './StyledButton';

export default class DeckOverviewScreen extends React.Component {
    state = {
        deck: null,
    }

    componentDidMount() {
        const {navigation} = this.props;
        const deckID = navigation.getParam('deckID', '');
        getDeck(deckID).then((deck) => {this.setState({deck: JSON.parse(deck)})});
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Deck View'
        }
    }

    render() {
        const {navigation} = this.props;
        const deckID = navigation.getParam('deckID', '');
        if (this.state.deck) {
            return (
                <View style={styles.deckCard}>
                    <View>
                        <Text style={styles.title}>{this.state.deck.title} Quiz</Text>
                        <Text style={styles.cardNumber}>This deck has {this.state.deck.questions.length} card{this.state.deck.questions.length <= 1 ? '' : 's'}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                    navigation.navigate('QuizScreen', {
                                    deckID: deckID,
                                });
                            this.resetNotification();
                            }}
                        >
                            <Text style={styles.btnText}>Start Quiz</Text>
                        </TouchableOpacity>
                        <StyledButton 
                            text='Add Card'
                            onPress={() => {
                            navigation.navigate('AddCardScreen', {
                                deckID: deckID,
                            });
                            }}
                        />
                    </View>

                </View>
            );
        } else {
            return null;
        }
    }

    resetNotification() {
        clearNotification().then(setNotification);
    }
}

const styles = StyleSheet.create({
    deckCard: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 25,
      backgroundColor: '#fff7f7'
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    cardNumber: {
      fontSize: 16,
      textAlign: 'center'
    },
    btn: {
      backgroundColor: '#d87484',
      padding: 15,
      margin: 10,
      width: 200,
      shadowOffset: { width: 3, height: 3 },
      shadowColor: 'rgba(0, 0, 0, .4)',
      shadowRadius: 4,
      shadowOpacity: 1,
      elevation: 3
    },
    btnText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold'
    },
    btn1: {
      backgroundColor: '#000',
      padding: 15,
      margin: 10,
      width: 200,
      shadowOffset: { width: 3, height: 3 },
      shadowColor: 'rgba(0, 0, 0, .4)',
      shadowRadius: 4,
      shadowOpacity: 1,
      elevation: 3
    }    
});
