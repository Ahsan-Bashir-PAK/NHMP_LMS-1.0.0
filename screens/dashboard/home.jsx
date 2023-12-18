import React, { useEffect, useState,useCallback, } from 'react';
import { useNavigation,useIsFocused,useFocusEffect } from '@react-navigation/native';
import { UserPlus, BookCopy, LogOutIcon} from 'lucide-react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { retrieveUserSession,storeDriverSession,storeVehicleSession } from '../../config/functions';
import ComponentModal from '../../components/modal';

import {
  Modal,
  FlatList,
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





function Home() {

  const DATA = [
    {
      rank: 'PO',
      name: 'Ahsan',
      Beltno: 'P-3166',
    },
    {
      rank: 'UDC',
      name: 'Shoaib',
      Beltno: '',
    },
    {
      rank: 'PO',
      name: 'Attique',
      Beltno: 'P-2261',
    },
    {
      rank: 'CO',
      name: 'Ahsan',
      Beltno: '',
    },
    {
      rank: 'APO',
      name: 'waqas',
      Beltno: '',
    },
    {
      rank: 'jpo',
      name: 'nida',
      Beltno: '',
    },
  ];
  
  const [modalVisible, setModalVisible] = useState(false);
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

// ===========Verify Modal Box============

function verifyUser(result){
  if(result) {
    setModalVisible(true)
   
  } else {
    Alert.alert("Not Working")
   
  }
}





  return (
    <KeyboardAvoidingView
    >
{/* behavior={Platform.OS === 'android' ? 'Padding' : null}
     enabled */}

   {/* <ScrollView keyboardShouldPersistTaps='handled'> */}
   
    <View className="p-2  w-full bg-white ">
    
      <View className="  flex  border h-1/6 bg-[#151d4b]   justify-center items-center  w-full rounded-lg   overflow-visible ">
      

        <View className=" bg-gray-200 rounded-xl w-11/12   h-36 shadow shadow-black  mt-32 items-center">
       
          <Text className="text-black mt-4">Welcome: PO Ahsan Bashir</Text>
          <Text className="text-black">Training College, Shiekhupura</Text>
        
          <TouchableOpacity className=" bg-red-50 p-2  items-center mt-2 border border-gray-300 w-4/12 rounded-md">
              <Text className="text-black">View Profile</Text>
          </TouchableOpacity>
            
        </View>
        
      </View>


      <View className="mt-10 rounded-m    w-full   justify-evenly flex flex-row ">
        {/* Approved */}
        
          <TouchableOpacity
            className="bg-[#217a38]  justify-center  flex-col rounded-md items-center w-3/12 p-2  ">
               <Text className=" text-center  font-white  text-3xl text-white">
             0
            </Text>
            <Text className=" text-center font-white  text-lg text-white">
              Approved
            </Text>
            
          </TouchableOpacity>
        

         {/* Pending*/}
       
          <TouchableOpacity
            className="bg-[#d6a438]  justify-center  flex-col  rounded-md items-center w-3/12 p-2 ">
               <Text className=" text-center  font-white  text-3xl text-white">
             0
            </Text>
            <Text className=" text-center  font-white  text-lg text-white">
              Pending
            </Text>
          </TouchableOpacity>
       

         {/* Rejected*/}
       
          <TouchableOpacity
            className="bg-[#b63030]  justify-center  flex-col rounded-md items-center w-3/12 p-2 ">
            <Text className=" text-center  font-white  text-3xl text-white">
             0
            </Text>
            <Text className=" text-center  font-white  text-lg text-white">
              Rejected
            </Text>
          </TouchableOpacity>
       
      </View>

      {/* Leave TABS */}
      <View className="rounded-lg  p-4">
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
{/* ==================Account Aprpoval Requests for Sector OSI=============*/}

      <View className="mt-2 ">
        <TouchableOpacity
          
          className="w-full   h-10 rounded-lg  justify-center items-center bg-[#257c25] ">
          <View className="justify-center flex flex-row items-center  w-full gap-2">
       
            <Text className="  font-white  text-lg text-white">
              Accounts Approval Requests 
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className=" bg-gray-100 justify-start items-start w-full">
      <FlatList className="p-2 overflow-scroll h-1/5 w-full"
        data={DATA}
            renderItem={({ item, index }) => (
              
              
              <View className="flex   flex-row  items-center">
               
                <View className="flex p-2 w-10/12 border-b flex-row align-middle items-start">
                  <Text className="text-black ">{item.rank}</Text>
                   <Text className="text-black ml-4">{item.name}</Text>
                   <Text className="text-black ml-4">{item.Beltno}</Text>
                </View>  
                
                <View className="flex p-2 w-4/12  flex-row  items-center">
                  <TouchableOpacity
                  
                  
                 

                  className="p-2 bg-green-800 rounded-md justify-between items-center"
                  >
                  <Text className="text-white">Verify User</Text>    
                  </TouchableOpacity>
                  
                </View> 

               

              </View>  
                  
              
           
           )}

      />
      </View>

{/* ==================Leave Approval Request for CPO===========*/}

<View className="mt-2  ">
        <TouchableOpacity
          
          className="w-full   h-10 rounded-lg  justify-center items-center bg-[#257c25] ">
          <View className="justify-center flex flex-row items-center  w-full gap-2">
       
            <Text className="  font-white  text-lg text-white">
              Leave Approval
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className=" bg-gray-100 justify-startitems-start w-full">
      <FlatList className="p-2 overflow-scroll h-1/5 w-full"
        data={DATA}
            renderItem={({ item, index }) => (
              
              
              <View className="flex   flex-row  items-center">
               
                <View className="flex p-2 w-10/12 border-b flex-row align-middle items-start">
                  <Text className="text-black ">{item.rank}</Text>
                   <Text className="text-black ml-4">{item.name}</Text>
                   <Text className="text-black ml-4">{item.Beltno}</Text>
                </View>  
                
                <View className="flex p-2 w-4/12  flex-row  items-center">
                  <TouchableOpacity
                   onPress={()=>{return (<ComponentModal/>)}}
                  
                  className="p-2 bg-green-800 rounded-md justify-between items-center"
                  >
                  <Text className="text-white">Forward</Text>  
                  </TouchableOpacity>
                 
                </View> 

               

              </View>  
                  
              
           
           )}

      />
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
    
    </KeyboardAvoidingView> 
  );
}

export default Home;