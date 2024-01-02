import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native';

// import AddVehicle from '../screens/forms/addVehicle';
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import {   AlertOctagon, BadgeInfo, CheckCircle, Forward, MailCheck, Octagon, TabletsIcon, XOctagon } from 'lucide-react-native';
import StatusLeave from '../screens/forms/Personal/statusLeave';
import UserForwarededLeaves from '../screens/forms/Personal/userForwarededLeaves';
import UserApprovedLeaves from '../screens/forms/Personal/userApprovedLeaves';
import UserRejectedLeaves from '../screens/forms/Personal/userRejectedLeaves';
import { useNavigation } from '@react-navigation/native';




const Tabs =  createBottomTabNavigator();

const UserTabs = () => {

  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Tabs.Navigator
      screenOptions={{
        tabBarBackground:'#zzzzzzzzzzz',
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#c0c0c0',
        tabBarLabelStyle:{
          fontSize:12,
          

        },
       
      }}
  >

<Tabs.Screen name="Forwarded"  component={UserForwarededLeaves}
        
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <Forward  stroke="blue" size={25} fill='white' />
          )
      }}  />

<Tabs.Screen name="Approved"  component={UserApprovedLeaves}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <CheckCircle  stroke="green" size={25} fill='white' />
          )
      }}

        />
<Tabs.Screen name="Rejected"  component={UserRejectedLeaves}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          
          tabBarIcon:()=>(
            <XOctagon  stroke="red" size={25} fill='white' />
          )
      }
    }
    

        />
        
      </Tabs.Navigator>
      // </NavigationContainer>
  );
};

export default UserTabs