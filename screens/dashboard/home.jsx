import React, { useEffect, useState,useCallback, } from 'react';
import { useNavigation,useIsFocused,useFocusEffect } from '@react-navigation/native';
import { UserPlus,  BadgePlus, BusFront,  UserCog2,  BookCopy, LogOutIcon, ArrowDownToLine, Link, UserCog2Icon, Plus, User, PenSquare, KeySquare, Truck, BarChart4, Navigation, Building, Building2  } from 'lucide-react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { retrieveUserSession,storeDriverSession,storeVehicleSession } from '../../config/functions';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Button,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import { LinearGradient } from 'react-native-svg';
// import SignUp from './forms/signUp';
import { BookOpenCheck } from 'lucide-react-native';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { Building2Icon } from 'lucide-react-native';




function Home() {
  const [currentUser, setCurrentUser] = useState({});

  const isFocused = useIsFocused() 

  const [reg, setReg] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [dvrCnic, setDvrCnic] = useState("");
  const navigation = useNavigation("");

  function clearAll(){
    setReg("")
    setYear("")
    setNumber("")
    setDvrCnic("")
  }



 useEffect(() => {
  retrieveUserSession(setCurrentUser);
  clearAll()


  const backAction = () => {
    if(navigation.isFocused()){
     Alert.alert('Hold on!', 'Are you sure you want to Logout?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => logoutSesion()},
      ]);
      return true;
    };}
    
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();



  
}, []);









  // logout clear all sessions

 async function logoutSesion () {
  
 
    try{  
  
          await EncryptedStorage.removeItem('psv_session');
          await EncryptedStorage.removeItem('currentUser');
          
          
       
   navigation.navigate('Login');
  } catch (error) {}

  }  



//========================================================check ban 

