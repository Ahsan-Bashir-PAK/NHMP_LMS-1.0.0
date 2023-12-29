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


const SectorCmdrApproved = () => {
  
  const dropdownRef = useRef({});  
  const navigation = useNavigation();

const [showReport, setReport] = useState(true)

const [currentUser,setCurrentUser] = useState('')

  
  // Start Date
const [dobopen, setdobOpen] = useState(false)
const [dobdate, setdobDate] = useState(new Date())
  // End Date
const [endopen, setdOpen] = useState(false)
const [enddate, setdDate] = useState(new Date())

 
const leaveType = [ "Casual Leave" ,"Earned Leave"];  
const [leave_type, setLeaveType] = useState(""); 
const [reason,setReason] =useState()


const startDate = dobdate
const endDate = enddate
const today = new Date().toISOString()

useEffect(()=>{
  retrieveUserSession(setCurrentUser)
  // getSectorWiseLeaveRequests()
})

async function  submitleave(){
        if(endDate < startDate) {

          Alert.alert("Please enter Correct dates")
          
        } else if(leave_type == "") {  Alert.alert("Please Select leave Type")}
        else if(reason == "") {  Alert.alert("Please mention Reason")}
 else {
  const leave_req={
    date :today,
    leaveId: await get_max_id("leaveStatus","leaveId"),
    leaveType :4,
    startDate :startDate,
    endDate :endDate,
    reason:reason,
    userId :currentUser.id,
    status:0

}

     applyLeave(leave_req)
    }
    clearLeaveForm()
    
}

function clearLeaveForm() {
  dropdownRef.current.reset()
    setReason("")
    setdobDate(new Date())
    setdDate(new Date())
  }

return (
  <ScrollView className="">
  <View className=" flex flex-col p-2  ">
    <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>

      {/* Apply Leave */}
      <View className=" bg-green-700 mt-1 w-full rounded-md  ">
        <View className="  rounded-md p-1 m-1 w-fit items-center justify-center flex-col ">
          <Text className="text-white text-lg rounded-md font-bold ">Approved Leaves</Text>
      
        </View>
      </View>


    </KeyboardAvoidingView>
  </View>
  
</ScrollView>
  );
};


export default SectorCmdrApproved;

const styles = {
  
    labelstyle:
    'text-center items-center justify-center w-3/6  border-r  border-slate-400  ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900',
    resultfield:
    'text-black font-bold w-5/6 text-lg items-center justify-center text-center'
};