import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const journals = [
  { id: 1, title: 'Journal 1', content: 'Content 1', date: '2024-07-01', category: 'Personal' },
  { id: 2, title: 'Journal 2', content: 'Content 2', date: '2024-07-02', category: 'Work' },
  { id: 3, title: 'Journal 3', content: 'Content 3', date: '2024-07-03', category: 'Travel' },
];

const JournalPage: React.FC = () => {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const filteredJournals = journals; 

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-4 p-2"
      >
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-center mt-12 mb-4">All Journals</Text>

      {/* Period Selection */}
      <View className="flex-row justify-center mb-4">
        {['daily', 'weekly', 'monthly'].map(period => (
          <TouchableOpacity
            key={period}
            onPress={() => setSelectedPeriod(period)}
            className={`px-4 py-2 mx-1 rounded-lg ${selectedPeriod === period ? 'bg-[#026D87]' : 'bg-gray-300'}`}
          >
            <Text className="text-white">{period.charAt(0).toUpperCase() + period.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {
        filteredJournals && filteredJournals.map((journal) => (
          <View className="p-4 mb-4 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-bold">{journal.title}</Text>
          <Text className="text-gray-700">{journal.content.substring(0, 100)}...</Text>
          <Text className="text-gray-500">{journal.date} - {journal.category}</Text>
        </View>
        ))
      }


    </ScrollView>
  );
};

export default JournalPage;
