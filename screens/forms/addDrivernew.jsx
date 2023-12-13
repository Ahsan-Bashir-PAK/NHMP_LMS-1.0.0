import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, Keyboard } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BusFront, Scroll, User, Square, CheckSquare, Search, Calendar,Building2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectDropdown from 'react-native-select-dropdown'
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import '../../config'
import retrieveUserSession from '../../config';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import { useNavigation } from '@react-navigation/native';





const provinces = ["Punjab", "KPK", "Sindh", "Balochistan", "NHMP", "Islamabad", "AJK", "Gilgit-Baltistan"]
const License_type = ["LTV", "HTV", "LTV / PSV" , "HTV / PSV", "Other" ]

const AddDrivernew = ({route}) => {


  const navigation = useNavigation();
   
const [currentUser,setCurrentUser] = useState({})

 //===============getting report data  for backend

 async function retrieveReportSession() {
    
  try {
    const session = await EncryptedStorage.getItem('Report');

    if (session !== undefined) {
    
      const data =JSON.parse(session).dvrData; //data of vehicle
      showReportData(data)
      
     
     
    }
  } catch (error) {
    // There was an error on the native side
  }
  
}

//============================================retriveing vehicle info
useEffect(()=>{
retrieveUserSession()
setUpdateBtn('none')
if(route.params){
  if(route.params["params"] == "report"){
    retrieveReportSession()
    setUpdateBtn('block')
    setSaveBtn('none')
  }
}
},[])

///================================retriving Data

async function showReportData (dvrData){
////code herer plz======

setDriverValue(dvrData);

}

//getting user seesion data 
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

const cmpdata = [
  { label: 'btem 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'ctem 3', value: '3' },
  { label: 'dtem 4', value: '4' },
  { label: 'ktem 5', value: '5' },
  { label: 'ltem 6', value: '6' },
  { label: 'otem 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const today = new Date()
const time = new Date().toLocaleTimeString()
  
// expiry Date
  const [expirydate, setexpiryDate] = useState(new Date())
  const [expiryopen, setexpiryOpen] = useState(false)

// Issue Date
const [issuedate, setissueDate] = useState(new Date())
const [issueopen, setissueOpen] = useState(false)

// DOB
const [dobopen, setdobOpen] = useState(false)
const [dobdate, setdobDate] = useState(new Date())
//------------new states
  const [cnic,setcnic] =useState("")
  const [driverName,setDriverName] =useState("")
  const [fatherName,setFatherName] =useState("")
  const [address,setAddress] =useState("")
  const [disability,setDisability] =useState("")
  const [companyId,setCompanyId] =useState("")
  const [cellNo,setCellNo] =useState()
  const [licenseType,setLicenseType] =useState("")
  const [licenseNo,setLicenseNo] =useState("")
  const [licenseAuthority,setLicenseAuthority] =useState("")
  const [addedBy,setAddedBy] =useState()
  const [addedDate,setAddedDate] =useState()
  const [addedTime,setAddedTime] =useState()
  const [addedPoint,setAddedPoint] =useState("")
  const [updateBtn,setUpdateBtn] = useState('none')
  const [saveBtn,setSaveBtn] = useState('block')


  //--------state for search driver //back end 
  const [searchCnic,setSearchCnic] =useState("")
  const [data,setData] =useState()
  const [value,setValue] = useState(null) // Company Name
  const [subComp,setSubComp] = useState() // Sub company name

//-------------------------------- clear All 
  function clearAll() {
    
    setcnic("");
    setdobDate(new Date())
    setDriverName("");
    setFatherName("");
    setAddress("");
    setDisability("");
    setCompanyId("");
    setCellNo("");
    setLicenseNo("");
    setLicenseType("");
    setLicenseAuthority("");
    setissueDate(new Date());
    setexpiryDate(new Date());
    setSearchCnic("");
    setValue("");
    setSubComp("");
    setSaveBtn("block");
    setUpdateBtn("none");

  }
//===========================------------------backend integration==============================
//---------------------------------------------------saving data to offices

const driver = {
  cnic:cnic,
  driverName:  driverName,
  fatherName:  fatherName,
  dob:  dobdate,
  address:  address,
  disability:  disability,
  companyId:  companyId,
  cellNo :   cellNo, 
  licenseType:  licenseType,
  licenseNo:  licenseNo,
  licenseAuthority:  licenseAuthority,
  issueDate:  issuedate,
  addedBy:  currentUser.userName,
  addedDate: today,
  addedTime: time,
  licenseExpiry:  expirydate,
  addedPoint: currentUser.location,
  region: currentUser.region,
        zone: currentUser.zone,
        sector:currentUser.sector,
        beat:currentUser.beat

};
//-----------------object to update drive r
const updatedDeriver ={
  driverName:  driverName,
  fatherName:  fatherName,
  dob:  dobdate,
  address:  address,
  disability:  disability,
  companyId:  value,
  subCompany: subComp,
  cellNo :   cellNo, 
  licenseType:  licenseType,
  licenseNo:  licenseNo,
  licenseAuthority:  licenseAuthority,
  issueDate:  issuedate,
editedBy: currentUser.userName,
editedDate: today,
editedTime: time,
licenseExpiry: expirydate,
editedPoint:currentUser.location,
eregion: currentUser.region,
ezone: currentUser.zone,
esector:currentUser.sector,
ebeat:currentUser.beat

}

//======================get driver based one cnic 
const getDriver = async()=>{

  await axios.get(`${global.BASE_URL}/dvr/getDriver/${searchCnic}`)
  .then(
    async (response) =>{
     const result = response.data[0]
      if(result){
        setUpdateBtn('block')
        setSaveBtn('none')
    await setDriverValue(result)
      }
      else {
        Alert.alert("Driver is not in the Record.")
      }
  })
  
}

// Get Driver Values and Saved in form
async function setDriverValue (result){
  //console.log("yesss", result.driverName);
  setcnic(result.cnic);
 setdobDate( new Date(result.dob));
  setDriverName(result.driverName);
  setFatherName(result.fatherName);
  setAddress(result.address);
  setDisability(result.disability);
  //setCompanyId(result.companyId);
  setCellNo(result.cellNo);
  setLicenseNo(result.licenseNo);
  setLicenseType(result.licenseType);
  setLicenseAuthority(result.licenseAuthority);
  setissueDate(new Date(result.issueDate));
  setexpiryDate(new Date(result.licenseExpiry));
  setValue(result.companyId) //company Name
  setSubComp(result.subCompany); // Sub companys
 
}
//----------save driver data
const saveData = async () => {
  if(driverName =="") {Alert.alert("Please Enter Driver Name");}
    else if(cnic =="" || cnic.length != 13) {Alert.alert("Please Enter CNIC");}
    else if(cellNo == "" || cellNo.length != 11) {Alert.alert("Please enter Cell No.");} 
    else if(licenseNo =="") {Alert.alert("Please Enter License Number");}
    else if(licenseType =="") {Alert.alert("Please select license Type");}
    else if(licenseAuthority =="") {Alert.alert("Please select license Authority");}
    
  else {
await axios.post(`${global.BASE_URL}/dvr/addDriver`, driver)

.then( (response)=> {
  Alert.alert('Drive added successfully');
  if(route.params){
    if(route.params["params"] == "report"){
   
    Alert.alert('Data Updated', ' ', [
     
      {text: 'OK', onPress: () =>  navigation.navigate("Trip Report")},
    ]);
   
   }
 }
   

})
.catch((error) => {
  console.log(error);
})
clearAll()
}
}

//--------------------------------------update driver

const updateDriver =async ()=>{
axios.patch(`${global.BASE_URL}/dvr/updateDriver/${cnic}`, updatedDeriver
)
  .then(response =>{
    if(route.params){
      if(route.params["params"] == "report"){
     
      Alert.alert('Data Updated', ' ', [
       
        {text: 'Back to Report', onPress: () =>  navigation.navigate("Trip Report")},
      ]);
      // navigation.navigate("Trip Report")
     
     }
   }else{
     navigation.navigate('Home')
    }

  }
    
   )
  
  .catch(error => console.error(error));
  
}
//============================================================

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

//------------------------return 
  return (
    
    <KeyboardAvoidingView
    behavior={Platform.OS === 'android' ? 'height' : null}
     enabled>
 
      <ScrollView keyboardShouldPersistTaps='handled'>
      <View className=" flex flex-col   ">
     

          {/* Vehicle Information Design Tab */}
          <View className="  mt-1 w-full  ">

            <View className=" bg-yellow-400  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">Add Driver Information</Text>
              <User stroke="black" size={30}></User>
            </View>
          </View>

          {/*  Search CNIC */}
          <View className={`${styles.outerview} `} style={{}} >
            
            <View className=" w-4/6  border border-gray-200 items-center ">
                <TextInput 
                
                placeholderTextColor={'grey'}
                placeholder='Enter Driver CNIC'
                maxLength={13}
                keyboardType='numeric'
                value = {searchCnic}
                
                
                onChangeText={e=>setSearchCnic(e)}

                className=' text-black rounded-md  text-lg text-center' />
                
            </View>
            <TouchableOpacity onPress={()=>getDriver()}  className="flex flex-row-reverse rounded-md bg-orange-400  justify-center items-center w-2/6">
            <View><Text className="text-black text-lg  font-bold">Search</Text>
            </View>
            </TouchableOpacity>
          </View>
          
          {/*  Driver Name */}
          <View className={styles.outerview} >
            <View className={styles.labelstyle}><Text className="text-black  font-bold">Driver Name*</Text></View>
            <View className=" w-4/6  items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Driver Name'
                maxLength={50}
                onChangeText={e=>setDriverName(e)}
                value={driverName}
                className=' border-black text-black rounded-md  text-lg' />

            </View>
          </View>

          {/* Add Father Name */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Father Name</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Father Name'
                maxLength={70}
                onChangeText={e=>setFatherName(e)}
                value={fatherName}
                className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

            </View>
          </View>

          {/* DOB*/}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">D.O.B</Text></View>
            <View className="w-4/6 items-center ">
            <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={dobopen}
              date={dobdate}
              onConfirm={value => {
                setdobOpen(false);
                setdobDate(value);
              }}
              onCancel={() => {
                setdobOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {dobdate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setdobOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
            </View>
          </View>

          {/* Enter Address */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Address</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Address'
                maxLength={70}
                onChangeText={e=>setAddress(e)}
                value={address}
                className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

            </View>
          </View>

          {/* Enter CNIC */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">CNIC*</Text></View>
            <View className="w-4/6 items-center">
            <TextInput
                placeholderTextColor={'grey'}
                placeholder='CNIC #'
                maxLength={13}
                keyboardType='number-pad'
                onChangeText={e=>setcnic(e)}
                value={cnic}
                className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />


            </View>
          </View>

          {/* Cell-No. */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Cell No.*</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Cell Number'
                keyboardType='number-pad'
                maxLength={11}
                onChangeText={e=>setCellNo(e)}
                value={cellNo}
                className=' border-black text-black rounded-md  text-lg' />
            </View>
          </View>

          {/* Disability */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Disability (if any)</Text></View>
            <View className="w-4/6 items-center">
            <TextInput
                placeholderTextColor={'grey'}
                placeholder='Enter Disability'
                maxLength={70}
                onChangeText={e=>setDisability(e)}
                value={disability}
                className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

            </View>
          </View>

           {/* Company Name */}
           {/* <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Company Name</Text></View>
            <View className="w-4/6 items-center">
            <TextInput
                placeholderTextColor={'grey'}
                placeholder='Company Name'
                maxLength={70}
                onChangeText={e=>setCompanyId(e)}
                value={companyId}
                className='  w-8/12 bg-white border-black text-black rounded-md  text-lg tex text-center' />

            </View>
          </View> */}
          {/* =========================== */}
           {/* Company Name */}
           <View className={`${styles.outerview}  `}>
            <View className={styles.labelstyle}>
              <Text className="text-black font-bold">Company Name</Text>
            </View>
            <View className = "w-3/5 pl-3">

                 
<Dropdown 
      data={Companydata}

      search
      containerStyle={{borderWidth:1,borderColor:'#7077c4',borderRadius:10, Color:'black', backgroundColor:'#a3a5a5'}}
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
        <Building2 stroke="black" size={20} />
        <Text className="bg-slate-600 p-1 text-white ">{value}</Text>
        </View>
      )}
      />
</View>

</View>

{/* Sub Company Name */}
<View className={`${styles.outerview}  `}>
<View className={styles.labelstyle}>
  <Text className="text-black font-bold">Terminal</Text>
</View>
    <View className = "w-3/5 pl-3">
<Dropdown 
      data={subCompanyData}
      containerStyle={{borderWidth:1,borderColor:'#7077c4',borderRadius:10, Color:'black', backgroundColor:'#a3a5a5'}}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select"
      searchPlaceholder="Search Terminal"
      placeholderStyle={{paddingStart:10}}
      inputSearchStyle={{backgroundColor:"#fcfcfc",color:"black"}}
      value={subComp}
      onChange={(item) => {
       setSubComp(item.value)
        
      }}
      renderLeftIcon={() => (
        <View className="flex flex-row gap-1">
        <Building2 stroke="black" size={20} />
        <Text className="bg-slate-600 p-1 text-white ">{subComp}</Text>
        </View>
      )}
      />
</View>
          </View>

          {/* +++++++++++++++++++++++++++++++ */}

           {/* License Number */}
           <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">License Number*</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='License Number'
                maxLength={30}
                onChangeText={e=>setLicenseNo(e)}
                value={licenseNo}
                className=' border-black text-black rounded-md  text-lg' />
            </View>
          </View>

          {/* License Type */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">License Type*</Text></View>
            <View className="w-4/6 items-center">
            <SelectDropdown
                data= {License_type}
                onSelect={(selectedItem, index) => {
                  setLicenseType(selectedItem);
                }}
                defaultButtonText={licenseType}
                buttonStyle={{
                  backgroundColor:'white',
              }}
                />
            </View>
          </View>

           {/* Issuing Authority */}
           <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Issuing Authority*</Text></View>
            <View className="w-4/6 items-center">
              <SelectDropdown
                data= {provinces}
                onSelect={(selectedItem, index) => {
                  setLicenseAuthority(selectedItem);
                }
                
                } 
                defaultButtonText={licenseAuthority}
                buttonStyle={{
                    backgroundColor:'white',
                }}
                />
            </View>
          </View>

 {/* License Isssue Date */}
 <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Issue Date</Text></View>
            <View className="w-4/6 items-center">
            <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={issueopen}
              date={issuedate}
              onConfirm={value => {
                setissueOpen(false);
                setissueDate(value);
              }}
              onCancel={() => {
                setissueOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {issuedate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setissueOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
              </View>
          </View>

           {/* License Expiry Date */}
           <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Expiry Date*</Text></View>
            <View className="w-4/6 items-center">
            <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={expiryopen}
              date={expirydate}
              onConfirm={value => {
                setexpiryOpen(false);
                setexpiryDate(value);
              }}
              onCancel={() => {
                setexpiryOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {expirydate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setexpiryOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>

            </View>
          </View>

           {/* Buttons Save - Clear -Update */}
           <View className="flex-row items-center justify-center ">
                <View className=" ">
                  <TouchableOpacity onPress={()=>saveData()} className="bg-[#227935]  px-8 py-2 rounded-md m-2" style={{display:`${saveBtn}`}}>
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>


                <View className="">
                  <TouchableOpacity onPress={()=>updateDriver()}className="bg-[#29378a] px-7 py-2 rounded-md m-2" style={{display:`${updateBtn}`}}>
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>
                <View className="">
                  <TouchableOpacity onPress={()=>clearAll()} className="bg-[#a54932] px-8 py-2 rounded-md m-2">
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
export default AddDrivernew;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
  labelstyle:
    'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
  outerview:
    'flex flex-row  mx-2 border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'
};

