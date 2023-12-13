import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView,  } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { FileSymlink} from 'lucide-react-native';




const OnlineVerifications = () => {
 
      // const selectDocument = async ()=> {
      //       try {
      //       const doc = await DocumentPicker.pick({
      //             type:[DocumentPicker.types.images, DocumentPicker.types.pdf],
      //             allowMultiSelection:false
                  
      //       });
      //       console.log(doc);

      //       } catch (err) {
                  
      //       }      
      // }

      




  return (
  <ScrollView >
    <View className="bg-slate-100  flex flex-col   p-2 justify-start">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
        {/* Vehicle Information Design Tab */}
        <View className="   mt-1 w-full  ">
          
         <View className="  bg-yellow-400  rounded-md p-3  w-fit items-center justify-center flex flex-row  shadow-black shadow-lg">
            
            <Text className="text-black text-lg rounded-md font-bold ">Important Documents Verifications Links</Text>
            
        </View>

        <View className="  bg-red-600 mt-2 rounded-md p-1  w-fit items-center justify-center flex flex-row">
       
            <Text className="text-white text-lg rounded-md font-bold ">These Logins are only for official purposes.</Text>
            
        </View>
{/* Excise Vehicle Verifications TAB */}
        <View className=" border-l-gray-400 border-l-8 mt-3 bg-slate-200 rounded-md p-2  w-fit items-center justify-center flex flex-row">
            
            <Text className="text-black text-lg rounded-md font-bold ">Excise Verifications </Text>
            
        </View>
{/* Excise All provinces links */}
            <View className=" bg-slate-100 p-1 pt-2  flex flex-row justify-center ">
                <TouchableOpacity 
                className='p-2 bg-[#316879] text-center rounded-md w-4/12  ' 
                onPress={() => Linking.openURL('http://58.65.189.226:8080/ovd/API_FOR_VEH_REG_DATA/TXTMEM/LOGIN1.php')}>
                  <Text className='text-white text-center  font-bold text-lg'>Islamabad</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={()=>Linking.openURL('https://mtmis.excise.punjab.gov.pk/')}
                  className='p-2 bg-[#039fbe] text-center rounded-md w-3/12 ml-1' >
                  <Text className='text-white text-center font-bold text-lg'>Punjab</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => Linking.openURL('https://www.kpexcise.gov.pk/mvrecords/')}
                  className='p-2 bg-[#ffc13b] text-center rounded-md w-3/12 ml-1 ' >
                  <Text className='text-white text-center font-bold text-lg'>KPK</Text>
                </TouchableOpacity>
             </View>   

             <View className=" bg-slate-100 p-1 flex flex-row justify-center">   
                <TouchableOpacity onPress={()=>Linking.openURL('https://excise.gos.pk/vehicle/vehicle_search')}
                  className='p-2 bg-[#ad954b] text-center rounded-md w-4/12 ' >
                  <Text className='text-white text-center font-bold text-lg'>Sindh</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>Linking.openURL('http://gbexcise.gov.pk/vehicle-search/')}
                  className='p-2 bg-[#1e847f] text-center rounded-md w-4/12 ml-1' >
                  <Text className='text-white text-center font-bold text-lg'>GB</Text>
                </TouchableOpacity>
              </View>
              <View className="bg-slate-100 flex  flex-row  justify-center items-center text-center ">
              <TouchableOpacity onPress={()=>Linking.openURL('http://175.107.63.199/mv')}
                  className='p-2 bg-[#1e847f] text-center rounded-md w-6/12 mt-1 mb-1  items-center' >
                  <Text className='text-white text-center font-bold text-lg'>KPK Special Login</Text>
                </TouchableOpacity>
                
             
              </View>
<View className="pl-3">
{/* <Text className="text-black text-lg font-bold">For Punjab Special Login credentials</Text>
<Text className="text-black">UserName: NHMPCR</Text>
<Text className="text-black">UserPaswword: NHMPCR#93g8*kB</Text> */}
<Text className="text-black font-bold text-lg">For Islamabad Special Login credentials</Text>
<Text className="text-black">UserName: nhmp</Text>
<Text className="text-black">UserPaswword: nhmp@21</Text>
<Text className="text-black text-lg font-bold">KPK Special Login Credentials</Text>
<Text className="text-black">Username: opsm1</Text>
<Text className="text-black">Password: 1234</Text>
</View>
                  
