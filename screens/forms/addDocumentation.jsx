import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BusFront, Scroll, User, FileText, Navigation,ArrowUpRightSquare, Calendar  } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { Bus } from 'lucide-react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';







const AddDocumentation = ({route}) => {

  const navigation = useNavigation();

 
  const today = new Date()
  const time = new Date().toLocaleTimeString()

// vehicle documentation States
const [vroute, setRoute] = useState("");
const [issue_Authority, setRouteAuthority] = useState("");
// Route Expiry Date
const [routedate, setRouteDate] = useState(new Date())
const [routeopen, setRouteOpen] = useState(false)

// Route Type
const select_route_type = ["Temporary", "Permanent", "No-Route"]
const [route_type, setRouteType] = useState("");

const [route_from, setRouteFrom] = useState("");
const [route_to, setRouteTo] = useState("");
const [route_via, setRouteVia] = useState("");
const [fitnessno, setFitness] = useState("");
//  fitness expriry

const [fitnessdate, setFDate] = useState(new Date())
const [fitnessopen, setFOpen] = useState(false)

//const [fitness_auth, setFitAuthority] = useState("");
const [fitness_auth, setFitAuthority] = useState("");


const [currentPsv,setCurrentPsv] = useState({})
const [currentUser,setCurrentUser] = useState({})

//
const [psvreport , setPsvReportData] = useState("");
const [vehicleNo,setVehicleNo] =useState()

const [noroute, setNoRoute] = useState("")


// SET DATA INTO FIELDS
function setData (psvreport) {
      setRoute(psvreport.routePermitNo);
      setRouteAuthority (psvreport.issueAuthority);
      //setexpir ("");
      setRouteType(psvreport.routeType);
      setRouteDate(new Date(psvreport.routeExpiryDate));
      setRouteFrom(psvreport.routeFrom);
      setRouteTo(psvreport.routeTo);
      setRouteVia(psvreport.routeVia);
      setFitness(psvreport.fitnessNo);
      //fitness expiry
      setFDate(new Date (psvreport.fitnessExpiryDate))
      setFitAuthority(psvreport.fitnessAuthority);

}

  //===============getting report data

  async function retrieveReportSession() {
    try {
      const session = await EncryptedStorage.getItem('Report');

      if (session !== undefined) {
       
        Data1 = JSON.parse(session).psvData; //data of vehicle

        setData(Data1);
      
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

  //===============================================================getting user seesion data 
async function retrieveUserSession() {
  try {   
      const session = await EncryptedStorage.getItem("user_session");
      if (session !== undefined) {
        //console.log(JSON.parse(session))
        setCurrentUser(JSON.parse(session)) 
        
      }
  } catch (error) {
      // There was an error on the native side
  }
}
  //getting user seesion data 
  async function retrieveVehicleSession() {
    try {   
        const session = await EncryptedStorage.getItem("psv_session");
        //console.log("session=========",session)
        if (session !== undefined) {
          const sessiondata = JSON.parse(session)
          setCurrentPsv(sessiondata)
        }
    } catch (error) {
        // There was an error on the native side
    }
  }

  async function vehicleno (){
    const vehicle = currentPsv.psvLetter + "-" + currentPsv.psvModal +"-" + currentPsv.psvNumber
    setVehicleNo(vehicle)
  }

//=============================================== clear 
  function clearAll() {
      setRoute("");
      setRouteAuthority ("");
      setRouteDate(new Date());
      setRouteType("");
      setRouteFrom("");
      setRouteTo("");
      setRouteVia("");
      setFitness("");
      setFDate(new Date());
      setFitAuthority("");
  }

  //========================================================save and update psv document
   
  const PsvDocuments = {
    routePermitNo: vroute,
    issueAuthority: issue_Authority,
    routeExpiryDate: routedate,
    routeType: route_type,
    routeFrom: route_from,
    routeTo: route_to,
    routeVia: route_via,
    fitnessNo: fitnessno,
    fitnessExpiryDate: fitnessdate,
    fitnessAuthority:fitness_auth,
    formTwoStatus: 1,
    editedOn: today,
    editedTime: time,
    editedBy: currentUser.userName,
    editedPoint: currentUser.location,
    eregion: currentUser.region,
    ezone: currentUser.zone,
    esector:currentUser.sector,
    ebeat:currentUser.beat
  };
  
  
  const updatePsvDocs =async ()=>{
        
        if(route_type !="No-Route") {
            if(vroute == "") { Alert.alert("Please enter Route Number.") }
              else if(issue_Authority== "") {Alert.alert("Please enter Route Issuing Authority")}
              else if(fitnessno == "") {Alert.alert("Please enter Fitness Certificate No.")}
              else if(fitness_auth== "") {Alert.alert("Please enter Fitness Issuing Authority") } 
                  else { AddDocs() }
        } else {
              if (route_type == "No-Route" && fitnessno == "") {

                   Alert.alert("Please enter Fitness Certificate No.") }
                else if(fitness_auth == "") {Alert.alert("Please enter Fitness Issuing Authority")}
                     else { AddDocs()}
             
           }
          
              
 function AddDocs() {      
    try {
      
   
    axios.patch(`${global.BASE_URL}/psv/updatePsvDocs/${currentPsv.psvLetter+currentPsv.psvModal+currentPsv.psvNumber}`, PsvDocuments
    )
    .then(response =>{
      if(route.params){
        if(route.params["params"] == "report"){
       
        Alert.alert('Data updated', ' ', [
         
          {text: 'Back to Report', onPress: () =>  navigation.navigate("Trip Report")},
        ]);
        
       
       }
     }else{
      Alert.alert('PSV Documents Record added.', ' ', [
         
        {text: 'Next', onPress: () =>  navigation.navigate("Add Condition")},
      ]);
        
        }

    }
      
      )
   

    clearAll() 
  }
     catch (error) {
      console.log(error)
    }
  }   
} 
  

//-============================================ returnin UI
  return (
     <ScrollView>
      <View className="bg-slate-100  flex flex-col  ">
        <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
          {/* Vehicle Information Design Tab */}
          <View className=" mt-1 w-full  ">

            <View className=" bg-yellow-400  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">Route- Permit </Text>
              {/* <Navigation stroke="black" size={40}></Navigation> */}
              <ArrowUpRightSquare   stroke="black" size={30}></ArrowUpRightSquare  >
            </View>

            <View className=" bg-zinc-200  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold  ">
           
              {currentPsv != null ? currentPsv.psvLetter + "-" + currentPsv.psvModal +"-" + currentPsv.psvNumber : ""}
            
                </Text>
              
            </View>

           
            {/* Route Type*/}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Route Type*</Text>
              </View>
              <View className="w-4/6 items-center ">
              <View className=" items-center">
                
              <SelectDropdown
                className="bg-white border"
                data= {select_route_type}
                onSelect={(selectedItem, index) => {
                  setRouteType(selectedItem)
                  setNoRoute(selectedItem)
                }}
                defaultButtonText={route_type}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}
                />
                </View>
            </View>
            </View>


            {/*  Route Permit Number className={`${noroute == " " ?"hidden":"block"}`}*/}
             <View  className={`${noroute == "No-Route" ?"hidden":"block"}`}>   
            <View className={styles.outerview} >
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Rout Permit No.*</Text>
              </View>
              <View className=" w-4/6  items-center">
                <TextInput
                  
                  placeholderTextColor={'grey'}
                  placeholder='Route Permit No.'
                  maxLength={50}
                  onChangeText={e => setRoute(e)}
                  value={vroute}
                  className=' border-black text-black rounded-md  text-lg' />

              </View>
            </View>
           
            {/* Issuing Authority */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Issuing Authority*</Text>
              </View>
              <View className="w-4/6 items-center">
              <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='Authority'
                  maxLength={100}
                  onChangeText={e => setRouteAuthority(e)}
                  value={issue_Authority}
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>

            {/* Expiry Date */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Expiry Date</Text></View>
              <View className="w-4/6 items-center">
              <View className="flex flex-row gap-1">
            
            <DatePicker
              
              modal
              mode="date"
              open={routeopen}
              date={routedate}
              onConfirm={value => {
                setRouteOpen(false);
                setRouteDate(value);
              }}
              onCancel={() => {
                setRouteOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {routedate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setRouteOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
              


              </View>
            </View>

            {/* Route From */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Route From</Text></View>
              <View className="w-4/6 items-center">
              <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='from [Lahore]'
                  maxLength={100}
                  onChangeText={e => setRouteFrom(e)}
                  value={route_from}
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>
            
            {/* Route To */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Route To</Text></View>
              <View className="w-4/6 items-center">
              <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='To [Sargodha]'
                  maxLength={100}
                  onChangeText={e => setRouteTo(e)}
                  value={route_to}
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>

            {/* Route Via */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Route Via</Text></View>
              <View className="w-4/6 items-center">
              <View className="w-4/6 items-center">
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='Route via [M-2]'
                  maxLength={70}
                  onChangeText={e => setRouteVia(e)}
                  value={route_via}
                  className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

              </View>
              </View>
            </View>
             </View>
              {/*end of hidden view */}
            {/* Upload Route Permit */}
            {/* <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Upload Route Permit</Text></View>
              <View className="w-4/6 items-center">
               
              </View>
            </View> */}

            {/* *******************FITNESS CERTIFICATE************************* */}

            <View className=" mt-1 w-full  ">

              <View className=" bg-yellow-400  p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
                <Text className="text-black text-lg rounded-md font-bold ">Fitness Certificate </Text>
                <FileText  stroke="black" size={30}></FileText >
              </View>

              {/* Fitness Certifcate No */}
              <View className={styles.outerview}>
                <View className={styles.labelstyle}><Text className="text-black font-bold">Fitness Certificate No.*</Text></View>
                <View className="w-4/6 items-center">
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
                <View className="flex flex-row gap-1">
            
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
                <View className="w-4/6 items-center">
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder='Authority'
                    maxLength={20}
                    onChangeText={e => setFitAuthority(e)}
                    value={fitness_auth}

                    className=' border-black text-black rounded-md  text-lg' />
                </View>
              </View>


              {/* Buttons Save - Clear -Update */}
              <View className="flex-row items-center justify-center ">
                <View className=" ">
                  <TouchableOpacity onPress={()=>updatePsvDocs()} className="bg-[#227935]  px-8 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>

              
{/* 
                <View className="">
                  <TouchableOpacity onPress={()=>updatePsvDocs()} className="bg-[#29378a] px-7 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Update</Text>
                  </TouchableOpacity>
                </View> */}

                <View className="" >
                  <TouchableOpacity onPress={()=>clearAll()} className="bg-[#a54932] px-8 py-2 rounded-md m-2">
                    <Text className="text-white text-lg">Clear</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

</View>

        </KeyboardAvoidingView>
      </View>
    </ScrollView>

    
  );

// return(
//   <View>
//     <Text>hello</Text>
//   </View>
// )
};

export default AddDocumentation;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
  labelstyle:
    'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
  outerview:
    'flex flex-row  mx-2 border border-gray-300 P-1 mb-1 rounded-md bg-white shadow-md  shadow-blue-900'
};