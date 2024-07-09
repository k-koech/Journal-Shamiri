import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Spinner() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#009FC6" />
      <Text className="mt-4 text-lg text-[#009FC6]" style={{fontFamily:"poppins"}}>Journal</Text>
    </View>

  )
}