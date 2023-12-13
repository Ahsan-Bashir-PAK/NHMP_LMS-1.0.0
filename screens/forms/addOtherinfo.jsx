import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Calendar, CheckSquare, Square, Info} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import '../../config';


const AddOtherInfo = ({route}) => {

  const navigation = useNavigation();

  
  const today = new Date()
  const time = new Date().toLocaleTimeString()


  // Tyre Manufacturing Date
  const [numberplate, setnumberPlate] = useState(false);
  const [sidemirror, setsideMirror] = useState(false);
  const [frontwipers, setfrontWipers] = useState(false);
  const [fireext, setfireExt] = useState(false);

  // Fire Ext Date Calendar
  const [fireextdate, setDate] = useState(new Date());
  const [fireextopen, setOpen] = useState(false);

  const [firstaid, setfirstAid] = useState(false);
  const [zeroseat, setzeroSeat] = useState(false);
  const [cones, setCones] = useState(false);

  //getting value from sesssons
  const [currentPsv, setCurrentPsv] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [psvreport , setPsvReportData] = useState("");

  
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
    if(route.params["params"] == "report"){
      retrieveReportSession()
    }
  }
},[])

///================================retriving Data

async function showReportData (psvReportData){
  setnumberPlate(psvReportData.regPlates);
  setsideMirror(psvReportData.sideMirror);
  setfrontWipers(psvReportData.frontWippers);
  setfireExt(psvReportData.fireExt);
  setDate(new Date(psvReportData.fireExpiry))
  setfirstAid(psvReportData.firstAidBox);
  setzeroSeat(psvReportData.zeroSeat);
  setCones(psvReportData.cones);

}

async function clearPsvSession() {
  try {
    await EncryptedStorage.removeItem('psv_session');
    setCurrentPsv("");
  } catch (error) {
    console.log(error)
  }
}

  //---------------------------------

  function clearAll() {
    setnumberPlate('');
    setsideMirror('');
    setfrontWipers('');
    setfireExt('');
    setfirstAid('');
    setzeroSeat('');
    setCones('');

  }
