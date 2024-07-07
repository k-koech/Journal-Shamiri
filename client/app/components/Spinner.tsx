import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Spinner() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className="mt-4 text-lg font-bold text-black">Journal</Text>
    </View>

  )
}