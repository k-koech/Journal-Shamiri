import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput,Platform, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Toast } from 'toastify-react-native';
import { AuthContext, useAuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';


interface RegisterParams {
  email: string;
  username: string;
  name: string;
  password: string;
}


export default function AuthScreen() {
  const { register,login, isSignup, setIsSignup } = useAuthContext();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [keyboard_up, setKeyboard_up] = useState<boolean>(false); // Default title size

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
      // Register
      register({ email, username, name, password })
    } 
    else {
      // Login
      if (!email.includes('@')) {
        Toast.error('Please enter a valid email address.', 'top');
        return;
      }
      else if(!password){
        Toast.error('Password is required', 'top');
      }
      else{
         login(email, password)
      }
      

      }
  };


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard_up(true);

    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard_up(false); 
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 '
    >
    <View className='flex-1 justify-center items-center p-4 bg-white '>
      <View className="min-h-[50vh] w-[90vw] rounded-xl p-4">
        <Text className={`${keyboard_up? "text-5xl": "text-7xl"} mb-2 text-[#026D87]`} style={{ fontFamily: 'dancing_script' }}>Journal</Text>

        <Text className={`${keyboard_up? "text-3xl": "text-4xl"}  mb-4 text-[#026D87]`} style={{fontFamily:"poppins"}}>{isSignup ? 'Sign Up' : 'Log In'}</Text>

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
        {/* <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          className="border border-gray-300 placeholder-black p-2 mb-2 w-full rounded-lg"
        /> */}
        <View className="flex flex-row items-center border border-gray-300 p-2 mb-1 rounded-lg">
            <TextInput
               value={password}
               style={{flex: 1}}
               onChangeText={setPassword}
               placeholder="Password"
               secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
            </TouchableOpacity>
          </View>
        {isSignup && (

          <View className="flex flex-row items-center border border-gray-300 p-2 mb-1 rounded-lg">
            <TextInput
              value={confirmPassword}
              style={{flex: 1}}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="gray" />
            </TouchableOpacity>
          </View>
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

  </KeyboardAvoidingView>
  );
}
