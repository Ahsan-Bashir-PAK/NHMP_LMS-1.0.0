
import axios from "axios";
import { User } from "lucide-react-native";
import EncryptedStorage from "react-native-encrypted-storage/";
import { Alert } from "react-native";




//=====================================Verify user token


//============================user retriving session
async function retrieveUserSession(valueSetter) {
   
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== undefined) {
        const user =JSON.parse(session)

        axios.post(`${global.BASE_URL}/spy/verifyUser`,
        user,
        {
          headers:{
            api_key:global.KEY,
            authorization:user.token
          }          
        }
        ).then(
          response=>{
           valueSetter(response.data)
          }
        )
        // valueSetter(JSON.parse(session));
      }
    } catch (error) {
      console.log(error);
    }
}

//===========================================vehcle storage session
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
        console.log(error)
    }
}
//=======================================================
async function storeDriverSession(cnic) {

  try {
      await EncryptedStorage.setItem(
          "driver_session",
          JSON.stringify({
              dvrCnic :cnic ,
          })
            
      );
  } catch (error) {
      console.log(error)
  }
}

//==========================================================
async function retrieveDriverSession(setter) {
  try {
    const session = await EncryptedStorage.getItem('driver_session');
    if (session !== undefined) {
      setter(JSON.parse(session));
    }
  } catch (error) {
    console.log(error)
  }
}
//=============================================retrive vehicle
async function retrieveVehicleSession(setter) {
    try {
      const session = await EncryptedStorage.getItem('psv_session');
      if (session !== undefined) {
        setter(JSON.parse(session));
      }
    } catch (error) {
      console.log(error)
    }
  }

  //===================================================================check user

  const verifyDuplicateUser =(user,func)=>{
    axios.get(`${global.BASE_URL}/users/getUser/${user}`).then(
      async response=>{
        const userData = response.data
        if(userData !=""){
        
          Alert.alert("User already registered")
          func()
        }
      }
    )
  }

//===================================================================save user session
async function storeUserSession(token) {
      
  try {
       await EncryptedStorage.setItem(
           "user_session",
           JSON.stringify({token})
       );
     
   } catch (error) {
       console.log(error)
   }
}

//=====================================get data 

const getData=async (api,setter)=>{
  await axios.get(`${global.BASE_URL}/${api}`).then(
    response =>{
      const result = response.data[0]
      if (result){
        setter(result)
      }
      else{
        Alert.alert("NO Record Found")
      }
    }
  )
}

//=========================== getting user detail

const gettingUser = (userToken,auth,apiKey,setter)=>{


axios.post(`${global.BASE_URL}/spy/verifyUser`,

{
  token:userToken
   
  },

  {
   headers:{
   api_key :apiKey,
   authorization: auth
  }

}
  
 ).then(
   function (response){
    setter(response.data)
   }
 )

}

//----------------------------------------------------approve user request 
async function userApproval(user,id) {
   
  try {
    const session = await EncryptedStorage.getItem('user_session');

    if (session !== undefined) {
      const usertoken =JSON.parse(session)

      axios.post(`${global.BASE_URL}/users/saveUser`,
      user,
      {
        headers:{
          api_key:global.KEY,
          authorization:usertoken.token
        }          
      }
      ).then(

        axios.patch(`${global.BASE_URL}/sign/updateSignup/${id}`,
       { status :'Approved'},
        {
          headers:{
            api_key:global.KEY,
            authorization:usertoken.token
          }          
        }
        ).then(
          Alert.alert("✅Verified","The said user is Active Now")
          )
      )
     
    }
  } catch (error) {
    console.log(error);
  }
}


///------------------------max id 

const get_max_id = async (table,field)=>{

  const response = await axios.get(`${global.BASE_URL}/gen/get_max_id/${table}/${field}`)
 return response.data.maxId
}

//---------------------------------------------getting account request 
const  getSectorAccountRequests = async (currentUser,setter)=>{
  const session = await EncryptedStorage.getItem('user_session');

  if (session !== undefined) {
    const auth =JSON.parse(session)

  await axios.post(`${global.BASE_URL}/sign/accountRequests`,
  {
    "officeType":"sector",
    "office":currentUser.sector
  },
  { 
    headers:{
      api_key :global.KEY,
      Authorization:auth.token
     }
  }).then(
    // console.log(currentUser.sector)
    response=>setter(response.data)
  )
}
}






  export {
    retrieveUserSession,
    retrieveVehicleSession,
    storeVehicleSession,
    storeDriverSession,
    retrieveDriverSession,
    verifyDuplicateUser,
    storeUserSession,
    getData,
    getSectorAccountRequests,
    gettingUser,
    userApproval,
    get_max_id
  }