import React, { useState } from 'react';
import { View, Text, TextInput, Button, Touchable, TouchableOpacity } from 'react-native';

export default function AuthScreen() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {

  };

  return (
    <View className='flex-1 justify-center items-center p-4 bg-white'>
    <View className="h-[50vh] w-[90vw] rounded-xl j p-4">
      <Text className="text-4xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Log In'}</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        className="border border-gray-300 placeholder-white  placeholder-opacity-100 p-2 mb-2 w-full rounded-lg"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        className="border border-gray-300 placeholder p-2 mb-4 w-full rounded-lg"
      />
      <View className="flex flex-row justify-between mb-4">
        <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 p-2 rounded-lg">
          <Text className='text-white font-bold px-3' onPress={handleSubmit}>{isSignup ? 'Sign Up' : 'Log In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 p-2 rounded-lg">
          <Text className='text-white'onPress={() => setIsSignup(!isSignup)}>{isSignup ? 'Switch to Log In' : 'Switch to Sign Up'} </Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}