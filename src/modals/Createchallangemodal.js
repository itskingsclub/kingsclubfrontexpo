import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import globalStyles from '../../globalstyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, Text, Modal, Portal, TextInput, useTheme, RadioButton, ActivityIndicator } from 'react-native-paper';
import { createChallange, getuser } from '../service/apicalls';
import { UserContext } from '../userDetail/Userdetail';
import Toast from 'react-native-root-toast';

const Createchallangemodal = ({ visiblemodal, hideModalChallange, setUpdateChallenge }) => {
  const theme = useTheme();
  const {userDetail, setUserDetail} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState('100');
  const [error, setError] = useState("");

  const handleInputChange = (text) => {
    const inputNumber = parseInt(text);
    const totalCoin = userDetail.total_coin;
    if (text === '') {
      setError("Please enter an amount.");
    } else if (inputNumber < 0) {
      setError("Please enter a valid amount.");
    } else if (inputNumber !== 0 && inputNumber % 50 !== 0) {
      setError("Coin must be a multiple of 50.");
    } else if (inputNumber > totalCoin) {
      setError("You do not have sufficient coins to play");
    } else {
      setError("");
    }
    setCoin(text);
  };

  const showToast2 = (message) => {
    Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
  };

  const makePayment = async () => {
    const data = {
      amount: Number(coin),
      creator: userDetail.id
    };
  
  
    if (userDetail.total_coin >= coin) {
      setLoading(true);
  
      await createChallange(data)
        .then((res) => {
          hideModalChallange();
          setLoading(false);
          showToast2("Challenge created successfully!");
          setUpdateChallenge(true)
          getuser(userDetail.id)
            .then((res) => {
              setUserDetail(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showToast2("You Don't have sufficient Coin to join");
    }
  };
  

  const listItems = [
    'Coin must be i multiple of 10, i.e. 50,90',
    'Challenge coins cannot be less than 10',
    '1 Coin is equal to RS. 1',
  ];
  return (
    <>
    <Portal>
        <Modal visible={visiblemodal} onDismiss={hideModalChallange} contentContainerStyle={globalStyles.modalBox} >
        {loading ? (
           <ActivityIndicator animating={true} size='large' style={globalStyles.loading} color={globalStyles.backgroundColor.primaryBlue} />
   ): 
   (
    <>
            <MaterialIcons name="close" color="#000" size={30}  style={globalStyles.closeModal}
        onPress={hideModalChallange}/>
        <View style={styles.coinModal}>
        <Text variant="titleLarge">Create Challange</Text>
        <TextInput
          keyboardType="numeric"
          mode="flat"
          value={coin}
          onChangeText={(text) => handleInputChange( text)}
          error={error === '' ? false : true}
          outlineColor={theme.colors.gray} 
          selectionColor={theme.colors.primary} 
          activeOutlineColor={theme.colors.primary} 
          style={styles.textInput}
        />
       <Text style={{ color: 'red', marginBottom:10, paddingLeft:5 }}>{error} </Text> 

         <View style={globalStyles.displayRowbetween}>
         {[50, 100, 200, 500].map((value) => (
        <Button
        buttonColor= '#E2E2E2'  textColor='#333333'  labelStyle={globalStyles.graySmallButton}  style={{marginRight: 4}} mode="contained"
          key={value}
          onPress={() =>setCoin(String(value))}
        >{`${value}`}</Button>
      ))}
        </View>
        <View style={{marginVertical: 20}}>
        {listItems.map((item, index) => (
            <Text style={globalStyles.listItemText} key={index}>{`${index + 1}. ${item}`} </Text>
            ))}
            </View>
            <View style={globalStyles.displayRowbetween}>
            <Button onPress={hideModalChallange} style={[{borderRadius:5}, {width: '35%'}]} buttonColor='#E0E0E0' textColor='#000' mode="contained" >
            CANCEL
          </Button>
            <Button onPress={makePayment} disabled={error === '' ? false : true} style={[{borderRadius:5}, {width: '55%'}]} buttonColor='#2196F3' textColor='#FFF' mode="contained" >
            Create Challange
          </Button>
        </View>
        </View>
    </>
        )}
        </Modal>
      </Portal>
            </>
  )
}

export default Createchallangemodal;

const styles = StyleSheet.create({
  coinModal:{
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  textInput :{
    marginTop: 15,
    height: 56,
    backgroundColor: "#e5e5e88a",
  },
  paymentMode:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:5,
    paddingHorizontal:15,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#007AFF',
  }
})