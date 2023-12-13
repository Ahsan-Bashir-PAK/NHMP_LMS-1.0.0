import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { CircleDot, FileDown, FileSymlink, User, UserCircle,Dot, Circle } from 'lucide-react-native';
import { retrieveUserSession } from '../config/functions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';




const Profile = () => {

    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState('');
    const [oldpwd, setOldPwd] = useState('');
    const [newpwd, setNewPwd] = useState('');
    const [confirmpwd, setConfirmPwd] = useState('');

    useEffect(()=>{
        retrieveUserSession(setCurrentUser)
    },[])

function clearAll(){
    setOldPwd("");
    setNewPwd("");
    setConfirmPwd("");
}

const newpassword = {userPwd:newpwd}

async function validate(){
        if((oldpwd == currentUser.pwd)  && (newpwd == confirmpwd)) {
           await  axios.patch(`${global.BASE_URL}/users/updatePwd/${currentUser.userName}`, newpassword )
  .then(response => Alert.alert("Password has been updated, Re-Login to continue"))

  .catch(error => console.error(error));
  clearAll()
  navigation.navigate('Login');
  
        } else {
            Alert.alert(" Please fill All fields");
        }
        
    }


if(!currentUser){
    return(
       
            <View className="flex justify-center,items-center">
              <Text className ='text-2xl font-bold'>Loading ......</Text>
              </View>
          )
}
else{
   // console.log(currentUser.pwd,newpwd)
    return (
    
        <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : null}
         enabled>
     
          <ScrollView keyboardShouldPersistTaps='handled'>

            <View className="  flex flex-col   p-2 justify-start">
               
                    {/* User Profile TAB*/}
                    <View className=" mt-1 w-full  ">

                        <View className=" p-10  bg-yellow-400  rounded-md  w-fit items-center justify-center flex ">
                            <View className="  w-[100] h-[100] rounded-full justify-center items-center flex flex-row">
                                <UserCircle stroke="#123456" size={130} />
                               
                            </View>
                            <View className="mt-10 flex flex-row-reverse">
                          
                                    <Circle stroke="green" fill='green' size={18} />
                                
                                <Text className="font-extrabold text-black text-xl">
                                    {`${currentUser.rank}  ${currentUser.name}`}
                                </Text>
                                
                            </View>
                            
                        </View>
                    </View>    
                    
                     {/* Old Password */}
                    <View className={`${styles.outerview} mt-2`}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Old Password*</Text></View>
                    <View className="w-4/6 items-center">
                        <TextInput
                        placeholderTextColor={'grey'}
                        placeholder='Old Password'
                        maxLength={10}
                        secureTextEntry={true}
                        value={oldpwd}
                        onChangeText={e=>setOldPwd(e)}
                        className=' w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

                    </View>
                    </View>

                    {/* New Password */}
                    <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">New Password*</Text></View>
                    <View className="w-4/6 items-center">
                        <TextInput
                        placeholderTextColor={'grey'}
                        placeholder='New Password'
                        maxLength={10}
                        secureTextEntry={true}
                        value={newpwd}
                        onChangeText={e=>setNewPwd(e)}
                        className='w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

                    </View>
                    </View>

                    {/* Confirm Password */}
                    <View className={styles.outerview}>
                        <View className={styles.labelstyle}><Text className="text-black font-bold">Confirm Password*</Text></View>
                    <View className="w-4/6 items-center">
                        <TextInput
                        placeholderTextColor={'grey'}
                        placeholder='Confirm Password'
                        maxLength={10}
                        secureTextEntry={true}
                        value={confirmpwd}
                        onChangeText={e=>setConfirmPwd(e)}
                        className='w-10/12 bg-white border-black text-black rounded-md  text-lg text-center ' />

                    </View>
                    </View>   
                     <View className={styles.outerview}>
                        <View className={`${styles.labelstyle} w-full border-r-0 text-red-600`}>
                            <Text className="text-red-600 font-extrabold">* Note: Re-Login to change password twice.</Text>
                        </View>   
                     </View>   
                    

                    <View className='flex flex-row mt-3 justify-center'>
                        <TouchableOpacity onPress={() => clearAll()} className='bg-[#fc4343] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>Clear</Text></   TouchableOpacity>
                    <TouchableOpacity onPress={()=>validate()} className='bg-[#298a3e] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>Update Password</Text></TouchableOpacity>
                     </View>

                
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}
};

export default Profile;

const styles = {
    inputViolet:
        'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
    inputVioletSmall:
        'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
    labelstyle:
        'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
    outerview:
        'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'
};