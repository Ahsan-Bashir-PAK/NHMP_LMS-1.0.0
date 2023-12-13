import React, { useState, useEffect } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, Modal, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BusFront, Scroll, User, Square, CheckSquare, Search, Navigation, Building2, PlusSquare, Truck, Calendar } from 'lucide-react-native';
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



const Vehicletype = [ "Mazda" ,"Truck", "Trailer", "Gas Bowser", "Pick-up", "Oil Carrier","OTHER"];  
const Vehicle_make_company = [ "HINO", "HYUNDAI", "SUZUKI", "CHANGAN", "NISSAN", "BEDFORD", "EURO", "ISUZU", "KING-LONG", "ZHONGTONG", "MITSUBISHI", "NISHI", "VOLVO", "DAEWOO", "FORLAND", "FAW", "JAC", "YUTONG", "HINO", "SUZU", "FOTON", "HILUX", "OTHER"];    

const tyre_companies = ["Dunlop", "Bridgestone", "Yokohama", "Michelin", "Van-Lee", "Huayi", "Westlake", "Chaoyang", "Xing yuan", "Continents", "Mirage", "Long March", "General", "Super cargo", "Green-Tiger", "Service", "Panther", "Advance tyre", "others"];

const AddCommVehicle = ({route}) => {

  // Searchable drop down
  const [selected, setSelected] = React.useState("");

  const navigation = useNavigation();
  const [Vehicle_type, setType] = useState(""); // BUS / HIACE
  const [Vehicle_letter, setLetter] = useState(""); // LES
  const [Vehicle_letter_ext, setLetterExt] = useState(""); // A   Extra letter

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
  const [vehcile_company, setVehicleCompany] = useState(""); // Vehcile Company


  //=========================setting user session 
  const [currentUser,setCurrentUser] = useState("")
  //---------------------------detting data 
  const [updateBtn,setUpdateBtn] = useState('none')
  const [saveBtn,setSaveBtn] = useState('block')
  const [value,setValue] = useState(null)
  const [subComp,setSubComp] = useState(null)
  // const [isFocus, setIsFocus] = useState(false);

//======================tyre condition=============
// const today = new Date()
// const time = new Date().toLocaleTimeString()

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
  
  //==============FITNESS=======================
  const [fitnessno, setFitness] = useState("");
  const [fitnessdate, setFDate] = useState(new Date())
  const [fitnessopen, setFOpen] = useState(false)

//const [fitness_auth, setFitAuthority] = useState("");
const [fitness_auth, setFitAuthority] = useState("");



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
  
          setPsvFields(Data1);
        
        }
      } catch (error) {
        // There was an error on the native side
      }
    }

    useEffect(()=>{
      retrieveUserSession()
      setUpdateBtn("none")
       
      // if(route.params){
      //   if(route.params["params"] == "report"){
      //     retrieveReportSession()
      //     setUpdateBtn('block')
      //     setSaveBtn("none")

      //   }
      // }
    },[])

//=======================================================end report  code

 function setPsvFields(result) {

  setType(result.vehicleType);
   setLetter(result.prefixRegNo);
  setYear(result.vehicleModel.toString());
  setNumber(result.regNo.toString());
   setChasis(result.chasisNo);
   setEngine(result.engineNo);
   setMake(result.vehicleMake);
  //  setColor(result.vehicleColor);
  //  setAc(result.acStatus);
  //  setVehicleSeats(result.seatingCap.toString());
   setTracker(result.trackerStatus);
  //  setEmergencyExit(result.exitGate);
   setManfYear(result.manufactureYear.toString());
   setVehicleCompany(result.companyName);
  //  setSubComp(result.subCompany);
    setTyreCom(result.tyreCompany)
    setTread(`${result.tyreTread}`)
    setConditionState(result.conditionstate)
    setRemarks(result.remarks)
    setFitness(result.fitnessNo)
    setFDate(new Date (result.fitnessExpiryDate))
    setFitAuthority(result.fitnessAuthority)
    setmanDate(new Date(result.tyreManDate))
    settyreDate(new Date(result.tyreExpiry))
    
    
 } 

 /// keyboar handler


