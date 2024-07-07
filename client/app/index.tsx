import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import JournalScreen from './screens/JournalScreen';
import JournalDetailScreen from './screens/JournalDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import SummaryScreen from './screens/SummaryScreen';
import TabNavigations from './navigations/TabNavigations';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Spinner from './components/Spinner';

const Stack = createStackNavigator();

export default function index() {
  const [fontsLoaded] = useFonts({
   "poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
   "roboto": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
   "merienda": require("../assets/fonts/Merienda/Merienda-VariableFont_wght.ttf"),
   "dancing_script": require('../assets/fonts/Dancing_Script/DancingScript-Bold.ttf')
   
  });
   if (!fontsLoaded) {
    return <Spinner/>
  }

  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Auth">
      {/* <Stack.Screen name="Auth" component={AuthScreen}  options={{headerShown: false}} /> */}
      <Stack.Screen name="tabs" component={TabNavigations}   options={{headerShown: false}} />
      <Stack.Screen name="Journal" component={JournalScreen} /> 
      <Stack.Screen name="JournalDetail" component={JournalDetailScreen} options={{headerShown: false}} />
      
      <Stack.Screen name="Summary" component={SummaryScreen} /> 
    </Stack.Navigator>
  </NavigationContainer>
  )
}