import { AsyncStorage } from 'react-native';

const data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    History: {
        title: 'History',
        questions: [
            {
                question: 'The Magna Carta was signed in Rome.',
                answer: 'Incorrect'
            },
            {
                question: 'Mexico achieved independence before USA.',
                answer: 'Incorrect'
            },
            {
                question: 'Cleopatra had a child with Julius Ceasar.',
                answer: 'Correct'
            }
        ]
    },
    Geography: {
        title: 'Geography',
        questions: [
            {
                question: 'Iceland is covered in ice.',
                answer: 'Incorrect'
            },
            {
                question: 'Madrid is more easterly than London.',
                answer: 'Incorrect'
            },
            {
                question: 'There are more countries in Africa than Asia.',
                answer: 'Correct'
            },
            {
                question: 'Brasilia is the capital city of Brazil.',
                answer: 'Correct'
            }
        ]
    },
    Language: {
        title: 'Language',
        questions: [
            {
                question: 'Bengali is the most spoken language in India.',
                answer: 'Incorrect'
            },
            {
                question: 'South Africa has 11 official languages.',
                answer: 'Correct'
            },
            {
                question: 'There are 24 letters in the Greek alphabet.',
                answer: 'Correct'
            },
            {
                question: 'There are more 5 letter words than 12 letter words.',
                answer: 'Incorrect'
            }
        ]
    }
};

export function loadInitialDecks() {
    try {
        Object.keys(data).forEach((key, index) => {
            AsyncStorage.setItem(key, JSON.stringify(data[key]));
        });
    } catch (error) {
        console.log(error);
    }
}

export function getDecks() {
    return AsyncStorage.getAllKeys().then(keys => {
        return AsyncStorage.multiGet(keys).then(stores => {
            return stores.map((result, i, store) => {
                let key = store[i][0];
                let value = JSON.parse(store[i][1]);
                if (value) {
                    return {
                        key,
                        title: value.title,
                        questions: value.questions
                    };
                }
            }).filter(items => {
                if (items) {
                    return typeof items.questions !== 'undefined'
                }
            });
        });
    });
}

export function getDeck(id) {
    return AsyncStorage.getItem(id);
}

export function addDeck(title) {
    try {
        return AsyncStorage.setItem(title, JSON.stringify({ title, questions: [] }));
    } catch (error) {
        console.log(error);
    }
}

export function addCard(title, card) {
    try {
        AsyncStorage.getItem(title).then(result => {
            const data = JSON.parse(result);

            let questions = data.questions;
            questions.push(card);

            AsyncStorage.mergeItem(title, JSON.stringify({
                questions
            }));
        });
    } catch (error) {
        console.log(error);
    }
}
