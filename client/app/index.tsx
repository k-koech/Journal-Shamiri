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
import ToastManager from 'toastify-react-native';
import { View } from 'react-native';
import { AuthProvider } from './context/AuthContext';

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
    <View className="flex-1 bg-white">
    <NavigationContainer independent={true}>      
      <AuthProvider>
              <App />
      </AuthProvider>
    </NavigationContainer>
  </View>
  )
}


function App() {


 const current_user = null;


  return (
    <View className="flex-1 bg-white">
      <ToastManager />
        <Stack.Navigator>
          {current_user ? (
            <>
              <Stack.Screen name="tabs" component={TabNavigations}   options={{headerShown: false}} />
              <Stack.Screen name="Journal" component={JournalScreen} options={{headerShown: false }}/> 
              <Stack.Screen name="JournalDetail" component={JournalDetailScreen} options={{headerShown: false}} />
              <Stack.Screen name="Summary" component={SummaryScreen} /> 
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthScreen}  options={{headerShown: false}} />
            </>
          )}
        </Stack.Navigator>
    </View>
  );
}