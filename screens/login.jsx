import React, { useState, Linking,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { UserPlus, UserCog2, Lock, User, UserCircle, KeyRound  } from 'lucide-react-native';



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
    Alert,
    Platform,
    KeyboardAvoidingView,
    Modal,
    ImageBackground,
    Pressable
    
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import axios from 'axios';
import '../config';
import { Facebook, Twitter } from 'lucide-react-native';
import { storeUserSession } from '../config/functions';

import myimage from '../img/login.jpg'
import { User2 } from 'lucide-react-native';
function Login() {


useEffect(()=>{
    function clearStorage(){

        EncryptedStorage.clear()
    }
clearStorage()
// versionCheck(1.0)
},[])
 
    const [user, setUser] = useState("")
    const [userpwd, setPwd] = useState("")
    const [data, setData] = useState("")

   

//-----------Signin & get User 
        const signIn =async()=>{                  
            if(user== "") {
                Alert.alert("Please enter User Name") }
               else if(userpwd== "") {
                    Alert.alert("Please enter Password") }
                 
        else {
            
        if(user && userpwd){
         await axios.post(`${global.BASE_URL}/users/login`,

         {
            "id":user,
            "pwd":userpwd
           },

           {
            headers:{
            api_key :global.KEY
           }
         
        }
           
          ).then(
            function (response){
                
                const result = response.data
          if(result =='No User Found') {
            Alert.alert("User Not Registered")
          }
            else if (result == 'Incorrect Password') {
                Alert.alert('Incorrect Password')
            }
            else {  

               storeUserSession(result.token)        
               navigation.navigate("Home")
               clearAll()
        }
    }          
          ).catch(
            function(error){
                console.log(error)
            }
          )
        }}

    }
     //---------------------------------------store session


//
function clearAll(){
        setUser("")
        setPwd("")
        
}

    
    
    
    const navigation = useNavigation();
    
    return (
      
        <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'position' : null}
        style={styles.container} enabled>
        <ImageBackground source={myimage} resizeMode='cover' className="flex  flex-1  justify-center items-center  h-screen w-full" ></ImageBackground>
        <View className='flex justify-start items-center h-screen border ' >
        
          

            {/* Logo VIEW */}
            <View className="w-full  h-2/5 flex justify-center items-center p-2">
                <Image source={require('../img/logo.png')}   className=' w-32 h-32 border flex ' />
                {/* <Text className='font-extrabold text-3xl  text-yellow-400 mt-2 '>E-Leave (NHMP)</Text> */}
                <Text className=' sm:text-2xl text-md text-white font-bold m-2 border-b-2  border-yellow-400   px-2 rounded-sm  text-lg'>National Highways & Motorway Police</Text>
                <Text className="text-white font-light font-mono text-xs italic">Version: 1.0.0</Text>
            </View>
           
                       {/* Login Panel  bg-[#2b6379]  bg-[#17162560] */}
                       
            <View className='w-11/12  px-5  py-8  flex justify-center items-center border border-slate-100 rounded-sm  bg-[#05050c6c] shadow-md  '>

             
               {/* User name */}
               <View className="justify-start items-start w-full flex flex-row relative ">
              
                <User2 width={25} stroke='#151E40' strokeWidth={2} className='absolute z-50 flex items-center justify-center py-6 ml-3'  />
             
                    <TextInput
                    placeholder='User CNIC'
                    value={user}
                    onChangeText={text=>setUser(text)}
                    placeholderTextColor='grey'
                    keyboardType='number-pad'
                    maxLength={13}
                    className='   text-lg  w-full  bg-white border-blue-400 text-black pl-12' />
                
                </View>

                {/* Password  */}
                <View className="justify-start items-start w-full flex flex-row mt-5 relative ">
              
              <KeyRound width={25} stroke='#151E40' strokeWidth={2} className='absolute z-50 flex items-center justify-center py-6 ml-3'  />

                <TextInput
                    secureTextEntry={true}
                    placeholder='Password'
                    value={userpwd}
                    onChangeText={e => setPwd(e)}
                    placeholderTextColor='grey'
                    
                    className='   text-lg  w-full  bg-white border-blue-400 text-black pl-12' />
                
                </View>
                

                <View className=" justify-center items-center   flex flex-row  gap-4 mt-5">    

                    
                    <TouchableOpacity  
                    onPress={() => navigation.navigate('SignUp')}
                    className='p-3 bg-blue-900 text-center ml-3 w-5/12 shadow-md shadow-black' >
                    <Text className='text-white text-center font-bold text-lg'>Sign Up</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>signIn()} 
                    className='p-3 bg-yellow-500 text-center  w-5/12  border-yellow-500 shadow-md shadow-black' >
                    <Text className='text-white  text-center font-bold text-lg'>Login</Text>

                    </TouchableOpacity>
                   
                    </View>    
            </View>
            {/* important NMHP social links */}
           
       
            {/* copyrights Tab */}
            <View className=' w-full  justify-center  items-center pt-3'>
                <Text className="text-white text-sm">All Rights Reserve by</Text>
                <Text className="text-white text-sm">NHMP Training  College, IT Wing</Text>
            </View>
            


        
        </View>
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }

  });

export default Login;
