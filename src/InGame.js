import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Constants from './Constants';
import {GameLoop} from './systems';
import {Head} from './obj/head';
import {Apple} from './obj/apple';
import {Tail} from './obj/tail';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowDown,faArrowUp,faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';

export default class SnakeGame extends Component {
  constructor(props) {
    super(props);
    this.boardGame = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: true,
      score: 0,
    };
  }

  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  resetGame = () => {
    this.engine.swap({
      head: {
        position: [1, 0],
        size: Constants.CELL_SIZE,
        xspeed: 1,
        yspeed: 0,
        nextMove: 10,
        updateFrequency: 10,
        renderer: <Head />,
      },
      tail: {
        elements: [[0, 0]],
        size: Constants.CELL_SIZE,
        renderer: <Tail />,
      },
      apple: {
        position: [
          this.randomBetween(0, Constants.GRID_SIZE - 1),
          this.randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        renderer: <Apple />,
      },
    });

    this.setState({running: true, score: 0});
  }

  onEvent = (events) =>{
    const {player} = this.props.route.params;
    if (events.type === 'game-over'){
      this.setState({running: false});
      Alert.alert('Game Over', 
      player + "'s score: " + this.state.score + '\nCan you play again?',
      [
        {
          text: 'NO',
          onPress: () => this.props.navigation.navigate('Home'),
          style: 'cancel'
        },
        {
          text: 'YES',
          onPress: this.resetGame
        }
      ]
      )
    }
    if (events.type === 'score+'){
      this.setState({score: this.state.score + 1});
    }
  }

  render() {
    const {player} = this.props.route.params;

    return (
      <View style={styles.container}>
        {/* game screen */}
        <GameEngine
          ref={(ref) => {
            this.engine = ref;
          }}
          style={[
            {
              width: this.boardGame,
              height: this.boardGame,
              backgroundColor: '#362f2f',
              flex: null,
              marginTop: 10,
            },
          ]}
          systems={[GameLoop]}
          entities={{
            head: {
              position: [1, 0],
              size: Constants.CELL_SIZE,
              xspeed: 1,
              yspeed: 0,
              nextMove: 10,
              updateFrequency: 10,
              renderer: <Head />,
            },
            tail: {
              elements: [[0, 0]],
              size: Constants.CELL_SIZE,
              renderer: <Tail />,
            },
            apple: {
              position: [
                this.randomBetween(0, Constants.GRID_SIZE - 1),
                this.randomBetween(0, Constants.GRID_SIZE - 1),
              ],
              size: Constants.CELL_SIZE,
              renderer: <Apple />,
            },
          }}
          running={this.state.running}
          onEvent={this.onEvent}>
          
        </GameEngine>
          {/* Score */}
        <View style={styles.scoreView}>
            <Text style={styles.scoreText}>{player}: {this.state.score}</Text>
        </View>
          {/* Phim dieu khien */}
        <View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {this.engine.dispatch({type: 'move-up'})}}
            >
              <View style={styles.buttonControl}>
                <FontAwesomeIcon icon={faArrowUp} color="yellow" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {this.engine.dispatch({type: 'move-left'})}}
            >
              <View style={styles.buttonControl}>
                <FontAwesomeIcon icon={faArrowLeft} color="yellow" size={30} />
              </View>
            </TouchableOpacity>
            <View style={[styles.buttonControl, {backgroundColor: null}]} />
            <TouchableOpacity
              onPress={() => {this.engine.dispatch({type: 'move-right'})}}
            >
              <View style={styles.buttonControl}>
                <FontAwesomeIcon icon={faArrowRight} color="yellow" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {this.engine.dispatch({type: 'move-down'});}}
            >
                <View style={styles.buttonControl}>
                  <FontAwesomeIcon icon={faArrowDown} color="yellow" size={30} />
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4D4D4D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlRow: {
    width: 300,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonControl: {
    width: 70,
    height: 70,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreView: {
    height: 40,
  },
  scoreText: {
    fontSize: 25,
    color: 'white'
  }
});
