import { StyleSheet, View, TouchableOpacity, ScrollView, Image, ToastAndroid} from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../../../globalstyle';
import { Button, useTheme, Text, Chip, Avatar, ActivityIndicator } from 'react-native-paper';
import Addcoinmodal from '../../modals/Addcoinmodal';
import { updateChallange, getChallange, myChallange, getuser } from '../../service/apicalls';
import { UserContext } from '../../userDetail/Userdetail';
import Header from '../header/Header';
import Createchallangemodal from '../../modals/Createchallangemodal';

const Gametable = ({navigation}) => {
    const theme = useTheme();
    const {userDetail, setUserDetail} = useContext(UserContext)
    const [challengs, setChallanges] = useState([])
    const [mychallengs, setmyChallanges] = useState([])
    const [visible, setVisible] = useState(false); 
    const [visiblemodal, setVisiblemodal] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    // const showModal = () => setVisible(true); 
    // const showModalChallange = () => setVisiblemodal(true); 
    // const hideModal = () => setVisible(false);
    // const hideModalChallange = () => setVisiblemodal(false);

    const [activeTab, setActiveTab] = useState('tab1');
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    useEffect(() => {
        refreshContent();
        refreshContent2();
    },[navigation])

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      };

    const refreshContent = async () => {
        setLoading(true); 
        await getChallange()
          .then((res) => {
            setChallanges(res.data);
            setLoading(false);
            console.log("all challenges",res)
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
          await  getuser(userDetail.id)
          .then((res) => {
            setUserDetail(res.data);
          })
      };
    const refreshContent2 = async () => {
        setLoading2(true); 
          const data = {
            id: 1
          }
     await  myChallange(data)
          .then((res) => {
            setmyChallanges(res.data);
            setLoading2(false);
            console.log("myChallanges",res.data)
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const challangeFunction = async (data) =>{
        const sendData = {
            id: data.id,
            joiner: userDetail.id,
            challenge_status: "Processing",
            updated_by: userDetail.id
        }
        console.log(data.amount > userDetail.amount)
        if(userDetail.total_coin >= data.amount){
        await updateChallange(sendData).then((res)=>{
         navigation.navigate('contest', {contestData: data})
        })  
        }else{
            ToastAndroid.show("You Don't have sufficient Coin to join", 3000)
        }
      }
      function determineResult(gameData, userId) {
        if (gameData.creator === userId) {
            return gameData.creator_result === "Win" ? "Win" : "Loss";
        } else if (gameData.joiner === userId) {
            return gameData.joiner_result === "Win" ? "Win" : "Loss";
        } else {
            // User is neither creator nor joiner
            return null;
        }
    }
  return (
    <>
    <View style={globalStyles.container}>
    <Header title="Game Table" navigation={navigation}/>
    <View style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
    <View style={[globalStyles.normalCard, {backgroundColor: globalStyles.backgroundColor.primaryBlue}, globalStyles.displayRowbetween]}>
        <View>
            <Text style={[{fontSize:globalStyles.fonts.fontSize24}, {color:globalStyles.textColor.whiteColor}, {fontWeight:'700'}]}>₹ {userDetail.total_coin} </Text>
            <Text variant="titleMedium" style={[{color:theme.colors.whiteColor}]}>Total Coin</Text>
        </View>
        <Image
                source={require('../../../assets/images/coin.png')}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: 'contain'
                }}
                />
    </View>
    <View style={{minHeight:136}}>
        <View style={[globalStyles.displayRowbetween, {marginVertical:5}]}>
        <Text  style={[{color:theme.colors.primary}, {fontSize:globalStyles.fonts.fontSize16}, {fontWeight:'700'}]} >My Challenge</Text>
        <Text style={[{color:theme.colors.yellowCOlor},{fontSize:globalStyles.fonts.fontSize16}, {fontWeight:'700'}]} >All Challenge</Text>
        </View>
        {loading2 ? (
           <ActivityIndicator animating={true} size='large' color={globalStyles.backgroundColor.primaryBlue} />
          ) : (
            <>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollViewContent}>
            {mychallengs && mychallengs.map((data, i)=>(
                <View style={globalStyles.challangeBox} key={i}>
                <View style={globalStyles.challangeBoxTop}>
                <View style={globalStyles.chip}  >
                    <Text variant="labelMedium" >KC34354</Text>
                </View>
                <Text variant="labelMedium" textColor={theme.colors.primary}> {data.challenge_status === "Clear" ? "Challange Completed" :  "Challenge Accepted" }</Text>
                <View style={[globalStyles.displayRowCenter, {gap:10}]}>
                <Avatar.Image size={24} style={{marginRight:5}} source={require('../../../assets/images/avatar.png')} />
                <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{overflow: 'hidden'}, {width:100}]}>Mukesh Jat ada adad das</Text>
                </View>
                </View>
                {data.challenge_status === 'Waiting' ? (
                    <>
                    <View style={[ globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2, {width: 360}]}>
                <Text variant="bodySmall" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:5}, {borderBottomLeftRadius:8}, {backgroundColor: '#FFE3A5'}]}>Waiting for joiner</Text>
                </View>
                    </>
                ) : data.challenge_status === "Processing" || data.challenge_status === "Playing" ? (
                    <>
                     <TouchableOpacity onPress={()=>navigation.navigate('contest', {contestData: data})}  style={[ globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2, {width: 360}]}>
                <Text variant="bodySmall" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:5}, {borderBottomLeftRadius:8}, {backgroundColor: '#FFE3A5'}]}>{data.challenge_status}</Text>
                </TouchableOpacity>
                    </>
                ) : data.challenge_status === "Clear" ?
                (
                    <>
                    <View style={[globalStyles.displayRowbetween, globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2]}>
                <Text variant="bodySmall" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:5}, {borderBottomLeftRadius:8}, {backgroundColor: '#CBFFC5'}]}> {determineResult(data, userDetail.id) === "Win" ? "You Win" : "You Lose"}</Text>
                <Text variant="bodySmall" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:5}, {borderBottomRightRadius:8}, {backgroundColor: '#CBFFC5'}]}>{(data.amount  - (data.amount * 10)/100) * 2} Coin</Text>
                </View>
                    </>
                ) :
                (
                    <>
                    <View style={[ globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2, {width: 360}]}>
                <Text variant="bodySmall" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:5}, {borderBottomLeftRadius:8}, {backgroundColor: '#FFE3A5'}]}>Under Review</Text>
                </View>
                    </>
                ) }
                
            </View>
            ))}
        </ScrollView>
            </>
          )}
    </View>
    <View style={[{marginTop:10}, {marginBottom:0}]}>
    <View style={[globalStyles.displayRowCenter, {marginBottom:5}, {columnGap: 20}]}>
        <Text  style={[{color:theme.colors.primary}, {fontSize:globalStyles.fonts.fontSize16}, {fontWeight:'700'}, {marginRight:20}]} >Live Challenges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[globalStyles.scrollViewContent, {gap:5}, {alignItems: 'center'}]}>
     <Button onPress={() => handleTabClick('tab1')} buttonColor= {activeTab === 'tab1'? '#757575' : '#E2E2E2'}  textColor={activeTab === 'tab1'? '#FFF' : '#333333'}  labelStyle={globalStyles.graySmallButton}  style={{marginRight: 4}} mode="contained">All</Button>
     <Button onPress={() => handleTabClick('tab2')} buttonColor= {activeTab === 'tab2'? '#757575' : '#E2E2E2'} textColor={activeTab === 'tab2'? '#FFF' : '#333333'} labelStyle={globalStyles.graySmallButton}  style={{marginRight: 4}} mode="contained">{"<"} 100 </Button>
     <Button onPress={() => handleTabClick('tab3')} buttonColor= {activeTab === 'tab3'? '#757575' : '#E2E2E2'} textColor={activeTab === 'tab3'? '#FFF' : '#333333'} labelStyle={globalStyles.graySmallButton}  style={{marginRight: 4}} mode="contained">100 - 500 </Button>
        </ScrollView>
        </View>
    </View>
    </View>
    <ScrollView  style={globalStyles.mainContainer}>
    {/* conent for all */}
    {
        activeTab === 'tab1' && 
    <View style={{position: 'relative'}}>
         {loading ? (
           <ActivityIndicator animating={true} size='large' color={globalStyles.backgroundColor.primaryBlue} style={globalStyles.loading2} />
          ) : (
            <>
        {challengs && challengs.map((data, i)=>(
             <View style={globalStyles.challangesBox} key={i}>
                <View style={globalStyles.challangeBoxTop}>
                <View style={[globalStyles.displayRowbetween, {gap:5}, {justifyContent: 'space-between'}, {alignItems: 'flex-end'}]}>
                    <View style={[{alignItems: 'center'}, {gap:5}, globalStyles.challangeschallenger]}>
                <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{overflow: 'hidden'}, {width:100}]}>{data.creatorUser.name}</Text>
                    </View>
                    <View style={globalStyles.challangeFor}>
                    <View style={[globalStyles.chip]}  >
                    <Text variant='labelMedium' style={{textAlign:'center'}}>KC - {data.id}</Text>
                </View>
                <Text variant="labelMedium" textColor={theme.colors.primary} >Has Challenge for</Text>
                <Text variant="titleMedium" style={{textAlign: 'center', color: theme.colors.red}} >{data.amount} Coins</Text>
                    </View>
                    <View style={[{alignItems: 'center'}, {gap:5}]}>
                <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{overflow: 'hidden'}, {width:100}]}>{data.challenge_status === 'Waiting' ? "Waiting" : data.joinerUser.name}</Text>
                    </View>
                </View>
                </View>
                <View style={[globalStyles.displayRowbetween, globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2]}>
                <Text variant="bodyMedium" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:2}, {borderBottomLeftRadius:8}, {backgroundColor: '#FFE3A5'}]}>Winning: {(data.amount - (data.amount * 10)/100) * 2}</Text>
                <Text variant="bodyMedium" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:2}, {borderBottomRightRadius:8}, {backgroundColor: '#CBFFC5'}]}
                 onPress={data.challenge_status === "Waiting" ? ()=>challangeFunction(data) : ()=>navigation.navigate('contest', {contestData: data})}>{data.challenge_status === "Waiting" ?  "Accept" : data.challenge_status }</Text>
                </View>
    </View>
        ))}
            </>
        )}
   
    </View>
    }
    {/* conent for < 50 */}
    {
        activeTab === 'tab2' && 
    <View >
   {challengs && challengs.filter(challenge => challenge.amount < 100).map((data, i)=>(
             <View style={globalStyles.challangesBox} key={i}>
                <View style={globalStyles.challangeBoxTop}>
                <View style={[globalStyles.displayRowbetween, {gap:5}, {justifyContent: 'space-between'}, {alignItems: 'flex-end'}]}>
                    <View style={[{alignItems: 'center'}, {gap:5}, globalStyles.challangeschallenger]}>
                <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{overflow: 'hidden'}, {width:100}]}>Mukesh Jat ada adad das</Text>
                    </View>
                    <View style={globalStyles.challangeFor}>
                    <View style={[globalStyles.chip]}  >
                    <Text variant='labelMedium'>KC - {data.id + 10000}</Text>
                </View>
                <Text variant="labelMedium" textColor={theme.colors.primary} >Has Challenge for</Text>
                <Text variant="titleMedium" style={{textAlign: 'center', color: theme.colors.red}} >{data.amount} Coins</Text>
                    </View>
                    <View style={[{alignItems: 'center'}, {gap:5}]}>
                <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{overflow: 'hidden'}, {width:100}]}>{data.challenge_status === 'Waiting' ? "Waiting" : "joiner name"}</Text>
                    </View>
                </View>
                </View>
                <View style={[globalStyles.displayRowbetween, globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2]}>
                <Text variant="bodyMedium" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:2}, {borderBottomLeftRadius:8}, {backgroundColor: '#FFE3A5'}]}>Winning: 90</Text>
                <Text variant="bodyMedium" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:2}, {borderBottomRightRadius:8}, {backgroundColor: '#CBFFC5'}]} onPress={()=>navigation.navigate('contest')}> {contestData.challenge_status === "Waiting" ?  "Accept" : contestData.challenge_status }</Text>
                </View>
    </View>
        ))}
    </View>
}
    {/* conent for 50 -100 */}
    {
        activeTab === 'tab3' && 
    <View >
      {challengs && challengs.filter(challenge => challenge.amount >= 100 && challenge.amount <= 500).map((data, i)=>(
             <View style={globalStyles.challangesBox} key={i}>
                <View style={globalStyles.challangeBoxTop}>
                <View style={[globalStyles.displayRowbetween, {gap:5}, {justifyContent: 'space-between'}, {alignItems: 'flex-end'}]}>
                    <View style={[{alignItems: 'center'}, {gap:5}, globalStyles.challangeschallenger]}>
                <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{overflow: 'hidden'}, {width:100}]}>Mukesh Jat ada adad das</Text>
                    </View>
                    <View style={globalStyles.challangeFor}>
                    <View style={[globalStyles.chip]}  >
                    <Text variant='labelMedium'>KC - {data.id + 10000}</Text>
                </View>
                <Text variant="labelMedium" textColor={theme.colors.primary} >Has Challenge for</Text>
                <Text variant="titleMedium" style={{textAlign: 'center', color: theme.colors.red}} >{data.amount} Coins</Text>
                    </View>
                    <View style={[{alignItems: 'center'}, {gap:5}]}>
                <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{overflow: 'hidden'}, {width:100}]}>{data.challenge_status === 'Waiting' ? "Waiting" : "joiner name"}</Text>
                    </View>
                </View>
                </View>
                <View style={[globalStyles.displayRowbetween, globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2]}>
                <Text variant="bodyMedium" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:2}, {borderBottomLeftRadius:8}, {backgroundColor: '#FFE3A5'}]}>Winning: 90</Text>
                <Text variant="bodyMedium" style={[globalStyles.width50, {textAlign: 'center'}, {paddingVertical:2}, {borderBottomRightRadius:8}, {backgroundColor: '#CBFFC5'}]} onPress={()=>navigation.navigate('contest')}>Accept</Text>
                </View>
    </View>
        ))}
    </View>
}
    </ScrollView>
    <View style={[globalStyles.bottomTabs, globalStyles.displayRowbetween]}>
    <TouchableOpacity style={[globalStyles.displaycolumn, {width:'33%'}]}  onPress={()=>{refreshContent(), refreshContent2()}}>
        <MaterialIcons name="refresh" color="#000" size={22} />
        <Text variant="titleMedium">Refresh</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[globalStyles.displaycolumn, {width:'33%'}]} onPress={showModal}>
        <MaterialCommunityIcons name="hand-coin" color="#000" size={22} />
        <Text variant="titleMedium" >Add Coin</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[globalStyles.displaycolumn, {width:'33%'}]} onPress={showModalChallange}>
    <MaterialCommunityIcons name="plus" color="#000" size={22} />
        <Text variant="titleMedium">Create Chllange</Text>
    </TouchableOpacity>
    </View>
    </View>
    <Addcoinmodal visible={visible} hideModal={hideModal}/>
    <Createchallangemodal visiblemodal={visiblemodal} hideModalChallange={hideModalChallange}/>
    </>
  )
}

export default Gametable

const styles = StyleSheet.create({})