import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useCallback, useContext, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../../globalstyle'
import { Button, useTheme, Text, Chip, Avatar, List, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Header from '../header/Header';
import { getuser, updateResult } from '../../service/apicalls';
import { UserContext } from '../../userDetail/Userdetail';
import { Picker } from '@react-native-picker/picker';
import mime from 'mime';
import ShowToast from '../../utility/ShowToast';

const Screenshot = ({ navigation, route }) => {
  const { status, contest } = route.params;
  const listItems = [
    'If you have won, take a screenshot of winning page from Ludo King app. Click below on Won to upload the screenshot & then click on confirm to win.',
    'If you have lost, just click on Lost (Mandatory). Otherwise 25 coins will be deducted from your wallet.',
    'Both players has to update the result within two hours after Room Code is Updates.',
    // Add more list items as needed
  ];
  const theme = useTheme();
  const { userDetail, setUserDetail } = useContext(UserContext)
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [pickerResponse, setPickerResponse] = useState(null);
  const [selectedCancel, setSelectedCancel] = useState("0");

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false)
  };

  const handleDocumentSelection = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        ShowToast('Permission to access media library was denied');
        return;
      }

      const pickerResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        // aspect: [5, 10],
        quality: 1,
      });
      if (pickerResponse.cancelled) {
        console.log('User cancelled image picker');
      } else {
        console.log('Image picked:', pickerResponse.uri);
        console.log("pickerResponse", pickerResponse.assets)
        setPickerResponse(pickerResponse.assets);
      }
    } catch (error) {
      console.error('Error selecting image: ', error);
    }
  };

  const submitChallange = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('id', contest.id);
    formData.append('updated_by', userDetail.id);
    formData.append('joiner_cancel_reason', selectedCancel)
    const uri = pickerResponse[0].uri;

    if (userDetail.id === contest.creator) {
      formData.append('creator', userDetail.id);
      formData.append('creator_result', status);
      formData.append('creator_result_image', {
        name: uri.substring(uri.lastIndexOf('/') + 1),
        type: pickerResponse[0].mimeType,
        uri: uri,
      });
    }
    if (userDetail.id === contest.joiner) {
      formData.append('joiner', userDetail.id);
      formData.append('joiner_result', status);
      formData.append('joiner_result_image', {
        name: uri.substring(uri.lastIndexOf('/') + 1),
        type: pickerResponse[0].mimeType,
        uri: uri,
      });
    }

    await updateResult(formData).then((res) => {
      if (res.success) {
        console.log("res", res);
        ShowToast(res?.message);
        navigation.navigate('gametable');
        getuser(userDetail.id)
          .then((res) => {
            setUserDetail(res.data);
          })
      } else {
        console.log("err", res);
        ShowToast(res?.message);
      }
      setLoading(false);
      hideModal();
    });
  };


  return (
    <>
      {loading ? (
        <ActivityIndicator animating={true} size='large' style={globalStyles.loading} color={globalStyles.backgroundColor.primaryBlue} />
      ) : ""}
      <View style={globalStyles.container}>
        <Header title="Screenshot" navigation={navigation} />
        <ScrollView contentContainerStyle={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
          <View style={{ elevation: 3 }}>
            <View style={[globalStyles.boxshodowbox, { justifyContent: 'space-between' }, { alignItems: 'center' }, { overflow: 'hidden' }]}>
              {pickerResponse != null ? "" : <Text>here the screen shot</Text>}
              {pickerResponse && pickerResponse.length > 0 && (
                <Image
                  source={{ uri: pickerResponse[0].uri }}
                  style={{
                    width: Math.min(600, pickerResponse[0].width),
                    height: 400,
                    resizeMode: 'contain', // or 'cover' depending on your preference
                  }}
                />
              )}
              <Button
                style={[{ borderRadius: 0, width: '98.3%' }, { backgroundColor: '#FFCE6D' }]}
                textColor='#000'
                mode="contained"
                onPress={handleDocumentSelection}
              >
                UPLOAD SCREENSHOT
              </Button>
            </View>
          </View>
          {status === "Cancel" &&
            <>
              <Text variant="titleMedium" style={{ marginTop: 10 }}>Select Your Reason</Text>
              <View style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 2 }, { paddingVertical: 2 }]}>
                <Picker
                  label="select"
                  selectedValue={selectedCancel}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCancel(itemValue)
                  }>
                  <Picker.Item label="select a value" value="0" />
                  <Picker.Item label="ludo app not working" value="ludo app not working" />
                  <Picker.Item label="opponent can't join" value="opponent can't join" />
                  <Picker.Item label="opponent use diamond" value="opponent use diamond" />
                  <Picker.Item label="oppenent left the game" value="oppenent left the game" />
                  <Picker.Item label="invalid room code" value="invalid room code" />
                </Picker>
              </View>
            </>
          }

          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={globalStyles.modalBox}>
              <MaterialIcons name="close" color="#000" size={24} style={globalStyles.closeModal}
                onPress={hideModal} />
              <View style={globalStyles.modalContent}>

                <Text variant="titleMedium">!! Warning !!</Text>
                <View style={{ marginVertical: 10 }}>
                  {listItems.map((item, index) => (
                    <Text style={globalStyles.listItemText} key={index}>{`${index + 1}. ${item}`} </Text>
                  ))}
                </View>
              </View>
              <Button onPress={submitChallange} style={[{ borderRadius: 0 }, { width: '100%' }, { backgroundColor: '#CBFFC5' }]} textColor='#000' mode="contained">
                SUBMIT
              </Button>
            </Modal>
          </Portal>
        </ScrollView>
        <View style={globalStyles.displayRowbetween}>
          <Button onPress={showModal} style={[{ borderRadius: 0 }, { width: '100%' }]} disabled={pickerResponse === null || status === "Cancel" ? selectedCancel === "0" : false} buttonColor='#CBFFC5' textColor='#000' mode="contained">
            CONFIRM
          </Button>
        </View>
      </View>
    </>
  )
}

export default Screenshot;

const styles = StyleSheet.create({

})