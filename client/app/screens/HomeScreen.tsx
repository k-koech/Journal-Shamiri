import { View,Button, Text,StatusBar, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Touchable, Image, RefreshControl } from 'react-native'
import React,{useContext, useState} from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { server_url } from '../../config.json';
import { JournalContext } from '../context/JournalContext';
import Spinner from '../components/Spinner';



export default function HomeScreen({ navigation }: { navigation: any })
 {
  const { current_user} = useContext(AuthContext);
  const {journals} = useContext(JournalContext)


  const [clickedCategory, setClickedCategory] = useState('All')
  const categories = ["All", 'Personal', 'Work', 'Travel', 'Other']

  const [refreshing, setRefreshing] = useState(false);
  const {onChange, setOnchange} = useContext(AuthContext)

  const onRefresh = async () => {
     setOnchange(!onChange)
  };

  const handleCategoryPress = (category: string) => {
    setClickedCategory(category)
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
            { journals && journals.map((journal) => (
              <TouchableOpacity onPress={() => navigation.navigate("JournalDetail") } className='flex min-h-[10vh] flex-row justify-between jhitems-center border border-gray-300 rounded-lg mb-4'>
                  <View className='w-[20%] jh-full rounded-lg bg-[#026D87] flex justify-center items-center'>
                    <Text className='text-white text-2xl font-bold uppercase'>{journal?.title[0]}</Text>
                  </View>

                <View className='flex-1 flex-row justify-between '>                  
                  <View className='px-2 flex-1'>
                    <Text className='text-xl'>{journal.title}</Text>
                    <Text className=''>{journal?.description}</Text>
                    <View className='flex w-full flex-row items-center justify-between'>
                      <Text className='text-sm text-white bg-[#026D87] rounded-sm px-1.5'>{journal?.category}</Text>                    
                      <Text className='text-sm text-gray-700'>{journal?.date}</Text>
                    </View>
                  </View>
                  <View className='flex justify-center w-6'>
                     <Ionicons name="chevron-forward" size={24} color="#009FC6" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
              
            </View>
          </View>
        </View>

      </View>
    </ScrollView>      
    </LinearGradient>
</SafeAreaView>
  )
}