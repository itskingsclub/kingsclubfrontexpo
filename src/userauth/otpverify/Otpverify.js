import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Clipboard, Platform } from 'react-native';
import { IconButton, Text, Button, useTheme,ActivityIndicator } from 'react-native-paper';
import globalStyles from '../../../globalstyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodeInput from 'react-native-confirmation-code-input';
import { loginApi, verifyotpApi } from '../../service/apicalls';
import * as Updates from 'expo-updates';

const Otpverify = ({navigation}) => {
  const theme = useTheme();
  const [otpInput, setOtpInput] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(3);
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
 console.log(otpInput)
  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const mobileNumber = await AsyncStorage.getItem('mobileNumber');
        if (mobileNumber) {
          setMobileNumber(mobileNumber);
        }
      } catch (error) {
        console.error('Error retrieving Mobile Number:', error);
      }
    };
    fetchNumber();
  }, []);
  const otpSubmit = async  () => {
    setLoading(true)
    data= {
      mobile: mobileNumber,
      pin: otpInput
    }
    console.log(data)
    await verifyotpApi(data).then((res)=>{
      setLoading(false)
      console.log("res", res)
      if(res.success === true){
        console.log("true", res)
     const jsonValue = JSON.stringify(res.data);
      AsyncStorage.setItem('userDetail', jsonValue);
      setError('')
      Updates.reloadAsync()
      navigation.navigate('parent')
      } else{
        console.log("false", res.message)
        setError(res.message)
      }
    })
  };
  
  useEffect(() => {
    if (otpInput.length === 4) {
      setSubmitDisabled(false);
      otpSubmit();
    } else{
      setSubmitDisabled(true);
    }
  }, [otpInput]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else{
        setDisabled(false)
        clearInterval(interval)
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = async () => {
    setLoading(true)
    data = {
      mobile: mobileNumber
    }
    await  loginApi(data).then((res)=>{
      if(res.success === true){
        console.log(data.mobile, res.data.pin)
        setSeconds(3);
        setDisabled(true)
      } else{
        console.log("false", res.message)
      }
      setLoading(false)
    })
  };

  return (
    <>
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
              Enter OTPP
            </Text>
          </View>
        </View>
        <View style={styles.formBox}>
          <Text variant='bodyLarge' style={{textAlign: 'center'}}>We have sent a 4 digit OTP on {'\n'} +91 {(mobileNumber).slice(0,4)}xxxxx{(mobileNumber).slice(9)}</Text>
        <View style={styles.otpContainer}>
        <CodeInput
        codeLength={4}
        space={12}
        keyboardType="numeric"
        activeColor='#7E49FF'
      inactiveColor='#00000091'
      inputPosition='center'
      size={50}
        onFulfill={(code)=>setOtpInput(code)}
      />
           </View>
          <Text variant='bodyLarge' style={{textAlign: 'center', color:'red', marginBottom: 10}}>{error}</Text>
           <Text variant="titleLarge">{`00:${seconds < 10 ? `0${seconds}` : seconds}`}</Text>
      <Button  labelStyle={[styles.mainButton, {textDecorationLine:'underline'}]} disabled={ disabled ? true : false } mode="text" textColor={theme.colors.blue} onPress={resendOTP}>
        Resend OTP
      </Button>
        </View>
        </View>
        <View style={styles.space}>
  <View style={styles.bottomContent}>
    <Text style={styles.text}>
    By selecting Agree and continue , I agree to Dynamic Layers <Text style={styles.linking} onPress={()=>handleLinkPress('#3')}> Terms of Service</Text>,<Text style={styles.linking} onPress={()=>handleLinkPress('#1')}> Payments Terms of Service</Text>  and <Text style={styles.linking} onPress={()=>handleLinkPress('#2')}> Notification Policy</Text>  and acknowledge the<Text style={styles.linking} onPress={()=>handleLinkPress('#4')}>  Privacy Policy </Text>.
    </Text>
     <Button labelStyle={styles.mainButton}  buttonColor={theme.colors.blue}  disabled={submitDisabled}  loading={false} mode="contained" onPress={otpSubmit}>
    Agree and continue
  </Button>
  </View>
  </View>
      </ScrollView>
    </View>
    </>
  );
};

export default Otpverify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.backgroundColor.backgroundColor,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
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
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    height: 56, 
    width: 56,
    shadowColor: 'transparent', 
  },
  textInputContainer: {
    marginBottom: 5,
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
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#7E49FF",
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#7E49FF",
  },
  cell: {
    width: 50,
    height: 50,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'gray',
  },
  cellText: {
    fontSize: 24,
    textAlign: 'center',
  },
});
