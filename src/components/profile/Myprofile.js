import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import globalStyles from '../../../globalstyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { Text, useTheme, Button } from 'react-native-paper';
import { getuser, updateUser } from '../../service/apicalls';
import { UserContext } from '../../userDetail/Userdetail';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../header/Header';
import baseaddress from '../../service/baseAddress';
import ShowToast from '../../utility/ShowToast';

const Myprofile = ({ navigation }) => {
  const theme = useTheme();
  const { userDetail, setUserDetail } = useContext(UserContext);
  const [disableInputs, setDisableInputs] = useState(true)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    fullName: { value: userDetail.name, error: '' },
    dob: { value: '', error: '' },
    address: { value: userDetail.address, error: '' },
    city: { value: userDetail.city, error: '' },
    state: { value: '', error: '' },
  });
  const [date, setDate] = useState(new Date());
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const [open, setOpen] = useState(false)

  // const fatchData = async () =>{
  //   const data = {
  //     id: userDetail.id,
  //     offset: 0,
  //     limit: 10,
  //     sort: 'id',
  //     order: 'DESC',
  //   }
  //   await myChallange(data)
  //   .then((res) => {
  //     setmyChallanges(res.data.challenges);
  //   })
  //   .catch((error) => {
  //       console.log("error", error);
  //     });
  //   }
  // useEffect(()=>{
  //   fatchData
  // },[])

  const handleInputChange = (fieldName, value) => {
    // Regex patterns for validation
    const regexPatterns = {
      fullName: /^[a-zA-Z ]*$/,
      city: /^[a-zA-Z ]*$/,
      state: /^[a-zA-Z ]*$/,
      address: /^[a-zA-Z0-9,.\s]+$/,
    };

    // Check if the value matches the regex pattern
    const isValid = regexPatterns[fieldName].test(value);

    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: {
        value,
        error: isValid ? '' : `Invalid ${fieldName}`,
      },
    }));
  };
  const submitUser = async () => {

    const allFields = Object.keys(user).map((key) => user[key].error);
    if (allFields.some((error) => error !== '')) {
      return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append('id', userDetail.id);
    formData.append('name', user.fullName.value);
    formData.append('date_of_birth', formatDate(date));
    formData.append('city', user.city.value);
    formData.append('address', user.address.value);
    formData.append('state', user.state.value);
    await updateUser(formData).then((res) => {
      console.log(res)
      setDisableInputs(true)
      setLoading(false)
      getuser(userDetail.id).then((res) => {
        console.log("details", res.data)
        setUserDetail(res.data)
      })
    })

  };
  const uploadFile = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        ShowToast('Permission to access media library was denied');
        return;
      }

      const pickerResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      });
      if (pickerResponse.cancelled) {
        console.log('User cancelled image picker');
      } else {
        console.log('Image picked:', pickerResponse?.assets[0]?.uri);
        console.log("pickerResponse", pickerResponse.assets)
        const uri = pickerResponse?.assets[0]?.uri;
        const formData = new FormData();
        formData.append('id', userDetail.id);
        formData.append('profile', {
          name: uri.substring(uri.lastIndexOf('/') + 1),
          uri: uri,
          type: pickerResponse?.assets[0]?.mimeType,
        });
        // Make a fetch request to your API to update the profile image
        console.log("formData", formData)
        updateUser(formData).then((res) => {
          console.log("api res", res)
          getuser(userDetail.id)
            .then((res) => {
              setUserDetail(res.data);
              console.log("profile", res.data)

            })
        })
      }
    } catch (error) {
      console.error('Error selecting image: ', error);
    }
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator animating={true} size='large' color={theme.colors.blue} style={globalStyles.loading} />
      ) : ''}
      <View style={globalStyles.container}>
        <Header title="My Profile" navigation={navigation} />
        <View style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
          <View style={[styles.playGameBox, globalStyles.containerPadding]}>
            <View style={[styles.coinTop]}>
              <View style={[globalStyles.displayRowbetween, { justifyContent: 'flex-start' }, { alignItems: 'center' }, { paddingHorizontal: 20 }]}>
                <View style={{ position: 'relative' }}>
                  <Icon onPress={uploadFile} name="pencil" color={globalStyles.backgroundColor.primaryBlue} size={15} style={{ position: 'absolute', bottom: 0, right: 15, zIndex: 99, backgroundColor: '#ffffffbd', padding: 3, borderRadius: 50 }} />
                  {userDetail.profile != null ? (
                    <Image
                      source={{ uri: `${baseaddress}/upload/${userDetail.profile}` }}
                      style={{
                        width: 70,
                        height: 70,
                        marginRight: 10,
                        objectFit: 'contain',
                        borderRadius: 50
                      }}
                    />
                  ) : (
                    <Icon name="user-large" color="#fff" size={60} style={{ marginRight: 10 }} />
                  )}
                </View>
                <View>
                  <Text variant="titleLarge" style={[{ color: theme.colors.whiteColor }, { fontWeight: '700' }]}>
                    {userDetail.name}</Text>
                  <Text variant="labelMedium" style={[{ color: theme.colors.whiteColor }]}>
                    {userDetail.email}</Text>
                  <View style={[globalStyles.displayRowCenter, { justifyContent: 'flex-start' }, { alignItems: 'center' },]}>
                    <Text variant="titleSmall" style={[{ color: theme.colors.whiteColor }]}>
                      {userDetail.mobile} </Text>
                    <MaterialIcons name="verified" color="#fff" size={18} />
                  </View>
                </View>
              </View>
            </View>
            <View style={globalStyles.displayRowbetween}>
              <View style={[styles.coinsTop]}>
                <Text variant="bodyLarge" style={[{ color: theme.colors.whiteColor }, { fontWeight: '700' }]}>Contest</Text>
                <View style={globalStyles.displayRowCenter}>
                  <MaterialIcons name="file-present" color='#FFCE6D' size={25} style={{ marginRight: 3 }} />
                  <Text variant="titleLarge" style={[{ color: theme.colors.whiteColor }]}>
                    3</Text></View>
              </View>
              <View style={[styles.coinsTop]}>
                <Text variant="bodyLarge" style={[{ color: theme.colors.whiteColor }, { fontWeight: '700' }]}>Win Amount</Text>
                <View style={globalStyles.displayRowCenter}>
                  <MaterialIcons name="currency-rupee" color={theme.colors.yellowCOlor} size={25} style={{ marginRight: 3 }} />
                  <Text variant="titleLarge" style={[{ color: theme.colors.whiteColor }]}>
                    {userDetail.win_coin}</Text></View>
              </View>
              <View style={[styles.coinsTop]}>
                <Text variant="bodyLarge" style={[{ color: theme.colors.whiteColor }, { fontWeight: '700' }]}>Wins</Text>
                <View style={globalStyles.displayRowCenter}>
                  <Icon name="trophy" color={theme.colors.greenColor} size={25} style={{ marginRight: 3 }} />
                  <Text variant="titleLarge" style={[{ color: theme.colors.whiteColor }]}>
                    3</Text></View>
              </View>
            </View>
          </View>
          <View style={[styles.playGameBox, globalStyles.displayRowbetween, { paddingHorizontal: 10 }]}>
            <Text variant="bodySmall" style={[{ color: theme.colors.whiteColor }, { textAlign: 'center' }]}>KYC Verfication Status: Not Update </Text>
            {/* <Text variant="bodySmall" style={[{color:theme.colors.whiteColor}, {textAlign: 'center'}]}>Update</Text> */}
            <Button buttonColor='#FFCE6D' textColor='#000' labelStyle={{ paddingVertical: 0, fontSize: 15, height: 20 }} style={{ padding: 0 }} mode="contained" >
              Update
            </Button>
          </View>
          <View style={[globalStyles.displayRowbetween, { alignItems: 'center' }]}>
            <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize18 }, { fontWeight: '700' }]} >Update Profile Details</Text>
            <Text variant="titleMedium" style={[globalStyles.simpleButton]} onPress={() => setDisableInputs(false)}>Edit Details</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.detailBox}>
            <View style={[{ paddingVertical: 0 }]}>
              <Text variant="titleSmall" style={[{ color: theme.colors.whiteColor }]}>Full Name</Text>
              <TextInput
                mode="flat"
                value={!disableInputs ? user.fullName.value : userDetail.name}
                disabled={disableInputs}
                onChangeText={(text) => handleInputChange('fullName', text)}
                error={user.fullName.error !== ''}
                outlineColor={theme.colors.gray}
                selectionColor={theme.colors.whiteColor}
                activeOutlineColor={theme.colors.whiteColor}
                style={styles.textInput}
                textColor="#fff"
              />
              <Text style={{ color: 'red' }}>{user.fullName.error}</Text>
            </View>
            <View style={[{ paddingVertical: 8 }, { position: 'relative' }]}>
              <Text variant="titleSmall" style={[{ color: theme.colors.whiteColor }]}>Date of Birth</Text>
              <TextInput
                mode="flat"
                value={!disableInputs ? formatDate(date) : userDetail.date_of_birth}
                disabled={true}
                error={user.dob.error !== ''}
                outlineColor={theme.colors.gray}
                selectionColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                style={styles.textInput}
                textColor="#fff"
              />

              {!disableInputs && <>
                <TouchableOpacity onPress={() => { setOpen(true), console.log("Click") }} style={{ position: 'absolute', top: 0, width: "100%", height: "100%", right: 0, }}>
                  <Icon name="calendar-days" color="#fff" size={20} style={{ position: 'absolute', top: "50%", right: 15, transform: [{ translateY: 10 }] }} />
                </TouchableOpacity>
                {open &&
                  <DateTimePicker
                    mode="date"
                    maximumDate={new Date('2005-01-01')}
                    minimumDate={new Date('1970-01-01')}
                    value={date}
                    onChange={(event, selectedDate) => {
                      setOpen(false);
                      setDate(selectedDate || date);
                    }}
                  />
                }
              </>
              }
            </View>
            <View style={[{ paddingVertical: 8 }]}>
              <Text variant="titleSmall" style={[{ color: theme.colors.whiteColor }]}>Address</Text>
              <TextInput
                mode="flat"
                value={!disableInputs ? user.address.value : userDetail.address}
                disabled={disableInputs}
                onChangeText={(text) => handleInputChange('address', text)}
                outlineColor={theme.colors.gray}
                selectionColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                style={styles.textInput}
                textColor="#fff"
              />
            </View>
            <View style={[{ paddingVertical: 8 }]}>
              <Text variant="titleSmall" style={[{ color: theme.colors.whiteColor }]}>City</Text>
              <TextInput
                mode="flat"
                value={!disableInputs ? user.city.value : userDetail.city}
                disabled={disableInputs}
                onChangeText={(text) => handleInputChange('city', text)}
                outlineColor={theme.colors.gray}
                selectionColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                style={styles.textInput}
                textColor="#fff"
              />
            </View>
            <View style={[{ paddingVertical: 8 }]}>
              <Text variant="titleSmall" style={[{ color: theme.colors.whiteColor }]}>State</Text>
              <TextInput
                mode="flat"
                value={!disableInputs ? user.state.value : userDetail.state}
                disabled={disableInputs}
                onChangeText={(text) => handleInputChange('state', text)}
                error={user.state.error !== ''}
                outlineColor={theme.colors.gray}
                selectionColor={theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                style={styles.textInput}
                textColor="#fff"
              />
            </View>
            <View style={[{ paddingVertical: 8 }]}>
              <Text variant="titleSmall" style={[{ color: theme.colors.whiteColor }]}>Invite Code</Text>
              <Text variant="titleMedium" style={[{ color: theme.colors.whiteColor }, { lineHeight: 20 }, { width: '70%' }]}>KC4582</Text>
            </View>
          </View>
          {disableInputs ? "" : <Button style={{ margin: 15 }} buttonColor='#FFCE6D' textColor='#000' labelStyle={{ paddingVertical: 0 }} disabled={user.fullName.value == ""} mode="contained" onPress={submitUser}>
            Submit
          </Button>}
        </ScrollView>
      </View>
    </>
  )
}

export default Myprofile;

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
    // alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    paddingBottom: 10
  },
  coinsTop: {
    alignItems: 'center',
    width: '33%',
    paddingTop: 5
  },
  detailBox: {
    backgroundColor: "#0C225ED4",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 15
  },
  textInput: {
    marginTop: 0,
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    color: "#fff"
  },
})