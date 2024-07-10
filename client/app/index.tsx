import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import JournalScreen from './screens/JournalScreen';
import JournalDetailScreen from './screens/JournalDetailScreen';
import SummaryScreen from './screens/SummaryScreen';
import TabNavigations from './navigations/TabNavigations';
import { useFonts } from 'expo-font';
import Spinner from './components/Spinner';
import ToastManager from 'toastify-react-native';
import { View } from 'react-native';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { JournalProvider } from './context/JournalContext';
import { RootStackParamList } from './context/types';
import AddJournalScreen from './screens/AddJournalScreen';

// const Stack = createStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();


export default function index() {

  const [isLoaded, setIsFontLoaded] = useState<Boolean>(false)
  const [loaded, error] = useFonts({
        'roboto': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
        'merienda': require('../assets/fonts/Merienda/Merienda-VariableFont_wght.ttf'),
        'dancing_script': require('../assets/fonts/Dancing_Script/DancingScript-Bold.ttf'),
        'poppins': require('../assets/fonts/Poppins/Poppins-Regular.ttf')
  });


  useEffect(() => {
    if (loaded || error) {
      setIsFontLoaded(true);
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if(!isLoaded){
     return <Spinner/>
  }




  return (
    <View className="flex-1 bg-white">
    <NavigationContainer independent={true}>      
      <AuthProvider>
        <JournalProvider>
              <App />
        </JournalProvider>
      </AuthProvider>
    </NavigationContainer>
  </View>
  )
}


function App() {
  const { current_user } = useAuthContext();



  return (
    <View className="flex-1 bg-white">
      <ToastManager />
        <Stack.Navigator>
          {current_user?.email ? (
            <>
              <Stack.Screen name="tabs" component={TabNavigations}   options={{headerShown: false}} />
              <Stack.Screen name="Journal" component={JournalScreen} options={{headerShown: false }}/> 
              <Stack.Screen name="JournalDetail" component={JournalDetailScreen} options={{headerShown: false}} />
              {/* <Stack.Screen name="AddJournal" component={AddJournalScreen} options={{headerShown: false}} /> */}
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