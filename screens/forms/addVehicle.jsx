import React, { useState, useEffect } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, Modal, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BusFront, Scroll, User, Square, CheckSquare, Search, Navigation, Building2, PlusSquare } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Bus } from 'lucide-react-native';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios'
import EncryptedStorage from 'react-native-encrypted-storage';
import retrieveUserSession from '../../config';
import { tabactions } from '@react-navigation/native';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import KeyboardAvoidWrapper from '../keyboardavoidingwrapper';



const Vehicletype = [ "BUS" ,"HIACE", "HIROOF", "COASTER", "APV", "OTHER"];  
const Vehicle_make_company = [ "YUTONG" ,"HIGER", "HINO", "MAN", "NOVA", "EURO", "ISUZU", "KING-LONG", "ZHONGTONG", "MITSUBISHI", "NISHI", "VOLVO", "DAEWOO", "YUTONG-MASTER", "OTHER"];    


const AddVehicle = ({route}) => {

  // Searchable drop down
  const [selected, setSelected] = React.useState("");

  //const jumptoaction = tabactions.jumpto("Add Documentation", { params });
  const navigation = useNavigation();
  // Vehicle Add states

  const [Vehicle_type, setType] = useState(""); // BUS / HIACE
  const [Vehicle_letter, setLetter] = useState(""); // LES
  const [Vehicle_letter_ext, setLetterExt] = useState(""); // A four  letter

  const [Vehicle_year, setYear] = useState("");  //2019
  const [Vehicle_number, setNumber] = useState(""); //5351
  const [vehicle_chasis , setChasis] = useState(""); // chasis
  const [vehcile_engine, setEngine] = useState(""); // engine
  const [vehcile_make, setMake] = useState(""); // make company
  const [vehcile_color, setColor] = useState(""); // color
  
 
  const [vehcile_ac, setAc] = useState(""); // AC Status

  const [vehicle_seats, setVehicleSeats] = useState(""); // seating Capacity

  const [vehcile_tracker, setTracker] = useState(""); // tracker

  const [vehcile_emergencyExit, setEmergencyExit] = useState(""); //Emergency Exit

  const [vehcile_manf_year, setManfYear] = useState(""); // Manufacturing Year
  const [vehcile_company, setCompany] = useState(""); // Vehcile Company


// Model States
  const [showModal, setShowModal] = useState(false);

  //=========================setting user session 
  const [currentUser,setCurrentUser] = useState("")
  //---------------------------detting data 
  const [updateBtn,setUpdateBtn] = useState('none')
  const [saveBtn,setSaveBtn] = useState('block')
  const [value,setValue] = useState(null)
  const [subComp,setSubComp] = useState(null)
  // const [isFocus, setIsFocus] = useState(false);


  
  ///================================retriving Data
  
  async function showReportData (psvReportData){
  ////code herer plz===========%%$$%$%$%#$@#$#$@#$@#$#@$=======
  setPsvFiels(psvReportData)
  }

  //==========================================
    //getting user seesion data
    async function retrieveUserSession() {
   
      try {
        const session = await EncryptedStorage.getItem('user_session');
  
        if (session !== undefined) {
          setCurrentUser(JSON.parse(session));
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function retrieveReportSession() {
      try {
        const session = await EncryptedStorage.getItem('Report');
  
        if (session !== undefined) {
         
          Data1 = JSON.parse(session).psvData; //data of vehicle
  
          setPsvFiels(Data1);
        
        }
      } catch (error) {
        // There was an error on the native side
      }
    }

    useEffect(()=>{
      retrieveUserSession()
      setUpdateBtn("none")
       
      if(route.params){
        if(route.params["params"] == "report"){
          retrieveReportSession()
          setUpdateBtn('block')
          setSaveBtn("none")

        }
      }
    },[])

//=======================================================end report  code

 function setPsvFiels(result) {

  setType(result.vehicleType);
  if(result.prefixRegNo.length > 3){
    setLetter(result.prefixRegNo.slice(0,3))
    setLetterExt(result.prefixRegNo.slice(3,4))
  }
  
   setLetter(result.prefixRegNo);
  setYear(result.vehicleModel.toString());
  setNumber(result.regNo.toString());
   setChasis(result.chasisNo);
   setEngine(result.engineNo);
   setMake(result.vehicleMake);
   setColor(result.vehicleColor);
   setAc(result.acStatus);
   setVehicleSeats(result.seatingCap.toString());
   setTracker(result.trackerStatus);
   setEmergencyExit(result.exitGate);
   setManfYear(result.manufactureYear.toString());
   setValue(result.companyName);
   setSubComp(result.subCompany);
    
 } 

 /// keyboar handler


// clear all fields when vehicle not found

function clearAllData1(){

    
  setType();
  setChasis("");
  setEngine("");
  setMake("");
  setColor("");
  setAc("");
  setVehicleSeats("");
  setTracker("");
  setEmergencyExit("");
  setManfYear("");
  setCompany("");
  setSubComp("");
  setUpdateBtn("none")
  setSaveBtn("block")

 }


  function clearAllData(){

    
   setType("");
  //  setType(Vehicle_type);
   setLetter("");
   setYear("");
   setLetterExt("")
   setNumber("");
   setChasis("");
   setEngine("");
   setMake("");
   setColor("");
   setAc("");
   setVehicleSeats("");
   setTracker("");
   setEmergencyExit("");
   setManfYear("");
   setCompany("");
   setSubComp("");
   setUpdateBtn("none")
   setSaveBtn("block")

  }

  //---------------------------------BACK END

  const today = new Date()
  const time = new Date().toLocaleTimeString() 


  //===========================================================vehicle sesion saving 
 async function storeVehicleSession(letter,modal,number) {

        try {
            await EncryptedStorage.setItem(
                "psv_session",
                JSON.stringify({
                    psvLetter :letter ,
                    psvModal:modal ,
                    psvNumber:number 
                })
                  
            );
        } catch (error) {
            // There was an error on the native side
        }
    }



//-----------------------------------------------------------search psv
const getPsv = async()=>{


  await axios.get(`${global.BASE_URL}/psv/getPsv/${Vehicle_letter_ext?Vehicle_letter+Vehicle_letter_ext:Vehicle_letter}/${Vehicle_year}/${Vehicle_number}`)
  .then(
    (response) =>{
      const result = response.data[0]
      if(result){
        setUpdateBtn("block")
        setSaveBtn("none")
    // setPsvData(result)  //    Use this to set data in fileds   
    setPsvFiels (result)

      }
      else {
        Alert.alert("Vehicle not in record.")
        clearAllData1()
        
      }
  })
  await  storeVehicleSession(Vehicle_letter_ext?Vehicle_letter+Vehicle_letter_ext:Vehicle_letter,Vehicle_year,Vehicle_number)
 
}



//----------------Insert form 1
   const psv ={  
      vehicleType: Vehicle_type,
      prefixRegNo:Vehicle_letter_ext?Vehicle_letter+Vehicle_letter_ext:Vehicle_letter,
      // prefixRegNo:Vehicle_letter + Vehicle_letter_ext,
      vehicleModel:Vehicle_year,
      regNo:Vehicle_number,
      chasisNo:vehicle_chasis,
      engineNo:vehcile_engine,
      vehicleMake:vehcile_make,
      vehicleColor:vehcile_color,
      acStatus:vehcile_ac,
      seatingCap:vehicle_seats,
      trackerStatus:vehcile_tracker,
      exitGate: vehcile_emergencyExit,
      manufactureYear:vehcile_manf_year,
      // companyName:vehcile_company,
      companyName:value,
      subCompany:subComp,
      formOneStatus:1,
      addedDate: today,
      addedTime: time,
      addedBy:currentUser.userName,
      addedPoint:currentUser.location,
      region: currentUser.region,
        zone: currentUser.zone,
        sector:currentUser.sector,
        beat:currentUser.beat

   }
  
    //-----------------------------------save vehicle 
    

    const addPsvFormOne = async()=>{
      //  let regx= new RegExp("[0-9]+$" , "ig");
        //console.log("---^^^---"+ regx.test(Vehicle_letter));
         //regex.replace(Vehicle_letter, "");

      if( Vehicle_letter != "") {
        // console.log("------"+ regx.test(Vehicle_letter));
        Alert.alert("Please enter all Alphabet e.g. LES")
      }
      
        else if(Vehicle_year == "" ) 
            {Alert.alert("Please enter Registeration Year e.g 2015")}
        else if(Vehicle_number == "" ) {Alert.alert("Please enter Registeration Number e.g. 1234")}
        else if(Vehicle_type == "" ) {Alert.alert("Please select vehicle type")}
        else if(vehicle_chasis == "") {Alert.alert("Please enter Chasis Number")}
        else if(vehcile_engine == "") {Alert.alert("Please enter Engine Number")}
        else if(vehcile_make == "") {Alert.alert("Please enter Vehicle Manufacture company")}
        else if(vehcile_color == "") {Alert.alert("Please enter Vehicle color")}
        else if(vehicle_seats == "") {Alert.alert("Please enter seating capacity")}
        else if(vehcile_manf_year == "") {Alert.alert("Please enter Manufacturing Year")}
        else if(value == "") {Alert.alert("Please Vehicle Company")}
        else if(subComp == "") {Alert.alert("Please select Terminal")}
        else {
      
      axios.post(`${global.BASE_URL}/psv/addPsv`, psv )
      .then( async (response)=> {

        
        await  storeVehicleSession(Vehicle_letter_ext?Vehicle_letter+Vehicle_letter_ext:Vehicle_letter,Vehicle_year,Vehicle_number)
        Alert.alert('PSV Initial information Saved', ' ', [
             
          {text: 'Next', onPress: () =>  navigation.navigate("Add Documentation")},
        ]);
        
      })
      .catch((error) => {
        console.log(error);
      })
    // 

      clearAllData()
      

    }
  }
    //-----------------------------------------update psv
   
const upedtedPsv ={
  vehicleType: Vehicle_type,
  chasisNo:vehicle_chasis,
  engineNo:vehcile_engine,
  vehicleMake:vehcile_make,
  vehicleColor:vehcile_color,
  acStatus:vehcile_ac,
  seatingCap:vehicle_seats,
  trackerStatus:vehcile_tracker,
  exitGate: vehcile_emergencyExit,
  manufactureYear:vehcile_manf_year,
  // companyName:vehcile_company,
  companyName:value,
  subCompany:subComp,
  formOneStatus:1,
  editedOn: today,
  editedTime :time,
  editedBy:currentUser.userName,
  editedPoint:currentUser.location,
  eregion: currentUser.region,
  ezone: currentUser.zone,
  esector:currentUser.sector,
  ebeat:currentUser.beat

}


const updatePsv =async ()=>{
  // clearVehicleSession()
  axios.patch(`${global.BASE_URL}/psv/updatePsv/${Vehicle_letter+Vehicle_year+Vehicle_number}`, upedtedPsv
  )
    .then(response =>{ 
      if(route.params){
        if(route.params["params"] == "report"){
       
        Alert.alert('Data Updated', ' ', [
         
          {text: 'Back to Report', onPress: () =>  navigation.navigate("Trip Report")},
        ]);
       
       
       }
     }
    storeVehicleSession(Vehicle_letter,Vehicle_year,Vehicle_number)
}
    )
    .catch(error => console.error(error));
 
        
    clearAllData()
  }


  const Companydata = [
 
  ]
  const subCompanyData = []
//--------------------------getting companies
//-----------------------------------------------------------search psv
const getCompany = async()=>{


  await axios.get(`${global.BASE_URL}/cmp/getAllCompany`)
  .then(
    (response) =>{
      const result = response.data
      if(result){
       
    // setPsvData(result)  //    Use this to set data in fileds   
        result.map((item)=>{
          Companydata.push(
            {label:`${item.companyName}`,value:`${item.companyName}`}
          )

        })
      
      }
      else {
        Alert.alert("Not in Record.")
      }
  })
}

//==========================sub company
const getSubCompany = async()=>{

  if(value){

    await axios.get(`${global.BASE_URL}/cmp/getCmp/${value}`)
    .then(
      (response) =>{
        const result = response.data
        if(result){
          
          // setPsvData(result)  //    Use this to set data in fileds   
          result.map((item)=>{
            subCompanyData.push(
              {label:`${item.subOffice}`,value:`${item.subOffice}`}
              )
              
            })
            
          }
          else {
            Alert.alert("Not in Record.")
          }
        })
      }
}



if(Companydata==[]){
  return(
    <View>
      <Text>
        Loading........
      </Text>
    </View>
  )
}
else{

getCompany()
if(value != ""){

  getSubCompany()
}


 //------------------------------returning UI    
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : null}
         enabled>
     
          <ScrollView keyboardShouldPersistTaps='handled'>
      <View className=" flex flex-col ">
        

          {/* Vehicle Information Design Tab */}
          <View className="  mt-1 w-full  ">

            <View className=" bg-yellow-400  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">Add Vehicle Information</Text>
              <BusFront stroke="black" size={40}></BusFront>
            </View>
          </View>

          
          {/* Enter Bus Reg Number [ABC] [2019] [1234] */}
          <View className={styles.outerview} >

            {/* REG LETTER NO */}
            <View className=" justify-center w-10/12 gap-3  flex flex-row items-center  ">
              <TextInput
                style={{ backgroundColor: 'white' }}
                placeholderTextColor={'grey'}
                autoCapitalize={'characters'}
                placeholder='CAG'
                maxLength={3}
                onChangeText={e => setLetter(e)}
                value={Vehicle_letter}
                className=' w-3/12 border rounded-md bg-white border-black text-center  text-sm text-black' />
                
              <TextInput
                style={{ backgroundColor: 'white' }}
                placeholderTextColor={'grey'}
                autoCapitalize={'characters'}
                placeholder='A'
                maxLength={1}
                onChangeText={e => setLetterExt(e)}
                value={Vehicle_letter_ext}
                className='w-1/12  border rounded-md   bg-white text-sm text-black text-center ' />

<TextInput  
                placeholderTextColor={'grey'}
                placeholder='Year-2019'
                maxLength={4}
                keyboardType='phone-pad'
                onChangeText={e => setYear(e)}
                value={Vehicle_year}
                className=' w-3/12  border bg-white rounded-md text-black  text-center   text-sm' />

                <TextInput
                
                placeholderTextColor={'grey'}
                placeholder='[1234]'
                maxLength={4}
                keyboardType='phone-pad'
                value={Vehicle_number}
                onChangeText={e=>setNumber(e)}
                // onBlur={()=>KeyBoardhandler()}
                // keyboardType='phone-pad'
                className='w-3/12 border bg-white rounded-md  text-black text-center   text-sm' />
                
            </View>

           

            
{/* //Search Button */}
                 
                    <TouchableOpacity  onPress ={()=>getPsv()}
                    
                     className="flex flex-row rounded-md  justify-center items-center w-2/12 bg-orange-400">
                      
                      <Text className="text-sm  text-black">Search</Text>
                    </TouchableOpacity>
                   
                
          </View>

        {/*  Select vehcile Type */}
        <View className={`${styles.outerview} `} style={{}} >
            <View className={styles.labelstyle}><Text className="text-black  font-bold">Vehicle Type*</Text></View>
            <View className=" w-4/6 items-center ">
              <View className=" m-1  z-50">
              <SelectDropdown
                data= {Vehicletype}
                onSelect={(selectedItem, index) => {
                  setType(selectedItem)            
                }}
                defaultButtonText='Select an option.'
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>
            </View>
          </View>


          {/*  Add Chaisis No */}
          <View className={styles.outerview} >
            <View className={styles.labelstyle}><Text className="text-black  font-bold">Chassis Number*</Text></View>
            <View className=" w-4/6 text-center items-center ">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Chassis Number'
                maxLength={50}
                value={vehicle_chasis}
                onChangeText={e => setChasis(e)}
                className=' border-black text-black rounded-md  w-full text-lg items-center text-center' />

            </View>
          </View>

          {/* Add Engine Number */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Engine Number*</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Engine Number'
                maxLength={70}
                value={vehcile_engine}
                onChangeText={e => setEngine(e)}
                className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

            </View>
          </View>

          {/* Add Vehicle Make */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Vehicle Make By*</Text></View>
            <View className="w-4/6 items-center">
            <View className=" m-1  z-50">
              <SelectDropdown
                data= {Vehicle_make_company}
                onSelect={(selectedItem, index) => {
                  setMake(selectedItem)            
                }}
                defaultButtonText={vehcile_make}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>

            </View>
          </View>

          {/* Add Vehicle Color */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Vehicle Color*</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Vehicle Color'
                maxLength={70}
                value={vehcile_color}
                onChangeText={e => setColor(e)}
                className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

            </View>
          </View>

          {/* AC or Non- AC */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">AC or Non AC</Text></View>
            <View className="w-4/6 items-center">
            <TouchableOpacity onPress={()=>vehcile_ac==""?setAc("1"):setAc("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${vehcile_ac == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${vehcile_ac == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">{vehcile_ac=="" ?"AC":" AC (Yes)"}</Text></TouchableOpacity>

            </View>
          </View>

          {/* Seating Capapcity */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Seating Capacity*</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Seating Capacity'
                keyboardType='numeric'
                maxLength={2}
                value={vehicle_seats}
                onChangeText={e => setVehicleSeats(e)}
                className=' border-black text-black rounded-md  text-lg text-center' />
            </View>
          </View>

          {/* Tracker Installed (Yes / No) */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Tracker Status</Text></View>
            <View className="w-4/6 items-center">
            <TouchableOpacity onPress={()=>vehcile_tracker==""?setTracker("1"):setTracker("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${vehcile_tracker == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${vehcile_tracker == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">{vehcile_tracker=="" ?"Installed":" Tracker Installed"}</Text></TouchableOpacity>
            </View>
          </View>

           {/* Emergency Exit Gate */}
           <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Emergency Exit Gate</Text></View>
            <View className="w-4/6 items-center">
              <TouchableOpacity onPress={()=>vehcile_emergencyExit==""?setEmergencyExit('1'):setEmergencyExit("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${vehcile_emergencyExit == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${vehcile_emergencyExit == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">{vehcile_emergencyExit=="" ?"Installed":"Exit Gate Installed"}</Text></TouchableOpacity>
            </View>
          </View>

           {/* Manufacturing Year */}
           <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Manufactured  Year*</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='[2021]'
                maxLength={4}
                minLength={2}
                keyboardType='numeric'
                value={vehcile_manf_year}
                onChangeText={e => setManfYear(e)}
                className=' border-black text-black rounded-md  text-lg' />
            </View>
          </View>

{/* =================================================== */}

{/* =================================================== */}


          {/* Company Name */}
          <View className={`${styles.outerview}  `}>
            <View className={styles.labelstyle}>
              <Text className="text-black font-bold">Company Name</Text>
            </View>
                <View className = "w-3/5 pl-3">

                 
            <Dropdown 
                  
                  data={Companydata}

                  search
                  
                  containerStyle={{borderWidth:1,borderColor:'#a3a5a5',borderRadius:10, Color:'black', backgroundColor:'#a3a5a5'}}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select"
                  placeholderStyle={{paddingStart:5}}
                  inputSearchStyle={{backgroundColor:"#fcfcfc",color:"black"}}
                  searchPlaceholder="Search Company"
                  value={value}
                  
                  onChange={item => {
                    setSubComp("")
                    setValue(item.value)
                
                  }}

                  renderLeftIcon={() => (
                    <View className="flex flex-row gap-1">
                    {/* <Building2 stroke="black" size={20} /> */}
                    <Text className="bg-slate-600 p-1 text-white ">{value}</Text>
                    </View>
                  )}
                  />
</View>

<View className="">
<TouchableOpacity onPress={()=>navigation.navigate('Addcompany',{params:"company"})}>
<PlusSquare stroke='white' fill='black' size={35} ></PlusSquare>
</TouchableOpacity>
</View>
          </View>
 
{/* Terminal*/}
<View className={`${styles.outerview}  `}>
            <View className={styles.labelstyle}>
              <Text className="text-black font-bold">Terminal</Text>
            </View>
                <View className = " w-3/5 pl-3">
            <Dropdown 
                  data={subCompanyData}
                  containerStyle={{borderWidth:1,borderColor:'#a3a5a5',borderRadius:10, Color:'black', backgroundColor:'#a3a5a5'}}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select"
                  searchPlaceholder="Search Company"
                  placeholderStyle={{paddingStart:10}}
                  inputSearchStyle={{backgroundColor:"#fcfcfc",color:"black"}}
                  value={subComp}
                  onChange={(item) => {
                   setSubComp(item.value)
                    
                  }}
                  renderLeftIcon={() => (
                    <View className="flex flex-row gap-1">
                    {/* <Building2 stroke="black" size={20} /> */}
                    <Text className="bg-slate-600 p-1 text-white ">{subComp}</Text>
                    </View>
                  )}
                  />
</View>
<View className="">
  <TouchableOpacity onPress={()=>navigation.navigate('Addcompany',{params:"terminal"})}>
<PlusSquare stroke='white' fill='black' size={35} ></PlusSquare>
</TouchableOpacity>
</View>
          </View>



           {/* Buttons Save - Clear -Update */}
           <View className="flex-row items-center justify-center ">
                <View className=" ">
                  <TouchableOpacity  onPress ={()=>addPsvFormOne()} className="bg-[#227935]  px-8 py-2 rounded-md m-2" style={{display:`${saveBtn}`}}>
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>


                <View className="">
                  <TouchableOpacity onPress={()=>updatePsv()}  className=" bg-[#29378a] px-7 py-2 rounded-md m-2" style={{display:`${updateBtn}`}}>
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>
                <View className="" >
                  <TouchableOpacity onPress={()=>clearAllData()} 
                  className="bg-[#a54932] px-8 py-2 rounded-md m-2">
                    <Text className="text-white text-lg">Clear</Text>
                  </TouchableOpacity>
                </View>


              </View>


        
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
  );
};

}

export default AddVehicle;

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




// onPress ={()=>setShowModal(!showModal)}