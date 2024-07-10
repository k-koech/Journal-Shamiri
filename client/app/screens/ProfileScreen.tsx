import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button, Modal, StyleSheet, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext, useAuthContext } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';

import { server_url } from '../../config.json';
import { Toast } from 'toastify-react-native';
import { User } from '../context/types';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const {logout, current_user, updateProfile, onUpdateSuccess, onUpdateError} = useAuthContext();
  const [imageUri, setImageUri] = useState<any | undefined>(undefined);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.error("Permission to access media library is required!", 'top');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0]);
    }
  };


  const handleUpdate = (values: any) => {   
    if (!values.fullName || !values.username ) {
      setError('All fields are required.');
      return;
    }

    if(values.password || values.confirmPassword || values.oldPassword) 
      {
      if (!values.oldPassword) {
         setError('Old password is required');
         return;
      }

      if(!values.password) {
        setError('New password is required');
        return;
      }
  
      if (values.password !== values.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (values.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
    }


    let formData = new FormData();
    formData.append('name', values.fullName);
    formData.append('username', values.username);
    values.oldPassword && formData.append('oldPassword', values.oldPassword);
    values.password && formData.append('password', values.password);
    if (imageUri) {
      formData.append('picture', {
        uri: imageUri.uri,
        name: imageUri.fileName,
        type: 'image/jpg',
      } as any);
    }

    
    updateProfile(formData as Partial<User>);

    
    if (onUpdateSuccess) {
      setModalVisible(false);
      setError(null);
    } 
    if(onUpdateError) {
      setError("Old password doesn't match our records");
    }
  };

  // toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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
      
      {/* Profile Header Section*/}
        <View className='mt-12'>
          <View className="flex items-center mt-12 mb-8">
            <View className="border border-gray-200 flex items-center justify-center ml-4 h-20 w-20 bg-white rounded-xl">
              {
                 current_user?.picture?
                  <Image className='rounded-lg' source={{uri: server_url + current_user?.picture}} style={{width: 70, height: 70}} />
                  :
                  <Text className='text-xl font-bold mt-2 UPPERCASE' >{current_user?.name[0]} </Text>
              }

            </View>
            <Text className="text-2xl ml-4 mt-4" style={{fontFamily:'poppins'}}>{current_user?.username}</Text>
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
      <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-[#009FC6] p-2 mt-8 rounded-lg">
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
            <Text className="text-center text-xl mb-4" style={{fontFamily:"poppins", fontWeight:"bold"}}>Update Profile</Text>

            {
              error && (
                <Text className="text-red-600 my-4 text-center">{error}</Text>
              )
            }
            <Formik
              initialValues={{picture:current_user?.picture, fullName: current_user?.name, username: current_user?.username, password: '', confirmPassword: '', oldPassword: ''}}
              onSubmit={handleUpdate}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                <Text>Profile Image</Text>

                 <View className="flex flex-row items-center justify-center relative">
                  <View>
                    <View className='absolute top-[-1px] right-0'>
                       <TouchableOpacity onPress={()=> setImageUri("")}>
                          <AntDesign name="close" size={20} color="gray" />
                       </TouchableOpacity>
                    </View>
                    {imageUri || current_user?.picture ?
                      <Image className='rounded-full' style={{ width: 100, height: 100, marginTop: 10, }}  source={{ uri: imageUri?.uri || server_url+current_user?.picture}} />
                      :
                      <View className="border aspect-auto border-gray-200 flex items-center justify-center ml-4 h-20 w-20 bg-white rounded-xl">
                          <Text className='text-xl font-bold mt-2 UPPERCASE' >{current_user?.name[0]} </Text>    
                      </View>
                  }
                  </View>
                </View>

                <TouchableOpacity onPress={pickImage} className="mb-4 p-2 flex items-center">
                  <MaterialCommunityIcons name="file-image-plus" size={24} color="#009FC6" />
                </TouchableOpacity>

                <Text>Full Name</Text>
                <TextInput
                  className="border border-gray-300 p-2 mb-4 rounded-lg"
                  placeholder="Full Name"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
      
                <Text>Username</Text>
                <TextInput
                  className="border border-gray-300 p-2 mb-4 rounded-lg"
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                
                <Text className='mt-4' style={{fontFamily:"poppins"}}>Change Password(Optional)</Text>
                <Text>Old Password</Text>
                  <View className="flex flex-row items-center border border-gray-300 p-2 mb-1 rounded-lg">
                    <TextInput
                      style={{flex: 1}}
                      placeholder="Old Password"
                      onChangeText={handleChange('oldPassword')}
                      onBlur={handleBlur('oldPassword')}
                      value={values.oldPassword}
                      secureTextEntry={!showOldPassword}
                    />
                    <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                      <Ionicons name={showOldPassword ? "eye-off" : "eye"} size={20} color="gray" />
                    </TouchableOpacity>
                  </View>

                  <Text>New Password</Text>
                  <View className="flex flex-row items-center border border-gray-300 p-2 mb-1 rounded-lg">
                    <TextInput
                      style={{flex: 1}}
                      placeholder="New Password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={!showNewPassword}
                    />
                    <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                      <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color="gray" />
                    </TouchableOpacity>
                  </View>

                  <Text>Confirm Password</Text>
                  <View className="flex flex-row items-center border border-gray-300 p-2 mb-1 rounded-lg">
                    <TextInput
                      style={{flex: 1}}
                      placeholder="Confirm New Password"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                    />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="gray" />
                    </TouchableOpacity>
                  </View>

                <View className="flex flex-row justify-between">                  
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="mt-4 p-2 bg-gray-300 rounded-lg"
                  >
                    <Text className="text-center text-gray-800">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=> handleSubmit() }
                    className="mt-4 py-2 px-4 bg-[#009FC6] rounded-lg"
                  >
                    <Text className="text-center text-white">Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
