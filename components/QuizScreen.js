import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { getDeck } from "../utils/api";
import StyledButton from './StyledButton';

export default class QuizScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            idx: 0,
            correct: 0,
            showQuestion: true,
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const deckID = navigation.getParam('deckID', '');
        getDeck(deckID).then((deck) => {
                const questions = JSON.parse(deck).questions;
                this.rndQuestions(questions);
                this.setState({questions: questions});
            }
        );
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Quiz'
        }
    }

    render() {
        if(this.state.questions === null || this.state.questions === undefined) {
            return null;
        } else if(this.state.questions.length === 0) {
            return (
                <View style={styles.quizContainer}>
                    <Text style={styles.questionText}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
                </View>
            );
        } else if (this.state.questions.length !== this.state.idx) {
            const question = this.state.questions[this.state.idx];
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.quizProgress}>
                        <Text>
                            Card {this.state.idx+1} of {this.state.questions.length}
                        </Text>
                    </View>
                    <View style={styles.quizContainer}>
                        <Text style={styles.questionText}>
                            {this.state.showQuestion ? question.question : question.answer}
                        </Text>
                        <Button
                            style={styles.showAnswer}
                            title={this.state.showQuestion ? 'Show Answer' : 'Show Question'}
                            onPress={this.flipBtn}
                        />
                        <View>
                            <TouchableOpacity
                                style={styles.btn1}
                                text='Correct'
                                onPress={this.correctQstn}
                            >
                                <Text style={styles.btnText}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btn2}
                                text='Incorrect'
                                onPress={this.progressQstn}
                            >
                                <Text style={styles.btnText}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.quizContainer}>
                    <View>
                        <Text style={styles.questionText}>
                            Quiz Complete!
                        </Text>
                        <Text style={styles.resultCardText}>
                            You have answered {Math.round(((this.state.correct)/this.state.questions.length)*100)}% Correct!
                        </Text>
                    </View>
                    <View>
                        <StyledButton
                            text='Restart Quiz'
                            onPress={() => {
                                this.rndQuestions(this.state.questions);
                                this.setState({
                                    idx: 0,
                                    correct: 0,
                                    showQuestion: true,
                                });
                            }}
                        />
                        <TouchableOpacity
                            style={styles.btn3}
                            text='Back to Deck'
                            onPress={() => {
                                this.props.navigation.navigate('DeckView', {
                                    deckID: this.props.navigation.getParam('deckID', ''),
                                });
                            }}
                        >
                            <Text style={styles.btnText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    flipBtn = () => {
        this.setState(prevState => ({
            showQuestion: !prevState.showQuestion,
            correct: prevState.correct,
            idx: prevState.idx,
            questions: prevState.questions,
        }));
    }

    rndQuestions = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    correctQstn = () => {
        this.setState(prevState => ({
            correct: prevState.correct+1,
            idx: prevState.idx+1,
            questions: prevState.questions,
            showQuestion: true,
        }));
    }

    progressQstn = () => {
        this.setState(prevState => ({
            idx: prevState.idx+1,
            showQuestion: true,
            correct: prevState.correct,
            questions: prevState.questions,
        }));
    }
}

const styles = StyleSheet.create({
    quizProgress: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 8,
      backgroundColor: '#B7B4D0'
    },
    quizContainer: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 25,
      backgroundColor: '#fff7f7',
    },
    questionText: {
      fontSize: 22,
      marginBottom: 5,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    answerText: {
      fontSize: 26,
      marginBottom: 5,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'blue'
    },
    showAnswer: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue'
    },
    btn1: {
        backgroundColor: 'green',
        padding: 15,
        margin: 10,
        width: 200,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'rgba(0, 0, 0, .4)',
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 3
    },
    btn2: {
        backgroundColor: 'red',
        padding: 15,
        margin: 10,
        marginTop: 15,
        width: 200,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'rgba(0, 0, 0, .4)',
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 3
    },
    btn3: {
        backgroundColor: '#666',
        padding: 15,
        margin: 10,
        marginTop: 15,
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
    resultCardText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#4d4d4d',
        marginTop: 20
    },
});
