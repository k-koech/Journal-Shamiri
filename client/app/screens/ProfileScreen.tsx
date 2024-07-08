import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button, Modal, StyleSheet, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { server_url } from '../../config.json';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const {logout, current_user} = useContext(AuthContext);


  const handleUpdate = (values: any) => {

    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className='min-h-[60vh]'>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-4 left-4"
      >
        <Ionicons name="chevron-back" size={28} className='text-gray-800' cxolor="gray" />
      </TouchableOpacity>
      
      {/* Profile Header */}
        <View className='mt-12'>
          <View className="flex items-center mt-12 mb-8">
            <View className="border border-gray-200 flex items-center justify-center ml-4 h-20 w-20 bg-white rounded-xl">
              {
                 current_user?.picture?
                  <Image source={{uri: server_url + current_user?.picture}} style={{width: 50, height: 50}} />
                  :
                  <Text className='text-xl font-bold mt-2 UPPERCASE' >{current_user?.name[0]} </Text>
              }

            </View>
            <Text className="text-2xl ml-4 mt-4" style={{fontFamily:'poppins'}}>{current_user?.fullName}</Text>
          </View>

          <View className="flex flex-row item-center justify-between pb-6 pt-6 border-b border-gray-300">
            <Text className=" w-[30vw]" style={{fontFamily: 'roboto', fontWeight:"bold"}}>Name</Text>
            <Text className="flex-1 text-gray-600"  style={{fontFamily: 'roboto'}}>{current_user?.name}</Text>
          </View>

          <View className="flex flex-row item-center justify-between pb-6 pt-6 border-b border-gray-300">
            <Text className=" w-[30vw]" style={{fontFamily: 'roboto', fontWeight:"bold"}}>Username</Text>
            <Text className="flex-1 text-gray-600"  style={{fontFamily: 'roboto'}}>{current_user?.username}</Text>
          </View>
          <View className="flex flex-row item-center justify-between pb-6 pt-6 border-b border-gray-300">
            <Text className=" w-[30vw]" style={{fontFamily: 'roboto', fontWeight:"bold"}}>Email</Text>
            <Text className="flex-1 text-gray-600"  style={{fontFamily: 'roboto'}}>{current_user?.email}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className="p-2 mt-8"
        onPress={() => logout()}
      >
        <Text className="text-red-600 text-center text-lg" style={{fontFamily:"roboto"}}>Logout</Text>
      </TouchableOpacity>
      
      {/* Update Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-[#009FC6] p-2 mt-8 rounded-lg"
      >
        <Text className="text-white text-center text-lg" style={{fontFamily:"roboto"}}>Update Profile</Text>
      </TouchableOpacity>

      {/* Modal for Updating Profile */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View className="w-[80vw] bg-white p-6 rounded-lg shadow-lg">
            <Text className="text-center text-xl mb-4" style={{fontFamily:"poppins"}}>Update Profile</Text>
            <Formik
              initialValues={{ fullName: current_user?.name, username: current_user?.username, password: '' }}
              onSubmit={handleUpdate}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <TextInput
                    className="border border-gray-300 p-2 mb-4 rounded-lg"
                    placeholder="Full Name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                  />
                  <TextInput
                    className="border border-gray-300 p-2 mb-4 rounded-lg"
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
        
                  <TextInput
                    className="border border-gray-300 p-2 mb-4 rounded-lg"
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />

                 <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className="mt-4 p-2 bg-[#009FC6] rounded-lg"
                  >
                    <Text className="text-center text-white">Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="mt-4 p-2 bg-gray-300 rounded-lg"
                  >
                    <Text className="text-center text-gray-800">Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ProfileScreen;
