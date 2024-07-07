import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import JournalScreen from './screens/JournalScreen';
import JournalDetailScreen from './screens/JournalDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import SummaryScreen from './screens/SummaryScreen';


const Stack = createStackNavigator();

export default function index() {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthScreen}  options={{headerShown: false}} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Journal" component={JournalScreen} />
      <Stack.Screen name="JournalDetail" component={JournalDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}