//
  //===============getting report data

  async function retrieveReportSession() {
    try {
      const session = await EncryptedStorage.getItem('Report');

      if (session !== undefined) {
      
        const data = JSON.parse(session).psvData; //data of vehicle
        showReportData(data)
       
      }
    } catch (error) {
      // There was an error on the native side
    }
  }


  //getting user seesion data
  async function retrieveVehicleSession() {
    try {
      const session = await EncryptedStorage.getItem('psv_session');
      if (session !== undefined) {
        setCurrentPsv(JSON.parse(session));
      }
    } catch (error) {
      // There was an error on the native side
    }
  }
  //===============================================================getting user seesion data
  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      if (session !== undefined) {
        //  setCurrentUser(session)
        setCurrentUser(JSON.parse(session));
      }
    } catch (error) {
      // There was an error on the native side
    }
  }

  //========================================================save and update psv document

  const PsvOthers = {
    regPlates: numberplate,
    sideMirror: sidemirror,
    frontWippers: frontwipers,
    fireExt: fireext,
    fireExpiry: fireextdate,
    firstAidBox: firstaid,
    zeroSeat: zeroseat,
     cones: cones,
    formFourStatus: 1,
    editedOn: today,
    editedTime: time,
    editedBy: currentUser.userName,
    editedPoint: currentUser.location,
    eregion: currentUser.region,
    ezone: currentUser.zone,
    esector:currentUser.sector,
    ebeat:currentUser.beat
  };

  const updatePvsOthers = async () => {
    // if(route.params){
    //   if(route.params["params"] == "report"){

    //   }}
   // console.log(PsvOthers)
    axios
      .patch(
        `${global.BASE_URL}/psv/updatePsvOthers/${
          currentPsv.psvLetter + currentPsv.psvModal + currentPsv.psvNumber
        }`,
        PsvOthers,
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

        Alert.alert('PSV complete record added.');

         clearPsvSession();
         navigation.navigate('Home')
        }
      
      clearAll();
     
     
    })

    
      .catch(error => console.error(error));
  };
  //==================================================
  return (
    <ScrollView className=" ">
      <View className="bg-slate-100  flex flex-col  justify-center   ">
        <KeyboardAvoidingView style={{backgroundColor: 'white'}}>
          {/* Other Information Tab */}
          <View className=" w-full h-screen mt-5 P-3 ">
            <View className=" bg-[#facc15]  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">
                {' '}
                Other Information
              </Text>
              {/* <Navigation stroke="black" size={40}></Navigation> */}
              <Info stroke="#29378a" size={30} fill="#facc15" />
            </View>

            <View className="  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-sm rounded-md font-bold ">
              {currentPsv != null ? currentPsv.psvLetter + "-" + currentPsv.psvModal +"-" + currentPsv.psvNumber : ""}
              </Text>
            </View>

            <View className=" mt-1 w-full  ">
              {/*  */}
              <View className=" flex  justify-around  p-1">
                <View className={styles.outerview}>
                  <TouchableOpacity
                    onPress={() =>
                      numberplate == ''
                        ? setnumberPlate('1')
                        : setnumberPlate('')
                    }
                    className={`p-2 flex-row gap-1 text-center items-center`}>
                    <Square
                      stroke="black"
                      className={`${numberplate == '' ? 'block' : 'hidden'}`}
                    />
                    <CheckSquare
                      stroke="black"
                      className={`${
                        numberplate == '' ? 'hidden' : 'block'
                      }`}></CheckSquare>
                    <Text className="text-black font-bold">
                      Registeration Number Plate as per pattern
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className={styles.outerview}>
                  <TouchableOpacity
                    onPress={() =>
                      sidemirror == ''
                        ? setsideMirror('1')
                        : setsideMirror('')
                    }
                    className={`p-2 flex-row gap-1 text-center items-center`}>
                    <Square
                      stroke="black"
                      className={`${sidemirror == '' ? 'block' : 'hidden'}`}
                    />
                    <CheckSquare
                      stroke="black"
                      className={`${
                        sidemirror == '' ? 'hidden' : 'block'
                      }`}></CheckSquare>
                    <Text className="text-black font-bold">
                      Side View Mirros
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className={styles.outerview}>
                  <TouchableOpacity
                    onPress={() =>
                      frontwipers == ''
                        ? setfrontWipers('1')
                        : setfrontWipers('')
                    }
                    className={`p-2 flex-row gap-1 text-center items-center`}>
                    <Square
                      stroke="black"
                      className={`${frontwipers == '' ? 'block' : 'hidden'}`}
                    />
                    <CheckSquare
                      stroke="black"
                      className={`${
                        frontwipers == '' ? 'hidden' : 'block'
                      }`}></CheckSquare>
                    <Text className="text-black font-bold">
                      Front Side Wipers
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className={styles.outerview}>
                  <TouchableOpacity
                    onPress={() =>
                      fireext == '' ? setfireExt('1') : setfireExt('')
                    }
                    className={`p-2 flex-row gap-1 text-center items-center`}>
                    <Square
                      stroke="black"
                      className={`${fireext == '' ? 'block' : 'hidden'}`}
                    />
                    <CheckSquare
                      stroke="black"
                      className={`${
                        fireext == '' ? 'hidden' : 'block'
                      }`}></CheckSquare>
                    <Text className="text-black font-bold">
                      Fire Extinguisher
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/*Date Of Expiry Fire Extinguisher*/}
              <View className={styles.outerview}>
                <View className={styles.labelstyle}>
                  <Text className="text-black font-bold"> Expiry Date</Text>
                </View>
                <View className="w-4/6 items-center">
                  <View className="flex flex-row gap-1">
                    <DatePicker
                      modal
                      mode="date"
                      open={fireextopen}
                      date={fireextdate}
                      onConfirm={value => {
                        setOpen(false);
                        setDate(value);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />

                    <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
                      {fireextdate.toLocaleDateString()}
                    </Text> 
                    <TouchableOpacity onPress={() => setOpen(true)}>
                      <Calendar
                        stroke="black"
                        fill="white"
                        size={30}></Calendar>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* First Aid Box*/}
              <View className={styles.outerview}>
                <TouchableOpacity
                  onPress={() =>
                    firstaid == '' ? setfirstAid('1') : setfirstAid('')
                  }
                  className={`p-2 flex-row gap-1 text-center items-center`}>
                  <Square
                    stroke="black"
                    className={`${firstaid == '' ? 'block' : 'hidden'}`}
                  />
                  <CheckSquare
                    stroke="black"
                    className={`${
                      firstaid == '' ? 'hidden' : 'block'
                    }`}></CheckSquare>
                  <Text className="text-black font-bold">First Aid Box</Text>
                </TouchableOpacity>
              </View>

              {/* Zero Seat */}
              <View className={styles.outerview}>
                <TouchableOpacity
                  onPress={() =>
                    zeroseat == '' ? setzeroSeat('1') : setzeroSeat('')
                  }
                  className={`p-2 flex-row gap-1 text-center items-center`}>
                  <Square
                    stroke="black"
                    className={`${zeroseat == '' ? 'block' : 'hidden'}`}
                  />
                  <CheckSquare
                    stroke="black"
                    className={`${
                      zeroseat == '' ? 'hidden' : 'block'
                    }`}></CheckSquare>
                  <Text className="text-black font-bold">Zero Seat</Text>
                </TouchableOpacity>
              </View>

              {/* Safety Cones */}
              <View className={styles.outerview}>
                <TouchableOpacity
                  onPress={() =>
                    cones == '' ? setCones('1') : setCones('')
                  }
                  className={`p-2 flex-row gap-1 text-center items-center`}>
                  <Square
                    stroke="black"
                    className={`${cones == '' ? 'block' : 'hidden'}`}
                  />
                  <CheckSquare
                    stroke="black"
                    className={`${
                      cones == '' ? 'hidden' : 'block'
                    }`}></CheckSquare>
                  <Text className="text-black font-bold">Cones</Text>
                </TouchableOpacity>
              </View>

              {/* Buttons Save - Clear -Update */}
              <View className="flex-row items-center justify-center ">
                <View className=" ">
                  <TouchableOpacity
                    onPress={() => updatePvsOthers()}
                    className="bg-[#227935]  px-8 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>

                <View className="">
                  <TouchableOpacity
                    onPress={() => clearAll()}
                    className="bg-[#60a532] px-8 py-2 rounded-md m-2">
                    <Text className="text-white text-lg">Clear</Text>
                  </TouchableOpacity>
                </View>

                {/* <View className="">
                  <TouchableOpacity
                    onPress={() => updatePvsOthers()}
                    className="bg-[#29378a] px-7 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Update</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default AddOtherInfo;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
  labelstyle:
    'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
  outerview:
    'flex flex-row border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900 p-2 ',
};
