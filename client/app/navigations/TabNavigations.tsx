import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomHeader from '../components/CustomHeader';
const Tab = createBottomTabNavigator();

export default function TabNavigations() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        header: () => <CustomHeader title={route.name} />,
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
        tabBarIcon: ({ focused }) => (
          <View className="flex items-center justify-center">
            <AntDesign name="home" size={24} color={focused ? "" : "#009FC6"} />
            <Text style={{ color: focused ? "" : "#009FC6" }}>Home</Text>
          </View>
        )

    }}
    />
    <Tab.Screen name="Add Journal" component={ProfileScreen} 
               options={{
                tabBarIcon: ({ focused }) => (
                  <View className="flex items-center justify-center">
                    <AntDesign name="user" size={24} color={focused ? "" : "#009FC6"} />
                    <Text style={{ color: focused ? "" : "#009FC6" }}>Profile</Text>
                  </View>
                )
        
            }}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} 
           options={{
            headerTitle: 'Profile',
            tabBarIcon: ({ focused }) => (
              <View className="flex items-center justify-center">
                <AntDesign name="user" size={24} color={focused ? "" : "#009FC6"} />
                <Text style={{ color: focused ? "" : "#009FC6" }}>Profile</Text>
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
