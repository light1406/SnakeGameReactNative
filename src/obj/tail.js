import React, {Component} from 'react';
import {View} from 'react-native';

class Tail extends Component {
    render(){
        let tailList  = this.props.elements.map((elm, idx) => {
            return <View
                    key={idx}
                    style={{
                        width: this.props.size,
                        height: this.props.size,
                        position: 'absolute',
                        left: elm[0] * this.props.size,
                        top: elm[1] * this.props.size,
                        backgroundColor: '#08c935'
                    }}            
                    />
        })
        return (
            <View style={{
                width: Constants.GRID_SIZE * this.props.size,
                height: Constants.GRID_SIZE * this.props.size,
            }}>
                {tailList}
            </View>);
    }
}

export {Tail}