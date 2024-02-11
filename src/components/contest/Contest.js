import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../../../globalstyle';
import { Button, useTheme, Text, Chip, Avatar, List, Portal, Modal, TextInput, ActivityIndicator } from 'react-native-paper';
import Header from '../header/Header';
import { UserContext } from '../../userDetail/Userdetail';
import { challange, getuser, updateChallange, updateResult } from '../../service/apicalls';
import Toast from 'react-native-root-toast';
import * as Clipboard from 'expo-clipboard';

const Contest = ({ route, navigation }) => {
  const { contestData } = route.params;
  const { userDetail, setUserDetail } = useContext(UserContext)
  const [contest, setContest] = useState("")
  const listItems = [
    'If you have won, take a screenshot of winning page from Ludo King app. Click below on Won to upload the screenshot &   then click on confirm to win.',
    'If you have lost, just click on Lost (Mandatory). Otherwise 25 coins will be deducted from your wallet.',
    'Both players has to update the result within two hours after Room Code is Updates.',
  ];
  const theme = useTheme();
  const [loading, setLoading] = useState(false)
  const [roomcode, setRoomcode] = useState({
    value: '',
    update: false,
    error: false
  })
  const [visible, setVisible] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const showModal = () => setVisible(true);
  const showResultModal = () => setResultModal(true);
  const hideResultModal = () => setResultModal(false);
  const hideModal = () => setVisible(false);

  const handleInputChange = (text) => {
    setRoomcode((prevRoomcode) => ({
      ...prevRoomcode,
      value: text,
      error: text.length !== 7,
    }));
  };

  const fatchContest = async () => {
    challange(contestData.id).then((res) => {
      setContest(res.data)
    }).catch((err) => {
      console.log(err)
    })
    await getuser(userDetail.id)
      .then((res) => {
        setUserDetail(res.data);
      })
  }
  useEffect(() => {
    fatchContest();
  }, [contestData])
  useEffect(() => {
    fatchContest();
  }, [])
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

  const submitcode = async () => {
    const sendData = {
      id: contestData.id,
      room_code: roomcode.value,
      challenge_status: "Playing",
      updated_by: userDetail.id
    }
    await updateChallange(sendData).then((res) => {
      setVisible(false)
      fatchContest();
      setRoomcode({
        ...roomcode,
        update: true
      });
      showToast2("Room Code Updates Successfully")
    }).catch((error) => {
      console.log(error)
    })
  }
  const refreshContent = () => {
    fatchContest()
  }
  const copyRoomCodeToClipboard = () => {
    Clipboard.setString(contest.room_code);
    showToast2("Room Code copied successfully!");
  };
  const submitChallange = async (status) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('id', contest.id);
    formData.append('updated_by', userDetail.id);

    if (userDetail.id === contest.creator) {
      formData.append('creator', userDetail.id);
      formData.append('creator_result', status);
    }
    if (userDetail.id === contest.joiner) {
      formData.append('joiner', userDetail.id);
      formData.append('joiner_result', status);
    }
    console.log("formData", formData)
    try {
      const response = await updateResult(formData);
      console.log("res", response);
      setLoading(false);
      hideResultModal();
      navigation.navigate('gametable');
    } catch (error) {
      console.log("error", error)
    }
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator animating={true} size='large' style={globalStyles.loading} color={globalStyles.backgroundColor.primaryBlue} />
      ) : ""}
      <View style={globalStyles.container}>
        <Header title="Contest" navigation={navigation} />
        {contest &&
          <ScrollView contentContainerStyle={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
            <View >
              <View style={globalStyles.challangesBox}>
                <View style={globalStyles.challangeBoxTop}>
                  <View style={[globalStyles.displayRowbetween, { gap: 5 }, { justifyContent: 'space-between' }, { alignItems: 'flex-start' }]}>
                    <View style={[{ alignItems: 'center' }, { gap: 5 }, globalStyles.challangeschallenger]}>
                      <Avatar.Image size={45} source={require('../../../assets/images/avatar.png')} />
                      <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 },]}>{contest.creatorUser.name}</Text>
                    </View>
                    <View style={globalStyles.challangeFor}>
                      <View style={[globalStyles.chip, { marginBottom: contest.challenge_status === "Playing" ? 13 : 0 }, { textAlign: 'center' }]}  >
                        <Text variant='labelMedium' style={{ textAlign: 'center' }}>KC - {contest.id}</Text>
                      </View>
                      <View style={globalStyles.challangeFor}>
                        <Text variant={contest.challenge_status === "Playing" ? "labelLarge" : "labelMedium"} textColor={theme.colors.primary} style={{ textAlign: 'center' }} >VS</Text>
                        {contest.challenge_status === "Playing" ? "" : (
                          <Text variant="titleMedium" style={{ textAlign: 'center', color: theme.colors.red }} >{contest.amount * 2} Coins</Text>
                        )}
                      </View>
                    </View>
                    <View style={[{ alignItems: 'center' }, { gap: 5 }]}>
                      <Avatar.Image size={45} source={require('../../../assets/images/avatar.png')} />
                      <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 }]}>{contest.joinerUser.name}</Text>
                    </View>
                  </View>
                </View>
                <View style={[globalStyles.displayRowbetween, globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2]}>
                  <Text variant="bodyMedium" style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 5 }, { borderBottomLeftRadius: 8 }, { backgroundColor: '#FFE3A5' }]}>{contest.challenge_status !== "Processing" ? (`total coin: ${(contest.amount) * 2} \n`) : ""} Winning: {(contest.amount - (contest.amount * 10) / 100) * 2}  </Text>
                  <TouchableOpacity onPress={copyRoomCodeToClipboard} style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 5 }, { borderBottomRightRadius: 8 }, { backgroundColor: '#CBFFC5' }, { color: '#028907' }]}>
                    <Text variant="bodyMedium" style={[{ textAlign: 'center' }, { paddingVertical: 5 }, { borderBottomRightRadius: 8 }, { backgroundColor: '#CBFFC5' }, { color: '#028907' }]}> Room Code {contest.challenge_status !== "Processing" ? (`- \n ${contest.room_code}`) : ""}<MaterialCommunityIcons name="content-copy" color="#028907" size={18} /></Text>
                  </TouchableOpacity>
                </View>
              </View>
              {contest.creator === userDetail.id ? (
                <>
                  {contest.challenge_status !== "Processing" ? "" : (
                    <View style={globalStyles.displayRowbetween}>
                      <Button style={[{ borderRadius: 5 }, { width: '47%' }]} buttonColor='#E0E0E0' textColor='#000' mode="contained" >
                        CANCEL
                      </Button>
                      <Button onPress={showModal} style={[{ borderRadius: 5 }, { width: '50%' }]} buttonColor='#2E7D32' textColor='#FFF' mode="contained" >
                        UPDATE CODE
                      </Button>
                    </View>
                  )}
                </>
              ) : (
                <>
                  <View style={globalStyles.displayRowbetween}>
                    <Button style={[{ borderRadius: 5 }, { width: '65%' }]} buttonColor='#0C225E' textColor='#fff' mode="contained" >
                      Wait for Room Code
                    </Button>
                    <Button onPress={refreshContent} style={[{ borderRadius: 5 }, { width: '30%' }]} buttonColor='#E0E0E0' textColor='#000' mode="contained" >
                      Refresh
                    </Button>
                  </View>
                </>
              )}
              <View style={globalStyles.cover1}>
                {listItems.map((item, index) => (
                  <Text style={globalStyles.listItemText} key={index}>{`${index + 1}. ${item}`} </Text>
                ))}
              </View>
              <Text style={[globalStyles.listItemText, { textAlign: 'center' }]}>Terms and Conditions apply !</Text>
            </View>
          </ScrollView>
        }
        {contest && contest.challenge_status !== "Processing" ? (
          <View style={globalStyles.displayRowbetween}>
            <Button style={[{ borderRadius: 0 }, { width: '32.5%' }, { backgroundColor: '#CBFFC5' }]} textColor='#000' mode="contained" onPress={() => navigation.navigate("screenshot", { status: "Win", contest })}>
              WIN
            </Button>
            <Button style={[{ borderRadius: 0 }, { width: '32.5%' }, { backgroundColor: '#FFC8C5' }]} textColor='#000' mode="contained" onPress={showResultModal}>
              LOSS
            </Button>
            <Button style={[{ borderRadius: 0 }, { width: '32.5%' }, { backgroundColor: '#FFE3A5' }]} textColor='#000' mode="contained" onPress={() => navigation.navigate("screenshot", { status: "Cancel", contest })}>
              CANCEL
            </Button>
          </View>
        ) : ""}
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={globalStyles.modalBox}>
          <MaterialIcons name="close" color="#000" size={30} style={globalStyles.closeModal}
            onPress={hideModal} />
          <View style={styles.coinModal}>
            <Text variant="titleLarge">Update Code</Text>
            <TextInput
              keyboardType="numeric"
              mode="flat"
              value={roomcode.value}
              onChangeText={(text) => handleInputChange(text)}
              error={roomcode.error}
              outlineColor={theme.colors.gray}
              selectionColor={theme.colors.primary}
              activeOutlineColor={theme.colors.primary}
              style={styles.textInput}
              autoFocus
            />
            <Text style={{ color: 'red', marginBottom: 10, paddingLeft: 5 }}>{roomcode.error ? "Invalid Room Code" : ""} </Text>
            <View style={globalStyles.displayRowbetween}>
              <Button onPress={hideModal} style={[{ borderRadius: 5 }, { width: '35%' }]} buttonColor='#E0E0E0' textColor='#000' mode="contained" >
                CANCEL
              </Button>
              <Button onPress={submitcode} disabled={roomcode.error} style={[{ borderRadius: 5 }, { width: '55%' }]} buttonColor='#2196F3' textColor='#FFF' mode="contained" >
                Update Code
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal visible={resultModal} onDismiss={hideResultModal} contentContainerStyle={globalStyles.modalBox}>
          <MaterialIcons name="close" color="#000" size={24} style={globalStyles.closeModal}
            onPress={hideResultModal} />
          <View style={globalStyles.modalContent}>

            <Text variant="titleMedium">!! Warning !!</Text>
            <View style={{ marginVertical: 10 }}>
              {listItems.map((item, index) => (
                <Text style={globalStyles.listItemText} key={index}>{`${index + 1}. ${item}`} </Text>
              ))}
            </View>
          </View>
          <Button onPress={() => submitChallange("Lose")} style={[{ borderRadius: 0 }, { width: '100%' }, { backgroundColor: '#CBFFC5' }]} textColor='#000' mode="contained">
            SUBMIT
          </Button>
        </Modal>
      </Portal>
    </>
  )
}

export default Contest;

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
  playGameBox: {
    borderRadius: 8,
    backgroundColor: globalStyles.backgroundColor.primaryBlue,
    paddingVertical: 5,
    alignItems: 'center',
    marginBottom: 7,
  },
})