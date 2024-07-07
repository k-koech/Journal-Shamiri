import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const AddJournalScreen: React.FC = () => {

    const navigation = useNavigation();

  // Initial form values
  const initialValues = {
    title: '',
    content: '',
    category: 'Personal',
    date: new Date().toISOString().split('T')[0], // Default to today's date
  };

  // Function to handle form submission
  const handleSubmit = (values: any) => {

    if (values.title.length < 4) {
      Alert.alert('Validation Error', 'Title should be at least 4 characters long.');
      return;
    }
    if (values.content.length < 10) {
      Alert.alert('Validation Error', 'Content should be at least 10 characters long.');
      return;
    }

 
    
    
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-gray-100 p-4 pb-16'
    >

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className='absolute top-4 left-4'
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

     <View className='flex-1 justify-center '>
        <Text className='text-2xl font-bold text-gray-800 text-center mb-4'>
            Add Journal
        </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className='bg-white p-6 rounded-lg shadow-lg'>
            <TextInput
              className={`border border-gray-300 p-2 mb-4 rounded-lg  ${touched.title && errors.title ? "border border-red-900" : {}
              }`}
              placeholder="Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            {touched.title && errors.title && (
              <Text className='text-red-500 mb-2'>{errors.title}</Text>
            )}

            <TextInput
                className={`border border-gray-300 p-2 mb-4 rounded-lg ${touched.content && errors.content ? "border border-red-600" : {} }`}
              placeholder="Content"
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={values.content}
              multiline
              numberOfLines={4}
            />
            {touched.content && errors.content && (
              <Text className='text-red-500 mb-2' >{errors.content}</Text>
            )}

            <View className='mb-4' >
              <Text className= 'text-gray-600 mb-2' >Category</Text>
              <View className='flex-row justify-between' >
                {['Personal', 'Work', 'Travel', 'Other'].map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => handleChange('category')(category)}
                    className={`p-2 rounded-lg border ${values.category === category? 'bg-[#026D87] border-[#026D87': 'bg-white border-gray-300'} `}
                  >
                    <Text
                      className={`text-center ${values.category === category ? 'text-white' : 'text-gray-800' }
                      `}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity className='bg-[#009FC6] p-4 rounded-xl' onPress={() => handleSubmit()}>
              <Text className='text-white text-center'>Submit</Text>
            </TouchableOpacity>
            
          </View>
        )}
      </Formik>
      </View>

    </KeyboardAvoidingView>
  );
};

export default AddJournalScreen;
