import React from 'react'
import { View, Image, StyleSheet, Button, Text } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = ({ guessRounds, userChoice, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game Is Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          source={require("../assets/success.png")}
          // source={{
          //   uri: 'https://cdn.britannica.com/17/83817-050-67C814CD/Mount-Everest.jpg'
          // }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{guessRounds} </Text>
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userChoice}</Text>
        </BodyText>
      </View>
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    width: 300,
    height: 300,
    overflow: 'hidden',
    marginVertical: 30
  },
  highlight: {
    color: Colors.primary,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  }
})

export default GameOverScreen
