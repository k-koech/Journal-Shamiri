import { View,Button, Text,StatusBar, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Touchable, Image, RefreshControl, StyleSheet } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../context/AuthContext';
import { server_url } from '../../config.json';
import { JournalContext, useJournalContext } from '../context/JournalContext';
import Spinner from '../components/Spinner';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Modal } from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any })
 {
  const {journals, onJournalChange, setOnJournalChange} = useJournalContext()
  const [filteredJournals, setFilteredJournals] = useState<any>(journals)
  const {current_user, onChange, setOnchange} = useAuthContext()


  const [clickedCategory, setClickedCategory] = useState('All')
  const categories = ["All", 'Personal', 'Work', 'Travel', 'Other']

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
     setOnchange(!onChange)
      setOnJournalChange(!onJournalChange)
  };

  const handleCategoryPress = (category: string) => {
    setClickedCategory(category)

     const filtered_journals = category==="All"? journals : journals.filter((journal: any) => journal.category === category)
     setFilteredJournals(filtered_journals)
    
  }
  useEffect(() => {
    setClickedCategory('All')

    setFilteredJournals(journals)


  }, [journals])

  const onNavigateToJournalDetailScreen = (journalId: number) => {
      navigation.navigate('JournalDetail', { id: journalId });
  }

 
  return ( 
    <SafeAreaView className="flex-1">   
    <StatusBar translucent backgroundColor="transparent"/>

  <LinearGradient colors={['#E0F9FF', '#fff', "#F1FCFF", "#fff"]} style={{flex: 1}}>
  <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}  /> } showsVerticalScrollIndicator={false} className=" flex-1 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 mb-24 pb-4 ">
      <View className='flex flex-row justify-between items-center'>
        <View className='mt-8 w-[70vw]'>
          <Text className="text-2xl mb-2 font-thin capitalize" style={{fontFamily:"poppins"}}>Hi {current_user?.name}</Text>
          <View>
            <Text className="text-2xl mb-2">Welcome to </Text>        
            <Text className="text-7xl mb-2 text-[#026D87]" style={{fontFamily: 'dancing_script'}}>Journal</Text>
          </View>
        </View>
        
        <View className='flex justify-center items-center'>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} className='bg-white p-2 rounded-lg'>
             {
                 current_user?.picture?
                  <Image source={{uri: server_url + current_user?.picture}} className='rounded-full' style={{width: 50, height: 50}} />
                  :
                  <View className='flex items-center'>
                  <Ionicons name="person" size={24} color="#009FC6" />
                  </View>
              }
                  <Text className='text-xs  font-bold text-center uppercase' >{current_user?.username}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className='flex flex-row items-center justify-between rounded-lg mt-4'>
        <Text className='text-lg'>Filter Journals by Date</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Journal')}
          className='w-[13%] xbg-blue-500 p-2 rounded-lg justify-center items-center'
        >
          <AntDesign name="filter" size={24} color="#009FC6" />
        </TouchableOpacity>
      </View>

    
 
      <Text className='text-2xl mt-8' style={{fontFamily: 'poppins'}}>Categories</Text>
      <View className='flex flex-row justify- gap-4 flex-wrap  mt-2'>
        {categories.map((category) => (
          <TouchableOpacity onPress={()=>handleCategoryPress(category)} key={category} className={` ${clickedCategory==category ? "bg-[#026D87]": "bg-white "}  border border-[#026D87] py-2 px-6 rounded-lg`}>
            <Text className={` ${clickedCategory==category ? "text-white":"" } px-1.5`}>{category}</Text>
          </TouchableOpacity>
        ))}

      </View>



      <View className='flex mt-8'>
        <Text className='text-2xl mb-2' style={{fontFamily: 'poppins'}}>Journals</Text>
        <View>
          <View>

            {
              journals.length === 0 ?
              <View className='flex justify-center items-center mt-6'>
                <Text className='text-xl text-gray-500'>No Journals Yet</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Add Journal") } className='bg-[#026D87] p-2 rounded-lg'>
                  <Text className='text-white'>Create Journal</Text>
                </TouchableOpacity>
              </View>
              :
              <></>
            }

            <View>
            { 
            filteredJournals && filteredJournals.length === 0 ?
            <View className='flex justify-center items-center mt-6'>
              <Text className='text-gray-500'>No Journals Found in this category</Text>
            </View>
            :
            
            <SwipeListView
            data={journals}
            renderItem={( { item: journal } ) => (
                <TouchableOpacity   onPress={() => onNavigateToJournalDetailScreen(journal.id) } className='flex min-h-[10vh] flex-row justify-between jhitems-center border bg-gray-50 border-gray-300 rounded-lg mb-4'>
                <View className='w-[20%] jh-full rounded-lg bg-[#026D87] flex justify-center items-center'>
                  <Text className='text-white text-xl font-bold uppercase'>{journal?.title[0]}</Text>
                </View>
    
              <View className='flex-1 flex-row justify-between '>                  
                <View className='px-2 flex-1'>
                  <Text className='text-xl'>{journal?.title}</Text>
                  <Text className='flex-1'>
                    {journal?.content?.length > 25 ? journal?.content.slice(0, 25) + '...': journal?.content}
                  </Text>
                  <View className='flex w-full flex-row items-center justify-between mb-1'>
                    <Text className='text-sm text-white bg-[#026D87] rounded-sm px-1.5'>{journal?.category}</Text>                    
                    <Text className='text-sm text-gray-700'>{journal?.date}</Text>
                  </View>
                </View>
                <View className='flex justify-center w-6'>
                  <Ionicons name="chevron-forward" size={24} color="#009FC6" />
                </View>
              </View>
            </TouchableOpacity>
    
            )}
    
            renderHiddenItem={({ item }, rowMap) => (
              <View className='flex items-end justify-end h-[10vh]'>
              <View className="flex w-16 flex-col justify-center items-center pl-4 h-full">
                  <ConfirmDelete id={item.id} />
              </View>
              </View>
            )}
    
            rightOpenValue={-80}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={1000}
          />
            }
              
            </View>
          </View>
        </View>

      </View>
    </ScrollView>      
    </LinearGradient>
</SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});



const ConfirmDelete = ({ id }: { id: number }) => {


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