async function checkban (){
  try {
    if(reg && year && number 
      
      // && dvrCnic
      
      ){

  axios.get(`${BASE_URL}/web/ban/checkban/${reg+year+number}`).then(
    response=>{
        const result = response.data[0]
      if (result){
      if(result.banStatus =='ban'){
        if(result.banArea == 'sector'){
            if(result.banoffice == currentUser.sector){
                Alert.alert('Vehicle Ban Alert ⚠️',`Vehicle # ${reg}-${year}-${number} \n  \n Chasis # ${result.chasisNo} \n  is Banned in Sector : ${currentUser.sector}  \n From:  ${result.startDate} \n To: ${result.endDate}` )
            }
        }
        else if (result.banArea == 'zone'){
            if(result.banoffice == currentUser.zone){
              Alert.alert('Vehicle Ban Alert ⚠️',`Vehicle # ${reg}-${year}-${number} \n \n Chasis # ${result.chasisNo} \n Zone : ${currentUser.sector}  \n From: ${result.startDate} \n To: ${result.endDate}` )
            }
        }
        else if (result.banArea == 'region'){
            if(result.banoffice == currentUser.region){
              Alert.alert('Vehicle Ban Alert ⚠️',`Vehicle # ${reg}-${year}-${number} \n  \n Chasis # ${result.chasisNo} \n Region : ${currentUser.sector}  \n From: ${result.startDate} \n To: ${result.endDate}` )
            }
        }
        else if(result.banArea == 'hq'){
            
          Alert.alert('Vehicle Ban Alert ⚠️',`Vehicle # ${reg}-${year}-${number} \n  \n Chasis # ${result.chasisNo} \n  \n From: ${result.startDate} \n To: ${result.endDate} \n Vehicle banned in AOR of NHMP` )
        }
      }}


    }
)}
} catch (error) {
  
}
}


  //============================================saving report Session

  async function  getInspectionreport() {
    try {
      if(reg && year && number && dvrCnic){
       checkban()   
       await storeVehicleSession(reg,year,number)
       await storeDriverSession(dvrCnic)
       
        navigation.navigate("Trip Report")
      }
      else{
        Alert.alert("Please fill All Fields")
      }
      
    } catch (error) {
      console.log(error)
    }
   
  }

  //============================================================checking
  async function rptSessionProps() {
  try {
    await axios
      .get(
        `${global.BASE_URL}/psv/getPsv/${reg}/${year}/${number}`
      )
      .then(async response => {
        const psvDetail = response.data[0];
        if (psvDetail) {
          
          //------------------------getting driver data
          await axios
            .get(`${global.BASE_URL}/dvr/getDriver/${dvrCnic}`)
            .then(async response => {
              const driverDetail = response.data[0];
              if (driverDetail) {
                getInspectionreport()
              } else {
              
                Alert.alert('Driver not in record');
              }
            });
        } else {
        
          Alert.alert('PSV not in record');
         
        }
      });
  } catch (error) {
    console.log(error);
  }
}
  

  return (
    <KeyboardAvoidingView
    >
{/* behavior={Platform.OS === 'android' ? 'Padding' : null}
     enabled */}
   <ScrollView keyboardShouldPersistTaps='handled'>
   
    <View className="p-2  w-full bg-white h-screen">
    
      <View className="  flex  border h-1/4 bg-[#151d4b]   justify-center items-center  w-full rounded-lg   overflow-visible ">
      

        <View className=" bg-gray-200 rounded-xl w-11/12   h-36 shadow shadow-black  mt-40 items-center">
       
          <Text className="text-black mt-4">Welcome: PO Ahsan Bashir</Text>
          <Text className="text-black">Training College, Shiekhupura</Text>
        
          <TouchableOpacity className=" bg-red-50 p-2  items-center mt-2 border border-gray-300 w-4/12 rounded-md">
              <Text className="text-black">View Profile</Text>
          </TouchableOpacity>
            
        </View>
        
      </View>


      <View className="mt-14 rounded-m    w-full   justify-evenly flex flex-row ">
        {/* Approved */}
        
          <TouchableOpacity
            className="bg-[#217a38]  justify-center  flex-col rounded-md items-center w-3/12 p-4  ">
               <Text className=" text-center  font-white  text-3xl text-white">
             0
            </Text>
            <Text className=" text-center font-white  text-lg text-white">
              Approved
            </Text>
            
          </TouchableOpacity>
        

         {/* Pending*/}
       
          <TouchableOpacity
            className="bg-[#d6a438]  justify-center  flex-col  rounded-md items-center w-3/12 p-4 ">
               <Text className=" text-center  font-white  text-3xl text-white">
             0
            </Text>
            <Text className=" text-center  font-white  text-lg text-white">
              Pending
            </Text>
          </TouchableOpacity>
       

         {/* Rejected*/}
       
          <TouchableOpacity
            className="bg-[#b63030]  justify-center  flex-col rounded-md items-center w-3/12 p-4 ">
            <Text className=" text-center  font-white  text-3xl text-white">
             0
            </Text>
            <Text className=" text-center  font-white  text-lg text-white">
              Rejected
            </Text>
          </TouchableOpacity>
       
      </View>

      {/* Leave TABS */}
      <View className="rounded-lg mt-4  p-4">
        {/* Apply Leave */}
        <View className="flex-row justify-around">
          <TouchableOpacity
            onPress={() => navigation.navigate('Daily Progress')}
            className="shadow-md shadow-slate-950  w-3/12 flex-row  rounded-lg  flex justify-around items-center border border-slate-400  bg-white">
            <View className="  items-center gap-1 justify-center mt-2 p-1 ">
              <BookCopy stroke="orange" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                {/* <BadgePlus stroke="black" size={20} /> */}
                <Text className="  font-white  text-sm text-black">
                  Apply Leave
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/*Add driver  */}
          <TouchableOpacity
            onPress={() => navigation.navigate('MyTabs', {screen: 'AddDrivernew'})}
            className="w-3/12  shadow-md shadow-slate-950 rounded-lg  flex justify-center items-center   border border-slate-400  bg-white">
            <View className="  items-center  gap-1 justify-center mt-2 p-1 ">
              <UserPlus stroke="green" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                {/* <BadgePlus stroke="black" size={20} /> */}
                <Text className="  font-white  text-sm text-black">
                  Status
                </Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
        
      </View>

   

      {/* Update Logout */}

      <View className="mt-2 ">
        <TouchableOpacity
          onPress={() => logoutSesion()}
          className="w-full   h-10 rounded-lg  justify-center items-center bg-[#a32d37] ">
          <View className="justify-center flex flex-row items-center  w-full gap-2">
            <LogOutIcon stroke="white" size={25} strokeWidth={1}  />
            <Text className="  font-white  text-lg text-white">
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView> 
  );
}

export default Home;