{/* Driving Licneses Verifications */}
<View className=" mt-5 border-l-gray-400 border-l-8 bg-slate-200  rounded-md p-2  w-fit items-center justify-center flex flex-row">
            
            <Text className="text-black text-lg rounded-md font-bold ">Driving License Verifications </Text>
            
        </View>

        <View className=" bg-white p-1 pt-2 flex flex-row  justify-evenly ">
                <TouchableOpacity 
                className='p-2 bg-[#2e4092] text-center rounded-md w-4/12  ' 
                onPress={() => Linking.openURL('https://dla.nhmp.gov.pk/LicVerification.aspx')}>
                  <Text className='text-white text-center  font-bold text-lg'>NHMP</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                className='p-2 bg-[#316879] text-center rounded-md w-4/12  ' 
                onPress={() => Linking.openURL('https://ict.islamabadpolice.gov.pk:4433/verification/')}>
                  <Text className='text-white text-center  font-bold text-lg'>Islamabad</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={()=>Linking.openURL('https://dlims.punjab.gov.pk/verify/')}
                  className='p-2 bg-[#039fbe] text-center rounded-md w-3/12 ml-1' >
                  <Text className='text-white text-center font-bold text-lg'>Punjab</Text>
                </TouchableOpacity>

                
             </View>   

             <View className=" p-1 flex flex-row justify-center">   
                <TouchableOpacity onPress={()=>Linking.openURL('https://dls.gos.pk/online-verification.html')}
                  className='p-2 bg-[#ad954b] text-center rounded-md w-3/12 ' >
                  <Text className='text-white text-center font-bold text-lg'>Sindh</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>Linking.openURL('https://dlmis.gbp.gov.pk/verify/')}
                  className='p-2 bg-[#1e847f] text-center rounded-md w-3/12 ml-1' >
                  <Text className='text-white text-center font-bold text-lg'>GB</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>Linking.openURL('http://dlmajk.com/search/speciality')}
                  className='p-2 bg-[#077b8a] text-center rounded-md w-3/12 ml-1' >
                  <Text className='text-white text-center font-bold text-lg'>AJK</Text>
                </TouchableOpacity>
              </View>
              <View className=" p-1 flex flex-row justify-center">
              <TouchableOpacity 
                  onPress={() => Linking.openURL('http://www.transport.kpdata.gov.pk/')}
                  className='p-2 bg-[#ffc13b] text-center rounded-md w-3/12 ml-1 ' >
                  <Text className='text-white text-center font-bold text-lg'>KPK</Text>
                </TouchableOpacity>
              </View>


{/* Driving Licneses Verifications */}
<View className=" mt-5 border-l-gray-400 border-l-8 bg-slate-200  rounded-md p-2  w-fit items-center justify-center flex flex-row">
            
            <Text className="text-black text-lg rounded-md font-bold ">Vehicle Fitness Verifications</Text>
            
        </View>

        <View className=" bg-white p-2 flex flex-row justify-center ">
       
                <TouchableOpacity 
                  onPress={()=>Linking.openURL('http://52.29.248.107/VidCentral/Login.aspx')}
                  className='p-2 bg-[#039fbe] text-center rounded-md w-3/12 ml-1' >
                  <Text className='text-white text-center font-bold text-lg'>Punjab</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => Linking.openURL('http://www.transport.kpdata.gov.pk/Fitness.aspx')}
                  className='p-2 bg-[#ffc13b] text-center rounded-md w-3/12 ml-1 ' >
                  <Text className='text-white text-center font-bold text-lg'>KPK</Text>
                </TouchableOpacity>
             </View>   

  


             

             {/* user Name & Passowrds */}
             <View className=" pl-2">
                        <Text className="text-black text-lg font-bold">Punjab Vehicle Fitness Login credentials</Text>
                     
                      <Text className="text-black">Username : tcc.m3 </Text>
                      <Text className="text-black">Pwd: tm4862 </Text>
            </View>

                 {/* National Repository */}
                 <View className=" p-2">
                        <Text className="text-black text-lg font-bold">National Driving License Repository (NDLR)</Text>
                        {/* <Text></Text> */}
                        <TouchableOpacity onPress={() => Linking.openURL('https://nrdla.punjab.gov.pk/')}>
                        <Text style={{color: 'blue'}}>
                          NDLR, Click here </Text>
                          
                        
                      </TouchableOpacity>
                      <Text className="text-black">Username : scr.m3.nhmp </Text>
                      <Text className="text-black">Pwd: Tccm3@rajana </Text>
            </View>






                    {/* Important Note
                    <View className="border bg-slate-200 p-2">
                        
                        <Text className="text-red-800 text-lg font-bold">* Note: All login credentials for official purpose only.</Text>
                        
                     
                    </View> */}
            
        </View>

        
       
          

      </KeyboardAvoidingView>
    </View>
  </ScrollView>
);
};

export default OnlineVerifications;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
    labelstyle:
    'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
     outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'
};