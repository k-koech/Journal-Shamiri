import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

// Dummy data (replace with actual journal data from API or state)
const journalData = {
  id: 1,
  title: 'Sample Journal',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  category: 'Personal',
};

const JournalDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  // Function to update journal
  const handleUpdate = (values: any) => {
    // Perform update logic (e.g., API call)
    console.log('Updated Journal:', values);
    setModalVisible(false);
  };

  return (
    <ScrollView className="flex-1 p-4 mb-20 min-h-[100vh]">
      {/* Back Navigation Button */}


      {/* Journal Details */}
      <View className="mt-8 mb-4  bg-[#026D87] rounded-t-[20px] shadow-md min-h-[100vh]">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-4 left-4 p-2"
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>

          <View className='flex items-center justify-center my-6 h-[30vh]'>
            <View className="w-[80vw] rounded-xl">
              <Text className='text-center text-2xl text-white' style={{fontFamily:"poppins" }}>{journalData.title}</Text>
            </View>
          </View>

        
          
          <View className='flex-1 shadow-xl bg-gray-200 rounded-t-[20px] px-4 pb-4 pt-10 '>  
            <View className='flex flex-row shadow-xl justify-between pb-4 pt-10 '>
              <Text className="text-md text-white bg-[#026D87] rounded-lg px-2 py-1">{journalData.category}</Text>
              <Text className="text-sm text-gray-700 mb-2">Created on 2024-12-12</Text>
            </View>
            <Text className="text-2xl font-bold mb-2" style={{fontFamily:"roboto"}}>{journalData.title}</Text>
            <Text className="text-lg text-gray-700 mb-2">{journalData.content}</Text>
          </View>

          {/* Update Button */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bxg-[#026D87] border bg-white text- p-3 rounded-lg mt-4 self-center mb-8"
          >
            <Text className="text-lg">Update Journal</Text>
          </TouchableOpacity>


      </View>






      {/* Modal for Update */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center items-center bg-black bg-opacity-50"
        >
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-2xl font-bold mb-4">Update Journal</Text>
            <Formik
              initialValues={{
                title: journalData.title,
                content: journalData.content,
                category: journalData.category,
              }}
              onSubmit={handleUpdate}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <TextInput
                    className="border border-gray-300 p-2 mb-4 rounded-lg"
                    placeholder="Title"
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                  />
                  <TextInput
                    className="border border-gray-300 p-2 mb-4 rounded-lg"
                    placeholder="Content"
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                    multiline
                    numberOfLines={4}
                  />
                  <TextInput
                    className="border border-gray-300 p-2 mb-4 rounded-lg"
                    placeholder="Category"
                    onChangeText={handleChange('category')}
                    onBlur={handleBlur('category')}
                    value={values.category}
                  />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-green-500 p-3 rounded-lg mb-2"
                  >
                    <Text className="text-white text-center text-lg">Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="bg-red-500 p-3 rounded-lg"
                  >
                    <Text className="text-white text-center text-lg">Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

export default JournalDetailScreen;
