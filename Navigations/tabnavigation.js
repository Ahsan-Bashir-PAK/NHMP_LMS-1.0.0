import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native';

import AddVehicle from '../screens/forms/addVehicle';
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import {  User, PlusCircle, FilePlus, BadgeInfo, ShieldQuestion, PlusSquare, HomeIcon, Navigation  } from 'lucide-react-native';

import AddDocumentation from '../screens/forms/addDocumentation';
import AddCondition from '../screens/forms/addCondition';
import AddOtherInfo from '../screens/forms/addOtherinfo';
import TripReport from '../screens/forms/tripReport';
import AddDrivernew from '../screens/forms/addDrivernew';
import AddCompany from '../screens/forms/addCompany';
import { useNavigation } from '@react-navigation/native';

import Home from '../screens/home';


const Tab =  createBottomTabNavigator();

const MyTabs = () => {

  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Add Driver " component={AddDrivernew} 
      options={{  
        headerShown:false,
        unmountOnBlur:true,
        tabBarIcon:()=>(
          <User  stroke="#0332BB" size={25} fill='white'/>
        )
    }}
  
      />
        <Tab.Screen name="Add Vehicle"  component={AddVehicle} 
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <PlusCircle  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />
        <Tab.Screen name="Add Documentation"  component={AddDocumentation}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <FilePlus  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />
         <Tab.Screen name="Add Condition"  component={AddCondition}
        options={{
          headerShown:false,
          unmountOnBlur:true,
         
          tabBarIcon:()=>(
            <ShieldQuestion stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />

<Tab.Screen name="Other Info"  component={AddOtherInfo}
        options={{
          headerShown:false,
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <BadgeInfo  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />
{/* <Tab.Screen name="AddCompany"  component={AddCompany}
        options={{
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <PlusSquare  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        /> */}
      {/* <Tab.Screen  name="Home"  component={Home}
        options={{
          headershown:false,
          unmountOnBlur:true,
          
          tabBarIcon:()=>(
            <HomeIcon  stroke="#123456" size={30} fill='#c0c0c0' onProgress={()=>navigation.navigate('Home')}  />
          )
          
      }}
        
        />  */}
        
      </Tab.Navigator>
      // </NavigationContainer>
  );
};

export default MyTabs