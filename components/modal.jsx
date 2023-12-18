import React, { useEffect, useState,useCallback, } from 'react';
import { useNavigation,useIsFocused,useFocusEffect } from '@react-navigation/native';
import { UserPlus, BookCopy, LogOutIcon} from 'lucide-react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { retrieveUserSession,storeDriverSession,storeVehicleSession } from '../../config/functions';


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



function ComponetModal({name}) {
Alert.alert(name)
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

                {/* Modal */}
                <View className=" bg-[#e6ecf1ee]  flex-1 justify-center items-center ">
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}>
                    
                    
                    <View className="bg-[#ecf2f7ee]  h-full w-full justify-center items-center flex">    
                    
                    <View className=" w-full h-full rounded-md justify-center items-center align-middle shadow-black ">
                            
                      <Text className="text-black text-lg p-4"> Please Verify credentials of Employee </Text>
                                <Text>Name: Ahsan</Text>
                                <Text>CNIC: 1111111111111</Text>
                                <Text>Beat: Nil</Text>
                                <Text>Sector:Nil</Text>
                                <Text>Zone:Training College</Text>
                                
                              <View className=" flex flex-row gap-2 p-4 mt-5 ">
                              <TouchableOpacity
                                      onPress={()=>setModalVisible(!modalVisible)}
                                      className="bg-red-600 p-2 rounded-md w-32 justify-center items-center">
                                              <Text className="text-white">Cancel</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                      
                                      onPress={()=>verifyUser()}
                                      className="bg-green-600 p-2 rounded-md w-32 justify-center items-center">
                                              <Text className="text-white">Confirm</Text>
                                      </TouchableOpacity>

                                      </View>        
                              </View>
                    
                    </View>
                    </Modal>  
                  </View>
                 {/*end of modal  */}

   
    </View>
    
    </KeyboardAvoidingView> 
  );
}

export default ComponetModal;