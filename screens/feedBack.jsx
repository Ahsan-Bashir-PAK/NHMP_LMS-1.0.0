import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { CircleDot, FileDown, FileSymlink, User, UserCircle,Dot, Circle, Pencil, PencilLine } from 'lucide-react-native';
import { retrieveUserSession } from '../config/functions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



const FeedBack = () => {

    const navigation = useNavigation();
 
    const [feedback, setFeedBack] = useState('');
    const [currentUser,setCurrentUser] = useState('')

        

    useEffect(()=>{
       retrieveUserSession(setCurrentUser)
    },[])

function clearAll(){
    setFeedBack("");
   
}

const userFeedback ={
    userCnic:currentUser.userName,
    feedBack:feedback
}

const saveFeedBack = async () => {
    if(feedback) {
    await axios
      .post(`${global.BASE_URL}/fbk/feedbck`, userFeedback)
      .then(response => {
        Alert.alert('Thanks', 'Your feed back is valueable for us ', [
         
            {text: 'Back to Home', onPress: () =>  navigation.navigate("Home")},
          ]);
         
      })
      .catch(error => {
        console.log(error);
      });
        
    } else { Alert.alert("Please  write your valuable feed back ")}
   clearAll();
  }; 
   
    return (
        <ScrollView >
            <View className="  flex flex-col   p-2 justify-start">
                <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
                    {/* User Profile TAB*/}
                    <View className=" mt-1 w-full  ">

                        <View className=" p-10  bg-yellow-400  rounded-md  w-fit items-center justify-center flex ">
                            <View className=" border-yellow-200 shadow-md border rounded-3xl w-full  bg-yellow-500  h-[100] shadow-black justify-center items-center flex flex-row-reverse">
                               <Text className="font-bold  text-white text-xl">Feed Back & Suggestion</Text>
                               <Pencil stroke="#123456" size={25} className='mr-2' />
                            </View>
                          
                            
                        </View>
                    </View>    
                    
              
                    {/* Feed Back Area */}
                    <View className={styles.outerview}>
                        <View className={styles.labelstyle}><Text className="text-black font-bold ">Feed Back </Text></View>
                    <View className="w-4/6 justify-start">
                    <TextInput
                            editable
                            multiline
                            numberOfLines={10}
                            maxLength={500}
                            onChangeText={text => setFeedBack(text)}
                            value={feedback}
                            style={{padding: 10}}
                            className="text-black font-bold mt-0"
                        />

                    </View>
                    </View>   
                     <View className={styles.outerview}>
                        <View className={`${styles.labelstyle} p-2 justify-Center w-full border-r-0 text-red-600`}>
                            <Text className="text-green-600 font-extrabold">* Note: Your valuable Feedback & suggestions are helpfull  for improvement of this Application.</Text>
                        </View>   
                     </View>   
                    

                    <View className='flex flex-row mt-3 justify-center'>
                        <TouchableOpacity onPress={() => clearAll()} className='bg-[#fc4343] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>Clear</Text></   TouchableOpacity>
                    <TouchableOpacity onPress={()=>saveFeedBack()} className='bg-[#29378a] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>Sumbit Feed Back</Text></TouchableOpacity>
                     </View>

                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default FeedBack;

const styles = {
    inputViolet:
        'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black ',
    inputVioletSmall:
        'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
    labelstyle:
        'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
    outerview:
        'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900 mt-2'
};