import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/loginnew';

import Home from '../screens/dashboard/home';

import MyTabs from './tabnavigation';

import SignUp from '../screens/forms/signUp';

import StatusLeave from '../screens/forms/Personal/statusLeave';


import InspectionReport from '../screens/reports/inspectionHistory';
import ApplyLeave from '../screens/forms/Personal/userApplyLeave';
;


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
     
        <Stack.Screen name="Login" component={Login}
        options={{
          headerShown:false
        }}
        />
         <Stack.Screen name="Inspection History" component={InspectionReport}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name="Home" component={Home} 
         options={{ 
          unmountOnBlur:true,
          headerShown: false 
        }}
        />
      
        
       
        
         <Stack.Screen name="SignUp" component={SignUp}  
          options={{ 
            unmountOnBlur:true,
            headerShown: false }}
         /> 
         <Stack.Screen name="Daily Progress" component={ApplyLeave} 
          options={{ 
            unmountOnBlur:true,
            headerShown: false }}
         /> 
        
        <Stack.Screen name="MyTabs" component={MyTabs} 
        options={{
          headerShown:false,
          
         
        }}
        />
         
       
        

      </Stack.Navigator>
     </NavigationContainer>
  );
};

export default MyStack