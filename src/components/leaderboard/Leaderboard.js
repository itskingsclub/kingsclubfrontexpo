import { StyleSheet, View,TouchableOpacity,ScrollView, Image } from 'react-native'
import React, {useState} from 'react'
import globalStyles from '../../../globalstyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { } from 'react-native-paper';
import {  Text,useTheme, Button } from 'react-native-paper';
import Header from '../header/Header';

const Leaderboard = ({navigation}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  return (
   <>
   <View style={globalStyles.container}>
   <Header title="Leaderboard" navigation={navigation}/>
    
      <View style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
      <View style={globalStyles.displayRowCenter}>
      <Button onPress={() => handleTabClick('tab1')} buttonColor= {activeTab === 'tab1'? '#FFCE6D' : '#fff'} textColor='#000'  borderColor={activeTab === 'tab1'? '#000' : '#000'}  labelStyle={{ fontSize: 12, paddingVertical: 0, marginVertical: 3, marginHorizontal: 5, maxWidth: 25 }} contentStyle={{ height: 'auto'}} style={{margin: 0, borderWidth:1, borderStyle: 'solid',  borderColor: activeTab === 'tab1' ? '#FFCE6D' : '#000',}}mode="contained">All</Button>
      <Image
                source={require('../../../assets/images/logo.png')}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'contain',
                  marginHorizontal: 30
                }}
                />
     <Button onPress={() => handleTabClick('tab2')} buttonColor= {activeTab === 'tab2'? '#FFCE6D' : '#fff'} textColor='#000' borderColor='#000' labelStyle={{ fontSize: 12, paddingVertical: 0, marginVertical: 3, marginHorizontal: 5,}} contentStyle={{ height: 'auto'}} style={{margin: 0, borderWidth:1, borderStyle: 'solid',  borderColor: activeTab === 'tab2' ? '#FFCE6D' : '#000',}} mode="contained">win </Button>
      </View>
      <View style={[globalStyles.displayRowbetween, {marginTop:10}, {marginBottom:5}, {paddingHorizontal:20}]}>
      <Button buttonColor='#FFCE6D' textColor='#000' labelStyle={{ fontSize: 12, paddingVertical: 0, marginVertical: 3, marginHorizontal: 5, paddingHorizontal:5}} mode="contained">
   Special Offers
  </Button>
      <Button buttonColor='#FFCE6D' textColor='#000' labelStyle={{ fontSize: 12, paddingVertical: 0, marginVertical: 3, marginHorizontal: 5, paddingHorizontal:5}} mode="contained">
   Weekly
  </Button>
      <Button buttonColor='#FFCE6D' textColor='#000' labelStyle={{ fontSize: 12, paddingVertical: 0, marginVertical: 3, marginHorizontal: 5, paddingHorizontal:5}} mode="contained">
   Daily
  </Button>
      </View>
      </View>
      <ScrollView>
      {
        activeTab === 'tab1' && 
       <View style={ {paddingBottom:30}}>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween,]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} numberOfLines={1} ellipsizeMode="tail">Mukesh Jat sjdh sdhk dsd ksjdsk dksddjks  dksjd </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
          <View style={[globalStyles.transBox, globalStyles.displayRowbetween]}>
              <View style={[globalStyles.displayRowbetween, {gap: 8}]}>
              <Text  style={globalStyles.rankText} >#01</Text>
              <FontAwesome name="user-tie" color="#000" size={16} style={{marginHorizontal:8}} />
              <Text  style={globalStyles.rankText} >Mukesh Jat</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
              <Text  style={globalStyles.rankCount} >788</Text>
              </View>
          </View>
       </View>
    }
    {
      activeTab === 'tab2' && 
      <View>
        <Text>aadad</Text>
      </View>
    }
      </ScrollView>
   </View>
   </>
  )
}

export default Leaderboard;

const styles = StyleSheet.create({
  playGameBox : {
    borderRadius: 8,
    backgroundColor: globalStyles.backgroundColor.primaryBlue,
    paddingVertical: 5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  coinTop : {
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    paddingBottom: 10
  },
  coinsTop : {
    alignItems: 'center',
    width: '50%',
    paddingTop: 5
  },
})