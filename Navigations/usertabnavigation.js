import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native';


import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';

import {   AlertOctagon, BadgeInfo, CheckCircle, CheckCircle2, Focus, Forward, Hourglass, MailCheck, Octagon, TabletsIcon, XOctagon,HomeIcon} from 'lucide-react-native';


import UserForwarededLeaves from '../screens/forms/Personal/userForwardedLeaves';
import UserApprovedLeaves from '../screens/forms/Personal/userApprovedLeaves';
import UserRejectedLeaves from '../screens/forms/Personal/userRejectedLeaves';
import { useNavigation } from '@react-navigation/native';

import Home from '../screens/dashboard/home';
import UserPendingLeaves from '../screens/forms/Personal/userPendingLeaves';



const Tabs =  createBottomTabNavigator();

const UserTabs = () => {

  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle:{
           borderColor:'#d7d8db',
           borderTopWidth:1
            
        },
        
        tabBarInactiveBackgroundColor:'#ffffff',
        tabBarActiveBackgroundColor:'#d9d9de',
        tabBarActiveTintColor: '#051c4a',
        tabBarInactiveTintColor: '#69696b',
       
        tabBarLabelStyle:{
          fontSize:12,
        },
        
      }}
  >

<Tabs.Screen name="Pending"  component={UserPendingLeaves}

        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <Hourglass  stroke="orange" size={25}  />

          ),
          
      }}

        />

<Tabs.Screen name="Forwarded"  component={UserForwarededLeaves}
        
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <Forward  stroke="#002196" size={25}  />
          )
      }}  />

{/* <Tabs.Screen name="Home"  component={Home}
       screenOptions={{}}
       options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <HomeIcon  stroke="green" size={25}  />
          )
      }}
          listeners={{
            
          }}
        /> */}

<Tabs.Screen name="Approved"  component={UserApprovedLeaves}
        options={{
          
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <CheckCircle2  stroke="green" size={25}  />
          )
      }}
      

        />


        
<Tabs.Screen name="Rejected"  component={UserRejectedLeaves}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          
          tabBarIcon:()=>(
            <XOctagon  stroke="red" size={25}  />
          )
      }
    }
    

        />
        
      </Tabs.Navigator>
      // </NavigationContainer>
  );
};

export default UserTabs