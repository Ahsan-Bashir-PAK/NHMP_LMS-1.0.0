import React, {useEffect, useState, useCallback} from 'react';
import {Modal, View, Text, TouchableOpacity,TextInput} from 'react-native';

function LeaveModal(props) {
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
            <View className=" w-11/12  bg-white border shadow  rounded-lg justify-center px-2 align-middle shadow-black ">
                <View className="mt-2  w-full justify-evenly items-center flex-row">   
                  <Text className="text-black text-lg p-2 bg-gray-100 rounded-md ">
                    Details of officer who applied for leave
                  </Text>
                  <TouchableOpacity
                   onPress={() => props.visibilitySetter(!props.visibility)}
                    className="bg-red-600 p-1 rounded-md w-10 justify-center items-center">
                   <Text className="text-white font-bold">X</Text>
                  </TouchableOpacity>
                </View> 
                <View className=" justify-center  w-full items-center"> 
              
                    
                    <View className="p-2 w-9/12  justify-center"> 
                      <View className="flex flex-row">
                        <Text className="text-black ">Name:</Text> 
                        <Text className=" ml-16  text-black text-sm">{props.data.rank} {props.data.name} ({props.data.beltNo})</Text>
                      </View>
                    
                      <View className="flex flex-row">
                        <Text className="text-black ">Posting:</Text> 
                        <Text className=" ml-16  text-black text-sm">{props.data.beat}, {props.data.sector}, {props.data.zone}</Text>
                      </View>

                      <View className="flex flex-row">
                        <Text className="text-black ">Leave Availed:</Text> 
                        <Text className=" ml-6 text-black text-sm"> C/L:10 E/L:20</Text>
                      </View>

                      <View className="flex flex-row">
                        <Text className="text-black ">Forwarded Days :</Text> 
                        <Text className=" ml-2 text-black text-sm">05 Days</Text>
                      </View>

                      <View className="flex flex-row flex-wrap mt-2 bg-gray-100 rounded-md p-2">
                        <Text className="text-black ">Remarks:</Text> 
                        <Text className=" ml-2 text-grey-400 text-sm italic ">Sir, The beat is already facing acute shortage of strength it is requested that please provide subsitute provide subsiprovide subsiprovide subsiprovide subsiprovide subsiprovide subsiprovide subsi</Text>
                      </View>
                       
                      
              <TextInput 
              className='border rounded-lg w-full mt-2 border-gray-400' 
              placeholder ="Recommanded Days" 
              keyboardType='numeric'
              maxLength={3}
              />
              <TextInput
                className="border rounded-lg w-full  mt-2 border-gray-400 text-start"
                multiline
                editable
                numberOfLines={8}
                maxLength={500}
                placeholder='Remarks'
                // onChangeText={text => setFeedBack(text)}
                // value={feedback}                            
                />
                  
               

              <View className=" flex flex-row gap-2 p-4 mt-5 justify-center ">
                <TouchableOpacity
                  onPress={() => props.visibilitySetter(!props.visibility)}
                  className="bg-red-600 p-2 rounded-md w-32 justify-center items-center">
                  <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={()=>verifyUser()}
                  className="bg-green-600 p-2 rounded-md w-32 justify-center items-center">
                  <Text className="text-white">Confirm</Text>
                </TouchableOpacity>
              </View>
              </View>
              </View> 
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

export default LeaveModal;
