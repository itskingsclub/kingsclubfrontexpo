import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import globalStyles from '../../../globalstyle';
import { Button, useTheme, Text, Chip, Avatar, ActivityIndicator } from 'react-native-paper';
import { UserContext } from '../../userDetail/Userdetail';
import Header from '../header/Header';


const Addcoin = ({ navigation }) => {
    const theme = useTheme();
    const { userDetail, setUserDetail } = useContext(UserContext)

    return (
        <>
            <View style={globalStyles.container}>
                <Header title="Add Coin" navigation={navigation} />

            </View>
        </>
    )
}

export default Addcoin

const styles = StyleSheet.create({})