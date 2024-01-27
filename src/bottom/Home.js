import {  ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../../globalstyle';
import { useTheme, Button } from 'react-native-paper';
import Header from '../components/header/Header';

const Home = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={globalStyles.container}> 
      <Header title="Home" icon={true}  navigation={navigation} />
      <ScrollView style={globalStyles.containerMain} contentContainerStyle={globalStyles.scrollContainer}>
    <View style={styles.playGameBox}>
          {/* <Image source={{uri: '../../assets/images/startludo.png'}} /> */}
          <Image
                source={require('../../assets/images/startludo.png')}
                style={{
                  width: 180,
                  height: 150,
                }}
                />
                <View style={styles.playGameBoxContent}>
                  <Text style={[{color:theme.colors.whiteColor}, {fontSize: globalStyles.fonts.fontSize18},{fontWeight: '700'}]}>Start Play and Earn{'\n'}Money</Text>
                  <TouchableOpacity style={globalStyles.normalButton}  onPress={()=>navigation.navigate('gametable')}>
            <Text style={[globalStyles.normalButtonText, {color:globalStyles.backgroundColor.primaryBlue}, {fontSize:globalStyles.fonts.fontSize14}, {fontWeight: '700'}]}>Play Games</Text>
        </TouchableOpacity>
                </View>
        </View>
        <View style={[globalStyles.displayRowbetween, {marginBottom: 20}, {margintop: 40}]}>
          <TouchableOpacity style={styles.categoryBox} onPress={()=>navigation.navigate('leaderboard')}>
          <View style={[styles.categoryBoxImage, globalStyles.displayRowCenter,]}>
                <Image source={require('../../assets/images/trophy.png')} />
          </View>
          <Text style={[{fontSize:globalStyles.fonts.fontSize10}, {color: globalStyles.textColor.blackColor}, {textAlign: 'center'}, {fontFamily: 'Inter-Medium'}]}>Leaderboard</Text>
          </TouchableOpacity>
          <View style={styles.categoryBox}>
          <View style={[styles.categoryBoxImage, globalStyles.displayRowCenter,]}>
                <Image source={require('../../assets/images/frnds.png')} />
          </View>
          <Text style={[{fontSize:globalStyles.fonts.fontSize10}, {color: globalStyles.textColor.blackColor}, {textAlign: 'center'}]}>Friends</Text>
          </View>
          <TouchableOpacity style={styles.categoryBox} onPress={()=>navigation.navigate('setting')}>
          <View style={[styles.categoryBoxImage, globalStyles.displayRowCenter,]}>
                <Image source={require('../../assets/images/settings.png')} />
          </View>
          <Text style={[{fontSize:globalStyles.fonts.fontSize10}, {color: globalStyles.textColor.blackColor}, {textAlign: 'center'}]}>Setting</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.playGameBox}>
          {/* <Image source={{uri: '../../assets/images/startludo.png'}} /> */}
          <Image
                source={require('../../assets/images/startludo.png')}
                style={{
                  width: 180,
                  height: 150,
                }}
                />
                <View style={styles.playGameBoxContent}>
                  <Text style={[{color:theme.colors.whiteColor}, {fontSize: globalStyles.fonts.fontSize18},{fontWeight: '700'}]}>Start Play and Earn{'\n'}Money</Text>
                  <TouchableOpacity style={globalStyles.normalButton}>
            <Text style={[globalStyles.normalButtonText, {color:globalStyles.backgroundColor.primaryBlue}, {fontSize:globalStyles.fonts.fontSize14}, {fontWeight: '700'}]} onPress={()=>console.log("click")}>My Profile</Text>
        </TouchableOpacity>
                </View>
        </View>
        <View style={styles.playGameBox}>
          {/* <Image source={{uri: '../../assets/images/startludo.png'}} /> */}
          <Image
                source={require('../../assets/images/startludo.png')}
                style={{
                  width: 180,
                  height: 150,
                }}
                />
                <View style={styles.playGameBoxContent}>
                  <Text style={[{color:theme.colors.whiteColor}, {fontSize: globalStyles.fonts.fontSize18},{fontWeight: '700'}]}>Start Play and Earn{'\n'}Money</Text>
                  <TouchableOpacity style={globalStyles.normalButton}  onPress={()=>navigation.navigate('myprofile2')}>
            <Text style={[globalStyles.normalButtonText, {color:globalStyles.backgroundColor.primaryBlue}, {fontSize:globalStyles.fonts.fontSize14}, {fontWeight: '700'}]}>My Profile 2</Text>
        </TouchableOpacity>
                </View>
        </View>
        <View style={styles.playGameBox}>
          {/* <Image source={{uri: '../../assets/images/startludo.png'}} /> */}
          <Image
                source={require('../../assets/images/startludo.png')}
                style={{
                  width: 180,
                  height: 150,
                }}
                />
                <View style={styles.playGameBoxContent}>
                  <Text style={[{color:theme.colors.whiteColor}, {fontSize: globalStyles.fonts.fontSize18},{fontWeight: '700'}]}>Start Play and Earn{'\n'}Money</Text>
                  <TouchableOpacity style={globalStyles.normalButton}>
            <Text style={[globalStyles.normalButtonText, {color:globalStyles.backgroundColor.primaryBlue}, {fontSize:globalStyles.fonts.fontSize14}, {fontWeight: '700'}]} onPress={()=>navigation.navigate('gametable')}>Play Games</Text>
        </TouchableOpacity>
                </View>
        </View>
    </ScrollView>
    </View>
  )
}

export default Home


const styles = StyleSheet.create({
  playGameBox: {
    borderRadius: 8,
    backgroundColor: globalStyles.backgroundColor.primaryBlue,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
     justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryBoxImage : {
    backgroundColor: globalStyles.backgroundColor.primaryBlue,
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom:0
  }
})