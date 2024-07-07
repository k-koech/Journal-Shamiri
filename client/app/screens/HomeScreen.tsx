import { View,Button, Text } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-4">Welcome to your Journal</Text>
      <Button title="View Journals" onPress={() => navigation.navigate('Journal')} />
      <Button title="Summary View" onPress={() => navigation.navigate('Summary')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={console.log('logout')} />
      
    </View>
  )
}