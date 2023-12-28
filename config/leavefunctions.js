
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

//---------------------------------------------getting account request 
const  getSectorWiseLeaveRequests = async (user, setter)=>{
  const session = await EncryptedStorage.getItem('user_session');

  if (session !== undefined) {
    const auth =JSON.parse(session)
if(user){


 await axios.post(`${global.BASE_URL}/leave/getLeaveRequests`,
  {
    "officeType":"sector",
    "office":user.sector
  },
  { 
    headers:{
      api_key :global.KEY,
      Authorization:auth.token
     }
  }).then(
    response=>setter(response.data)
  
    
  )
}}
}






  export {
  applyLeave,
  updateLeaveStatus,
  getSectorWiseLeaveRequests
  }