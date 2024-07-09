import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useJournalContext } from '../context/JournalContext';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';

export type JournalDetailScreenProps = {
  route: {
    params: {
      id: string;  
    };
  };
  navigation: any; 
};

const JournalDetailScreen: React.FC<JournalDetailScreenProps> = ({ route }) => {
  const {journals, updateJournal} = useJournalContext()
  const [journalData, setJournalData] = useState<any>(null);

  const { id } = route.params;

  useEffect(() => {
     const j_data = journals && journals.find( (journal ) => journal.id=== parseInt(id) )
     setJournalData(j_data)

  }, [journals, id]);

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdate = (values: any) => {

    
    setModalVisible(false);
    updateJournal(parseInt(id), values)
  };

  return (
    <ScrollView className="flex-1 p-4 mb-20 min-h-[100vh]">
      {/* Back Navigation Button */}


      {/* Journal Details */}
      <View className="mt-8 mb-4  bg-[#026D87] rounded-t-[20px] shadow-md min-h-[90vh]">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-4 left-4 p-2"
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>

          <View className='flex items-center justify-center my-6 h-[30vh]'>
            <View className="w-[80vw] rounded-xl">
              <Text className='text-center text-2xl text-white' style={{fontFamily:"poppins" }}>{journalData?.title} </Text>
            </View>
          </View>

        
          
          <View className='flex-1 shadow-xl bg-gray-200 rounded-t-[20px] px-4 pb-4 pt-10 '>  
            <View className='flex flex-row shadow-xl justify-between pb-4 pt-10 '>
              <Text className="text-md text-white bg-[#026D87] rounded-lg px-2 py-1">{journalData?.category}</Text>
              <Text className="text-sm text-gray-700 mb-2">Created on 2024-12-12</Text>
            </View>
            <Text className="text-2xl font-bold mb-2" style={{fontFamily:"roboto"}}>{journalData?.title}</Text>
            <Text className="text-lg text-gray-700 mb-2">{journalData?.content}</Text>
          </View>

          {/* Update Button */}
          <View className='flex bg-gray-200 flex-row justify-between items-center py-4'>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className='mx-4'
            >
              {/* <Text className="text-lg">Update Journal</Text> */}
              <AntDesign name="edit" size={24} color="green" />
            </TouchableOpacity>
          
            <ConfirmDeleteModal id={journalData?.id} />
          </View>


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
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 250, 255, 0.5)' }}
          className="flex-1 justify-center "
        >
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-2xl font-bold mb-4">Update Journal</Text>
            <Formik
              initialValues={{
                title: journalData?.title,
                content: journalData?.content,
                category: journalData?.category,
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

                  <View className='flex flex-row justify-between '>
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        className="bg-gray-400 p-3 rounded-lg"
                      >
                        <Text className="text-white text-center text-lg">Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>handleSubmit()}
                        className="bg-green-500 p-3 rounded-lg"
                      >
                        <Text className="text-white text-center text-lg px-3">Update</Text>
                      </TouchableOpacity>
                  </View>
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
