import React, {Component} from 'react';
import {View,
        Text,
        TextInput, 
        StyleSheet,
        TouchableOpacity,
        BackHandler,
        Alert,
        TouchableWithoutFeedback,
        Keyboard} from 'react-native';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            player: ''
        };
    }

    handlePlayer = (text) => {
        this.setState({ player: text })
     }

    render(){

        const startGame = () => {
            if (this.state.player === ''){
                Alert.alert('Your name?');
            }else{
                this.props.navigation.navigate('Ingame',{player: this.state.player });
            }
        }

        return (
            <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
                <View style= {styles.container}>
                    <View style= {styles.titleView}>
                        <Text style={styles.titleText}>Snake</Text>
                    </View>
                    <View style= {styles.btns}>
                        <TextInput 
                            style= {styles.input}
                            placeholder='Enter your name'
                            onChangeText ={this.handlePlayer}
                        />
                        <TouchableOpacity style= {styles.btn} onPress={startGame}>
                            <Text style={styles.btnText}>START</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style= {styles.btn} onPress={() => BackHandler.exitApp()}>
                            <Text style={styles.btnText}>QUIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#6eff92'
    },
    titleView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 70,
        fontWeight: 'bold',
        fontFamily: 'Times new roman',
        color: 'green'
    },
    btns: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: 120,
        height: 50,
        backgroundColor: '#ff6e6e',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    input: {
        height: 40,
        width: 120,
        backgroundColor: 'white',
        margin: 10,
        textAlign: 'center',
        fontSize: 14
    }
})