import React, { useEffect, useState,useCallback, } from 'react';
import { useNavigation,useIsFocused,useFocusEffect } from '@react-navigation/native';
import { UserPlus,  BadgePlus, BusFront,  UserCog2,  BookCopy, LogOutIcon, ArrowDownToLine, Link, UserCog2Icon, Plus, User, PenSquare, KeySquare, Truck, BarChart4, Navigation, Building, Building2  } from 'lucide-react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { retrieveUserSession,storeDriverSession,storeVehicleSession } from '../config/functions';


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
import SignUp from './forms/signUp';
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
   
    <View className="p-2  w-full bg-white">
    
      <View className="  flex   bg-[#29378a]     w-full rounded-lg   overflow-hidden ">
      
      {/* <ImageBackground source={require('../img/bg.png')}  resizeMode="cover" style={{ height:'100%', width:518, opacity:0.9, flex:1, justifyContent:'center'}}  /> */}
        <View className="  w-full flex justify-between rounded-md  ">
        
      

            <View className="  text-center   flex flex-row p-2 py-4  ">
              <Image
                        source={require('../img/logo.png')}
                        style={{width: 60, height: 60}}
                        className="pl-1"
                      />
              <Text className="text-yellow-300 text-center font-extrabold text-2xl ml-8 mt-2  ">
                PSV-MIS (NHMP)          </Text>
                
            </View>

            <View className="  w-full items-end  flex  " >
                <Text className="text-black bg-yellow-500 px-3 text-right w-full text-sm  font-mono italic ">
                {`${currentUser.rank}  ${currentUser.name}`}</Text>
            </View>
        </View>
        
      </View>
      <View className="mt-3 rounded-m  h-2/8  w-full text-center">
     
    
        {/* View Input Type */}
        <View className="mt-1 flex-row  justify-center  w-full  ">
          <TextInput
            style={{backgroundColor: 'white'}}
            placeholderTextColor={'grey'}
            autoCapitalize={'characters'}
            placeholder="ABCA"
            maxLength={4}
            keyboardType="email-address"
            value={reg}
            onChangeText={text => setReg(text)}
            className="border  justify-center pl-4 bg-white border-black  rounded-md w-4/12  text-lg  text-black"
          />

            
          <TextInput
            placeholderTextColor={'grey'}
            placeholder="Year (2023)"
            keyboardType="number-pad"
            maxLength={4}
            minLength={4}
            value={year}
            onChangeText={text => setYear(text)}
            className=" border  bg-white border-black text-black  rounded-md w-3/12 flex text-lg ml-2 "
          />
          <TextInput
            placeholderTextColor={'grey'}
            placeholder="[0000]"
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={e => setNumber(e)}
            value={number}
            className="  border  bg-white border-black text-black rounded-md  w-4/12 flex text-lg ml-2 "
          />
        </View>

        {/* View SearchBox Button */}
        {/* <View onPress={()=>searchPSV()} className=' flex-row p-1 justify-center  w-full '>
          <TouchableOpacity className='bg-[#29378a]  justify-center  flex-row w-full rounded-md items-center p-3 '>
            <Search stroke="white" size={25} />
            <Text className=' text-center font-bold font-white  text-lg text-white'>Search PSV</Text>
          </TouchableOpacity>
        </View> */}

        <View className=" mt-1 flex-row p-2 justify-center  w-full ">
          <TextInput
            style={{backgroundColor: 'white'}}
            placeholderTextColor={'grey'}
            autoCapitalize={'characters'}
            placeholder="0000000000000 {Driver CNIC}"
            maxLength={13}
            keyboardType="number-pad"
            value={dvrCnic}
            onChangeText={e => setDvrCnic(e)}
            className="border justify-center pl-4 bg-white border-black  rounded-md w-full text-lg text-black"
          />
        </View>
        <View className="flex-row p-1 justify-center  w-full mt-2">

      
          <TouchableOpacity
            // onPress={() => getInspectionreport()}
            onPress={() => rptSessionProps()}
            className="bg-[#29378a]  justify-center  flex-row w-full rounded-md items-center p-3 ">
            <BookCopy stroke="white" size={25} />
            <Text className=" text-center font-bold font-white  text-lg text-white">
              Generate Inspection Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PSVs TABS */}
      <View className="rounded-lg   p-2">
        {/*ADD PSV Button  */}
        <View className="flex-row justify-around">
          <TouchableOpacity
            onPress={() => navigation.navigate('MyTabs', {screen: 'Add Vehicle'})}
            className="shadow-md shadow-slate-950  w-2/5 flex-row  rounded-lg  flex justify-around items-center border border-slate-400  bg-white">
            <View className="  items-center gap-1 justify-center mt-2 p-1 ">
              <BusFront stroke="orange" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                {/* <BadgePlus stroke="black" size={20} /> */}
                <Text className=" font-bold font-white  text-sm text-black">
                  Add PSV
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/*Add driver  */}
          <TouchableOpacity
            onPress={() => navigation.navigate('MyTabs', {screen: 'AddDrivernew'})}
            className="w-2/5  shadow-md shadow-slate-950 rounded-lg  flex justify-center items-center   border border-slate-400  bg-white">
            <View className="  items-center  gap-1 justify-center mt-2 p-1 ">
              <UserPlus stroke="green" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                {/* <BadgePlus stroke="black" size={20} /> */}
                <Text className=" font-bold font-white  text-sm text-black">
                  Add Driver
                </Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
        {/* Add Commercial Vehicle TAB */}
        
        <View className="flex-row justify-around mt-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Commercial Vehcile')}
            className="shadow-md shadow-slate-950  w-2/5 flex-row  rounded-lg  flex justify-around items-center border border-slate-400  bg-white">
            <View className="  items-center gap-1 justify-center mt-2 p-1 ">
              <Truck stroke="red" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                {/* <BadgePlus stroke="black" size={20} /> */}
                <Text className=" font-bold font-white  text-xs text-black">
                  Add Commercial Vehicle
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/*Add driver  */}
          <TouchableOpacity
           onPress={() => navigation.navigate('Downloads')}
            className="  w-2/5 flex-row shadow-md shadow-slate-950  rounded-lg  flex justify-around items-center border border-slate-400  bg-white">
            <View className="  items-center gap-1 justify-center mt-2 ">
              <BookOpenCheck stroke="purple" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                <Text className=" font-bold font-white  text-sm text-black">
                  E-Library
                </Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
        
        
        
        
        
        {/*  */}
        <View className=" flex-row justify-around mt-4">
        <TouchableOpacity
            onPress={() => navigation.navigate('OnlineVerifications')}
            className="w-2/5  shadow-md shadow-slate-950 rounded-lg  flex justify-center items-center   border border-slate-400  bg-white">
            <View className="  items-center  gap-1 justify-center mt-2 ">
              <Link stroke="grey" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                <Text className=" font-bold font-white  text-sm text-black">
                  Verifications
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Generate Progress  */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Daily Progress')}
            className="w-2/5  shadow-md shadow-slate-950 rounded-lg  flex justify-center items-center   border border-slate-400  bg-white">
            <View className="  items-center  gap-1 justify-center mt-2 ">
              <BarChart4 stroke="brown" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                <Text className=" font-bold font-white  text-sm text-black">
                  Generate Progress
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          
        </View>

