import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { Building2} from 'lucide-react-native';
import { retrieveUserSession } from '../../config/functions';
import axios from 'axios';
import '../../config';
import { Dropdown } from 'react-native-searchable-dropdown-kj';

const Addcompany = ({route}) => {
  // Add Company Form
  const [companyName, setCompanyName] = useState('');
  const [subCompany, setSubCompany] = useState('');
  const [terminal, setTerminal] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerCellNumber, setManagerCellNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerCellNumber, setOwnerCellNumber] = useState('');
  const [currentUser,setCurrentUser] =useState("")
  const [compAdress, setCompanyAddres] =useState("")

  // Add Terminal Form 
  const [term_Name, setTerminalName] = useState('');
  const [term_Loc, setTerminalLoc] = useState('');
  const [term_managerName, setTermManagerName] = useState('');
  const [term_managerCellNumber, setTermManagerNumber] = useState('');
  const [term_address, setTermAddress] = useState('');

  const today = new Date()
  const time = new Date().toLocaleTimeString() 

useEffect (()=>{
    retrieveUserSession(setCurrentUser)
    getCompany()

    if(route.params){
      if(route.params["params"] == "company"){
        setCompanyForm(true)
      setTerminalForm(false)

      } else {
        setCompanyForm(false)
        setTerminalForm(true)
      }
    }
},[])


const company ={
        companyName:companyName,
        subOffice:subCompany,
        address:compAdress,
        managerName:managerName,
        managerCell:managerCellNumber,
        ownerName:ownerName,
        ownerCell : ownerCellNumber,
        addedDate: today,
        addedTime: time,
        addedBy:currentUser.userName,
        addedPoint:currentUser.location,
        region: currentUser.region,
        zone: currentUser.zone,
        sector:currentUser.sector,
        beat:currentUser.beat
}

const terminalData ={
  companyName:companyName,
  subOffice:term_Name,
  address:term_address,
  ownerName:ownerName,
  ownerCell : ownerCellNumber,
  managerName:term_managerName,
  managerCell:term_managerCellNumber,
  addedDate: today,
  addedTime: time,
  addedBy:currentUser.userName,
  addedPoint:currentUser.location,
  region: currentUser.region,
  zone: currentUser.zone,
  sector:currentUser.sector,
  beat:currentUser.beat
}

//AddTerminalData()

async function AddTerminalData() {
                  if (value == null) {Alert.alert("Please select Company")}
                   else if(term_Name =="") {Alert.alert("Enter Terminal name")}
                  //  else if (term_Loc == "") {Alert.alert("Enter Terminal District")}
                   else if (term_managerName == "") {Alert.alert("Enter Terminal Manager name")}
                   else if (term_managerCellNumber=="" || term_managerCellNumber.length !=11 )
                      {Alert.alert("Enter Manager Cell Number or complete digit")}
                   else if (term_address == "") {Alert.alert("Enter Terminal address")} 
                else {
                  axios.post(`${global.BASE_URL}/cmp/addCompany`, terminalData )
                  .then( (response)=> {
              
                    Alert.alert('New Terminal Saved');
                    
                  })
                  .catch((error) => {
                    console.log(error);
                  })
              
                  clearAllData()
                }
          
                
}



 async function AddCompanyData(){

    if(companyName == "") {Alert.alert("Enter Company name")}
        else if (managerName=="") {Alert.alert("Enter Manager name")}
        else if (managerCellNumber=="" || managerCellNumber.length !=11 )
           {Alert.alert("Enter Manager Cell Number or complete digit")}
        else if (ownerName=="") {Alert.alert("Enter Owner name")}
        else if (ownerCellNumber=="" || ownerCellNumber.length !=11) 
        {Alert.alert("Enter Owner Cell Number or complete digit")}
        else if (compAdress=="") {Alert.alert("Enter company address.")}
      else {
    axios.post(`${global.BASE_URL}/cmp/addCompany`, company )
    .then( (response)=> {

      Alert.alert('New Company Saved');
      
    })
    .catch((error) => {
      console.log(error);
    })

    clearAllData()
   // navigation.navigate("Home")
       
 } 
// console.log(company)
 }

 // Clear All Company Form
  const clearAllData = () => {
    // Reset the form fields
    setCompanyName('');
    setSubCompany('');
    setTerminal('');
    setManagerName('');
    setManagerCellNumber('');
    setOwnerCellNumber('');
    setOwnerName('');
    setCompanyAddres('');
  }

