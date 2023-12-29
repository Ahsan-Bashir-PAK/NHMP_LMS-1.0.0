import React, {useEffect, useState, useCallback} from 'react';
import {Modal, View, Text, TouchableOpacity,TextInput} from 'react-native';
import { retrieveUserSession } from '../config/functions';
import { updateLeaveStatus } from '../config/leavefunctions';
import { useNavigation } from '@react-navigation/native';

function LeaveModal(props) {
  const [recDays,setRecDays] =useState()
const [remarks,setRemarks] =useState("")
const [currentUser,setCurrentUser] = useState('')
const [status,setStatus] = useState('')
const navigation = useNavigation();

const today = new Date().toISOString()


useEffect(()=>{
  retrieveUserSession(setCurrentUser)
})

const forwardLeave = async() =>{
//  switch (currentUser.role) {
//   case 2:
//     setStatus(1)
//     break;
//     case 3:
//       setStatus(2)
//       break;
//       case 4:
//         setStatus(3)
//         break;      
//         case 5:
//           setStatus(4)
//           break;
//           case 6:
//             setStatus(5)
//             break;
//             case 7:
//               setStatus(6)
//               break;
//               case 8:
//                 setStatus(7)
//                 break;
//                 case 9:
//                   setStatus(8)
//                   break;
//                   case 10:
//                     setStatus(9)
//                     break;
//   default:
//     break;
//  }
  




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
                      <View className="flex flex-row ">
                     
                        <Text className="text-black ">Requested Days:</Text>
                
                        <Text className="font-bold mx-2 text-black text-sm bg-slate-200 rounded-sm px-2"> {props.data.Days}</Text>
                        <Text className="text-black text-sm">({props.data.startDate.split("T")[0].split("-").reverse().join("-")} - to - {props.data.endDate.split("T")[0].split("-").reverse().join("-")})</Text>
                      </View>
                    


                      {/* <View className="flex flex-row">
                        <Text className="text-black ">Leave Availed:</Text> 
                        <Text className=" ml-6 text-black text-sm"> C/L:10 E/L:20</Text>
                      </View> */}
                    <View className = {`bg-blue-200 rounded-md p-2 m-1  ${currentUser?currentUser.role == 2?"hidden":"block":"hidden"}`}>
                        <View className='bg-green-400 rounded-r-full p-1 w-2/5 -left-2 '>
                      <Text className='font-bold '> CPO Remarks</Text>

                        </View>
                      <View className="flex flex-row">
                        <Text className="text-black ">Forwarded Days :</Text> 
                        <Text className=" ml-2 text-black text-sm">05 Days</Text>
                      </View>

                      <View className="flex flex-row flex-wrap mt-2 bg-gray-100 rounded-md p-2">
                        <Text className="text-black ">Remarks:</Text> 
                        <Text className=" ml-2 text-grey-400 text-sm italic ">Sir, The beat is already facing acute shortage of strength it is requested that please provide subsitute </Text>
                      </View>
                      </View>


                      {/* OSI */}
                      <View className = {`bg-blue-200 rounded-md p-2 m-1  ${currentUser?currentUser.role == 2?"hidden":"block":"hidden"}`}>
                        <View className='bg-yellow-300 rounded-r-full p-1 w-2/5 -left-2 '>
                      <Text className='font-bold '> OSI Remarks</Text>

                        </View>
                   

                      <View className="flex flex-row flex-wrap mt-2 bg-gray-100 rounded-md p-2">
                        <Text className="text-black ">Remarks:</Text> 
                        <Text className=" ml-2 text-grey-400 text-sm italic ">Sir, The beat is already facing acute shortage of strength it is requested that please provide subsitute </Text>
                      </View>
                      </View>
                       
                      
              <TextInput 
              className='border rounded-lg w-full mt-2 border-gray-400' 
              placeholder ="Recommanded Days" 
              keyboardType='numeric'
              maxLength={3}
              value ={recDays}
              onChangeText={txt=>setRecDays(txt)}

              />
              <TextInput

                className="border rounded-lg w-full text-center mt-2 border-gray-400 "


                multiline
                editable
                numberOfLines={8}
                maxLength={500}
                placeholder='Remarks'
                value ={remarks}
                onChangeText={txt=>setRemarks(txt)}                          
                />
                  
               

              <View className=" flex flex-row gap-2 p-4 mt-5 justify-center ">
                <TouchableOpacity
                  onPress={() => props.visibilitySetter(!props.visibility)}
                  className="bg-red-600 p-2 rounded-md w-32 justify-center items-center">
                  <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>forwardLeave()}
                  className="bg-green-600 p-2 rounded-md w-32 justify-center items-center">
                  <Text className="text-white">Forward</Text>
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
