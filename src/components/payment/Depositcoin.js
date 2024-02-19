import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Text, Modal, Portal, TextInput, useTheme, RadioButton, ActivityIndicator } from 'react-native-paper';
import Header from '../header/Header';
import globalStyles from '../../../globalstyle';
import { UserContext } from '../../userDetail/Userdetail';
import { deposit } from '../../service/apicalls';
import ShowToast from '../../utility/ShowToast';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const Depositcoin = ({ navigation }) => {
    const theme = useTheme();
    const { userDetail, setUserDetail } = useContext(UserContext);
    const [coin, setCoin] = useState('100');
    const [loading, setLoading] = useState(false)
    const [pickerResponse, setPickerResponse] = useState(null);

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

    const makePayment = () => {
        if (pickerResponse === null) {
            ShowToast("Please select screenshot first")
        } else {
            setLoading(true)
            const uri = pickerResponse[0].uri;
            const formData = new FormData();
            formData.append('user_id', userDetail.id);
            formData.append('amount', Number(coin));
            formData.append('image', {
                name: uri.substring(uri.lastIndexOf('/') + 1),
                type: pickerResponse[0].mimeType,
                uri: uri,
            });
            deposit(formData).then((res) => {
                if (res.success) {
                    ShowToast(res?.message)
                    navigation.navigate("paymentdetail")
                } else {
                    ShowToast(res?.message)
                }
                setLoading(false)
            })
        }
    };

    return (
        <>
            {loading ? (
                <ActivityIndicator animating={true} size='large' color={globalStyles.backgroundColor.primaryBlue} />
            ) : (
                <>
                    <View style={globalStyles.container}>
                        <Header title="Add Coin" navigation={navigation} />
                        <ScrollView style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
                            {/* <View style={styles.coinModal}> */}

                            <View style={[globalStyles.boxshodowbox, { justifyContent: 'space-between' }, { alignItems: 'center' }, { overflow: 'hidden' }, { marginTop: 10 }]}>
                                {pickerResponse != null ? "" : <Text>here the screen shot</Text>}
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
                                    UPLOAD PAYMENT SCREENSHOT
                                </Button>
                            </View>
                        </ScrollView>
                        <View style={globalStyles.displayRowbetween}>
                            <Button style={[{ borderRadius: 0 }, { width: '100%' }, { backgroundColor: '#CBFFC5' }]} textColor='#000' mode="contained" onPress={makePayment}>
                                Submit
                            </Button>
                        </View>
                    </View>
                </>
            )}
        </>
    )
}

export default Depositcoin


const styles = StyleSheet.create({
    coinModal: {
        // paddingVertical: 15,
        paddingHorizontal: 20,
        paddingBottom: 30
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