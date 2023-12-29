import React, { useEffect, useState, useRef  } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView,Alert, TextInput, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';

import '../../../config'
import {Calendar} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { retrieveUserSession } from '../../../config/functions';
import { applyLeave } from '../../../config/leavefunctions';
import { get_max_id } from '../../../config/functions';


const CpoForwarededLeaves = () => {
  
  
  const navigation = useNavigation();



const [currentUser,setCurrentUser] = useState('')



const today = new Date().toISOString()

useEffect(()=>{
  retrieveUserSession(setCurrentUser)
})



return (
    <ScrollView className="">
    <View className=" flex flex-col p-2  ">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>

        {/* Apply Leave */}
        <View className=" bg-blue-900 mt-1 w-full rounded-md  ">
          <View className="  rounded-md p-1 m-1 w-fit items-center justify-center flex-col ">
            <Text className="text-white text-lg rounded-md font-bold ">Forwareded Leaves</Text>
        
          </View>
        </View>

  
      </KeyboardAvoidingView>
    </View>
    
  </ScrollView>
  );
};


export default CpoForwarededLeaves;

const styles = {
  
    labelstyle:
    'text-center items-center justify-center w-3/6  border-r  border-slate-400  ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900',
    resultfield:
    'text-black font-bold w-5/6 text-lg items-center justify-center text-center'
};