{/*  Companies*/}
<View className=" flex-row justify-around mt-4">
        <TouchableOpacity
            onPress={() => navigation.navigate('Addcompany', {params:"company"})}
            
            className="w-2/5  shadow-md shadow-slate-950 rounded-lg  flex justify-center items-center   border border-slate-400  bg-white">
            <View className="  items-center  gap-1 justify-center mt-2 ">
              <Building2 stroke="green" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                <Text className=" font-bold font-white  text-sm text-black">
                  Add Company
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Generate Progress  */}
          <TouchableOpacity
            onPress={()=>navigation.navigate('Addcompany',{params:"terminal"})}
            className="w-2/5  shadow-md shadow-slate-950 rounded-lg  flex justify-center items-center   border border-slate-400  bg-white">
            <View className=" items-center  gap-1 justify-center mt-2 ">
              <Building stroke="brown" size={40} strokeWidth={1}/>
              <View className="flex justify-center items-center flex-row gap-1">
                <Text className=" font-bold font-white  text-sm text-black">
                  Add Terminal
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          
        </View>
        
      </View>

      
              

      {/* Add New User */}

      <View
        className={`${currentUser.role == 'Admin' ? 'block' : 'hidden'} mt-4`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          className="w-full   flex rounded-lg  justify-center items-center bg-[#2e3d94] ">
          <View className="justify-center flex flex-row items-center p-1 w-full gap-2">
            <Plus stroke="white" size={25} strokeWidth={1} />
            <Text className="  font-white  text-lg text-white">
              Add New User
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Generate Report */}
      {/* <View
        className= "mt-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('Daily Progress')}
          className="w-full   h-10 rounded-lg  justify-center items-center bg-[#2e3d94] ">
          <View className="justify-center flex flex-row items-center p-1 w-full gap-2">
            
            <Text className=" font-bold font-white  text-lg text-white">
              Generate Progress Report 
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}

      {/* User Profile*/}

      <View className=" mt-2 flex flex-row p-1 ">
        <View className="p-1 w-2/4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          className=" h-10 rounded-lg  justify-center items-center bg-[#258f3c] ">
          <View className="justify-center flex flex-row items-center  w-full ">
            <KeySquare stroke="white" size={20} strokeWidth={1} />
            <Text className="font-white pl-1  text-md text-white">
              Change Password
            </Text>
          </View>
        </TouchableOpacity>
        </View>

        <View className="  p-1 w-2/4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Feed Back')}
            className="  h-10 rounded-lg  justify-center items-center bg-[#40b63c] ">
            <View className="justify-center flex flex-row items-center  w-full ">
              <PenSquare  strokeWidth={1} stroke="white" size={20} />
              <Text className="font-white pl-1  text-md text-white">
              Feedback
              </Text>
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