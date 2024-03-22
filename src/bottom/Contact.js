import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Linking } from 'react-native'
import React from 'react'
import globalStyles from '../../globalstyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { } from 'react-native-paper';
import { Text, useTheme, Button } from 'react-native-paper';
import Header from '../components/header/Header';

const Contact = ({ navigation }) => {
  const theme = useTheme();
  return (
    <>
      <View style={globalStyles.container}>
        <Header title="Contact Us" icon={true} navigation={navigation} />
        <ScrollView>
          <View style={[globalStyles.displaycolumn]}>
            <Image source={require('../../assets/images/Support.png')}
              style={{
                width: 400,
                height: 280,
                objectFit: 'contain',
              }} />
            <Text variant='titleLarge'>Customer Support</Text>
            <Text variant='titleMedium'>Available 24*7</Text>
          </View>
          <View style={[globalStyles.scrollContainer, { paddingTop: 16 },]}>
            <TouchableOpacity style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 5 }]}
              onPress={() => { Linking.openURL(`whatsapp://send?phone=9116724908`) }} >
              <View style={[globalStyles.displayRowbetween, { justifyContent: 'flex-start' }]}>
                <View style={[globalStyles.transIcon, globalStyles.displaycolumn, { backgroundColor: "#4CAF51" }, { marginRight: 10 }]}>
                  {/* <View style={globalStyles.transIcon2}> */}
                  <MaterialCommunityIcons name="whatsapp" color={theme.colors.primary} size={36} />
                  {/* </View> */}
                </View>
                <View>
                  <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >Tap here to Whatsapp</Text>
                  <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize10 }, { fontWeight: '700' }, { lineHeight: 12 }]} >Write your issue on Whatsapp no - 98765432111</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 5 }]}
              onPress={() => { Linking.openURL(`https://t.me/@mukeshjat4908`) }} >
              <View style={[globalStyles.displayRowbetween, { justifyContent: 'flex-start' }]}>
                <View style={[globalStyles.transIcon, globalStyles.displaycolumn, { backgroundColor: "#2196F3" }, { marginRight: 10 }]}>
                  {/* <View style={globalStyles.transIcon2}> */}
                  <EvilIcons name="sc-telegram" color={theme.colors.primary} size={36} />
                  {/* </View> */}
                </View>
                <View>
                  <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >Tap here to Telegram</Text>
                  <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize10 }, { fontWeight: '700' }, { lineHeight: 12 }]} >Write your issue on Telegram no - 98765432111</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 5 }]}
              onPress={() => { Linking.openURL(`mailto:kingsclub@gmail.com`) }} >
              <View style={[globalStyles.displayRowbetween, { justifyContent: 'flex-start' }]}>
                <View style={[globalStyles.transIcon, globalStyles.displaycolumn, { backgroundColor: "#F44236" }, { marginRight: 10 }]}>
                  {/* <View style={globalStyles.transIcon2}> */}
                  <MaterialCommunityIcons name="email-outline" color={theme.colors.primary} size={36} />
                  {/* </View> */}
                </View>
                <View>
                  <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >Tap here to  Gmail</Text>
                  <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize10 }, { fontWeight: '700' }, { lineHeight: 12 }]} >Write your issue on Gamil ID - kingsClub@gmail.com</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={[styles.playGameBox, { marginTop: 20 }]}>
              <Text variant="bodySmall" style={[{ color: theme.colors.whiteColor }, { textAlign: 'center' }, { paddingHorizontal: 20 }]}>Please write your problem one of these option and we will help you out in the next 15 minutes. </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default Contact

const styles = StyleSheet.create({
  playGameBox: {
    borderRadius: 8,
    backgroundColor: globalStyles.backgroundColor.primaryBlue,
    paddingVertical: 5,
    alignItems: 'center',
    marginBottom: 7,
  },
})