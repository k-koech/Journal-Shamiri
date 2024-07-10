import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import AddJournalScreen from '../screens/AddJournalScreen';
const Tab = createBottomTabNavigator();

export default function TabNavigations() {
  return (
    <Tab.Navigator backBehavior="history"
    screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          right: 10,
          left: 10,
          bottom: 10,
          backgroundColor: "#ffff",
          height: 70,
          borderRadius: 25,
          ...styles.shadow,
        },

      })}
    >
    <Tab.Screen name="Home" component={HomeScreen}
     options={{
        headerTitle: 'Home',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View className="flex items-center justify-center">
            <AntDesign name="home" size={24} color={focused ? "#026D87" : "#009FC6"} />
            <Text style={{ color: focused ? "#026D87" : "#009FC6" }}>Home</Text>
          </View>
        )

    }}
    />
    {/* <Tab.Screen name="AddJournal" component={AddJournalScreen} 
               options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <View className="flex items-center justify-center">
                    <Ionicons name="add-circle-outline" size={24} color={focused ? "#026D87" : "#009FC6"} />
                    <Text style={{ color: focused ? "#026D87" : "#009FC6" }}>Add Journal</Text>
                  </View>
                ),
        
            }}
    /> */}
    <Tab.Screen 
      name="AddJournal"
      component={AddJournalScreen}
      options={({ navigation, route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View className="flex items-center justify-center">
            <Ionicons name="add-circle-outline" size={24} color={focused ? "#026D87" : "#009FC6"} />
            <Text style={{ color: focused ? "#026D87" : "#009FC6" }}>Add Journal</Text>
          </View>
        ),
        tabPress: () => {
          navigation.navigate('AddJournal', { journal: null });
        },
      })}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} 
           options={{
            headerTitle: 'Profile',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View className="flex items-center justify-center">
                <AntDesign name="user" size={24} color={focused ? "#026D87" : "#009FC6"} />
                <Text style={{ color: focused ? "#026D87" : "#009FC6" }}>Profile</Text>
              </View>
            )
    
        }}
    />
  </Tab.Navigator>
  )
}



const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#7f5df0",
      shadowOffset:{
        width:0, height:10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation:5
    }
  })
