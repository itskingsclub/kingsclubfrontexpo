import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import globalStyles from '../../globalstyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, Text, Modal, Portal, TextInput, useTheme, RadioButton, ActivityIndicator } from 'react-native-paper';
import { deposit, getuser, updateUser } from '../service/apicalls';
import { UserContext } from '../userDetail/Userdetail';
import ShowToast from '../utility/ShowToast';

const Addcoinmodal = ({ visible, hideModal }) => {
  const theme = useTheme();
  const { userDetail, setUserDetail } = useContext(UserContext);
  const [coin, setCoin] = useState('100');
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState('upi');
  const [loading, setLoading] = useState(false)

  const handleInputChange = (text) => {
    if (text !== '' && (parseInt(text) % 50 === 0 && parseInt(text) !== 0)) {
      setError(false);
    } else {
      setError(true);
    }
    setCoin(text);
  };
  const makePayment = () => {
    setLoading(true)
    // console.log(`Selected Radio Button: ${checked}, Coin Value: ${coin}`);
    data = {
      user_id: userDetail.id,
      amountt: Number(coin)
    }
    deposit(data).then((res) => {
      if (res.success) {
        console.log("res", res)
        ShowToast(res?.message)
        console.log(res)
        getuser(userDetail.id).then((res) => {
          setUserDetail(res.data)
        })
      } else {
        console.log("err", res)
        ShowToast(res?.message)
      }
      setLoading(false)
      hideModal();
    })
  };

  return (
    <>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={globalStyles.modalBox}>
          {loading ? (
            <ActivityIndicator animating={true} size='large' color={theme.colors.blue} style={[globalStyles.loading, { zIndex: 99999 }]} />
          ) : ''}
          <MaterialIcons name="close" color="#000" size={30} style={globalStyles.closeModal}
            onPress={hideModal} />
          <View style={styles.coinModal}>
            <Text variant="titleLarge">Add Coin</Text>
            <TextInput
              keyboardType="numeric"
              mode="flat"
              value={coin}
              onChangeText={(text) => handleInputChange(text)}
              error={error}
              outlineColor={theme.colors.gray}
              selectionColor={theme.colors.primary}
              activeOutlineColor={theme.colors.primary}
              style={styles.textInput}
            />
            <Text style={{ color: 'red', marginBottom: 10, paddingLeft: 5 }}>{error ? "Coin must be i multiple of 50" : ""} </Text>

            <View style={globalStyles.displayRowbetween}>
              {[50, 100, 200, 500].map((value) => (
                <Button
                  buttonColor='#E2E2E2' textColor='#333333' labelStyle={globalStyles.graySmallButton} style={{ marginRight: 4 }} mode="contained"
                  key={value}
                  onPress={() => setCoin(String(value))}
                >{`${value}`}</Button>
              ))}
            </View>
            <View style={{ marginVertical: 20 }}>
              <RadioButton.Group onValueChange={(value) => setChecked(value)} value={checked}>
                <View style={[styles.paymentMode, { borderColor: checked === "upi" ? "#007AFF" : "transparent" }]} >
                  <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { justifyContent: 'flex-start' }]} >
                    <RadioButton.Item color="#007AFF" value="upi" style={{ margin: 0, padding: 0 }} />
                    <Text>Pay With Upi</Text>
                  </View>
                  <View>
                    <Image
                      source={require('../../assets/images/upi.png')}
                      style={{
                        width: 85,
                        height: 31,
                        objectFit: 'contain'
                      }}
                    />
                  </View>
                </View>
                <View style={[styles.paymentMode, { marginTop: 15 }, { borderColor: checked === "net banking" ? "#007AFF" : "transparent" }]}>
                  <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { justifyContent: 'flex-start' }]} >
                    <RadioButton.Item color="#007AFF" value="net banking" style={{ margin: 0, padding: 0 }} />
                    <Text>Pay With Others</Text>
                  </View>
                  <View>
                    <Image
                      source={require('../../assets/images/netbanking.png')}
                      style={{
                        width: 115,
                        height: 31,
                        objectFit: 'contain'
                      }}
                    />
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            <View style={globalStyles.displayRowbetween}>
              <Button onPress={hideModal} style={[{ borderRadius: 5 }, { width: '35%' }]} buttonColor='#E0E0E0' textColor='#000' mode="contained" >
                CANCEL
              </Button>
              <Button onPress={makePayment} disabled={error} style={[{ borderRadius: 5 }, { width: '55%' }]} buttonColor='#2196F3' textColor='#FFF' mode="contained" >
                Make Payment
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  )
}

export default Addcoinmodal;

const styles = StyleSheet.create({
  coinModal: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  textInput: {
    marginTop: 15,
    height: 56,
    backgroundColor: "#e5e5e88a",
  },
  paymentMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#007AFF',
  }
})