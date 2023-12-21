import React, {useEffect, useState, useCallback} from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import { userApproval } from '../config/functions';

function ComponentModal(props) {

const today = new Date()
let newUser



useEffect(()=>{
if(props.data){
  const userdata = props.data
newUser = {
  id: userdata.id,
  pwd:userdata.hash,
  role: 1,
  name: userdata.name,
  rank: userdata.rank,
  beltNo: userdata.beltNo,
  bps: userdata.bps,
  officeId: userdata.officeId,
  appointmentDate:userdata.appointmentDate,
  dob: userdata.dob,
  cellNo:userdata.cellNo,
  status: "ACTIVE",
  createdBy: props.auth,
  createdDate: today
}
}
},[props])


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
            <View className=" w-11/12  bg-white border shadow  rounded-lg  items-start px-2 align-middle shadow-black ">
              <View className="mt-2 justify-end  items-end w-full">   
              <TouchableOpacity
                  onPress={() => props.visibilitySetter(!props.visibility)}
                  className="bg-red-600 p-2 rounded-md w-10 justify-end items-center">
                  <Text className="text-white font-bold">X</Text>
                </TouchableOpacity>
                </View> 
                    <View className=" justify-center  w-full items-center">  
                      <Text className="text-black text-lg p-2 bg-gray-100 rounded-md ">
                          {' '}
                          Please verify credentials of Employee{' '}
                      </Text>
                      <View className="p-2 w-7/12"> 
                      <View className="flex flex-row">
                        <Text className="text-black">CNIC:</Text> 
                        <Text className=" ml-6 text-black text-sm ">{props.data.id}</Text>
                      </View>
                      <View className="flex flex-row">
                        <Text className="text-black ">Name:</Text> 
                        <Text className=" ml-5 text-black text-sm">{props.data.name}</Text>
                      </View>
                      <View className="flex flex-row">
                        <Text className="text-black ">Rank:</Text> 
                        <Text className=" ml-6 text-black text-sm">{props.data.rank}</Text>
                      </View>
                      <View className="flex flex-row">
                        <Text className="text-black ">Rank:</Text> 
                        <Text className=" ml-6 text-black text-sm">{props.data.beltNo}</Text>
                      </View>
                      <View className="flex flex-row">
                        <Text className="text-black ">Beat:</Text> 
                        <Text className=" ml-7 text-black text-sm">{props.data.beat}</Text>
                      </View>
                      <View className="flex flex-row">
                        <Text className="text-black ">Sector:</Text> 
                        <Text className=" ml-4 text-black text-sm">{props.data.sector}</Text>
                      </View>
                      <View className="flex flex-row">
                        <Text className="text-black ">Zone:</Text> 
                        <Text className=" ml-6 text-black text-sm">{props.data.zone}</Text>
                      </View>
                      </View>
                    

              <View className=" flex flex-row gap-2 p-4 mt-5 ">
             
              <TouchableOpacity
                  onPress={() => props.visibilitySetter(!props.visibility)}
                  className="bg-red-600 p-2 rounded-md w-32 justify-center items-center">
                  <Text className="text-white">Reject</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={()=>{userApproval(newUser,props.data.id),props.visibilitySetter(!props.visibility)}}
                  className="bg-green-600 p-2 rounded-md w-32 justify-center items-center">
                  <Text className="text-white">Confirm</Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

export default ComponentModal;