// Clear All Terminal Form
  const clearAllTerminalData = () => {
  
      setTerminalName('');
      setTerminalLoc('');
      setManagerCellNumber('');
      setOwnerCellNumber('');
      setTermManagerName('');
      setTermManagerNumber('');
      setTermAddress('');

    
  }


  // Show Company Form
const [copmanyForm , setCompanyForm] = useState(true)
const [terminalForm, setTerminalForm] = useState(false)

function showCopmanyForm() {
      setCompanyForm(true)
      setTerminalForm(false)
  }
function showTerminalForm() {
  setCompanyForm(false)
  setTerminalForm(true)
  
}

const [value,setValue] = useState(null) // Company Name
const Companydata = [
]

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

if(Companydata==[]){
  return(
    <ActivityIndicator></ActivityIndicator>
  )
  }
  else{
  
  getCompany()
  }



  return (
    
    <KeyboardAvoidingView
    behavior={Platform.OS === 'android' ? 'height' : null}
     enabled>
 
      <ScrollView keyboardShouldPersistTaps='handled'>
   

    <View style={styles.container}>
        
        {/* Vehicle Information Design Tab */}
        <View className="  mt-1 w-full  ">

        <View className=" bg-yellow-400  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
        <Text className="text-black text-lg rounded-md font-bold "> {route.params["params"] == "company" ? "Add New Company" : "Add New Terminal"}</Text>
        {/* <Building2 stroke="black" size={35} / > */}
        </View>
        </View>
        {/* <View className="w-full gap-1 rounded-md flex flex-row  justify-between items-center">
              <TouchableOpacity onPress={showCopmanyForm} className="bg-green-700 w-2/4  rounded-md  justify-center items-center p-1"><Text className="text-white">Add Company</Text></TouchableOpacity>
              <TouchableOpacity onPress={showTerminalForm} className="bg-green-700 w-2/4  rounded-md  justify-center items-center p-1"><Text className="text-white">Add Terminal</Text></TouchableOpacity>
        </View> */}
        {/* Add Copmany Form */}
     <View className={`${copmanyForm?'block' :'hidden'} `}> 
      <Text style={styles.label}>Company Name:</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={text => setCompanyName(text)}
        placeholder="Enter company name"
        placeholderTextColor={'grey'}
        className="text-black"
      />

      <Text style={styles.label}>Terminal:</Text>
      <TextInput
        style={styles.input}
        value={subCompany}
        onChangeText={text => setSubCompany(text)}
        placeholder="Enter sub company"
        placeholderTextColor={'grey'}
        className="text-black"
      />



      <Text style={styles.label}>Manager Name:</Text>
      <TextInput
        style={styles.input}
        value={managerName}
        onChangeText={text => setManagerName(text)}
        placeholder="Enter manager name"
        placeholderTextColor={'grey'}
        className="text-black"
      />

      <Text style={styles.label}>Manager Cell Number:</Text>
      <TextInput
        style={styles.input}
        value={managerCellNumber}
        onChangeText={text => setManagerCellNumber(text)}
        placeholder="Enter manager cell number"
        maxLength={11}
        keyboardType='number-pad'
        placeholderTextColor={'grey'}
        className="text-black"
      />

    <Text style={styles.label}>Owner Name:</Text>
      <TextInput
        style={styles.input}
        value={ownerName}
        onChangeText={text => setOwnerName(text)}
        placeholder="Enter Owner name"
        placeholderTextColor={'grey'}
        className="text-black "
      />

      <Text style={styles.label}>Owner Cell Number:</Text>
      <TextInput
        style={styles.input}
        value={ownerCellNumber}
        keyboardType='number-pad'
        onChangeText={text => setOwnerCellNumber(text)}
        placeholder="Enter owner cell number"
        maxLength={11}
        placeholderTextColor={'grey'}
        className="text-black"
      />

        
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={compAdress}
        onChangeText={text => setCompanyAddres(text)}
        placeholder="Enter Address"
        maxLength={100}
        placeholderTextColor={'grey'}
        className="text-black"
        
      />

      <View style={{ flexDirection: 'row' }} className="justify-center">
        <TouchableOpacity onPress={()=>AddCompanyData()} style={[styles.button, { marginRight: 10 }]}>
          <Text style={{ color: 'white' }}>Add Company</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearAllData} style={[styles.button, { backgroundColor: 'gray' }]}>
          <Text style={{ color: 'white' }}>Reset</Text>
        </TouchableOpacity>
      </View>
      </View>
      {/*===================Add Terminal Form============================ */}
     <View className={`${terminalForm?'block' :'hidden'}  `}>
      
      {/* Get companies from database */}
       {/* Company Name */}
            <View className={`${styles.outerview}  `}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold"> Select Company Name</Text>
              </View>
              <View className="w-full p-2 rounded-md pl-3 border">


                <Dropdown
                  data={Companydata}
                  search
                  containerStyle={{ borderWidth: 1, borderColor: '#7077c4', borderRadius: 10, Color: 'black', backgroundColor: '#a3a5a5' }}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Company"
                  placeholderStyle={{ paddingStart: 5 }}
                  inputSearchStyle={{ backgroundColor: "#fcfcfc", color: "black" }}
                  searchPlaceholder="Search Company"
                  // value={value}
                  value = {companyName}

                  onChange={item => {
                   // setSubComp("")
                    setValue(item.value)
                    setCompanyName(item.value)

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





      <Text style={styles.label}>Terminal Name:</Text>
      <TextInput
        style={styles.input}
        value={term_Name}
        onChangeText={text => setTerminalName(text)}
        placeholder=" Enter Terminal name"
        placeholderTextColor={'grey'}
        className="text-black pl-3"
        
      />
{/* 
      <Text style={styles.label}>Terminal District:</Text>
      <TextInput
        style={styles.input}
        value={term_Loc}
        onChangeText={text => setTerminalLoc(text)}
        placeholder=" Enter District"
        placeholderTextColor={'grey'}
        className="text-black"
      /> */}

<Text style={styles.label}>Owner Name:</Text>
      <TextInput
        style={styles.input}
        value={ownerName}
        onChangeText={text => setOwnerName(text)}
        placeholder=" Enter Owner name"
        placeholderTextColor={'grey'}
        className="text-black "
        
      />

      <Text style={styles.label}>Owner Cell Number:</Text>
      <TextInput
        style={styles.input}
        value={ownerCellNumber}
        keyboardType='number-pad'
        onChangeText={text => setOwnerCellNumber(text)}
        placeholder=" Enter owner cell number"
        maxLength={11}
        placeholderTextColor={'grey'}
        className="text-black "
      />

<Text style={styles.label}>Terminal Manager Name:</Text>
      <TextInput
        style={styles.input}
        value={term_managerName}
        onChangeText={text => setTermManagerName(text)}
        placeholder=" Enter Manager Name"
        placeholderTextColor={'grey'}
        className="text-black "
      />
<Text style={styles.label}>Terminal Manager Cell No.:</Text>
      <TextInput
        style={styles.input}
        value={term_managerCellNumber}
        onChangeText={text => setTermManagerNumber(text)}
        placeholder=" Enter Cell Number"
        placeholderTextColor={'grey'}
        className="text-black "
        keyboardType='number-pad'
        maxLength={11}
       
      />
  <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={term_address}
        onChangeText={text => setTermAddress(text)}
        placeholder=" Enter Address"
        maxLength={150}
        placeholderTextColor={'grey'}
        className="text-black pl-3"
        
      />

      <View style={{ flexDirection: 'row' }} className="justify-center items-center" >
        <TouchableOpacity className="w-1/4" onPress={()=>AddTerminalData()} style={[styles.button, { marginRight: 10 }]}>
          <Text style={{ color: 'white' }}>Add Terminal</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-1/4" onPress={clearAllTerminalData} style={[styles.button, { backgroundColor: 'gray' }]}>
          <Text style={{ color: 'white' }}>Reset</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
      
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color:'black'
  
  },
  input: {
    borderWidth: 1,
    borderColor: '#123456',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#227935',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Addcompany