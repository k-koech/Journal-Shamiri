
import {  Text, View, TouchableOpacity } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useNavigation } from "@react-navigation/native";



const LogoTitle = () => 
    {
      return (
        <View className="flexl flex-row-justify-center items-center">
           <FontAwesome5 name="journal-whills" size={29} color="#1DBFB5" />
           <Text className="font-bold">J'nal</Text>
        </View>
      );
    };

 const CustomHeader = ({ title }) => {
    const navigation = useNavigation();
  
  
      return (
        <View className="h-20 bg-gray-100 flex flex-row justify-between shadow-xl items-end px-3 pb-3 pt-2" fstyle={{ flexDirection: 'row', alignItems: 'center' }}>
          <LogoTitle />

          <Text className="text-2xl font-bold text-gray-800">{title}</Text>
  
        </View>
      );
    };


    export default CustomHeader;