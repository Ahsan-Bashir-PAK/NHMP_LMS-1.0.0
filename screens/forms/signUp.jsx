import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch, Alert, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { User, Calendar, Navigation } from 'lucide-react-native';
import '../../config'
import { useNavigation } from '@react-navigation/native';


import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { verifyDuplicateUser } from '../../config/functions';





// let ranks = ["CPO" ,"SPO" ,"PO", "APO", "JPO", "ACP","UDC","LDC","PG"];  


 





const SignUp = () => {

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(true);

const [searchcnic, setCnic] = useState("");
const [officercnic, setOfcrcnic] = useState("");
const [officername, setOfcrname] = useState("");
const [officercell, setOfcrcell] = useState("");
const [officerpwd, setOfcrpwd] = useState("");
const [officerCpwd, setOfcrCpwd] = useState("");
const [officerrank, setOfcrrank] = useState("");
const [officerbelt, setOfcrbelt] = useState("");
const [officerbps, setOfcrbps] = useState("");
const [posting, setPosting] = useState("");
// const [officerappt, setOfcrappt] = useState("");

//=======================================================office satates 
const [officerRegion, setOfcrRegion] = useState("");
const [officerzone, setOfcrzone] = useState("");
const [officersector, setOfcrsector] = useState("");
const [officerbeat, setOfcrbeat] = useState("");
const [userOfficeId, setOfficeId] = useState("");

//=================overall offices
const[offices,setOffices] = useState("")
const[ranks,setRanks] = useState("")

  // birth DAte
  const [dobopen, setdobOpen] = useState(false)
  const [dobdate, setdobDate] = useState(new Date())

  //  // Appointment DAte
  const [doaopen, setdoaOpen] = useState(false)
  const [doadate, setdoaDate] = useState(new Date())

// ===========Verify Modal Box============

function verifyUser(){
    if(officercnic == "" || officercnic.length != 13 ) {
      // console.log(officercnic.length + "------")
        Alert.alert("Please enter CNIC to continue")
    } else {
      
      navigation.navigate('SignUp');
      setModalVisible(!modalVisible)
    }
}


//============================================================
// const [officerrole, setOfcrrole] = useState("");
//================================================================ function to get offices data 


/////==================================getofficer
const getOffices = async () => {
  
  await axios.get(`${global.BASE_URL}/ofc/getoffices`).then(async response => {
    const offices = response.data;
    if (offices) {
      setOffices(offices)
    }
  });
};
//============================================get rank
const getRanks = async () => {
  
  await axios.get(`${global.BASE_URL}/gen/getRanks`).then(async response => {
    const ranks = response.data;
    if (ranks) {
      setRanks(ranks)
    }
  });
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//==========================================get office id 
const getOfficeId =(type,region ,zone,sector,beat)=>{
let result
  switch (posting) {
    case 'Beat':
      const office =
        offices &&
        offices.filter(
          item =>
            item.officeType == type &&
            item.region == region &&
            item.zone == zone &&
            item.sector == sector &&
            item.beat == beat,
        );
        result = office[0].officeId;
     
      break;
    case 'Lines HQs':
    case 'Sector Office': 
      const office2 =
        offices &&
        offices.filter(
          item =>
            item.officeType == type &&
            item.region == region &&
            item.zone == zone &&
            item.sector == sector,
        );
        result = office2[0].officeId;
      break;
    case 'Zonal Office':
      const office3 =
        offices &&
        offices.filter(
          item =>
            item.officeType == type &&
            item.region == region &&
            item.zone == zone,
        );
        result = office3[0].officeId;
      break;
      case  'Head Quarter': 
    case 'Training College':
      const office5 =
        offices &&
        offices.filter(
          item =>
            item.officeType == type 
        );
        result = office5[0].officeId;
      break;
    case 'Regional Office':
      const office4 =
        offices &&
        offices.filter(
          item => item.officeType == type && item.region == region,
        );
        result = office4[0].officeId;
      break;

    default:
      break;
  }
  
return result
}


//------------------------save user
const saveUser = async () => {
  if(officercnic && officerbelt && officercell && officername && officerpwd && officerrank &&  doadate && dobdate && posting && officerbps) {

 
  const user = {
    id:officercnic,
    role:"User",
    name:officername,
    pwd:officerpwd,
    cellNo :officercell ,
    rank:officerrank,
    beltNo:officerbelt,
    bps:officerbps,
    officeId : getOfficeId(posting,officerRegion,officerzone,officersector,officerbeat),
    appointmentDate:doadate,
    dob:dobdate,
    status:"Approval Pending"
  }

    axios.post(`${global.BASE_URL}/sign/saveRequest`,user).then( response =>{
      Alert.alert("Request Submitted",'Your Request has been forwarded to concerned office for acount activation ')

    }
    )
      } else { Alert.alert("Note: Please Fill All Fields");}
      }

 






//
//==============================================================================================/>
 // Clear Data
function  clearAll (){

  setCnic("");
  setOfcrname("")
  setOfcrcnic("")
  setOfcrcell("")
  setOfcrpwd("")
  setOfcrCpwd("")
  setOfcrrank("")
  setOfcrrank("")
  setOfcrbelt("")
  setOfcrbps("")
  setOfcrRegion("")
  setOfcrzone("")
  setOfcrsector("")
  setOfcrbeat("")
  setPosting("")
  // setOfcrrole("")
  
  
}




//------------------------------------------confirm password 

const confirmPwd =()=>{
if(officerpwd != officerCpwd){
  Alert.alert("⚠️Password does not match")
  setOfcrCpwd("")
  setOfcrpwd("")
}
}

useEffect(()=>{
  getOffices()
  getRanks()
},[])


return (
    <ScrollView className=" ">
    <View className=" relative flex flex-col p-6 pt-1 bg-slate-100   ">

      <View  className='w-40 h-40  -right-20  top-6  rotate-45  bg-green-400 absolute'></View>
      <View  className='w-80 h-80  -left-60  top-10 rotate-45   bg-yellow-300 absolute'></View>
      <View  className='w-40 h-40  -left-20  -top-10 rotate-45  bg-red-400 absolute'></View>
      <View  className='w-40 h-40  -right-20  bottom-2 rotate-45  bg-red-400 absolute'></View>
      <KeyboardAvoidingView style={{ backgroundColor: 'transparent ' }}>

        {/* Sign Up page */}
        <View className="   w-full p-1  ">

          <View className="p-2 m-1 w-fit items-center justify-center flex ">
            <Text className="text-blue-800 text-2xl rounded-md font-bold ">E-Leave</Text>
            <Text className="text-blue-800 text-2xl rounded-md font-bold ">User Sign Up</Text>
            
          </View>
        </View>


{/*   officer CNIC */}
<View className={styles.outerview} >
          <View className={`${styles.labelstyle} flex-row`}><Text className="text-black  font-bold">Officer CNIC</Text>
          <Text className="text-red-600 font-bold">*</Text>
          </View>
          <View className=" w-4/6  items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='0000000000000'
              keyboardType='numeric'
              maxLength={13}
              onChangeText={e=>setOfcrcnic(e)}
              value={officercnic}
              className=' border-black text-black rounded-md  text-lg'
              onBlur={()=>{verifyDuplicateUser(officercnic,clearAll)}}
              />

          </View>
        </View>

        {/*   officer Name */}
        <View className={styles.outerview} >
          <View className={styles.labelstyle}><Text className="text-black  font-bold">Officer Name*</Text></View>
          <View className=" w-4/6  items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Officer Name'
              maxLength={60}
              value={officername}
              onChangeText={e=>setOfcrname(e)}
              className=' border-black text-black rounded-md  text-lg' />

          </View>
        </View>




        {/* Cell No */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Cell Number*</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='00000000000'
              maxLength={11}
              keyboardType='numeric'
              value={officercell}
              onChangeText={e=>setOfcrcell(e)}
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>


        {/* Password */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">User Password*</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Password'
              maxLength={15}
              secureTextEntry={true}
              value={officerpwd}
              onChangeText={e=>setOfcrpwd(e)}
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>

         {/* Confirm Password */}
         <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Confirm Password*</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Confirm'
              maxLength={15}
              secureTextEntry={true}
              value={officerCpwd}
              onChangeText={e=>setOfcrCpwd(e)}
              onBlur={confirmPwd}
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>

        {/* Rank*/}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Rank*</Text></View>
          <View className="w-4/6 items-center ">
          <View className="   z-50">
              <SelectDropdown
                data = {[...new Set(ranks && ranks.map(x=>x.bps < 17?x.title:""))].filter(x=>x!="")}
                value={officerrank}
                onSelect={(selectedItem, index) => {
                  setOfcrrank(selectedItem);
                }}
                defaultButtonText={officerrank}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>

          </View>
        </View>

        {/* Belt No. */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Belt No.*</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Belt No'
              maxLength={10}
              value={officerbelt}
              onChangeText={e=>setOfcrbelt(e)}
              className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>
        
    {/* BPS*/}
      <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">BPS*</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='BPS'
              maxLength={2}
             keyboardType='numeric'
              value={officerbps}
              onChangeText={e=>setOfcrbps(e)}
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>

          {/* birth Date*/}
      <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Date of Birth*</Text></View>
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

                {/* Appointment Date*/}
                <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black text-center font-bold">Appointment Date*</Text></View>
          <View className="w-4/6 items-center ">
            <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={doaopen}
              date={doadate}
              onConfirm={value => {
                setdoaOpen(false);
                setdoaDate(value);
              }}
              onCancel={() => {
                setdoaOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {doadate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setdoaOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
            </View>
        </View>

      {/* posted at========================================$$$$$ */}
      
       <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Place of Posting*</Text></View>
          <View className="w-4/6 items-center ">
          <View className="   z-50">
              <SelectDropdown
                // data= {postingPlaces}
                data = {[...new Set(offices && offices.map(x=>x.officeType))].filter(x=>x!="")}
                value={posting}
                onSelect={(selectedItem, index) => {
                  setPosting(selectedItem);
                }}
                // defaultButtonText={posting}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>

          </View>
        </View>

        {/* Region */}
        <View className={`${styles.outerview} ${posting == 'Head Quarter' || posting == 'Training College'? 'hidden':'block'} `}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Region*</Text></View>
          <View className="w-4/6 items-center">
          <View className="  z-50">
              <SelectDropdown
                // data= {regions}

                data = {[...new Set(offices && offices.map(x=>x.region))].filter(x=>x!="")}
                
                
                value={officerRegion}
                onSelect={ (selectedItem, index) => {
                  setOfcrRegion(selectedItem);
                }}
                defaultButtonText={officerRegion}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>


          </View>
        </View>
        {/* Zone */}
        <View className={`${styles.outerview} ${posting == 'Regional Office'|| posting == 'Head Quarter' || posting == 'Training College'? 'hidden':'block'} `}>
          
          <View className={styles.labelstyle}><Text className="text-black font-bold">Zone*</Text></View>
          <View className="w-4/6 items-center">
          <View className="  z-50">
              <SelectDropdown
                data = {[...new Set(offices && offices.map(x=>x.region == officerRegion?x.zone:""))].filter(x=>x!="")}
                value={officerzone}
                onSelect={(selectedItem, index) => {
                  setOfcrzone(selectedItem);
                }}
                defaultButtonText={officerzone}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>


          </View>
        </View>

        {/* Sector */}
        <View className={`${styles.outerview} ${posting == 'Sector Office'|| posting == 'Lines HQs' || posting == 'Beat'? 'block':'hidden'} `}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Sector*</Text></View>
          <View className="w-4/6 items-center">
          <View className=" z-50">
              <SelectDropdown
                data = {[...new Set(offices && offices.map(x=>x.zone == officerzone?x.sector:""))].filter(x=>x!="")}
                value={officersector}
                onSelect={(selectedItem, index) => {
                  setOfcrsector(selectedItem);              
                }}
                defaultButtonText={officersector}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>
          </View>
        </View>

        {/* Beat */}
      <View className={`${styles.outerview} ${posting !='Beat'? 'hidden':'block'} `}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Beat*</Text></View>
          <View className="w-4/6 items-center">
          <View className=" m-1  z-50">
              <SelectDropdown
                data = {[...new Set(offices && offices.map(x=>x.sector == officersector?x.beat:""))].filter(x=>x!="")}
                value={officerbeat}
                onSelect={(selectedItem, index) => {
                  setOfcrbeat(selectedItem);
                 
                }}
                defaultButtonText={officerbeat}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>
          </View>
        </View>

       

         {/* Buttons Save - Clear -Update */}
         <View className="flex-row items-center justify-center ">
              <View className=" ">
                <TouchableOpacity onPress= {()=>saveUser()} className="bg-[#227935]  px-8 py-2 rounded-md m-2">
                  <Text className="text-white  text-lg">Save</Text>
                </TouchableOpacity>
              </View>

{/* 
              <View className="">
                <TouchableOpacity className="bg-[#29378a] px-7 py-2 rounded-md m-2">
                  <Text className="text-white  text-lg">Update</Text>
                </TouchableOpacity>
              </View> */}
              <View className="">
                <TouchableOpacity onPress={()=>clearAll()} className="bg-[#a54932] px-8 py-2 rounded-md m-2">
                  <Text className="text-white text-lg">Clear</Text>
                </TouchableOpacity>
              </View>
             


            </View>

         {/* Modal */}
   <View className=" bg-[#e6ecf1ee]  flex-1 justify-center items-center ">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
      
      
      <View className="bg-[#1c5685ee]  h-full w-full justify-center items-center flex">    
       
       <View className="bg-white  w-10/12 h-2/6 rounded-md justify-center items-center align-middle shadow-black ">
              
                <Text className="text-black text-lg p-2"> Please confirm are you employee of NHMP</Text>
                <TextInput
                    
                    placeholder=' Entery your CNIC'
                    value={officercnic}
                    onChangeText={e => setOfcrcnic(e)}
                    placeholderTextColor='grey'
                    keyboardType='numeric'
                    maxLength={13}
                    
                    className='  text-lg  border-b w-8/12 rounded-md   border-blue-400 text-black   ' />
                
                <View className=" flex flex-row gap-2 p-4 mt-5 ">
                <TouchableOpacity
                        onPress={()=>navigation.navigate('Login')}
                        className="bg-red-600 p-2 rounded-md w-4/12 justify-center items-center">
                                <Text className="text-white">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        // onPress={()=>setModalVisible(!modalVisible)}
                        onPress={()=>verifyUser()}
                        className="bg-green-600 p-2 rounded-md w-4/12 justify-center items-center">
                                <Text className="text-white">Confirm</Text>
                        </TouchableOpacity>

                        </View>        
                </View>
      
      </View>
      </Modal>  
    </View>      

      </KeyboardAvoidingView>
    </View>
  </ScrollView>
  );
};


export default SignUp;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
    labelstyle:
    'text-center items-center justify-center w-2/6  bg-blue-200 border-r border-blue-400 rounded-md   ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md shadow-blue-900'
};