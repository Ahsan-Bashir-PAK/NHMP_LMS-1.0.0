import React, { useEffect, useState  } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView,Alert, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';

import '../../../config'
import {Calendar, Clock2, Clock4  } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { retrieveUserSession } from '../../../config/functions';


const StatusLeave = () => {
  
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

const getProgress = async()=>{ 

 // console.log(`${global.BASE_URL}/web/daily/officerwisedsr/${startDate}/${endDate}/${startTime}/${endTime}/${currentUser.userName}`)

 await axios.get(`${global.BASE_URL}/web/daily/officerwisedsr/${startDate}/${endDate}/${startTime}/${endTime}/${currentUser.userName}`)
  .then(
    (response) =>{
      const result = response.data
      if(result){
      setDriverData(result.driver[0])
      setvehicleData(result.vehicles[0])
      setinspectionData(result.inspection[0])
      // setinspectionData(result.inspections[0])
        setReport(false)
      // console.log('dvr',driverData["added"],'vhcle',vehicleData,'insp',inspectionData)
      }
      else {
        Alert.alert("Not Record Found.")
       
        
      }
  })

}
useEffect(()=>{
  retrieveUserSession(setCurrentUser)
})



return (
    <ScrollView className="">
    <View className=" flex flex-col p-2  ">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>

        {/* Status  Of Leaves */}
        <View className=" bg-green-800 mt-1 w-full rounded-md  ">
          <View className="  rounded-md p-1 m-1 w-fit items-center justify-center flex-col ">
            <Text className="text-white text-lg rounded-md font-bold ">Approved Leaves</Text>
        
          </View>
        </View>


   {/* Forwarded Days*/}
   <View className={` flex-row m-2  justify-evenly` }>
   <View className=" w-3/12 justify-center  items-center  rounded-md bg-gray-200 border-gray-400 border" >
             <Text className="text-black text-xs">Leaved ID</Text>
        </View>
       <View className=" w-4/12 justify-center  items-center  rounded-md bg-gray-200 border-gray-400 border" >
             <Text className="text-black text-xs">Requested days</Text>
        </View>
         
        <View className=" w-4/12 justify-center items-center  rounded-md bg-gray-200 border-gray-400 border" >
             <Text className="text-black text-xs text-center">Leave Type</Text>
        </View> 
        
          </View>
      </KeyboardAvoidingView>
    </View>
    
  </ScrollView>
  );
};


export default StatusLeave;

const styles = {
  
    labelstyle:
    'text-center items-center justify-center w-3/6  border-r  border-slate-400  ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'
    
};