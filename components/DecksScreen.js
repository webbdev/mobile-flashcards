import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { getDecks, loadInitialDecks } from "../utils/api";

export default class HomeScreen extends React.Component {
  state = {
    decks: null,
  }

  static navigationOptions = {
    title: 'Your Decks',
  };

  componentDidMount() {
    loadInitialDecks();
    getDecks().then((decks) => {this.setState({decks: decks})});
  }

  componentDidUpdate() {
      getDecks().then((decks) => {this.setState({decks: decks})});
  }

  deckButton = ({deck}) => {
    return (
      <TouchableWithoutFeedback
        key={deck.title}
        onPress={() => this.props.navigation.navigate('DeckView', {
          deckID: deck.title,
        })}
      >
      <View style={styles.deckItem}>
        <Text style={styles.deckTitle}>{deck.title} Quiz</Text>
        <Text style={styles.cardNumber}>Cards: {deck.questions.length}</Text>
      </View>
    </TouchableWithoutFeedback>
    )
  }

  render() {
    const decksOverview = [];
    if (this.state.decks) {
        Object.keys(this.state.decks).forEach((key, _index) => {
          decksOverview.push(this.deckButton({deck: this.state.decks[key]}));
        });
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.startedContainer}>
            <Text style={styles.startedText}>
                Your Decks
            </Text>
            {decksOverview}
          </View>
        </ScrollView>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5
  },
  startedContainer: {
    alignItems: 'center',
    marginTop: 40
  },
  startedText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 10
  },
  deckItem: {
    width: 270,
    backgroundColor: '#fff7f7',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowRadius: 1,
    shadowOpacity: 1,
    elevation: 1
  },
  deckTitle: {
    marginBottom: 7,
    fontSize: 18,
    color: '#1a1a1a',
  },
  cardNumber: {
    color: '#4d4d4d',
    fontSize: 15
  }
});
