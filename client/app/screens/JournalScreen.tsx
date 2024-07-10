import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { JournalEntry, useJournalContext } from '../context/JournalContext';

const JournalPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const nav = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJournals, setFilteredJournals] = useState<JournalEntry[]>([]);
  const [displayedJournals, setDisplayedJournals] = useState<JournalEntry[]>([]);
  const [page, setPage] = useState(1);
  const recordsPerPage = 20;

  const { journals } = useJournalContext();

  useEffect(() => {
    filterJournals();
  }, [selectedPeriod, searchQuery, journals]);

  useEffect(() => {
    loadMoreJournals();
  }, [filteredJournals, page]);



  const filterJournals = () => {
    const now = new Date();
    let filtered = journals;
  
    // Filter based on period
    if (selectedPeriod === 'daily') {
      filtered = journals.filter(journal => new Date(journal.date).toDateString() === now.toDateString());
    } else if (selectedPeriod === 'weekly') {
      const weekOfYear = getWeekNumber(now);
      filtered = journals.filter(journal => getWeekNumber(new Date(journal.date)) === weekOfYear);
    } else if (selectedPeriod === 'monthly') {
      const monthOfYear = now.getMonth();
      const year = now.getFullYear();
      filtered = journals.filter(journal => {
        const journalDate = new Date(journal.date);
        return journalDate.getMonth() === monthOfYear && journalDate.getFullYear() === year;
      });
    }
  
    // Filter based on search query
    if (searchQuery) {
      filtered = filtered.filter(journal =>
        journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    setFilteredJournals(filtered);
    setPage(1);  // Reset page when filters change
    setDisplayedJournals(filtered.slice(0, recordsPerPage));
  };


  
  
  // Function to get the week number of the year
  const getWeekNumber = (date: Date): number => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  };
  


  const loadMoreJournals = () => {
    const nextPageRecords = filteredJournals.slice(page * recordsPerPage, (page + 1) * recordsPerPage);
    setDisplayedJournals(prevState => [...prevState, ...nextPageRecords]);
  };

  const onNavigateToJournalDetailScreen = (journalId: number) => {
    navigation.navigate('JournalDetail', { id: journalId } as any);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
            {
              journals?.length === 0 ?
              <View className='flex justify-center items-center my-16 '>
                <Text className='text-xl text-gray-500'>No Journals Yet</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Add Journal") } className='bg-[#026D87] p-2 rounded-lg'>
                  <Text className='text-white'>Create Journal</Text>
                </TouchableOpacity>
              </View>
              :
           
     <View>
      <TouchableOpacity
        onPress={() => nav.goBack()}
        className="absolute top-4 p-2"
      >
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-center mt-12 mb-4">All Journals</Text>

      {/* Search Input */}
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search journals..."
        className="mb-4 p-2 border border-gray-300 rounded-lg"
      />

      {/* Period Selection */}
      <View className="flex-row justify-center mb-4">
        {['daily', 'weekly', 'monthly'].map(period => (
          <TouchableOpacity
            key={period}
            onPress={() => setSelectedPeriod(period)}
            className={`px-4 py-2 mx-1 rounded-lg ${selectedPeriod === period ? 'bg-[#026D87]' : 'bg-gray-400'}`}
          >
            <Text className="text-white">{period.charAt(0).toUpperCase() + period.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Journal Entries */}
      {displayedJournals.map((journal) => (
        <TouchableOpacity
          key={journal.id}
          onPress={() => onNavigateToJournalDetailScreen(journal.id)}
          className="p-4 mb-4 bg-white rounded-lg shadow-md"
        >
          <Text className="text-xl font-bold">{journal.title}</Text>
          <Text className="text-gray-700">{journal.content.substring(0, 100)}...</Text>
          <View className='flex-row items-center justify-between'>
            <Text className="text-gray-500">{journal.date}</Text>
            <Text className="text-white px-2 py-1 bg-[#026D87] rounded-lg text-sm">{journal.category}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {filteredJournals.length > displayedJournals.length && (
        <TouchableOpacity
          onPress={() => setPage(prevPage => prevPage + 1)}
          className="p-4 bg-[#026D87] rounded-lg"
        >
          <Text className="text-white text-center">Load More</Text>
        </TouchableOpacity>
      )}


    </View>
    }
    </ScrollView>
  );
};

export default JournalPage;
