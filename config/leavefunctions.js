
import axios from "axios";
import { User } from "lucide-react-native";
import EncryptedStorage from "react-native-encrypted-storage/";
import { Alert } from "react-native";





//============================user retriving session


//----------------------------------------------------approve user request 

async function applyLeave(leave_req) {
   
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

            Alert.alert("Submitted","Your leave application is under process")
            
        )
       
      }
    } catch (error) {
      console.log(error);
    }
  }








  export {
  applyLeave
  }