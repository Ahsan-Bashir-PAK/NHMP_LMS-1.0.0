import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native';

// import AddVehicle from '../screens/forms/addVehicle';
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import {   BadgeInfo, CheckCircle2, Forward, XSquare } from 'lucide-react-native';


import StatusLeave from '../screens/forms/Personal/statusLeave';
import CpoForwarededLeaves from '../screens/forms/Admin/cpoForwarded';
import SectorCmdrApproved from '../screens/forms/Admin/sectorCmnderApproved';
import SectorCmdrRejected from '../screens/forms/Admin/sectorCmnderRej';
import { useNavigation } from '@react-navigation/native';




const Tab =  createBottomTabNavigator();

const MyTabs = () => {

  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Tab.Navigator
    screenOptions={{
      tabBarStyle:{
         borderColor:'#d7d8db',
         borderTopWidth:1
          
      },
      
      tabBarInactiveBackgroundColor:'#ffffff',
      tabBarActiveBackgroundColor:'#d9d9de',
      tabBarActiveTintColor: '#051c4a',
      tabBarInactiveTintColor: '#69696b',
    // tabBarInactiveTintColor: '#69696b',
      tabBarLabelStyle:{
        fontSize:12,
      },
      
    }}
> 

<Tab.Screen name="CPO Forwarded"  component={CpoForwarededLeaves}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <Forward  stroke="#0332BB" size={25}  />
          )
      }}  />

<Tab.Screen name="Approved"  component={SectorCmdrApproved}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <CheckCircle2  stroke="green" size={25}  />
          )
      }}

        />
<Tab.Screen name="Rejected"  component={SectorCmdrRejected}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <XSquare  stroke="red" size={25}  />
          )
      }}

        />
        
      </Tab.Navigator>
      // </NavigationContainer>
  );
};

export default MyTabs