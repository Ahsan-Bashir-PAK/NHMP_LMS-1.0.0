import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native';

// import AddVehicle from '../screens/forms/addVehicle';
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import {   BadgeInfo } from 'lucide-react-native';


import StatusLeave from '../screens/forms/Personal/statusLeave';

import { useNavigation } from '@react-navigation/native';

import Home from '../screens/home';


const Tab =  createBottomTabNavigator();

const MyTabs = () => {

  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Tab.Navigator>
  
      
  
   

<Tab.Screen name="statusLeave"  component={StatusLeave}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <BadgeInfo  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />

        
      </Tab.Navigator>
      // </NavigationContainer>
  );
};

export default MyTabs