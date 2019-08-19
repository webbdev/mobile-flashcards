import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import * as Icon from '@expo/vector-icons';
import DecksScreen from '../components/DecksScreen';
import DeckViewScreen from "../components/DeckViewScreen";
import QuizScreen from "../components/QuizScreen";
import AddCardScreen from "../components/AddCardScreen";
import AddDeckScreen from "../components/AddDeckScreen";

const TabsNav = createBottomTabNavigator({
    Decks: {
      screen: DecksScreen,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Icon.Ionicons
            name={Platform.OS ? 'ios-home' : 'md-home'}
            size={28}
            color={tintColor}
          />
        )
      }
    },
    AddDeck: {
      screen: AddDeckScreen,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <Icon.FontAwesome 
            name="plus-square" 
            size={28}
            color={tintColor} />
        )
      }
    }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: '#1300a9',
      style: {
        height: 60,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ddd'
      },
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      tabStyle: {
        marginTop: 5,
        marginBottom: 3
      },
      showIcon: true
    }
});
  
const RootStack = createStackNavigator({
    Home: {
        screen: TabsNav
    },
    DeckView: {
        screen: DeckViewScreen,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#1300a9',
              fontWeight: 'bold',
            },
            title: 'Deck View'
        }
      },
      AddCardScreen: {
        screen: AddCardScreen,
        navigationOptions: {
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#1300a9',
            fontWeight: 'bold',
          },
          headerTitleStyle: {
            justifyContent: 'center',
            textAlign: 'center'
          },
          title: 'Add Card'
        }
      },
      QuizScreen: {
        screen: QuizScreen,
        navigationOptions: {
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#1300a9',
            fontWeight: 'bold',
          },
        }
      }
    }
);

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;