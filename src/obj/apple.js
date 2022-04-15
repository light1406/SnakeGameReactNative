import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class Apple extends Component {
    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];
        return (
            <View
                style= {[styles.finger, {
                    width: this.props.size,
                    height: this.props.size,
                    top: y * this.props.size,
                    left: x * this.props.size
                }]}
            />
        )
    }
}

const styles = StyleSheet.create({
    finger: {
        backgroundColor: '#ff0000', 
        position: 'absolute'
    }
});

export {Apple}