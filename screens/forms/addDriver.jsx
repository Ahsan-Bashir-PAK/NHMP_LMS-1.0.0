import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import { Scroll, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Bus } from 'lucide-react-native';





const provices = [
  { label: 'NHMP', value: 'NHMP' },
  { label: 'Punjab', value: 'punjab' },
  { label: 'Sindh', value: 'sindh' },
  { label: 'KPK', value: 'kpk' },
  { label: 'Blochistan', value: 'Blochistan' },
  { label: 'Islamabad', value: 'islamabad' },
  { label: 'AJK', value: 'AJK' },
];

const licienceType = [
  { label: 'HTV', value: 'HTV' },
  { label: 'LTV', value: 'LTV' },
  { label: 'PSV', value: 'PSV' },
  { label: 'HTV / PSV', value: 'HTV /PSV' },
  { label: 'LTV / PSV', value: 'LTV /PSV' },
  { label: 'Other', value: 'Others' },

];


const AddDriver = () => {
  //-------------------------------------------dob
  const [dob, setDob] = useState(new Date());
  const [opendob, setOpenDob] = useState(false);
  //-------------------------------------------licence issue
  const [issue, setIssue] = useState(new Date());
  const [openIssue, setOpenIssue] = useState(false);
  //------------------------------------------- licience expiry
  const [expiry, setExpiry] = useState(new Date());
  const [openExpiry, setOpenExpiry] = useState(false);
  //-------------------------------------------------------
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [currentLiceince, setCurrentLiceince,] = useState(null);

  //-------------------------------------------------------
  const [LcOpen, setLcOpen] = useState(false);
  const [currentProvince, setCurrentProvince] = useState(null);
  // Search CNIC
  const [searchcnic, setSearch] = useState('');
  const [dname, dName] = useState('');
  const [dfathername, dFName] = useState('');
  const [ddob, dDob] = useState('');
  const [daddress, dAddress] = useState('');
  const [dcnic, dCnic] = useState('');
  const [dcell, dCell] = useState('');
  const [ddisability, dDisability] = useState('');
  const [dcompnay, dCompany] = useState('');
  const [dlicense, dLicense] = useState('');
  const [dltype, dLtype] = useState('');
  const [dlauthority, dlAuthority] = useState('');
  const [dlissue, dlIssue] = useState('');
  const [dlexp, dlExp] = useState('');

  // Camera Functions

  const [hascampermission, setcampermission]= useState(null);
  const [camera, setCamera]= useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] =useState(null);
   const [isPermitted, setIsPermitted] = useState(false);
  const [captureImages, setCaptureImages] = useState([]);



  function clearall() {

    setSearch('')
    dName('')
    dFName('')
    //dDob('')
    dAddress('')
    dCnic('')
    dCell('')
    dDisability('')
    dCompany('')
    dLicense('')
    dLtype('')
    dlAuthority('')
    //dlIssue('')
    // dlExp('')
  }



  return (
  <ScrollView className=" border">
    <View className="bg-slate-100  flex flex-col h-screen ">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>

        <View className="bg-slate-100 flex flex-row justify-center items-center rounded-lg shadow-lg shadow-black p-2 m-2">

          <TextInput
            value={searchcnic}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={13}
            keyboardType='numeric'
            placeholderTextColor={'grey'}
            placeholder="Enter CNIC #"
            className='w-9/12 py-1 border border-1 border-violet-400 rounded-md m-1 font-bold px-3 text-black' />
          <TouchableOpacity className="bg-[#29378a] rounded-md w-1/5 py-2 ">
            <Text className="text-center text-white font-extrabold">Search</Text>
          </TouchableOpacity>
        </View>
        {/* </View>  Driver Name*/}
        <View className="bg-slate-100 flex flex-col justify-center items-center rounded-lg shadow-lg shadow-black p-2 m-2">
          <TextInput
            value={dname}
            onChange={(e) => dName(e.target.value)}
            keyboardType='email-address'
            placeholderTextColor={'grey'}
            placeholder="Enter Driver Name"
            className={styles.inputViolet}
          />
          {/* Driver FAther Name */}
          <TextInput
            value={dfathername}
            onChange={(e) => dFName(e.target.value)}
            placeholderTextColor={'grey'}
            placeholder="Enter Father Name"
            className={styles.inputViolet}
          />
          {/* ================== d.o.b ============ */}
          <View className="flex flex-row ">
            <Text className="p-2 font-bold text-black">
              D.O.B
            </Text>
            <DatePicker
              modal
              mode="date"
              open={opendob}
              date={dob}
              onConfirm={value => {
                setOpenDob(false);
                setDob(value);
              }}
              onCancel={() => {
                setOpenDob(false);
              }}
            />

            <Text className="rounded-md border w-3/4 border-violet-400  text-black text-center font-bold p-2">
              {dob.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setOpenDob(true)}>
              <Text className="p-2 text-md bg-[#29378a] rounded-md ml-1">📅</Text>
            </TouchableOpacity>
          </View>
          

          <TextInput
            value={daddress}
            onChange={(e) => dAddress(e.target.value)}
            placeholderTextColor={'grey'} placeholder="Enter Address" className={styles.inputViolet} />
          {/* Enter CNIC */}
          <TextInput
            value={dcnic}
            onChange={(e) => dCnic(e.target.value)}
            placeholderTextColor={'grey'} keyboardType='numeric' placeholder="Enter CNIC" className={styles.inputViolet} />
          {/* Cell No */}
          <View className='flex flex-row m-1'>
            <TextInput
              value={dcell}
              onChange={(e) => dCell(e.target.value)}
              maxLength={11}
              placeholderTextColor={'grey'} keyboardType='numeric' placeholder="Cell Number" className={styles.inputVioletSmall} />
           
            {/* Disability */}
            <TextInput
              value={ddisability}
              onChange={(e) => dDisability(e.target.value)}
              placeholderTextColor={'grey'} placeholder="Disability( if any )" className={styles.inputVioletSmall} />
          </View>
          
          {/*Company Name  */}
          <View className='flex flex-row m-1'>
            <TextInput
              value={dcompnay}
              onChange={(e) => dCompany(e.target.value)}
              placeholderTextColor={'grey'} placeholder="Company Name" className={styles.inputVioletSmall} />
            {/* License No */}
            <TextInput
              value={dlicense}
              onChange={(e) => dLicense(e.target.value)}
              placeholderTextColor={'grey'} placeholder="License No." className={styles.inputVioletSmall} />
          </View>
          {/* License Type */}
          <View className='flex flex-row gap-1 z-50'>
            <View className='w-2/4 z-40'>
              <DropDownPicker

                items={licienceType}
                open={LcOpen}
                setOpen={() => setLcOpen(!LcOpen)}
                value={currentLiceince}
                setValue={val => setCurrentLiceince(val)}
                placeholder="License Type"
                placeholderStyle={{ color: 'darkgray' }}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'blue',
                  borderWidth: 1,

                }}

              />
            </View>
            {/*   */}
            {/* -------------------------------------------------issue date */}
            {/* Provinces list */}
            <View className=' w-2/4 z-50'>

              <DropDownPicker

                items={provices}
                open={provinceOpen}
                setOpen={() => setProvinceOpen(!provinceOpen)}
                value={currentProvince}
                setValue={val => setCurrentProvince(val)}
                placeholder="Issuing Authority"
                placeholderStyle={{ color: 'darkgray' }}
                dropDownContainerStyle={{
                  backgroundColor: "white"
                }}

                style={{
                  backgroundColor: 'white',
                  borderColor: 'blue',
                  borderWidth: 1,
                  minHeight: 49,
                  


                }}
              />

            </View>

          </View>

          {/* issue Date */}
          <View className="  flex flex-row m-1">
            <Text className="p-2 font-extrabold text-black">
              Issue Date
            </Text>
            <DatePicker
              modal
              mode="date"
              open={openIssue}
              date={issue}
              onConfirm={val => {
                setOpenIssue(false);
                setIssue(val);
              }}
              onCancel={() => {
                setOpenIssue(false);
              }}
            />

            <Text className="rounded-md border w-8/12 border-violet-400  text-blue-900 text-center font-bold p-2">
              {issue.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setOpenIssue(true)}>
              <Text className="p-2 text-md bg-[#29378a] rounded-md ml-1">📅</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row m-1">
            <Text className="p-2 font-extrabold text-black">
              Exp.   Date
            </Text>
            <DatePicker
              modal
              mode="date"
              open={openExpiry}
              date={expiry}
              onConfirm={value => {
                setOpenExpiry(false);
                setExpiry(value);
              }}
              onCancel={() => {
                setOpenExpiry(false);
              }}
            />

            <Text className="rounded-md border w-8/12   text-center text-black font-bold p-2">
              {expiry.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setOpenExpiry(true)}>
              <Text className="p-2 text-md bg-[#29378a] rounded-md ml-1">📅</Text>
            </TouchableOpacity>
          </View>
          <View className='flex flex-row mt-3'>
            <TouchableOpacity onPress={() => clearall()} className='bg-[#fc4343] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>RESET</Text></TouchableOpacity>
            <TouchableOpacity className='bg-[#29378a] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>SAVE</Text></TouchableOpacity>
          </View>
        </View>
        {/* camera */}

        <View className="border h-16 bg-slate-200 p-2  text-center items-center justify-center">
              
        </View>
        <View  className="border  bg-slate-600 rounded-md items-center p-3">
          <TouchableOpacity >   
              <Text className='text-white'>Open Camera</Text>
          </TouchableOpacity>
            
        </View>

      </KeyboardAvoidingView>
    </View>
  </ScrollView>
);
};

export default AddDriver;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
};