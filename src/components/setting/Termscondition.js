import { StyleSheet, View,TouchableOpacity,ScrollView, Image } from 'react-native'
import React, {useState} from 'react'
import globalStyles from '../../../globalstyle';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { } from 'react-native-paper';
import {  Text,useTheme, Button } from 'react-native-paper';
import Header from '../header/Header';

const Termscondition = ({navigation}) => {
  const theme = useTheme();
  return (
   <>
   <View style={globalStyles.container}>
   <Header title="Terms & Condition" navigation={navigation} color="#0C225E"/>
    <View style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
       <Text variant='headlineMedium' style={globalStyles.textHeading}>Terms and Condition</Text>
       <Text style={globalStyles.textContent}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti officiis velit sequi eligendi, maiores hic porro temporibus corporis adipisci repellat eos optio neque doloribus accusamus?
       </Text>
       <Text style={globalStyles.textContentHeading}>Use of Content</Text>
       <Text style={globalStyles.textContent}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti officiis velit sequi eligendi, maiores hic porro temporibus corporis adipisci repellat eos optio neque doloribus accusamus?
       </Text>
       <View style={{marginVertical: 10}}>
       <Text style={[globalStyles.listItemText, globalStyles.listItemText2]}>1. kjahd adalkdalkd ald aldalkd </Text>
       <Text style={[globalStyles.listItemText, globalStyles.listItemText2]}>2. kjahd adalkdalkd ald aldalkd </Text>
       <Text style={[globalStyles.listItemText, globalStyles.listItemText2]}>3. kjahd adalkdalkd ald aldalkd </Text>
       <Text style={[globalStyles.listItemText, globalStyles.listItemText2]}>4. kjahd adalkdalkd ald aldalkd </Text>
       </View>
    </View>
   </View>
   </>
  )
}

export default Termscondition;

const styles = StyleSheet.create({
})