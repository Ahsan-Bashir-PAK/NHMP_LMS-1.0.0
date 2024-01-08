import React, {useEffect, useState, useCallback} from 'react';
import {Modal, View, Text, TouchableOpacity,TextInput, ScrollView} from 'react-native';
import { retrieveUserSession } from '../config/functions';
import { updateLeaveStatus, saveApproval } from '../config/leavefunctions';
import { useNavigation } from '@react-navigation/native';
import { PersonalLeaveStatus } from '../config/leavefunctions';

function LeaveModal(props) {
  const [recDays,setRecDays] =useState()
const [remarks,setRemarks] =useState("")
const [currentUser,setCurrentUser] = useState('')
const [forwardedLeaves,setforwardedLeaves] = useState('')
const navigation = useNavigation();

const today = new Date().toISOString()


useEffect(()=>{
  retrieveUserSession(setCurrentUser)
},[])

const forwardLeave = async() =>{
  if(props.data && recDays){
    const leave_status= {
      "date" :today,
      "leaveId" :props.data.leaveId,
      "leaveType":props.data.leaveType,
      "startDate":props.data.startDate,
      "endDate":props.data.endDate,
      "reason":props.data.reason,
      "userId": props.data.userId,
      "authId" :currentUser.id,
      "days" :recDays,
      "remarks" :remarks,
      "status" :parseInt(currentUser.role)-1
}

updateLeaveStatus(leave_status,() => props.visibilitySetter(!props.visibility))



  }
}

const approveLeave = async() =>{
  if(props.data && recDays){
    const leave_status= {
      "date" :today,
      "leaveId" :props.data.leaveId,
      "leaveType":props.data.leaveType,
      "startDate":props.data.startDate,
      "endDate":props.data.endDate,
      "reason":props.data.reason,
      "userId": props.data.userId,
      "authId" :currentUser.id,
      "days" :recDays,
      "remarks" :remarks,
      "status" :parseInt(currentUser.role)-1
}

await saveApproval(leave_status,() => props.visibilitySetter(!props.visibility))

  }
}

const RejectLeave = async() =>{
  if(props.data && recDays){
    const leave_status= {
      "date" :today,
      "leaveId" :props.data.leaveId,
      "leaveType":props.data.leaveType,
      "startDate":props.data.startDate,
      "endDate":props.data.endDate,
      "reason":props.data.reason,
      "userId": props.data.userId,
      "authId" :currentUser.id,
      "days" :recDays,
      "remarks" :remarks,
      "status" :99
}

updateLeaveStatus(leave_status,() => props.visibilitySetter(!props.visibility))

  }
}




//=========getting cpo status 
useEffect(()=>{
 if(props.data){

   if(currentUser.role == 4 || currentUser.role == 3 ){
     
     PersonalLeaveStatus(currentUser, setforwardedLeaves, {
       id: props.data.userId,
       status1: 1,
       status2:3,
      });
    }
    
   
    
  }
  },[props])

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visibility}
        onRequestClose={() => {
          props.visibilitySetter(!props.visibility);
        }}>
        <View className="bg-[#d9d0f35e]  h-full w-full justify-center items-center flex">
          
          {props.data && (
            <View className=" w-11/12  bg-white border shadow  rounded-lg justify-center px-2 align-middle shadow-black ">
                <View className="mt-2  w-full justify-end items-center flex-row">   
                  {/* <Text className="text-black text-lg p-2 bg-gray-100 rounded-md ">
                    Details of officer who applied for leave
                  </Text> */}
                  <TouchableOpacity
                   onPress={() => props.visibilitySetter(!props.visibility)}
                    className="bg-red-600 p-1 rounded-md w-10 justify-center items-center">
                   <Text className="text-white font-bold">X</Text>
                  </TouchableOpacity>
                </View> 
                <View className=" justify-center  w-full items-center"> 
              
                    
                    <View className="p-2 w-11/12  justify-center"> 
                      <View className="flex flex-row items-center justify-center  my-1  ">
                        
                        <Text className="  text-black text-sm font-bold">{props.data.rank} {props.data.name} ({props.data.beltNo})</Text>
                      </View>
                    
                     
                      <View className="flex flex-row items-center justify-center mb-4">
                        <Text className="  text-black text-sm">{props.data.beat}, {props.data.sector}, {props.data.zone}</Text>
                      </View>
{/* ------------------------------------requested days */}
                    {/* Reason */}
                    <View className="flex flex-row  h-16 ">
                     
                     <Text className="text-black items-center   ">Reason:</Text>
                      <ScrollView>
                     <Text className="font-bold mb-1 px-2 rounded-md text-black text-sm italic bg-slate-100    "> 
                     {props.data.reason}
                     </Text>
                    </ScrollView> 
                   </View>

                      <View className="flex flex-row  flex-wrap">
                     
                        <Text className="text-black items-center ">Requested Days:</Text>
                
                        <Text className="font-bold mx-2 text-black text-sm bg-slate-200 rounded-sm px-2"> {props.data.Days}</Text>
                        <Text className="text-black text-sm ">({props.data.startDate.split("T")[0].split("-").reverse().join("-")} - to - {props.data.endDate.split("T")[0].split("-").reverse().join("-")})</Text>
                      </View>
                    


                      {/* <View className="flex flex-row">
                        <Text className="text-black ">Leave Availed:</Text> 
                        <Text className=" ml-6 text-black text-sm"> C/L:10 E/L:20</Text>
                      </View> */}
                    <View className = {`bg-slate-200 rounded-md p-2 m-1  ${currentUser?currentUser.role == 2?"hidden":"block":"hidden"}`}>
                        <View className='bg-blue-400 rounded-r-full p-1 w-2/5 -left-2 '>
                      <Text className=' text-white '> CPO Remarks</Text>

                        </View>
                      <View className="flex flex-row">
                        <Text className="text-black ">Forwarded Days :</Text> 
                        <Text className=" ml-2 text-black text-sm font-bold">{forwardedLeaves && forwardedLeaves.filter((item)=>item.leaveId == props.data.leaveId)[0].recDays} Days</Text>
                      </View>

                      <View className="flex flex-row flex-wrap mt-2 bg-gray-100 rounded-md p-2">
                        <Text className="text-gray-500 font-semibold ">Remarks:</Text> 
                        <Text className=" ml-2 text-black text-sm italic ">{forwardedLeaves && forwardedLeaves.filter((item)=>item.leaveId == props.data.leaveId)[0].remarks} </Text>
                      </View>
                      </View>


                      {/* OSI */}
                      <View className = {`bg-blue-100 rounded-md p-2 m-1  ${currentUser?currentUser.role < 4?"hidden":"block":"hidden"}`}>
                        <View className='bg-slate-300 rounded-r-full p-1 w-2/5 -left-2 '>
                      <Text className='font-bold text-gray-600'> OSI Remarks</Text>

                        </View>
                   

                      <View className={`flex flex-row flex-wrap mt-2 bg-gray-100 rounded-md p-2 ${currentUser?currentUser.role==3?"hidden":"block":"hidden"}`}>
                        <Text className="text-gray-600">Remarks:</Text> 
                        <Text className=" ml-2 text-grey-400 text-sm italic text-black ">{props.data.remarks}</Text>
                      </View>
                      </View>
                       
                      
              <TextInput 
              className='border rounded-lg w-full mt-2 border-gray-400 text-black' 
              placeholder ="Recommanded Days" 
              keyboardType='numeric'
              maxLength={3}
              value ={recDays}
              onChangeText={txt=>setRecDays(txt)}
              placeholderTextColor={'gray'}        
              />
              <TextInput

                className="border align-text-top rounded-lg w-full  mt-2 border-gray-400 text-black "
                multiline
                editable
                numberOfLines={8}
                maxLength={500}
                placeholder='Enter Remarks'
                value ={remarks}
                placeholderTextColor={'gray'}
                onChangeText={txt=>setRemarks(txt)}                          
                />
                  
               

              <View className=" flex flex-row gap-2 p-4 mt-5 justify-center ">
                <TouchableOpacity
                  onPress={() => props.visibilitySetter(!props.visibility)}
                  className="bg-orange-600 p-2 rounded-md w-22 justify-center items-center">
                  <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>forwardLeave()}
                  className="bg-blue-500 p-2 rounded-md w-22 justify-center items-center">
                  <Text className="text-white">Forward</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>approveLeave()}
                  className={`bg-green-600 p-2 rounded-md w-22 justify-center items-center ${currentUser?currentUser.role == 4?"block":"hidden":"hidden"}`}>
                  <Text className="text-white">Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>RejectLeave()}
                  className={`bg-red-600 p-2 rounded-md w-22 justify-center items-center ${currentUser?currentUser.role == 4?"block":"hidden":"hidden"}`}>
                  <Text className="text-white">Reject</Text>
                </TouchableOpacity>
              </View>
              </View>
              </View> 
            </View>
          )}
     
        </View>
      </Modal>
    </>
  );
}

export default LeaveModal;


