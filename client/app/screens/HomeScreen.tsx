import { View,Button, Text,StatusBar, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Touchable } from 'react-native'
import React,{useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }: { navigation: any })
 {
  const [clickedCategory, setClickedCategory] = useState('')

  const categories = ['Personal', 'Work', 'Travel', 'Other']

  const handleCategoryPress = (category: string) => {
    setClickedCategory(category)
  }

  return ( 
    <SafeAreaView className="flex-1">   
    <StatusBar translucent backgroundColor="transparent"/>

  <LinearGradient colors={['#E0F9FF', '#fff', "#F1FCFF", "#fff"]} style={{flex: 1}}>
  <ScrollView className=" flex-1 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 mb-24 pb-4 ">
      <View className='flex flex-row justify-between items-center'>
        <View className='mt-8'>
          <Text className="text-2xl mb-2 font-thin" style={{fontFamily:"poppins"}}>Hi Kelvin</Text>
          <View>
            <Text className="text-2xl mb-2">Welcome to </Text>        
            <Text className="text-8xl mb-2 text-[#026D87]" style={{fontFamily: 'dancing_script'}}>Journal</Text>
          </View>
        </View>
        <View className='flex justify-center items-center'>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} className='bg-white p-2 rounded-lg'>
            <Ionicons name="person" size={24} color="#009FC6" />
            <Text className='text-blue-500 text-center text-xs'>KK</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View className='flex flex-row items-center justify-between border border-gray-300 rounded-lg mt-4'>
        <TextInput
          className='w-[82%] placeholder-gray-500 p-2 '
          placeholder='Search Journal'
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Journal')}
          className='w-[13%] xbg-blue-500 p-2 rounded-lg justify-center items-center'
        >
          <Ionicons name="search" size={24} color="#009FC6" />
        </TouchableOpacity>
      </View>
 
      <Text className='text-2xl mt-8' style={{fontFamily: 'poppins'}}>Categories</Text>
      <View className='flex flex-row justify-between gap-2 flex-wrap  mt-2'>
        {categories.map((category) => (
          <TouchableOpacity onPress={()=>handleCategoryPress(category)} key={category} className={` ${clickedCategory==category ? "bg-[#026D87]": "bg-white "}  border border-[#026D87] py-2 px-6 rounded-lg`}>
            <Text className={` ${clickedCategory==category ? "text-white":"" } px-1.5`}>{category}</Text>
          </TouchableOpacity>
        ))}


        {/* <TouchableOpacity className='flex flex-row justify-between items-center bg-[#026D87] py-2 px-6 rounded-lg'>
          <Text className='text-white'>Personal</Text>
          <Ionicons name="chevron-forward" size={14} color="#009FC6" />
        </TouchableOpacity>
        <TouchableOpacity className='flex flex-row justify-between items-center bg-[#026D87] py-2 px-6 rounded-lg mt-4'>
          <Text className='text-white'>Work</Text>
          <Ionicons name="chevron-forward" size={14} color="#009FC6" />
        </TouchableOpacity>
        <TouchableOpacity className='flex flex-row justify-between items-center bg-white border border-[#009FC6] py-2 px-6 rounded-lg mt-4'>
          <Text className='text-gray-600'>Travel</Text>
          <Ionicons name="chevron-forward" size={14} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className='flex flex-row justify-between items-center bg-white border border-[#009FC6] py-2 px-6 rounded-lg mt-4'>
          <Text className='text-gray-600'>Other</Text>
          <Ionicons name="chevron-forward" size={14} color="black" />
        </TouchableOpacity> */}
      </View>



      <View className='flex mt-8'>
        <Text className='text-2xl mb-2' style={{fontFamily: 'poppins'}}>Journals</Text>
        <View>
          <View>

            <View>
            { [1, 2, 3, 4,5,6,7].map((item) => (
              <View className='flex min-h-[10vh] flex-row justify-between jhitems-center border border-gray-300 rounded-lg mb-4'>
                  <View className='w-[20%] jh-full rounded-lg bg-[#026D87] flex justify-center items-center'>
                    <Text className='text-white text-2xl font-bold'>J</Text>
                  </View>

                <View className='flex-1 flex-row justify-between '>                  
                  <View className='px-2'>
                    <Text className='text-xl'>Title</Text>
                    <Text className=''>Title</Text>
                    <Text className='text-sm text-gray-700'>Date</Text>
                  </View>
                  <View className='flex justify-center'>
                     <Ionicons name="chevron-forward" size={24} color="#009FC6" />
                  </View>
                </View>
              </View>
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