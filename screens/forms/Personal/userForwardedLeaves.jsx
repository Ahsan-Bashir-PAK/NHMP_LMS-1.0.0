
import React, { useEffect, useState  } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView,Alert, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';

import '../../../config'
import {Calendar, Clock2, Clock4  } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { retrieveUserSession } from '../../../config/functions';
import { PersonalLeaveStatus } from '../../../config/leavefunctions';


const UserForwarededLeaves = () => {
  
  const navigation = useNavigation();

const [showReport, setReport] = useState(true)

const [currentUser,setCurrentUser] = useState('')
  //const time = new Date().toLocaleTimeString();
  
  // Start Date
const [dobopen, setdobOpen] = useState(false)
const [dobdate, setdobDate] = useState(new Date())
  // End Date
const [endopen, setdOpen] = useState(false)
const [enddate, setdDate] = useState(new Date())

 
const leaveType = [ "Casual Leave" ,"Earned Leave"];  
const [leave_type, setLeaveType] = useState(""); 


const startDate = dobdate.toLocaleDateString().split("/").reverse().join("-")
const endDate = enddate.toLocaleDateString().split("/").reverse().join("-")

const [leaveStatus,setleaveStatus] = useState()




useEffect( () => {
  retrieveUserSession(setCurrentUser);
  PersonalLeaveStatus(currentUser,setleaveStatus, {
    "id":currentUser.id,
     "status1":1,
     "status2":1
   })

}, [currentUser]);



return (
    <ScrollView className="">
    <View className=" flex flex-col p-2  ">
      <KeyboardAvoidingView style={{ backgroundColor: 'transparent' }}>

        {/* Status  Of Leaves */}
        <View className=" bg-blue-900 mt-1 w-full rounded-md  ">
          <View className="  rounded-md p-1 m-1 w-fit items-center justify-center flex-col ">
            <Text className="text-white text-lg rounded-md font-extrabold  "> Forwarded By Beat Commander</Text>
            <Text className="text-white text-sm rounded-md   ">Total Applications  {leaveStatus?leaveStatus.length:""}</Text>        
          </View>
        </View>


   {/* Forwarded Days*/}
      {/* ======================== Heading====*/}
      <View className={` flex-row m-2  justify-evenly bg-slate-300 p-2` }>
   <View className=" w-2/12 justify-center  items-center  rounded-md " >
             <Text className="text-black text-xs">E-Leave #</Text>
        </View>
       <View className=" w-3/12 justify-center  items-center  rounded-md " >
             <Text className="text-black text-xs">Requested days</Text>
        </View>
        <View className=" w-3/12 justify-center  items-center  rounded-md " >
             <Text className="text-black text-xs">Forwarded days</Text>
        </View>
         
        <View className=" w-3/12 justify-center items-center  rounded-md " >
             <Text className="text-black text-xs text-center">Leave Type</Text>
        </View>         
          </View>
{/* ======================== Heading   end   */}






{/* =================================Pending Leaves Record */}

{leaveStatus &&
    leaveStatus.map((item,index)=>(
<View className={` flex-row m-2  justify-evenly items-center   bg-white p-2` } key={index}>
   <View className=" w-2/12 flex justify-center text-center items-center" >
             <Text className="text-black text-xs">{item.leaveId}</Text>
        </View>
       <View className=" w-3/12 flex justify-center  items-center" >
             <Text className="text-black text-xs">{item.Days}</Text>
        </View>
        <View className=" w-3/12 flex justify-center  items-center" >
             <Text className="text-black text-xs">{item.recDays}</Text>
        </View>
         
        <View className=" w-3/12 flex justify-center items-center" >
             <Text className="text-black text-xs text-center">{item.leaveType}</Text>
        </View>         
          </View>
          
          ))}
      </KeyboardAvoidingView>
    </View>
    
  </ScrollView>
  );
};


export default UserForwarededLeaves;

const styles = {
  
    labelstyle:
    'text-center items-center justify-center w-3/6  border-r  border-slate-400  ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'
    
};

