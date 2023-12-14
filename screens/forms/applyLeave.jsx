import React, { useEffect, useState  } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView,Alert, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';

import '../../config'
import {Calendar, Clock2, Clock4  } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { retrieveUserSession } from '../../config/functions';


const ApplyLeave = () => {
  
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

function submitleave(){
        if(startDate  == endDate || endDate < startDate) {

          Alert.alert("Please enter Correct dates")
          
        } else if(leave_type == "") {Alert.alert(leaveType)}
 else {
          Alert.alert("Submitted")
 }}

return (
    <ScrollView className="">
    <View className=" flex flex-col p-2  ">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>

        {/* Apply Leave */}
        <View className=" bg-blue-900 mt-1 w-full rounded-md  ">
          <View className="  rounded-md p-1 m-1 w-fit items-center justify-center flex-col ">
            <Text className="text-white text-lg rounded-md font-bold ">Apply Leave</Text>
        
          </View>
        </View>

        {/* <View className="   w-full  ">
          <View className=" bg-[#7f9ab8] rounded-md p-1 m-1 w-fit items-center justify-center flex-col ">
            <Text className="text-white  text-sm rounded-md font-bold ">
              {/* {currentUser.rank}  {currentUser.name} */}
            {/*  </Text>
            <Text className="text-white text-xs rounded-md  ">
              {/* {currentUser.beat} {currentUser.sector} {currentUser.zone} */}
              {/*</Text>
          </View>
        </View> */}

   {/* Start Date*/}
   <View className={`${styles.outerview} m-2` }>
   <View className=" w-2/6 justify-center items-center rounded-md bg-green-500" ><Text className="text-white">Start Date</Text></View>
            <View className="w-4/6 items-center ">
            <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={dobopen}
              date={dobdate}
              onConfirm={value => {
                setdobOpen(false);
                setdobDate(value);
              }}
              onCancel={() => {
                setdobOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {dobdate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setdobOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
            </View>
          </View>

{/* End Date*/}
        <View className={styles.outerview}>
                    <View className=" w-2/6 justify-center items-center rounded-md bg-green-500" ><Text className="text-white">End Date</Text></View>
                    <View className="  w-4/6 items-center ">
                    <View className="flex flex-row gap-1">

                        <DatePicker
                          modal
                          mode="date"
                          open={endopen}
                          date={enddate}
                          onConfirm={value => {
                            setdOpen(false);
                            setdDate(value);
                          }}
                          onCancel={() => {
                            setdOpen(false);
                          }}
                        />

                    <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
                      {enddate.toLocaleDateString()}
                    </Text>
                    <TouchableOpacity onPress={() => setdOpen(true)}>
                      <Calendar stroke="black" fill="white" size={30}></Calendar>
                    </TouchableOpacity>
                  </View>
                    </View>
        </View>
{/* {/* Start Time */}
<View className={styles.outerview}>
                    <View className=" w-2/6 justify-center items-center rounded-md bg-slate-200" ><Text className="text-black">Leave Type</Text></View>
                    <View className="  w-4/6 items-center ">
                    <View className=" z-50">
                        <SelectDropdown
                          data= {leaveType}
                          onSelect={(selectedItem, index) => {
                            setLeaveType(selectedItem)            
                          }}
                          defaultButtonText='Select an option.'
                          buttonStyle={{
                            backgroundColor:'white',
                              
                          }}                
                          />
                        
                      </View>
</View>
</View>


       

{/* Report Form */}
           <View className=" p-4">
                <TextInput
                className="border rounded-lg  border-gray-400"
                multiline
                editable
                numberOfLines={15}
                maxLength={500}
                // onChangeText={text => setFeedBack(text)}
                // value={feedback}                            
                >
                  
                </TextInput>
                
            </View>

            <View className=" flex flex-row w-full justify-evenly items-center p-4 ">
              
              <TouchableOpacity 
              onPress={()=>navigation.goBack()}
              className="bg-red-600  rounded-md w-4/12 p-4 justify-center items-center">
                    <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={()=>submitleave()}
                className="bg-green-600  rounded-md w-4/12 p-4 justify-center items-center">
                    <Text className="text-white">Apply Leave</Text>
                </TouchableOpacity>
            </View>     

      </KeyboardAvoidingView>
    </View>
    
  </ScrollView>
  );
};


export default ApplyLeave;

const styles = {
  
    labelstyle:
    'text-center items-center justify-center w-3/6  border-r  border-slate-400  ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900',
    resultfield:
    'text-black font-bold w-5/6 text-lg items-center justify-center text-center'
};