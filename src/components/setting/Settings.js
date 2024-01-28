import { StyleSheet, View,TouchableOpacity,ScrollView, Image } from 'react-native'
import React, {useState} from 'react'
import globalStyles from '../../../globalstyle';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { } from 'react-native-paper';
import {  Text,useTheme, Button } from 'react-native-paper';
import Header from '../header/Header';

const Settings = ({navigation}) => {
  const theme = useTheme();
  return (
   <>
   <View style={globalStyles.container}>
   <Header title="Setting" navigation={navigation}/>
    <View style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
        <TouchableOpacity onPress={()=>navigation.navigate('termscondition')} style={[globalStyles.contactusBox, globalStyles.transBox, globalStyles.displayRowbetween, {paddingHorizontal:10}, {marginBottom:10}]}>
            <Text variant='titleMedium'>Terms & Condition</Text>
            <Feather name="plus" color="#000" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.contactusBox, globalStyles.transBox, globalStyles.displayRowbetween, {paddingHorizontal:10}, {marginBottom:10}]}>
            <Text variant='titleMedium'>Privacy & Policy</Text>
            <Feather name="plus" color="#000" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.contactusBox, globalStyles.transBox, globalStyles.displayRowbetween, {paddingHorizontal:10}, {marginBottom:10}]}>
            <Text variant='titleMedium'>Diposit Policy</Text>
            <Feather name="plus" color="#000" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.contactusBox, globalStyles.transBox, globalStyles.displayRowbetween, {paddingHorizontal:10}, {marginBottom:10}]}>
            <Text variant='titleMedium'>Withdraw Policy</Text>
            <Feather name="plus" color="#000" size={24} />
        </TouchableOpacity>
    </View>
   </View>
   </>
  )
}

export default Settings;

const styles = StyleSheet.create({
    settingBox : {

    }
})