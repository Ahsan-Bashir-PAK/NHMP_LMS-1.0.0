import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { FileDown, FileSymlink } from 'lucide-react-native';




const Downloads = () => {


    return (
        <ScrollView >
            <View className=" flex flex-col   p-2 justify-start">
                <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
                    {/* Vehicle Information Design Tab */}
                    <View className=" mt-1 w-full  divide-dotted divide-red-600 ">

                        <View className="  bg-yellow-400  rounded-md p-5  w-fit items-center justify-center flex flex-row">
                           
                            <Text className="text-black text-xl rounded-md font-bold ">E-Library</Text>
                        </View>

                        {/* NHSO */}
                        <View className=" bg-slate-100 p-2  mt-1 flex flex-row items-center">
                            <View className="w-3/4">
                                <Text className="text-black text-sm "> National Highway Safety Ordinance-2000</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://nhmp.pitb.gov.pk/system/files/NHSO.pdf#overlay-context=RightToAccess')}>
                                <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Goods Dimension*/}
                        <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                        <View className="w-3/4">
                            <Text className="text-black text-sm flex-wrap ">National Highway & Motorway (Dimensions of Goods Transport vehicles) Rules, 2017</Text>
                           </View> 
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://nhmp.pitb.gov.pk/system/files/National%20Highways%20Dimension%20Rules.pdf#overlay-context=RightToAccess')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                         {/* Tracker SOPs for PSVs*/}
                         <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4">
                            <Text className="text-black text-sm"> SOP For Regulation, Control and Management of PSVs on the National Highways & Motorways</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/13hhuu04bzxRWjcT8UJ73aBYpjShw8h5G/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                         {/* Tracker SOPs for PSVs*/}
                         <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4">
                            <Text className="text-black text-sm"> SOP for PSV Ban</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/1cwRNeTDgnG44QphDVguN-9rgYfuPOmgJ/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>   

                        {/* FIRs Pattern*/}
                        <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4">
                            <Text className="text-black text-sm"> Template Isteghasa (استغاثہ)</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/1zj-Qv2KLPpRnuMbMyI3ABnkvXCCTUDzw/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Fard Maqboozgi*/}
                        <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4">
                            <Text className="text-black text-sm"> Template Fard Maqboozgi (نمونہ فرد مقبوضگی )</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/1jlPNl9TNWOMpd1gUAXXKLUwKx4-mFzGG/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Fard Hawalgi*/}
                        <View className="bg-slate-100  p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4 ">
                            <Text className="text-black text-sm"> Template Fard Hawalgi ( نمونہ فرد حوالگی)</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/1GEO_6KPrHogyLYERliND90kqteSzfE1M/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Kalandra*/}
                        <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4">
                            <Text className="text-black text-sm"> Kalandra (کلندرہ)</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/1O3gycLx59qRvNLiu2y-t9b-MI8H2XCmW/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                             {/* MVO*/}
                        <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4">
                            <Text className="text-black text-sm"> Motor Vehicle Ordinance- 1965</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/1faawbLxb3RmZrBXfFU_U5Od_2-SbQT1g/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                           {/* MVO Rules*/}
                           <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4">
                            <Text className="text-black text-sm"> Pakistan Penal Code (PPC)</Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/1cTEzsNNAKkmXIELoO8fs2JtDY0bLaa5R/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>
   {/* OGRA Rules*/}
   <View className="bg-slate-100 p-2  mt-1 flex flex-row items-center">
                         <View className="w-3/4">
                            <Text className="text-black text-sm"> OGRA Rules for (Road Transport Vehicles,
Containers and Equipment Used for the Transportation of Petroleum Products) </Text>
                            </View>
                            {/* <Text></Text> */}
                            <TouchableOpacity className="bg-green-600 p-2 ml-2 rounded-md justify-center items-center w-1/4" onPress={() => Linking.openURL('https://drive.google.com/file/d/1D8PoSzP19t_rzVbhVvUIuX6XoMzXzrfa/view?usp=sharing')}>
                            <Text className="text-white">
                                    Download 
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
  


                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default Downloads;

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