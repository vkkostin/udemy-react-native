import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

const fetchFonts = () => 
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.error}
      />
    )
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  const startGameHandler = userNumber => () => setUserNumber(userNumber)

  const gameOverHandler = numRounds => setGuessRounds(numRounds)

  let currentScreen = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber) {
    currentScreen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }

  if (guessRounds) {
    currentScreen = <GameOverScreen userChoice={userNumber} guessRounds={guessRounds} onRestart={configureNewGameHandler} />
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess A Number" />
      {currentScreen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
