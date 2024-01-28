import React, { useEffect, useRef, useState  } from 'react';
import { StyleSheet, View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { IconButton, Text, Button, useTheme, TextInput, ActivityIndicator} from 'react-native-paper';
import globalStyles from '../../../globalstyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApi } from '../../service/apicalls';

const Login = ({navigation}) => {
  const theme = useTheme();
  const [user, setUser] = useState({
    mobileNumber: '',
    error: false,
    errorMessage: '',
  });
  const [disable , setDisable] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (key, value) => {
    let errorMessage = '';
    let error = false; // Initially, there's no error
    if (key === 'mobileNumber') {
      if (value.length < 1) {
        errorMessage = 'Please enter your mobile number.';
        error = true;
      } else {
        const mobileRegex = /^[0-9]{10}$/;
        if (mobileRegex.test(value) === false) {
          errorMessage = 'Please enter a valid 10-digit mobile number.';
          error = true;
        }
      }
    }
    setUser({
      ...user,
      [key]: value,
      error: errorMessage !== '',
      errorMessage: errorMessage,
    });
    setDisable(error);
  };
  const handleLinkPress = (url) => {
    // Linking.openURL(url); // Replace with your URL
  };

  const submitUser = async () => {
    setLoading(true)
    if (user.error) {
      return;
    }
    // data = {
    //   mobile: "0087654321"
    // }
    data = {
      mobile: user.mobileNumber
    }
    await  loginApi(data).then((res)=>{
      if(res.success === true){
        console.log(data.mobile, res.data.pin)
        AsyncStorage.setItem('mobileNumber', data.mobile);
        navigation.navigate('otpverify');
      } else{
        console.log("false", res.message)
          setUser({
          ...user,
          mobileNumber: data.mobile,
          error: res?.message !== '',
          errorMessage: res?.message,
        })
      }
      setLoading(false)
    })
  };
  
  const handleInputSubmit = (nextField) => {
    // Focus on the next input field
    if (nextField) {
      nextField.focus();
    } else {
      // If there is no next input field, perform the submit action
      submitUser();
    }
  };

  return (
    <>
     <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    {loading ? (
      <ActivityIndicator animating={true} size='large' color={theme.colors.blue} style={globalStyles.loading} />
    ) : ''}
    <View style={[styles.container, {paddingTop:20}, {paddingBottom: Platform.OS === "ios" ? 10: 0}]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.topContent}>
        <View style={styles.pageHeading}>
          <View style={styles.backButton}>
            <Ionicons
              name="arrow-back-outline"
              color="#000"
              size={20}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.textHeading}>
              Log in
            </Text>
          </View>
        </View>
        <View style={styles.formBox}>
      <TextInput
      keyboardType="numeric"
      mode="flat"
      label="Mobile Number"
      value={user.mobileNumber}
      onChangeText={(text) => handleInputChange('mobileNumber', text)}
      ref={(ref) => (mobileInputRef = ref)}
      onSubmitEditing={() => handleInputSubmit(emailInputRef)}
      error={user.error}
      outlineColor={theme.colors.gray} 
      selectionColor={theme.colors.primary} 
      activeOutlineColor={theme.colors.primary} 
      style={styles.textInput}
    />
    {user.error && user.errorMessage && ( // Display error message conditionally
  <Text style={{ color: 'red' }}>{user.errorMessage}</Text>
)}
        </View>
        </View>
        <View style={styles.space}>
  <View style={styles.bottomContent}>
    <Text style={styles.text}>
    By selecting Agree and continue , I agree to Dynamic Layers <Text style={styles.linking} onPress={()=>handleLinkPress('#3')}> Terms of Service</Text>,<Text style={styles.linking} onPress={()=>handleLinkPress('#1')}> Payments Terms of Service</Text>  and <Text style={styles.linking} onPress={()=>handleLinkPress('#2')}> Notification Policy</Text>  and acknowledge the<Text style={styles.linking} onPress={()=>handleLinkPress('#4')}>  Privacy Policy </Text>.
    </Text>
     <Button labelStyle={styles.mainButton}  buttonColor={theme.colors.blue}  disabled={disable}   loading={false} mode="contained" onPress={submitUser}>
    Agree and continue
  </Button>
  <Text style={[styles.text, {textAlign: 'center'}, {marginTop: 8}]}>
  Already have an account  {' '}
  <Text style={[styles.linking, {textDecorationLine:'underline'}, {paddingBottom: 0}]}  onPress={()=> navigation.navigate('register')}>Register</Text>
    {' '} here
  </Text>
  </View>
  </View>
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.backgroundColor.backgroundColor,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  pageHeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textHeading: {
    marginLeft: -30,
    fontSize: globalStyles.fonts.normalText,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 8,
  },
  formBox: {
    paddingTop: 16,
  },
  topContent: {
    marginTop: 20,
  },
  space: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 10, 
  },
  text:{
    fontSize: globalStyles.fonts.textSize,
    marginBottom: 16
  },
  linking:{
    color: globalStyles.textColor.blueCOlor,
    fontWeight: '700',
  },
  mainButton :{
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput :{
    width: '100%',
    marginTop: 8,
    height: 56,
    backgroundColor: "#e5e5e88a",
  },
});
