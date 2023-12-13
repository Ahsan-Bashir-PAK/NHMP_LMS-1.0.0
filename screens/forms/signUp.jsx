import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch, Alert, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { User, Calendar } from 'lucide-react-native';
import '../../config'



import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { verifyDuplicateUser } from '../../config/functions';





let ranks = ["CPO" ,"SPO" ,"PO", "APO", "JPO", "ACP","UDC","LDC","PG"];  
 





const SignUp = () => {

 

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
// const [officerappt, setOfcrappt] = useState("");

//=======================================================office satates 
const [officerRegion, setOfcrRegion] = useState("");
const [officerzone, setOfcrzone] = useState("");
const [officersector, setOfcrsector] = useState("");
const [officerbeat, setOfcrbeat] = useState("");

//=================overall offices
const[regions,setRegions] = useState("")
const[zones,setZones] = useState("")
const[sectors,setSectors] = useState("")
const[beats,setbeats] = useState("")


  // Appointment DAte
  const [dobopen, setdobOpen] = useState(false)
  const [dobdate, setdobDate] = useState(new Date())
//============================================================
// const [officerrole, setOfcrrole] = useState("");
//================================================================ function to get offices data 
const getRegion = async () => {
  
  await axios.get(`${global.BASE_URL}/ofc/region`).then(async response => {
    const region = response.data;
    const regions = []
    if (region) {
      region.map( item=>{
        regions.push(item.region)
      }) 
      setRegions(regions)
     
    }
  });
};
const Zones =[]
//=============================================================get zone 
const getZone = async (region) => {
  
  await axios.get(`${global.BASE_URL}/ofc/zone/${region}`).then(async response => {
    const zone = response.data;
   const data =[]
    if (zone) {
      zone.map( item=>{
        data.push(item.zone)
      }) 
      setZones(data)
    }
   
  });
};
//=============================================================get sectors
const getSector = async (zone) => {
 
  await axios.get(`${global.BASE_URL}/ofc/sector/${zone}`).then(async response => {
    const sector = response.data;
   const data =[]
    if (sector) {
      
      sector.map( item=>{
        data.push(item.sector)
      }) 
      setSectors(data)
     
    }
   
  });
};
//=============================================================get sectors
const getBeat = async (sector) => {
  
  await axios.get(`${global.BASE_URL}/ofc/beat/${sector}`).then(async response => {
    const beat = response.data;
   const data =[]
    if (beat) {
      beat.map( item=>{
        data.push(item.beat)
      }) 
      setbeats(data)
    }
   
  });
};

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
  // setOfcrrole("")
  
  
}


const user ={
  userCnic:officercnic,
  userName:officername,
  userPwd:officerpwd,
  cellNo :officercell ,
  rank:officerrank,
  beltNo:officerbelt,
  // role:officerrole,
  status:"Active",
  beatId :officerbeat ,
  sectorId: officersector,
  zoneId:officerzone,
  region:officerRegion

}

//------------------------save user
const saveUser = async () => {
  if(officercnic && officerbelt && officercell && officername && officerpwd && officerrank && officersector &&  officerRegion && officerzone && officerbeat ) {
      await fetch(`${global.BASE_URL}/users/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }) 
        .then(response => {
          if (response.ok) {
            Alert.alert('User created successfully');
            clearAll();
          } else {
            Alert.alert('User already Exists');
          }
  
        })
  
        .catch(error => {
          Alert.alert(error);
        });
      } else { Alert.alert("Note: Please Fill All Fields");}
      }
useEffect(()=>{
  getRegion()
},[regions])
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
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>

        {/* Rank*/}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Rank*</Text></View>
          <View className="w-4/6 items-center ">
          <View className="   z-50">
              <SelectDropdown
                data= {ranks}
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

          {/* Appointment Date*/}
      <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Appointment Date*</Text></View>
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

        {/* Region */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Region*</Text></View>
          <View className="w-4/6 items-center">
          <View className="  z-50">
              <SelectDropdown
                data= {regions}
                value={officerRegion}
                onSelect={ (selectedItem, index) => {
                  
                  setOfcrRegion(selectedItem);
                 getZone(selectedItem)
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
        <View className={styles.outerview}>
          
          <View className={styles.labelstyle}><Text className="text-black font-bold">Zone*</Text></View>
          <View className="w-4/6 items-center">
          <View className="  z-50">
              <SelectDropdown
                data= {zones}
                value={officerzone}
                onSelect={(selectedItem, index) => {
                  setOfcrzone(selectedItem);
                  getSector(selectedItem)
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
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Sector*</Text></View>
          <View className="w-4/6 items-center">
          <View className=" z-50">
              <SelectDropdown
                data= {sectors}
                value={officersector}
                onSelect={(selectedItem, index) => {
                  setOfcrsector(selectedItem);
                  getBeat(selectedItem)
                 

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
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Beat*</Text></View>
          <View className="w-4/6 items-center">
          <View className=" m-1  z-50">
              <SelectDropdown
                data= {beats}
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
        {/* <View style={styles.centeredView} className="bg-white w-full h-screen  flex-1 justify-center items-center absolute">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
      
      </Modal>
      <View className="bg-blue-300 border h-full w-full justify-center items-center flex">    
      
              
                <Text className="font-bold text-lg"> Please Confirm Are you employee of NHMP</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholder=' Entery your CNIC'
                    value=""
                    onChangeText={e => setPwd(e)}
                    placeholderTextColor='grey'
                    
                    className='  text-lg  w-8/12 rounded-md  bg-white border-blue-400 text-black   ' />
                
                <View className=" flex flex-row p-4 mt-5 ">
                        <TouchableOpacity 
                        onPress={()=>setModalVisible(true)}
                        className="bg-green-600 p-2 rounded-md w-32 justify-center items-center">
                                <Text className="text-white">Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>setModalVisible(!modalVisible)}
                        className="bg-red-600 p-2 rounded-md w-32 justify-center items-center">
                                <Text className="text-white">Cancel</Text>
                        </TouchableOpacity>
                </View>
        </View>
    </View>      */}

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