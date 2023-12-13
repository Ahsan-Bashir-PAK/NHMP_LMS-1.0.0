import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch, Alert, FlatList, SafeAreaView } from 'react-native';

import { retrieveDriverSession,retrieveVehicleSession } from '../../config/functions';
import axios from 'axios';


const InspectionReport = ({route}) => {
    const [rptName, setRptName] =useState("")
    const [rptPsv, setRptPsv] =useState("")
    const [rptDriver, setDriver] =useState("")
    const [historyData,setData]= useState([])

    //=================toshow/hide views
    const [psv, setPsv] =useState('none')
    const [dvr, setDvr] =useState('block')
    //==================================

   useEffect(()=>{
    retrieveDriverSession(setDriver)
    retrieveVehicleSession(setRptPsv)
    if(route.params){
        if(route.params["params"] =="Driver"){
                setRptName("Driver's Travelling")
                setDvr('none')
                setPsv('block')
            }else{
                setRptName("Vehicle's Inspection")
                setDvr('block')
                setPsv('none')
                }
              }
            
   
   },[ ])

//=====================================================================
const dvrInspectionHistory =()=>{
    axios.get(`${global.BASE_URL}/rpt/dvrInspectionHistory/${rptDriver.dvrCnic}`).then(
        async response =>{
            const result = response.data
            result?setData(result):Alert.alert("No checking history of driver")
        }
    )
}
//=========================================================================
const psvInspectionHistory =()=>{
    axios.get(`${global.BASE_URL}/rpt/psvInspectionHistory/${rptPsv.psvLetter}-${rptPsv.psvModal}-${rptPsv.psvNumber}`).then(
        async response =>{
            const result = response.data
            result?setData(result):Alert.alert("No inspection history of Vehicle")
        }
    )
}


//===========================================================================
if(rptPsv && rptDriver){
    if(route.params){
        if(route.params["params"] =="Driver"){
              dvrInspectionHistory()
            }else{
                psvInspectionHistory()
                }
              }

    return (
               
        <View >

            
                <View className=" bg-yellow-400  rounded-md p-2 m-1 w-fit items-center justify-center flex-row-reverse ">
                    <Text className="text-black font-bold text-lg">{rptName} History</Text>
                </View>
        
        
        <FlatList className="bg-gray-300 mb-16"
            
            data={historyData}
            renderItem={({ item, key }) => (

//====================================================================render
    // Sector : {item.sector} 
    
    <View className="m-2  bg-gray-200 p-2 text-black rounded-md shadow-md border border-gray-600  shadow-black ">
                    <View className="bg-grey-800 p-1 flex flex-row rounded-md">
                        <Text className={styles.container}> Date </Text>
                        <Text className="text-black font-bold">{item.date +"  "+ " Time:- " + item.time}</Text>
                    </View>
                   
                    <View className="bg-gray-100 p-1 flex flex-row rounded-t-md " >
                        <Text className={styles.container}> Beat </Text>
                        <Text className="text-black font-bold">{item.beat}</Text>
                    </View>
                    <View className="bg-gray-100 p-1 flex flex-row">
                        <Text className={styles.container}> Location </Text>
                        <Text className="text-black font-bold">{item.location}</Text>
                    </View>
                    <View className={` bg-gray-100 p-1 flex flex-row`} style={{display:psv}}>
                        <Text className={styles.container}> Vehicle No </Text>
                        <Text className="text-black font-bold">{item.psvNo}</Text>
                    </View>
                    <View className={`bg-gray-100 p-1 flex flex-row`} style={{display:dvr}}>
                        <Text className={styles.container}> Driver </Text>
                        <Text className="text-black font-bold">{item.driverName}</Text>
                    </View>
                    
                    <View className="bg-gray-100 p-1 flex flex-row ">
                        <Text className={styles.container}> Action Taken </Text>
                        <Text className="text-black font-bold">{item.action}</Text>
                    </View>
                    <View className="bg-gray-100 p-1 flex flex-row rounded-b-md ">
                        <Text className={styles.container}> Inspected By </Text>
                        <Text className="text-black font-bold">{item.officer}</Text>
                    </View>
                </View>
             
  //===============================================================================
            )
            }
        />


</View>

    )
}
}
const styles ={
    container: 
        "text-black font-bold font-serif  w-[100]  border-r-2  border-r-gray-400 border-dotted  mr-5",
}

export default InspectionReport


