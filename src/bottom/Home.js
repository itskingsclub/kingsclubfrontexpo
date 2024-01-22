import { TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import globalStyles from '../../globalstyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Modal, Portal, TextInput, useTheme, RadioButton } from 'react-native-paper';

const Home = ({navigation}) => {
  return (
    <View style={{paddingTop:100}}> 
       <View style={[globalStyles.topHeader, {backgroundColor: "#fff"}]}>
    <View style={globalStyles.leftHeader}>
       <TouchableOpacity onPress={() => {
    navigation.openDrawer();
  }}>
          <MaterialCommunityIcons name="menu" color="#000" size={24} />
          </TouchableOpacity>
          <Text style={globalStyles.headerTitle}>Home</Text>
        </View>
        <Button icon="plus" buttonColor='#FFCE6D' textColor='#000' labelStyle={{paddingVertical:0}} mode="contained">
    500
  </Button>
    </View>
      <Text>Home</Text>
    </View>
  )
}

export default Home
