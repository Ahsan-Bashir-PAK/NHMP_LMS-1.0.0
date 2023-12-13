/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ScrollView, KeyboardAvoidingView, TouchableWithoutFeedbackBase, Keyboard } from 'react-native';

const KeyboardAvoidWrapper= ({children})=> {  
  return (
    
    <KeyboardAvoidingView  style={{flex:1}} enabled >
      <ScrollView>
          <TouchableWithoutFeedbackBase onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedbackBase>

      </ScrollView>

    </KeyboardAvoidingView>
    
    
    
  );
}

export default KeyboardAvoidWrapper;
