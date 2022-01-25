import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)

  const closeModal = () => setIsAddMode(false)
  const openModal = () => setIsAddMode(true)

  const addGoalHandler = enteredGoal => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {
        uuid: currentGoals.length + 1,
        value: enteredGoal,
      }
    ])
    closeModal()
  }

  const removeGoalHandler = goalId => () => setCourseGoals(currentGoals => 
    currentGoals.filter(goal => goal.uuid !== goalId)  
  )

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={openModal} />
      <GoalInput onAddGoal={addGoalHandler} visible={isAddMode} onCancel={closeModal} />
      <FlatList
        keyExtractor={item => item.uuid}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            onDelete={removeGoalHandler(itemData.item.uuid)}
            title={itemData.item.value}
          />
        )}
      />

      {/* <ScrollView>
        {courseGoals.map((goal, index) => {
          return (
            <View key={index} style={styles.listItem}>
              <Text>{goal}</Text>
            </View>
          )
        })}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
})
