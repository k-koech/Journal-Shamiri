import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useJournalContext } from '../context/JournalContext';




export const ConfirmDeleteModal = ({ id }: { id: number }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const {deleteJournal} = useJournalContext()
  
  
  
    const confirmJournalDelete = () => {
      setIsModalVisible(false);
      deleteJournal(id)    
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };
  
    function handleOpenModal(id: number) {
      setIsModalVisible(true);
    }
  
    return (
      <View>
        <TouchableOpacity onPress={() => handleOpenModal(id)} className='flex items-center justify-center w-16'>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 250, 255, 0.5)' }}>
            <View className="w-72 bg-white border border-gray-300 rounded-lg p-5 items-center">
              <Text className="text-lg font-bold mb-2">Confirm Delete</Text>
              <Text className="text-base mb-5">Are you sure you want to delete this journal?</Text>
              <View className="flex-row gap-4 w-full justify-around">
                <TouchableOpacity
                  className="flex-1 items-center py-2 rounded-md bg-gray-400 ml-2"
                  onPress={closeModal}
                >
                  <Text className="text-white text-base">No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 items-center py-2 rounded-md bg-red-500 mr-2"
                  onPress={confirmJournalDelete}
                >
                  <Text className="text-white text-base">Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  
  }