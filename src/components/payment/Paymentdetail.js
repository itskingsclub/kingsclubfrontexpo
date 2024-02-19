import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Text, Modal, Portal, TextInput, useTheme, RadioButton, ActivityIndicator, Divider } from 'react-native-paper';
import globalStyles from '../../../globalstyle';
import Header from '../header/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Clipboard from 'expo-clipboard';
import ShowToast from '../../utility/ShowToast';

const Paymentdetail = ({ navigation }) => {
    const theme = useTheme();
    const copyRoomCodeToClipboard = (data, which) => {
        if (data) {
            Clipboard.setString(data);
            ShowToast(`${which} copied successfully!`);
        }
    };

    return (
        <>
            <View style={globalStyles.container}>
                <Header title="Payment Details" navigation={navigation} />
                <ScrollView style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
                    <View style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 5 }, { marginBottom: 10 }]}>
                        <Text variant="titleLarge" style={{ textAlign: 'center', marginBottom: 10 }}>Bank Detail</Text>
                        <View style={[{ flexDirection: 'row' }]}>
                            <Text variant="titleMedium" style={{ width: '40%' }}>Account No:-</Text>
                            <TouchableOpacity onPress={() => copyRoomCodeToClipboard("123456789@paytm", "Account No")} style={{ width: '60%' }}>
                                <Text variant="titleMedium">12345678945678 <MaterialCommunityIcons name="content-copy" color="#028907" size={18} /></Text>
                            </TouchableOpacity>
                        </View>
                        <Divider />
                        <View style={[{ flexDirection: 'row' }]}>
                            <Text variant="titleMedium" style={{ width: '40%' }}>IFSC Code:-</Text>
                            <TouchableOpacity onPress={() => copyRoomCodeToClipboard("123456789@paytm", "IFSC Code")} style={{ width: '60%' }}>
                                <Text variant="titleMedium">12345678945678 <MaterialCommunityIcons name="content-copy" color="#028907" size={18} /></Text>
                            </TouchableOpacity>
                        </View>
                        <Divider />
                        <View style={[{ flexDirection: 'row' }]}>
                            <Text variant="titleMedium" style={{ width: '40%' }}>Account Holder:-</Text>
                            <Text variant="titleMedium" style={{ width: '60%' }}>Mukesh Jat</Text>
                        </View>
                    </View>
                    <View style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 5 }, { marginBottom: 10 }]}>
                        <Text variant="titleLarge" style={{ textAlign: 'center', marginBottom: 10 }}>UPI Detail</Text>
                        <View style={[{ flexDirection: 'row' }]}>
                            <Text variant="titleMedium" style={{ width: '40%' }}>Paytm:-</Text>
                            <TouchableOpacity onPress={() => copyRoomCodeToClipboard("123456789@paytm", "Paytm UPI")} style={{ width: '60%' }}>
                                <Text variant="titleMedium">123456789@paytm <MaterialCommunityIcons name="content-copy" color="#028907" size={18} /></Text>
                            </TouchableOpacity>
                        </View>
                        <Divider />
                        <View style={[{ flexDirection: 'row' }]}>
                            <Text variant="titleMedium" style={{ width: '40%' }}>Phone pay:-</Text>
                            <TouchableOpacity onPress={() => copyRoomCodeToClipboard("123456789@paytm", "Phonepay UPI")} style={{ width: '60%' }}>
                                <Text variant="titleMedium">123456789@ybl <MaterialCommunityIcons name="content-copy" color="#028907" size={18} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 5 }, { marginBottom: 10 }]}>
                        <Text variant="titleLarge" style={{ textAlign: 'center', marginBottom: 10 }}>QR Code Detail</Text>
                        <View style={[{ flexDirection: 'row' }]}>
                            <Image source={require('../../../assets/images/qr.jpg')}
                                style={{
                                    width: 400,
                                    height: 280,
                                    objectFit: 'contain',
                                }} />
                        </View>
                        {/* <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
                            <TouchableOpacity >
                                <Text variant="titleMedium" style={{ textAlign: 'center' }}>Download QR Code</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ScrollView>
                <View style={globalStyles.displayRowbetween}>
                    <Button style={[{ borderRadius: 0 }, { width: '100%' }, { backgroundColor: '#CBFFC5' }]} textColor='#000' mode="contained" onPress={() => navigation.navigate("depositcoin")}>
                        Continue
                    </Button>
                </View>
            </View>
        </>
    )
}

export default Paymentdetail


const styles = StyleSheet.create({

})