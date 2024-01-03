/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
import Login from './screens/loginnew';
import MyStack from './Navigations/navigation';
import Main from './screens/main';
import MyTabs from './Navigations/tabnavigation';
import AddOtherInfo from './screens/forms/Personal/statusLeave';
import SignUp from './screens/forms/signUp';


function App(): JSX.Element {
  
  return (
    
  <MyStack />
  
    
  );
}

export default App;
