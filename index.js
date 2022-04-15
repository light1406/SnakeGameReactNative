/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home'
import SnakeGame from './src/InGame';

export default class App extends Component{

    render(){

        const Stack = createNativeStackNavigator();

        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options= {{headerShown: false}}/>
                    <Stack.Screen name="Ingame" component={SnakeGame} options= {{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

AppRegistry.registerComponent(appName, () => App);