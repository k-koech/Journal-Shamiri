import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = () => {
    if (isSignup) {
      if (password !== confirmPassword) {
        Toast.error('Passwords do not match.', 'top');
        return;
      }
      if (password.length < 8) {
        Toast.error('Password must be at least 8 characters long.', 'top');
        return;
      }
      if (!email.includes('@')) {
        Toast.error('Please enter a valid email address.', 'top');
        return;
      }
      // Add more validations as needed
      console.log('====================================');
      console.log('Sign Up');
      console.log('====================================');
    } 
    else {
      // Handle log in      
      console.log("Login");
      

      }
  };

  return (
    <View className='flex-1 justify-center items-center p-4 '>
      <View className="min-h-[50vh] w-[90vw] rounded-xl p-4">
        <Text className="text-8xl mb-2 text-[#026D87]" style={{ fontFamily: 'dancing_script' }}>Journal</Text>

        <Text className="text-4xl mb-4 text-[#026D87]" style={{fontFamily:"poppins"}}>{isSignup ? 'Sign Up' : 'Log In'}</Text>

        {isSignup && (
          <>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              className="border border-gray-300 placeholder-black placeholder-opacity-100 p-2 mb-2 w-full rounded-lg"
            />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
              className="border border-gray-300 placeholder-black placeholder-opacity-100 p-2 mb-2 w-full rounded-lg"
            />
          </>
        )}

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="border border-gray-300 placeholder-black placeholder-opacity-100 p-2 mb-2 w-full rounded-lg"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          className="border border-gray-300 placeholder-black p-2 mb-2 w-full rounded-lg"
        />
        {isSignup && (
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
            className="border border-gray-300 placeholder-black p-2 mb-4 w-full rounded-lg"
          />
        )}
        <View className="flex flex-row justify-between mb-4">
          <TouchableOpacity onPress={handleSubmit} className="bg-[#026D87] p-2 rounded-lg">
            <Text className='text-white font-bold px-3'>{isSignup ? 'Sign Up' : 'Log In'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsSignup(!isSignup)} className="border border-[#026D87] p-2 rounded-lg">
            <Text className='text-[#026D87]'>{isSignup ? 'Switch to Log In' : 'Switch to Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
