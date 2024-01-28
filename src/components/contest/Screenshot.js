import { StyleSheet, View, TouchableOpacity, ScrollView, Image} from 'react-native'
import React, { useCallback, useContext, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../../globalstyle'
import { Button, useTheme, Text, Chip, Avatar, List, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Header from '../header/Header';
import { updateResult } from '../../service/apicalls';
import { UserContext } from '../../userDetail/Userdetail';
import Toast from 'react-native-root-toast';
import mime from 'mime';

const Screenshot = ({navigation, route }) => {
  const { status, contest } = route.params;
  const listItems = [
    'If you have won, take a screenshot of winning page from Ludo King app. Click below on Won to upload the screenshot & then click on confirm to win.',
    'If you have lost, just click on Lost (Mandatory). Otherwise 25 coins will be deducted from your wallet.',
    'Both players has to update the result within two hours after Room Code is Updates.',
    // Add more list items as needed
  ];
  const theme = useTheme();
  const {userDetail} = useContext(UserContext)
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [pickerResponse, setPickerResponse] = useState(null);

  const showModal = () => {
    if (pickerResponse === null) {
      showToast2("Please select screenshot first")
    } else {
      setVisible(true);
    }
  };
  const hideModal = () => {
    setVisible(false)
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

  const handleDocumentSelection = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        showToast2('Permission to access media library was denied');
        return;
      }
  
      const pickerResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 10],
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
    const uri = pickerResponse[0].uri;
    console.log("mime", mime.getType(pickerResponse[0].uri))
    console.log("image", pickerResponse[0].mimeType)
    
    if (userDetail.id === contest.creator) {
      formData.append('creator', userDetail.id);
      formData.append('creator_result', status);
      formData.append('creator_result_image', {
        name: uri.substring(uri.lastIndexOf('/') + 1),
        type:  pickerResponse[0].mimeType,
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
    console.log("formData", formData._parts)
  
    await updateResult(formData).then((res) => {
      console.log("res", res);
      setLoading(false);
      hideModal();
      navigation.navigate('gametable');
    });
  };
  

  return (
    <>
     {loading ? (
           <ActivityIndicator animating={true} size='large' style={globalStyles.loading} color={globalStyles.backgroundColor.primaryBlue} />
          ) : ""}
    <View style={globalStyles.container}>
        <Header title="Screenshot"  navigation={navigation}/>
    <ScrollView contentContainerStyle={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
    <View style={{ elevation: 3 }}>
      <View style={[globalStyles.boxshodowbox, { justifyContent: 'space-between' }, { alignItems: 'center' }, { overflow: 'hidden' }]}>
        {pickerResponse != null ? "" : <Text>here the screen shot</Text> }
        {pickerResponse && pickerResponse.length > 0 && (
        <Image
          source={{ uri: pickerResponse[0].uri }}
          style={{
            width: Math.min(600, pickerResponse[0].width),
            height: Math.min(600, pickerResponse[0].height),
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
    <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={globalStyles.modalBox}>
            <MaterialIcons name="close" color="#000" size={24}  style={globalStyles.closeModal}
        onPress={hideModal}/>
        <View style={globalStyles.modalContent}>

        <Text variant="titleMedium">!! Warning !!</Text>
        <View style={{marginVertical: 10}}>
        {listItems.map((item, index) => (
            <Text style={globalStyles.listItemText} key={index}>{`${index + 1}. ${item}`} </Text>
            ))}
            </View>
        </View>
          <Button onPress={submitChallange} style={[{borderRadius:0}, {width: '100%'}, {backgroundColor: '#CBFFC5'}]}  textColor='#000' mode="contained">
    SUBMIT
  </Button>
        </Modal>
      </Portal>
    </ScrollView>
    <View style={globalStyles.displayRowbetween}>
    <Button onPress={showModal} style={[{borderRadius:0}, {width: '100%'}, {backgroundColor: '#CBFFC5'}]}  textColor='#000' mode="contained">
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