import React, { useEffect, useState, useRef  } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView,Alert, TextInput, FlatList } from 'react-native';
import '../../config'
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { retrieveUserSession,storeDriverSession,storeVehicleSession } from '../../config/functions';;
import { applyLeave } from '../../config/leavefunctions';
import { get_max_id } from '../../config/functions';
import LeaveModal from '../../components/leave_modal';

const LeaveRequests = () => {
  
  const dropdownRef = useRef({});  
  const navigation = useNavigation();
const [currentUser,setCurrentUser] = useState('')

const [reason,setReason] =useState()
const [leaveRequests,setleaveRequests] = useState()

const [modalVisible, setModalVisible] = useState(false);
const [modalData, setModalData] = useState();
const [leavemodalVisible, setleaveModalVisible] = useState(false);
const [leavemodalData, setleaveModalData] = useState();

const today = new Date().toISOString()

useEffect(()=>{
  retrieveUserSession(setCurrentUser);
  // getSectorAccountRequests()
  getSectorWiseLeaveRequests()
}, [])

//---------------------------------------------getting account request 
const  getSectorWiseLeaveRequests = async ()=>{
  const session = await EncryptedStorage.getItem('user_session');

  if (session !== undefined) {
    const user =JSON.parse(session)

  axios.post(`${global.BASE_URL}/leave/getLeaveRequests`,
  {
    "officeType":"sector",
    "office":currentUser.sector
  },
  { 
    headers:{
      api_key :global.KEY,
      Authorization:user.token
     }
  }).then(
    
    response=>setleaveRequests(response.data)
  )
}
}

//---------------------------------------------getting account request 
// const  getSectorAccountRequests = async ()=>{
//   const session = await EncryptedStorage.getItem('user_session');

//   if (session !== undefined) {
//     const user =JSON.parse(session)

//   axios.post(`${global.BASE_URL}/sign/accountRequests`,
//   {
//     "officeType":"sector",
//     "office":currentUser.sector
//   },
//   { 
//     headers:{
//       api_key :global.KEY,
//       Authorization:user.token
//      }
//   }).then(
//     // console.log(currentUser.sector)
//     response=>setsignUpRequests(response.data)
//   )
// }
// }

return (
    // <ScrollView className="">
    <View className=" flex flex-col p-2  ">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>



    {/* ==================Leave Approval Request for CPO===========*/}

<View className="mt-2  ">
        <TouchableOpacity
          
          className="w-full   h-10 rounded-lg  justify-center items-center bg-[#257c25] ">
          <View className="justify-center flex flex-row items-center  w-full gap-2">
       
            <Text className="  font-white  text-lg text-white">
             Employee Leaves Requests  </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className=" bg-gray-100 justify-startitems-start w-full">
      <FlatList className="p-2 overflow-scroll h-4/6 w-full"
        data={leaveRequests}
            renderItem={({ item, index }) => (
              
              
              <View className="flex   flex-row  items-center">
               
                <View className="flex p-2 w-9/12 border-b flex-row align-middle items-start">
                  <Text className="text-black ">{item.rank}</Text>
                   <Text className="text-black ml-2">{item.name}</Text>
                   <Text className="text-black ml-2">({item.beltNo})</Text>
                </View>  
                
                <View className="flex p-2 w-4/12 flex-row  items-center">             
                  <TouchableOpacity
                  onPress={()=>showModal(item,setleaveModalData,setleaveModalVisible)}
                  className="p-2 bg-green-800 rounded-md justify-between items-center"
                  >
                  <Text className="text-white">Detail</Text>    
                  </TouchableOpacity>
                  
                </View>
               
                <LeaveModal  data = {leavemodalData} visibility ={leavemodalVisible} visibilitySetter ={setleaveModalVisible} />
                </View>  
                  
              
           
           )}

      />
      </View>


     



       


            <View className=" flex flex-row w-full justify-evenly items-center p-4 ">
            <TouchableOpacity 
             
              className="bg-red-600  rounded-md w-3/12 p-3 justify-center items-center">
                    <Text className="text-white">Clear</Text>
                </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>navigation.goBack()}
              className="bg-red-600  rounded-md w-3/12 p-3 justify-center items-center">
                    <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                
               
            </View>     

      </KeyboardAvoidingView>
    </View>
    
  // </ScrollView>
  );
};


export default LeaveRequests;

const styles = {
  
    labelstyle:
    'text-center items-center justify-center w-3/6  border-r  border-slate-400  ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900',
    resultfield:
    'text-black font-bold w-5/6 text-lg items-center justify-center text-center'
};