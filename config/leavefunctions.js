
import axios from "axios";
import { User } from "lucide-react-native";
import EncryptedStorage from "react-native-encrypted-storage/";
import { Alert } from "react-native";






//============================user retriving session


//----------------------------------------------------approve user request 

async function applyLeave(leave_req,fn) {

    try {
      const session = await EncryptedStorage.getItem('user_session');
  
      if (session !== undefined) {
        const usertoken =JSON.parse(session)
  
        axios.post(`${global.BASE_URL}/leave/saveLeaveReq`,
        leave_req,
        {
          headers:{
            api_key:global.KEY,
            authorization:usertoken.token
          }          
        }
        ).then(
     
            respone=>{
 
              if (respone.data == "Leave Applied (In Review)"){
                Alert.alert("Submitted","Your leave application is under process",[
                  {text: 'Ok', onPress:fn}
                ])
              }
              else{
                Alert.alert("Network Error")
              }
            }           
        )
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  //======================================================update leave status 
  async function updateLeaveStatus(data,fn) {
  
    try {
      const session = await EncryptedStorage.getItem('user_session');
  
      if (session !== undefined) {
        const usertoken =JSON.parse(session)
  
        axios.post(`${global.BASE_URL}/leave/handleLeaveStatus`,
        data,
        {
          headers:{
            api_key:global.KEY,
            authorization:usertoken.token
          }          
        }
        ).then(

          response=>{
            if (response.data == "Leave status updated" ){
              Alert.alert("✔️"," The application is forwarded",[
                {text:"Ok", onPress:fn}
              ])
              
            }else{
              Alert.alert("Network Error")
            }
          }
            
        )
       
      }
    } catch (error) {
      console.log(error);
    }
  }

//=====================================================================save leave ledger 
async function saveApproval(data,fn) {
  
  try {
    const session = await EncryptedStorage.getItem('user_session');

    if (session !== undefined) {
      const usertoken =JSON.parse(session)

      axios.post(`${global.BASE_URL}/leave/handleLeaveStatus`,
      data,
      {
        headers:{
          api_key:global.KEY,
          authorization:usertoken.token
        }          
      }
      ).then(

        response=>{
          if (response.data == "Leave status updated" ){
            console.log("Status updated ")
            
          }else{
            Alert.alert("Network Error")
          }
        }
          
      )

      axios.post(`${global.BASE_URL}/leave/saveApprovedLeave`,
      data,
      {
        headers:{
          api_key:global.KEY,
          authorization:usertoken.token
        }          
      }
      ).then(

        response=>{
          if (response.data == "Leave added in Ledger" ){
            Alert.alert("✔️"," Leave Approved",[
              {text:"Ok", onPress:fn}
            ])
            
          }else{
            Alert.alert("Network Error")
          }
        }
          
      )
     
    }
  } catch (error) {
    console.log(error);
  }
}


//---------------------------------------------getting account request 
const  getLeaveRequests = async (user, setter,data)=>{
  const session = await EncryptedStorage.getItem('user_session');

  if (session !== undefined) {
    const auth =JSON.parse(session)
if(user){


 await axios.post(`${global.BASE_URL}/leave/getLeaveRequests`,
  data,
  { 
    headers:{
      api_key :global.KEY,
      Authorization:auth.token
     }
  }).then(
    
    response=>{
    
      setter(response.data)
     
    }
  
    
  )
}}
}


//-------------------------------------------------get personal leave status
const PersonalLeaveStatus = async (user, setter,data)=>{
  const session = await EncryptedStorage.getItem('user_session');

  if (session !== undefined) {
    const auth =JSON.parse(session)
if(user){


 await axios.post(`${global.BASE_URL}/leave/getPersonalLeaveStatus`,
  data,
  { 
    headers:{
      api_key :global.KEY,
      Authorization:auth.token
     }
  }).then(
    
    response=>{
    
      setter(response.data)
     
    }
  
    
  )
}}
}





  export {
  applyLeave,
  updateLeaveStatus,
  saveApproval,
  getLeaveRequests,
  PersonalLeaveStatus
  }