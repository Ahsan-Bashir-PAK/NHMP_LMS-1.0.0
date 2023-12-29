import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native';

// import AddVehicle from '../screens/forms/addVehicle';
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import {   BadgeInfo } from 'lucide-react-native';


import StatusLeave from '../screens/forms/Personal/statusLeave';
import CpoForwarededLeaves from '../screens/forms/user/cpoForwareded';
import SectorCmdrApproved from '../screens/forms/user/sectorCmnderApproved';
import SectorCmdrRejected from '../screens/forms/user/sectorCmnderRej';
import { useNavigation } from '@react-navigation/native';




const Tab =  createBottomTabNavigator();

const MyTabs = () => {

  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Tab.Navigator> 

<Tab.Screen name="CPO Forwarded"  component={CpoForwarededLeaves}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <BadgeInfo  stroke="#0332BB" size={25} fill='white' />
          )
      }}  />

<Tab.Screen name="Approved"  component={SectorCmdrApproved}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <BadgeInfo  stroke="#0332BB" size={25} fill='white' />
          )
      }}

        />
<Tab.Screen name="Rejected"  component={SectorCmdrRejected}
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