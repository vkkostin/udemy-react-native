import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, Alert, Dimensions, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'
import * as ScreenOrientation from 'expo-screen-orientation'

const ICON_SIZE = 24
const ICON_COLOR = 'white'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNum = Math.floor(Math.random() * (max- min)) + min

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  }

  return randomNum
}

const renderListItem = listLength => itemData =>
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>

const throwAlert = () => {
  Alert.alert(
    'Don\'t lie!',
    'You know that is wrong...',
    [{ text: 'Sorry!', style: 'cancel' }]
  )
}

const GameScreen = ({ userChoice, onGameOver }) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

  const initialGuess = generateRandomBetween(1, 100, userChoice)
  const [computerGuess, setCurrentGuess] = useState(initialGuess)
  // const [rounds, setRounds] = useState(0)
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }

    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }

  })

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (computerGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [computerGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => () => {
    switch(direction) {
      case 'lower': {
        if (computerGuess < userChoice) {
          return throwAlert()
        }
        currentHigh.current = computerGuess
        break
      }

      case 'greater': {
        if (computerGuess > userChoice) {
          return throwAlert()
        }
        currentLow.current = computerGuess + 1
        break
      }
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      computerGuess
    )

    setCurrentGuess(nextNumber)
    // setRounds(currentRounds => currentRounds + 1)
    setPastGuesses(currentPastGuesses => [
      nextNumber.toString(),
      ...currentPastGuesses,
    ])
  }

  let listContainerStyles = styles.listContainer

  if (availableDeviceWidth < 350) {
    listContainerStyles = styles.listContainerBig
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
          <View style={styles.control}>
            <MainButton onPress={nextGuessHandler('lower')}>
              <Ionicons name="md-remove" size={ICON_SIZE} color={ICON_COLOR} />
            </MainButton>
            <NumberContainer>{computerGuess}</NumberContainer>
            <MainButton onPress={nextGuessHandler('greater')}>
              <Ionicons name="md-add" size={ICON_SIZE} color={ICON_COLOR} />
            </MainButton>
          </View>  
        <View style={listContainerStyles}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem(pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{computerGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler('lower')}>
          <Ionicons name="md-remove" size={ICON_SIZE} color={ICON_COLOR} />
        </MainButton>
        <MainButton onPress={nextGuessHandler('greater')}>
          <Ionicons name="md-add" size={ICON_SIZE} color={ICON_COLOR} />
        </MainButton>
      </Card>
      <View style={listContainerStyles}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem(pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listContainer: {
    flex: 1, // needed for Android ScrollView scrolling
    width: '60%',
  },
  listContainerBig: {
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  }
})

export default GameScreen
