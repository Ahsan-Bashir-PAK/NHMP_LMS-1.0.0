import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Calendar, CheckSquare, Disc2, Navigation, Square, SunDim  } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

const tyre_companies = ["Dunlop", "Bridgestone", "Yokohama", "Michelin", "Van-Lee", "Huayi", "Westlake", "Chaoyang", "Xing yuan", "Continents", "Mirage", "Long March", "General", "Super cargo", "Green-Tiger", "Service", "Panther", "Advance tyre", "others"];

const AddCondition = ({route}) => {

  
  const navigation = useNavigation();
  
  const today = new Date()
const time = new Date().toLocaleTimeString()

  const [tyrecomp, setTyreCom] =useState();
  // Tyre Manufacturing Date
  const [t_manDate, setmanDate] = useState(new Date())
  const [open, setOpen] = useState(false)
 
  // Tyre expiry Date
  const [tyredate, settyreDate] = useState(new Date())
  const [tyreopen, settyreOpen] = useState(false)
  const [tread, setTread] = useState("");
  const [tyrecondition, SettyreCondition] = useState("");
  const [conditionstate, setConditionState] = useState("");
  const [remarks, setRemarks]= useState("");
  //----------------LIGHTS----------------------
  const [headlight, SetheadLight] =useState("");
  const [backlight, SetbackLight] =useState("");
  const [hazardlight, SethazardLight] =useState("");
  const [foglight, SetfogLight] =useState("");
  const [emergencylight, SetemergencyLight] =useState("");
  const [currentPsv,setCurrentPsv] = useState({})
  const [currentUser,setCurrentUser] = useState({})
  // const [psvReportData,setPsvReportData] =useState({})
  // const [loading, setLoading] = useState(true);
  
  function clearAll() {

    setTyreCom('')
    setTread('')
    SettyreCondition('')
    SetheadLight('')
    SetbackLight('')
    SetfogLight('')
    SethazardLight('')
    setRemarks('')
    SetemergencyLight('')

  }

  //
  //===============getting report data

  async function retrieveReportSession() {
    
    try {
      const session = await EncryptedStorage.getItem('Report');

      if (session !== undefined) {
      
        const data =JSON.parse(session).psvData; //data of vehicle
        showReportData(data)
       
      }
    } catch (error) {
      // There was an error on the native side
    }
    
  }

//============================================retriveing vehicle info
useEffect(()=>{
  retrieveUserSession()
  retrieveVehicleSession()
  if(route.params){
    if(route.params["params"] =="report"){
      retrieveReportSession()
    }
  }
},[])

///================================retriving Data

async function showReportData (psvReportData){
  setTyreCom(psvReportData.tyreCompany);
  setmanDate(new Date(psvReportData.tyreManDate));
  settyreDate(new Date(psvReportData.tyreExpiry));
  setTread(`${psvReportData.tyreTread}`);
  SettyreCondition(psvReportData.tyreCondition);
  setRemarks(psvReportData.tyreRemarks);
  SetheadLight(psvReportData.headLights);
  SetbackLight(psvReportData.backLigths);
  SethazardLight(psvReportData.hazardLights);
  SetfogLight(psvReportData.fogLights);
  SetemergencyLight(psvReportData.emergencyLights)
}

//getting user seesion data 
async function retrieveVehicleSession() {
  try {   
      const session = await EncryptedStorage.getItem("psv_session");
      if (session !== undefined) {
        setCurrentPsv(JSON.parse(session))
      }
  } catch (error) {
      // There was an error on the native side
  }
}
//===============================================================getting user seesion data 
async function retrieveUserSession() {
  try {   
      const session = await EncryptedStorage.getItem("user_session");
      if (session !== undefined) {
        //  setCurrentUser(session)
        setCurrentUser(JSON.parse(session)) 
      }
  } catch (error) {
      // There was an error on the native side
  }
}


  //========================================================save and update psv document
   
  const PsvDocuments = {
    tyreCompany: tyrecomp,
    tyreManDate: t_manDate,
    tyreExpiry: tyredate,
    tyreChkDate:today,
    tyreCondition: tyrecondition,
    tyreTread:  tread,
    tyreRemarks: remarks,
    headLights: headlight,
    backLigths: backlight,
    hazardLights: hazardlight,
    fogLights: foglight,
    emergencyLights: emergencylight,
    formThreeStatus: 1,
    editedOn: today,
    editedTime: time,
    editedBy: currentUser.userName,
    editedPoint: currentUser.location,
    eregion: currentUser.region,
        ezone: currentUser.zone,
        esector:currentUser.sector,
        ebeat:currentUser.beat
  };
  
  
  const updatePsvCondition =async ()=>{
    
    if(tyrecomp == undefined) { 
        Alert.alert("Please Select Tyre company")}
     else if (tyredate.toLocaleDateString() <= t_manDate.toLocaleDateString()) {
        Alert.alert("Expiry Date cannot be equal to current date")}
        else if (tread == "") {  Alert.alert("Please enter Tread size")}
        else if (tyrecondition =="") {  Alert.alert("Please select Tyre condition")}
          else {
         
   await axios.patch(`${global.BASE_URL}/psv/updatePsvCondition/${currentPsv.psvLetter+currentPsv.psvModal+currentPsv.psvNumber}`, PsvDocuments
    )
    
        .then(response =>{
          if(route.params){
            if(route.params["params"] == "report"){
           
            Alert.alert('Data updated', ' ', [
             
              {text: 'Back to Report', onPress: () =>  navigation.navigate("Trip Report")},
            ]);
            
           
           }
         }else{
          Alert.alert('PSV Lights & Tyre Condition record added', ' ', [
             
            {text: 'Next', onPress: () =>  navigation.navigate("Other Info")},
          ]);
            
            }
    
        }
          
          )
    

      .catch(error => console.log(error));
    }} 

  //==================================================
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'android' ? 'height' : null}
     enabled>
 
      <ScrollView keyboardShouldPersistTaps='handled'>
      <View className=" flex flex-col   "></View>
    
      <View className="bg-slate-100  flex flex-col   p-2 ">
        
          {/* Vehicle Tyre Condition Tab */}
          <View className=" mt-1 w-full  ">

            <View className=" bg-[#facc15]  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold "> Tyre Condition </Text>
              {/* <Navigation stroke="black" size={40}></Navigation> */}
              <Disc2   stroke="#facc15" size={32} fill="black"></Disc2>
            </View>

            <View className="  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-sm rounded-md font-bold ">
              {currentPsv != null ? currentPsv.psvLetter + "-" + currentPsv.psvModal +"-" + currentPsv.psvNumber : ""}
                </Text>
              
            </View>



            {/*  Tyre Manufacture */}
            <View className={styles.outerview} >
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Tyre Company</Text>
              </View>
              <View className=" w-4/6  items-center">
              <View className=" m-1  z-40">
              <SelectDropdown
                data= {tyre_companies}
                onSelect={(selectedItem, index) => {
                  setTyreCom(selectedItem)            
                }}
                defaultButtonText={tyrecomp}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>

              </View>
            </View>
 
            {/* Date of Manufacturing*/}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Manufacturing Date</Text></View>
               <View className="w-4/6 items-center ">
               <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={open}
              date={t_manDate}
              onConfirm={value => {
                setOpen(false);
                setmanDate(value);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {t_manDate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
              </View> 

            </View>

            {/*Date Of Expiry */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Expiry Date*</Text></View>
              <View className="w-4/6 items-center">
              <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={tyreopen}
              date={tyredate}
              onConfirm={value => {
                settyreOpen(false);
                settyreDate(value);
              }}
              onCancel={() => {
                settyreOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {tyredate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => settyreOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
              

              </View>
            </View>

            

            {/* Tread Size */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Tread Size*</Text></View>
              <View className="w-4/6 items-center">
              <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='3.5 - 2.0'
                  maxLength={4}
                  onChangeText={e=>setTread(e)}
                  value ={tread}
                  keyboardType='numeric'
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>

           

 {/* Select Tyre Condition */}
 <View className={` justify-around flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md  shadow-md  shadow-blue-900 ${tyrecondition=="Excellent"?"bg-green-700 ":tyrecondition=="Good"?"bg-blue-500":tyrecondition=='Average'?"bg-yellow-500":tyrecondition=="Poor"?"bg-red-600":"bg-white"}`}> 
             <View className=" " >
             <Text className={`font-bold text-white `}>{tyrecondition ===""?"Select Tyre Condition*":tyrecondition}</Text>
                    
            </View>
            </View>

            {/* Tyre condition Excellent - Good-Poor-Average */}
            <View className=' justify-around flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'> 
             <TouchableOpacity onPressOut={()=>SettyreCondition('Excellent')}  className="bg-[#3bac44]   rounded-md p-2 justify-around m-1 w-[78]" ><Text className="text-white text-xs text-center  ">Excellent</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Good')}  className="bg-[#3975b1]  rounded-md p-2 justify-around m-1 w-[75]" ><Text className="text-white text-xs text-center  ">Good</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Average')}  className="bg-[#8c6cd6]  rounded-md p-2 justify-around m-1 w-[78]" ><Text className="text-white text-xs text-center  ">Average</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Poor')}  className="bg-[#cf3e3e] rounded-md p-2 justify-around m-1 w-[75]" ><Text className="text-white text-xs text-center  ">Poor</Text></TouchableOpacity>
             
            </View>
           
            {/* Remarks */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Remarks</Text></View>
              <View className="w-4/6 items-center">
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='Remarks if any'
                  maxLength={100}
                  onChangeText={e=>setRemarks(e)}
                  value={remarks}
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>
            

            {/* *******************Vehicle Lights************************* */}

            <View className=" mt-1 w-full  ">

              <View className=" bg-yellow-400   m-1 w-fit items-center justify-center flex-row-reverse ">
                <Text className="text-black text-lg rounded-md font-bold ">Lights Info</Text>
                <SunDim   stroke="black" size={30}></SunDim  >
              </View>

              {/* Head - Back- Fog Lights*/}
              <View className=" flex flex-row justify-around  p-1">
              <View className=' flex flex-row border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'>
                <TouchableOpacity onPress={()=>headlight==""?SetheadLight("1"):SetheadLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${headlight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${headlight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Head Lights</Text></TouchableOpacity>

                </View>

              <View className='justify-around flex flex-row  border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'>
              <TouchableOpacity onPress={()=>backlight==""?SetbackLight("1"):SetbackLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${backlight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${backlight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Back Lights</Text></TouchableOpacity>

              </View>

              <View className='justify-around flex flex-row  border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'>
              <TouchableOpacity onPress={()=>foglight==""?SetfogLight("1"):SetfogLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${foglight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${foglight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Fog Lights</Text></TouchableOpacity>

              </View>
              </View>



              {/* Hazard & Emergency Lights */}
              <View className=" flex flex-row justify-around">
              <View className=' flex flex-row w-[170] border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'>
              <TouchableOpacity onPress={()=>hazardlight==""?SethazardLight("1"):SethazardLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${hazardlight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${hazardlight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Hazard Lights</Text></TouchableOpacity>

              </View>

              <View className='justify-around flex flex-row w-[170] border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'>
              <TouchableOpacity onPress={()=>emergencylight==""?SetemergencyLight("1"):SetemergencyLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${emergencylight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${emergencylight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Emergency Lights</Text></TouchableOpacity>

              </View>
              </View>
              
                
              
              

              {/* Buttons Save - Clear -Update */}
              <View className="flex-row items-center justify-center ">
                <View className=" ">
                  <TouchableOpacity onPress={()=>updatePsvCondition()} className="bg-[#227935]  px-8 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>

                <View className="">
                  <TouchableOpacity onPress={()=>clearAll()} className="bg-[#60a532] px-8 py-2 rounded-md m-2">
                    <Text className="text-white text-lg">Clear</Text>
                  </TouchableOpacity>
                </View>

                {/* <View className="">
                  <TouchableOpacity onPress={()=>updatePsvCondition()} className="bg-[#29378a] px-7 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Update</Text>
                  </TouchableOpacity>
                </View> */}


              </View>
            </View>

</View>

        
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCondition;

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