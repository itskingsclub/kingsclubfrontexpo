// import Addcoin from '../../modals/addcoin';
import { TouchableOpacity, View, Appearance } from 'react-native'
import React, { useContext, useState } from 'react'
import globalStyles from '../../../globalstyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Modal, Portal, TextInput, useTheme, RadioButton } from 'react-native-paper';
import Addcoinmodal from '../../modals/Addcoinmodal';
import { UserContext } from '../../userDetail/Userdetail'

const Header = ({ title, icon, navigation, color }) => {
  const theme = useTheme();
  const { userDetail } = useContext(UserContext);
  return (
    <>
      <View style={globalStyles.topMobile}></View>
      <View style={[globalStyles.topHeader, { backgroundColor: color ? color : "#fff" }]}>
        <View style={globalStyles.leftHeader}>
          {icon ? <TouchableOpacity onPress={() => {
            navigation.openDrawer();
          }}>
            <MaterialCommunityIcons name="menu" color="#000" size={24} />
          </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" color={color ? "#fff" : "#000"} size={24} />
            </TouchableOpacity>
          }
          <Text style={[globalStyles.headerTitle, { color: color ? "#fff" : "#000" }]}>{title}</Text>
        </View>
        <Button icon="plus" buttonColor='#FFCE6D' textColor='#000' labelStyle={{ paddingVertical: 0 }} mode="contained" onPress={() => navigation.navigate("paymentdetail")}>
          {userDetail.game_coin + userDetail.win_coin + userDetail.refer_coin}
        </Button>
      </View>
    </>
  )
}

export default Header