// clear all fields when vehicle not found




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
  //  setCompany("");
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
const getCv = async()=>{

  await axios.get(`${global.BASE_URL}/cv/getCv/${Vehicle_letter_ext?Vehicle_letter+Vehicle_letter_ext:Vehicle_letter}/${Vehicle_year}/${Vehicle_number}`)
  .then(
    (response) =>{
      
      const result = response.data[0]
    
      if(result){
        setUpdateBtn("block")
        setSaveBtn("none")
    // setPsvData(result)  //    Use this to set data in fileds   
    // console.log(result)
     setPsvFields (result)
     Alert.alert("Vehicle Found")
   

      }
      else {
        Alert.alert("Vehicle not in record.")
        // clearAllData()
        
      }
  }) 
}



//----------------Insert form 1
   const cv ={  
      vehicleType: Vehicle_type,
      prefixRegNo:Vehicle_letter_ext ? Vehicle_letter + Vehicle_letter_ext:Vehicle_letter,
      vehicleModel:Vehicle_year,
      regNo:Vehicle_number,
      chasisNo:vehicle_chasis,
      engineNo:vehcile_engine,
      vehicleMake:vehcile_make,
      vehicleColor:vehcile_color,
      trackerStatus:vehcile_tracker,
      manufactureYear:vehcile_manf_year,
      companyName:vehcile_company,
      tyreCompany: tyrecomp,
      tyreManDate: t_manDate,
      tyreExpiry: tyredate,
      tyreChkDate:today,
      tyreCondition: tyrecondition,
      tyreTread:  tread,
      tyreRemarks: remarks,
      fitnessNo: fitnessno,
      fitnessExpiryDate: fitnessdate,
      fitnessAuthority:fitness_auth,
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
    

    const addCv = async()=>{

      if( Vehicle_letter == "") {
     
        Alert.alert("Please enter all Alphabet e.g. LES")
      }
      
        else if(Vehicle_year == "" ) 
            {Alert.alert("Please enter Registeration Year e.g 2015")}
        else if(Vehicle_number == "" ) {Alert.alert("Please enter Registeration Number e.g. 1234")}
        else if(Vehicle_type == "" ) {Alert.alert("Please select vehicle type")}
        else if(vehicle_chasis == "") {Alert.alert("Please enter Chasis Number")}
        else if(vehcile_engine == "") {Alert.alert("Please enter Engine Number")}
        else if(vehcile_make == "") {Alert.alert("Please enter Vehicle Manufacture company")}
        // else if(vehcile_color == "") {Alert.alert("Please enter Vehicle color")}
        // else if(vehicle_seats == "") {Alert.alert("Please enter seating capacity")}
        else if(vehcile_manf_year == "") {Alert.alert("Please enter Manufacturing Year")}
        // else if(vehcile_company == "") {Alert.alert("Please Vehicle Company")}
       
        else if(tyrecomp == undefined) {Alert.alert("Please enter Tyre Company")}
        // else if (tyredate.toLocaleDateString() <= t_manDate.toLocaleDateString()) {
        //   Alert.alert("Expiry Date cannot be equal to current date")}
        else if(tread == "") {
          
          Alert.alert("Please enter tread size" )}
        else if(tyrecondition == "") {Alert.alert("Please select tyre condition")}
        else if(fitnessno == "") {Alert.alert("Please enter Fitness Number")}
        else if(fitness_auth == "") {Alert.alert("Please enter fitness Authority Name")}
       
        else {
      
      axios.post(`${global.BASE_URL}/cv/addCv`, cv )
      .then( async (response)=> {

        
        // await  storeVehicleSession(Vehicle_letter,Vehicle_year,Vehicle_number)
        Alert.alert('Commercial vehicle added')
        
      })
      
      .catch((error) => {
        console.log(error);
      })
    // 

      // clearAllData()
      

    }
  }

//-----------------------------------------update psv
   
const upedtedCv ={
  vehicleType: Vehicle_type,
      prefixRegNo:Vehicle_letter_ext ? Vehicle_letter + Vehicle_letter_ext:Vehicle_letter,
      vehicleModel:Vehicle_year,
      regNo:Vehicle_number,
      chasisNo:vehicle_chasis,
      engineNo:vehcile_engine,
      vehicleMake:vehcile_make,
      vehicleColor:vehcile_color,
      trackerStatus:vehcile_tracker,
      manufactureYear:vehcile_manf_year,
      companyName:vehcile_company,
      tyreCompany: tyrecomp,
      tyreManDate: t_manDate,
      tyreExpiry: tyredate,
      tyreChkDate:today,
      tyreCondition: tyrecondition,
      tyreTread:  tread,
      tyreRemarks: remarks,
      fitnessNo: fitnessno,
      fitnessExpiryDate: fitnessdate,
      fitnessAuthority:fitness_auth,
  editedOn: today,
  editedTime :time,
  editedBy:currentUser.userName,
  editedPoint:currentUser.location,
  eregion: currentUser.region,
  ezone: currentUser.zone,
  esector:currentUser.sector,
  ebeat:currentUser.beat


}


const updateCv =async ()=>{
  // clearVehicleSession()
 
  axios.patch(`${global.BASE_URL}/cv/updateCv/${Vehicle_letter+Vehicle_year+Vehicle_number}`, upedtedCv
  )
    .then(response =>{ 
     Alert.alert("Vehicle Updated ")
    storeVehicleSession(Vehicle_letter_ext ? Vehicle_letter + Vehicle_letter_ext:Vehicle_letter,Vehicle_year,Vehicle_number)
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






 //------------------------------returning UI    
  return (
    <KeyboardAvoidingView
        className="flex-1 "
        behavior={Platform.OS === 'android' ? 'height' : null}
         enabled>
     
          <ScrollView keyboardShouldPersistTaps='handled'>
      <View className=" flex flex-col border ">
        

          {/* Vehicle Information Design Tab */}
          <View className="  mt-1 w-full  ">

            <View className=" bg-[#195e8e] rounded-full  p-2 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-white text-lg rounded-md  ">Add Commercial Vehicle</Text>
              
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
                placeholder='LES'
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
                 
                    <TouchableOpacity  onPress ={()=>getCv()}
                    
                     className="flex flex-row rounded-md  justify-center items-center w-2/12 bg-orange-400">
                      
                      <Text className="text-sm  text-black">Search</Text>
                    </TouchableOpacity>
                   
                
          </View>

        {/*  Select vehcile Type */}
        <View className={`${styles.outerview} `} style={{}} >
            <View className={styles.labelstyle}><Text className="text-black  font-bold">Vehicle Type*</Text></View>
            <View className=" w-4/6 items-center ">
              <View className=" z-50">
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
            <View className=" w-4/6 text-center items-center border-b">
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
            <View className="w-4/6 items-center border-b">
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
            <View className="    z-50">
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

          {/* Add Vehicle Color
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
          </View> */}

          
         
          {/* Tracker Installed (Yes / No) */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Tracker Status</Text></View>
            <View className="w-4/6 items-center ">
            <TouchableOpacity onPress={()=>vehcile_tracker==""?setTracker("1"):setTracker("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${vehcile_tracker == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${vehcile_tracker == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">{vehcile_tracker=="" ?"Installed":" Tracker Installed"}</Text></TouchableOpacity>
            </View>
          </View>

         
           {/* Manufacturing Year */}
           <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Manufactured  Year*</Text></View>
            <View className="w-4/6 items-center border-b">
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
                
            <View className="w-4/6 items-center border-b">
            <TextInput
                placeholderTextColor={'grey'}
                placeholder='Company Name (if any)'
                value={vehcile_company}
                onChangeText={e => setVehicleCompany(e)}
                className=' border-black text-black rounded-md  text-lg' />
            </View>



          </View>
 {/* ==============================tyre condition===================///  */}

 <View className=" bg-[#195e8e]  rounded-full p-1 m-1 w-fit items-center justify-center flex ">
  <Text className="text-white text-lg rounded-md  ">Tyre Condition</Text>
  {/* <FileText  stroke="black" size={30}></FileText > */}
</View>
       
 {/*  Tyre Manufacture */}
 <View className={styles.outerview} >
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Tyre Company</Text>
              </View>
              <View className=" w-4/6  items-center ">
              <View className=" z-40">
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
               <View className="w-4/6 items-center">
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
              <View className={styles.labelstyle}><Text className="text-black font-bold">Expiry Date</Text></View>
              <View className="w-4/6 items-center ">
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
              <View className={styles.labelstyle}><Text className="text-black font-bold">Tread Size</Text></View>
              <View className="w-4/6 items-center border-b">
              <TextInput
                  placeholderTextColor={'grey'}
                  keyboardType='numeric'
                  placeholder='3.5 - 2.0'
                  maxLength={4}
                  onChangeText={e=>setTread(e)}
                  value ={tread}
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>

           

 {/* Select Tyre Condition */}
 <View className={` justify-around flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-full  shadow-md  shadow-blue-900 ${tyrecondition=="Excellent"?"bg-green-700 ":tyrecondition=="Good"?"bg-blue-500":tyrecondition=='Average'?"bg-yellow-500":tyrecondition=="Poor"?"bg-red-600":"bg-white"}`}> 
             <View className=" " >
             <Text className={`font-bold text-white `}>{tyrecondition ===""?"Select Tyre Condition*":tyrecondition}</Text>
                    
            </View>
            </View>

            {/* Tyre condition Excellent - Good-Poor-Average */}
            <View className=' justify-around rounded-full flex flex-row mb-1 mx-2 border border-gray-300 p-1  bg-white shadow-md  shadow-blue-900'> 
             <TouchableOpacity onPressOut={()=>SettyreCondition('Excellent')}  className="bg-[#3bac44]   rounded-md p-2 justify-around m-1 w-[80]" ><Text className="text-white text-xs text-center  ">Excellent</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Good')}  className="bg-[#3975b1]  rounded-md p-2 justify-around m-1 w-[75]" ><Text className="text-white text-xs text-center  ">Good</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Average')}  className="bg-[#8c6cd6]  rounded-md p-2 justify-around m-1 w-[78]" ><Text className="text-white text-xs text-center  ">Average</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Poor')}  className="bg-[#cf3e3e] rounded-md p-2 justify-around m-1 w-[75]" ><Text className="text-white text-xs text-center  ">Poor</Text></TouchableOpacity>
             
            </View>
           
            {/* Remarks */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Remarks</Text></View>
              <View className="w-4/6 items-center border-b">
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='Remarks if any'
                  maxLength={100}
                  onChangeText={e=>setRemarks(e)}
                  value={remarks}
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>
            
 {/* *******************FITNESS CERTIFICATE************************* */}

 <View className=" mt-1 w-full  ">

<View className=" bg-[#195e8e]   rounded-full p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
  <Text className="text-white text-lg rounded-md  ">Fitness Certificate </Text>
  {/* <FileText  stroke="black" size={30}></FileText > */}
</View>

{/* Fitness Certifcate No */}
<View className={styles.outerview}>
  <View className={styles.labelstyle}><Text className="text-black font-bold">Fitness Certificate No.*</Text></View>
  <View className="w-4/6 items-center border-b">
    <TextInput
      placeholderTextColor={'grey'}
      placeholder='Fitness No.'
      maxLength={30}
      onChangeText={e => setFitness(e)}
      value={fitnessno}
      className=' border-black text-black rounded-md  text-lg' />
  </View>
</View>

{/* Fitness Expiry Date */}
<View className={styles.outerview}>
  <View className={styles.labelstyle}><Text className="text-black font-bold">Fitness Expiry Date</Text></View>
  <View className="w-4/6 items-center">
  <View className="flex flex-row gap-1 ">

<DatePicker
modal
mode="date"
open={fitnessopen}
date={fitnessdate}
onConfirm={value => {
  setFOpen(false);
  setFDate(value);
}}
onCancel={() => {
  setFOpen(false);
}}
/>

<Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
{/* {fitnessdate.toLocaleDateString()} */}
{fitnessdate.toLocaleDateString()}
</Text>
<TouchableOpacity onPress={() => setFOpen(true)}>
<Calendar stroke="black" fill="white" size={30}></Calendar>
</TouchableOpacity>
</View>
</View>
</View>

{/* Fitness Issuing Autority */}
<View className={styles.outerview}>
  <View className={styles.labelstyle}><Text className="text-black font-bold">Fitness Authority*</Text></View>
  <View className="w-4/6 items-center border-b">
    <TextInput
      placeholderTextColor={'grey'}
      placeholder='Authority'
      maxLength={20}
      onChangeText={e => setFitAuthority(e)}
      value={fitness_auth}

      className=' border-black text-black rounded-md  text-lg ' />
  </View>
</View>





           {/* Buttons Save - Clear -Update */}
           <View className="flex-row items-center justify-center ">
                <View className=" ">
                  <TouchableOpacity  onPress ={()=>addCv()} className="bg-[#227935]  px-8 py-2 rounded-md m-2" style={{display:`${saveBtn}`}}>
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>


                <View className="">
                  <TouchableOpacity onPress={()=>updateCv()}  className=" bg-[#29378a] px-7 py-2 rounded-md m-2" style={{display:`${updateBtn}`}}>
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
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
  );
};



export default AddCommVehicle;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
  labelstyle:
    'text-center items-center justify-center w-2/6  rounded-l-full border-r-8 border-[#195e8e]  bg-yellow-400 ',
  outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-l-full bg-white shadow-md  shadow-blue-900 '
};




// onPress ={()=>setShowModal(!showModal)}