import { StyleSheet, View, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import globalStyles from '../../globalstyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from 'react-native-paper';
import { Text, useTheme, Button } from 'react-native-paper';
import { UserContext } from '../userDetail/Userdetail';
import { getuser, myPayment, withdrawal } from '../service/apicalls';
import Withdrawcoinmodal from '../modals/Withdrawcoinmodal'
import Header from '../components/header/Header';
import ShowToast from '../utility/ShowToast';

const Wallet = ({ navigation, icon }) => {
  const theme = useTheme();
  const [visibleWithdraw, setVisibleWithdraw] = useState(false);
  const showModalWithdraw = () => setVisibleWithdraw(true); // Function to open the modal
  const hideModalWithdraw = () => setVisibleWithdraw(false);
  const { userDetail, setUserDetail } = useContext(UserContext);
  const [mypayment, setMypayment] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fatchContest()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fatchContest = () => {
    console.log("fatch")
    setLoading(true)
    const data = {
      id: userDetail.id,
      offset: 0,
      limit: 20,
      sort: 'id',
      order: 'DESC',
    }
    myPayment(data).then((res) => {
      if (res.success) {
        console.log("res", res.data.payments)
        setMypayment(res.data.payments)
        getuser(userDetail.id).then((res) => {
          if (res.success) {
            setUserDetail(res.data)
            // ShowToast(res.message)
          } else {
            // ShowToast(res.message)
          }
        })
      } else {
        console.log("err", res.data)
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      fatchContest();
    });
    return unsubscribeFocus;
  }, [navigation, userDetail]);
  useEffect(() => {
    fatchContest();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTimeRemaining = (dateTimeString) => {
    const paymentDate = new Date(dateTimeString);
    const currentDate = new Date();

    const differenceInTime = currentDate.getTime() - paymentDate.getTime();
    const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60));
    const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInMinutes === 0) {
      return 'Just now';
    } else if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minutes ago`;
    } else if (differenceInDays < 1) {
      const remainingHours = 24 - differenceInHours;
      return `${remainingHours} hours remaining`;
    } else if (differenceInDays >= 1 && differenceInDays < 2) {
      return 'Yesterday';
    } else if (differenceInDays >= 2 && differenceInDays < 3) {
      return '2 days ago';
    } else {
      return formatDate(dateTimeString);
    }
  };

  return (
    <>
      <Withdrawcoinmodal visible={visibleWithdraw} hideModal={hideModalWithdraw} />
      <KeyboardAvoidingView
        style={globalStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Header title="Wallet" icon={icon} navigation={navigation} />
        <View style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
          <View style={[styles.playGameBox, globalStyles.containerPadding]}>
            <View style={[styles.coinTop]}>
              <Text variant="bodyLarge" style={[{ color: theme.colors.whiteColor }]}>Total coin</Text>
              <View style={globalStyles.displayRowCenter}>
                <Image source={require('../../assets/images/coin.png')}
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: 5
                  }} />
                <Text variant="titleLarge" style={[{ color: theme.colors.whiteColor }]}>
                  {userDetail.win_coin + userDetail.game_coin}.00</Text></View>
              <Text variant="bodySmall" style={[{ color: theme.colors.gray }]}>(1 coin = 1Rs.)</Text>
              <Text variant="bodyMedium" style={[{ color: theme.colors.gray }]}>( Refer  Commission Coin = {userDetail.refer_coin == null ? "00" : userDetail.refer_coin}.00)</Text>
            </View>
            <View style={globalStyles.displayRowbetween}>
              <View style={[styles.coinsTop]}>
                <Text variant="bodyLarge" style={[{ color: theme.colors.whiteColor }]}>Game coin</Text>
                <View style={globalStyles.displayRowCenter}>
                  <Image source={require('../../assets/images/coin.png')}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 5
                    }} />
                  <Text variant="titleLarge" style={[{ color: theme.colors.whiteColor }]}>
                    {userDetail.game_coin}.00</Text></View>
              </View>
              <View style={[styles.coinsTop]}>
                <Text variant="bodyLarge" style={[{ color: theme.colors.whiteColor }]}>Win coin</Text>
                <View style={globalStyles.displayRowCenter}>
                  <Image source={require('../../assets/images/coin.png')}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 5
                    }} />
                  <Text variant="titleLarge" style={[{ color: theme.colors.whiteColor }]}>
                    {userDetail.win_coin == null ? "00" : userDetail.win_coin}.00</Text></View>
              </View>
            </View>
          </View>
          <View style={globalStyles.displayRowbetween}>
            <Button onPress={() => navigation.navigate("paymentdetail")} style={[{ borderRadius: 5 }, { width: '41%' }]} buttonColor={theme.colors.greenLightColor} textColor='#000' mode="contained" >
              Add Coin
            </Button>
            <Button onPress={() => navigation.navigate("withdrawcoin")} style={[{ borderRadius: 5 }, { width: '57%' }]} buttonColor={theme.colors.redLightColor} textColor='#000' mode="contained" >
              Withdraw Coin
            </Button>
          </View>
          <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize18 }, { fontWeight: '700' }]} >Transition History</Text>
        </View>
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View>
            {loading ? (
              <ActivityIndicator animating={true} size='large' color={globalStyles.backgroundColor.primaryBlue} />
            ) : (
              <>
                {mypayment && mypayment.map((data, i) => (
                  <View style={[globalStyles.transBox, globalStyles.displayRowbetween]} key={i}>
                    <View style={[globalStyles.displayRowbetween, { alignItems: 'center' }]}>
                      <View style={[globalStyles.transIcon, {
                        backgroundColor: data.payment_status === "Pending" ? theme.colors.yellowLightColor : data.payment_status === "Cancel" ? theme.colors.redLightColor : theme.colors.greenLightColor
                      }]}>
                        <View style={globalStyles.transIcon2}>
                          <Feather name="arrow-down-left" color={data.payment_status === "Pending" ? theme.colors.yellowCOlor : data.payment_status === "Cancel" ? theme.colors.red : theme.colors.greenColor
                          } size={24} style={data.type === "Deposit" ? "" : { transform: [{ rotate: '180deg' }] }} />
                        </View>
                      </View>
                      <View>
                        <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize13 }, { fontWeight: '700' }, { marginBottom: 5 }]} >On {data.type}</Text>
                        {/* {data.type === "Deposit" ? (
                          <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize10 }, { fontWeight: '700' }, { lineHeight: 12 }]} >Discount = 10 Coins</Text>
                        ) : ""} */}
                        <Text style={[{ color: '#757575' }, { fontSize: globalStyles.fonts.fontSize10 }]} >{calculateTimeRemaining(data.createdAt)}</Text>
                      </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={[{ color: data.type === "Deposit" ? theme.colors.greenColor : theme.colors.red }, { fontSize: globalStyles.fonts.fontSize16 }, { textAlign: 'right' }]} >{data.type === "Deposit" ? "+" : "- "}{data.amount}</Text>
                      {/* <Text style={[{ color: '#757575' }, { fontSize: globalStyles.fonts.fontSize10 }]} >Game Coin = 50.00</Text> */}
                    </View>
                  </View>
                ))}
              </>
            )}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default Wallet

const styles = StyleSheet.create({
  playGameBox: {
    borderRadius: 8,
    backgroundColor: globalStyles.backgroundColor.primaryBlue,
    paddingVertical: 5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  coinTop: {
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    paddingBottom: 10
  },
  coinsTop: {
    alignItems: 'center',
    width: '50%',
    paddingTop: 5
  },
})