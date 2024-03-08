import { StyleSheet, View, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../../../globalstyle';
import { Button, useTheme, Text, Chip, Avatar, ActivityIndicator } from 'react-native-paper';
import Addcoinmodal from '../../modals/Addcoinmodal';
import { updateChallange, getChallange, myChallange, getuser, acceptChallange } from '../../service/apicalls';
import { UserContext } from '../../userDetail/Userdetail';
import Header from '../header/Header';
import Createchallangemodal from '../../modals/Createchallangemodal';
import ShowToast from '../../utility/ShowToast';


const Gametable = ({ navigation }) => {
  const theme = useTheme();
  const { userDetail, setUserDetail } = useContext(UserContext)
  const [challengs, setChallangs] = useState([])
  const [mychallengs, setmyChallanges] = useState([])
  const [visiblemodal, setVisiblemodal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [updateChallenge, setUpdateChallenge] = useState(false)
  const showModalChallange = () => setVisiblemodal(true);
  const hideModalChallange = () => setVisiblemodal(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshContent();
    refreshContent2();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    refreshContent();
    refreshContent2();
    setVisiblemodal(false)
  }, [navigation, updateChallenge])


  const refreshContent = async () => {
    setLoading(true);
    const data = {
      offset: 0,
      limit: 35,
      sort: 'id',
      order: 'DESC',
    }
    try {
      const response = await getChallange(data);
      const fetchedChallenges = response.data.challenges;
      setChallangs(fetchedChallenges)
      getuser(userDetail.id)
        .then((res) => {
          setUserDetail(res.data);
        })
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const refreshContent2 = async () => {
    setLoading2(true);
    const data = {
      id: userDetail.id,
      offset: 0,
      limit: 10,
      sort: 'id',
      order: 'DESC',
    }
    await myChallange(data)
      .then((res) => {
        setmyChallanges(res.data.challenges);
      })
      .catch((error) => {
        console.log("error", error);
      });
    setLoading2(false);
  };
  const challangeFunction = async (data) => {
    if (data.challenge_status === 'Waiting') {
      if (data.creator === userDetail.id) {
        ShowToast("Creator can't join the table.");
      } else {
        if (userDetail.game_coin + userDetail.win_coin >= data.amount) {
          const sendData = {
            id: data.id,
            joiner: userDetail.id,
            challenge_status: "Processing",
            updated_by: userDetail.id
          };
          await acceptChallange(sendData).then((res) => {
            if (res.success) {
              ShowToast(res.message)
              navigation.navigate('contest', { contestData: data });
            } else {
              ShowToast(res.message)
            }
            refreshContent()
            refreshContent2()
          });
        } else {
          ShowToast("You Don't have sufficient Coin to join");
        }
      }
    } else if (data.challenge_status === 'Clear') {
      ShowToast("Table Clear please select another one");
    }
    else {
      if (userDetail.id === data.creator || userDetail.id === data.joiner) {
        navigation.navigate('contest', { contestData: data });

      } else {
        ShowToast("Table already join form another user");
      }
    }
  };
  function determineResult(gameData, userId) {
    if (gameData.challenge_status === "Review") {
      if (gameData.creator_result === "Win" || gameData.joiner_result === "Win") {
        return "Review";
      } else if (gameData.creator_result === "Lose" || gameData.joiner_result === "Lose") {
        return "Loss";
      } else {
        return "Review";
      }
    } else if (gameData.challenge_status === "Clear") {
      return gameData.challenge_status;
    } else {
      return gameData.challenge_status;
    }
  }
  return (
    <>
      <View style={globalStyles.container}>
        <Header title="Game Table" navigation={navigation} />
        <ScrollView nestedScrollEnabled={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
            <View style={[globalStyles.normalCard, { backgroundColor: globalStyles.backgroundColor.primaryBlue }, globalStyles.displayRowbetween]}>
              <View>
                <Text style={[{ fontSize: globalStyles.fonts.fontSize24 }, { color: globalStyles.textColor.whiteColor }, { fontWeight: '700' }]}>₹ {userDetail.win_coin + userDetail.game_coin} </Text>
                <Text variant="titleMedium" style={[{ color: theme.colors.whiteColor }]}>Total Coin</Text>
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
            <View style={{ minHeight: 136 }}>
              <View style={[globalStyles.displayRowbetween, { marginVertical: 5 }]}>
                <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >My Challenge</Text>
                {/* <Text style={[{ color: theme.colors.yellowCOlor }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >All Challenge</Text> */}
              </View>
              {loading2 ? (
                <ActivityIndicator animating={true} size='large' color={globalStyles.backgroundColor.primaryBlue} />
              ) : (
                <>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={globalStyles.scrollViewContent}>
                    {mychallengs.length > 0 ? mychallengs.map((data, i) => (
                      <TouchableOpacity onPress={() => {
                        if (["Processing", "Playing"].includes(data.challenge_status)) {
                          navigation.navigate('contest', { contestData: data });
                        } else {
                          refreshContent();
                          refreshContent2();
                        }
                      }} style={globalStyles.challangeBox} key={i}>
                        <View style={globalStyles.challangeBoxTop}>
                          <View style={globalStyles.chip}  >
                            <Text variant="labelMedium" >Winning: {(data.amount - (data.amount * 10) / 100) * 2}</Text>
                          </View>
                          <Text variant="labelMedium" textColor={theme.colors.primary}> {data.challenge_status === "Clear" ? "Challange Completed" : "Challenge Accepted"}</Text>
                          <View style={[globalStyles.displayRowCenter, { gap: 10 }]}>
                            <Avatar.Image size={24} style={{ marginRight: 5 }} source={require('../../../assets/images/avatar.png')} />
                            <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 }]}>Mukesh Jat ada adad das</Text>
                          </View>
                        </View>
                        <View style={[globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2, { width: 360 }]}>
                          <Text variant="bodySmall" style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 5 }, { borderBottomLeftRadius: 8 }, { backgroundColor: '#FFE3A5' }]}>{data.challenge_status === "Review" || data.challenge_status === "Clear" ? determineResult(data, userDetail.id) : data.challenge_status}</Text>
                        </View>
                      </TouchableOpacity>
                    )) : (
                      <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }, { textAlign: 'center' }]} >Your Not playing any challenge yet</Text>
                    )}
                  </ScrollView>
                </>
              )}
            </View>
            <View style={[{ marginTop: 10 }, { marginBottom: 0 }]}>
              <View style={[globalStyles.displayRowCenter, { marginBottom: 5 }, { columnGap: 20 }]}>
                <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }, { marginRight: 20 }]} >Live Challenges</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[globalStyles.scrollViewContent, { gap: 5 }, { alignItems: 'center' }]}>
                  <Button onPress={() => handleTabClick('tab1')} buttonColor={activeTab === 'tab1' ? '#757575' : '#E2E2E2'} textColor={activeTab === 'tab1' ? '#FFF' : '#333333'} labelStyle={globalStyles.graySmallButton} style={{ marginRight: 4 }} mode="contained">All</Button>
                  <Button onPress={() => handleTabClick('tab2')} buttonColor={activeTab === 'tab2' ? '#757575' : '#E2E2E2'} textColor={activeTab === 'tab2' ? '#FFF' : '#333333'} labelStyle={globalStyles.graySmallButton} style={{ marginRight: 4 }} mode="contained">{"<"} 100 </Button>
                  <Button onPress={() => handleTabClick('tab3')} buttonColor={activeTab === 'tab3' ? '#757575' : '#E2E2E2'} textColor={activeTab === 'tab3' ? '#FFF' : '#333333'} labelStyle={globalStyles.graySmallButton} style={{ marginRight: 4 }} mode="contained">100 - 500 </Button>
                </ScrollView>
              </View>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.mainContainer}>
            {/* conent for all */}
            {
              activeTab === 'tab1' &&
              <View style={{ position: 'relative' }}>
                {loading ? (
                  <ActivityIndicator animating={true} size='large' color={globalStyles.backgroundColor.primaryBlue} style={globalStyles.loading2} />
                ) : (
                  <>
                    {challengs ? challengs.map((data, i) => (
                      <TouchableOpacity style={globalStyles.challangesBox} key={i} onPress={() => challangeFunction(data)}>
                        <View style={globalStyles.challangeBoxTop}>
                          <View style={[globalStyles.displayRowbetween, { gap: 5 }, { justifyContent: 'space-between' }, { alignItems: 'flex-end' }]}>
                            <View style={[{ alignItems: 'center' }, { gap: 5 }, globalStyles.challangeschallenger]}>
                              <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                              <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 }]}>{data.creatorUser.name}</Text>
                            </View>
                            <View style={globalStyles.challangeFor}>
                              <View style={[globalStyles.chip]}  >
                                <Text variant='labelMedium' style={{ textAlign: 'center' }}>KC - {data.id}</Text>
                              </View>
                              <Text variant="labelMedium" textColor={theme.colors.primary} >Has Challenge for</Text>
                              <Text variant="titleMedium" style={{ textAlign: 'center', color: theme.colors.red }} >{data.amount} Coins</Text>
                            </View>
                            <View style={[{ alignItems: 'center' }, { gap: 5 }]}>
                              <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                              <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 }]}>{data.challenge_status === 'Waiting' ? "Waiting" : data.joinerUser.name}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={[globalStyles.displayRowbetween, globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2]}>
                          <Text variant="bodyMedium" style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 2 }, { borderBottomLeftRadius: 8 }, { backgroundColor: '#FFE3A5' }]}>Winning: {(data.amount - (data.amount * 10) / 100) * 2}</Text>
                          <Text variant="bodyMedium" style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 2 }, { borderBottomRightRadius: 8 }, { backgroundColor: '#CBFFC5' }]}
                          >{data.challenge_status === "Waiting" ? (userDetail.id === data.creator ? "Waiting" : "Accept") : data.challenge_status}</Text>
                        </View>
                      </TouchableOpacity>
                    )) : (
                      <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >My Challenge</Text>
                    )}
                  </>
                )}

              </View>
            }
            {/* conent for < 50 */}
            {
              activeTab === 'tab2' &&
              <View >
                {challengs && challengs.filter(challenge => challenge.amount < 100).map((data, i) => (
                  <TouchableOpacity style={globalStyles.challangesBox} key={i} onPress={() => challangeFunction(data)}>
                    <View style={globalStyles.challangeBoxTop}>
                      <View style={[globalStyles.displayRowbetween, { gap: 5 }, { justifyContent: 'space-between' }, { alignItems: 'flex-end' }]}>
                        <View style={[{ alignItems: 'center' }, { gap: 5 }, globalStyles.challangeschallenger]}>
                          <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                          <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 }]}>{data.creatorUser.name}</Text>
                        </View>
                        <View style={globalStyles.challangeFor}>
                          <View style={[globalStyles.chip]}  >
                            <Text variant='labelMedium' style={{ textAlign: 'center' }}>KC - {data.id}</Text>
                          </View>
                          <Text variant="labelMedium" textColor={theme.colors.primary} >Has Challenge for</Text>
                          <Text variant="titleMedium" style={{ textAlign: 'center', color: theme.colors.red }} >{data.amount} Coins</Text>
                        </View>
                        <View style={[{ alignItems: 'center' }, { gap: 5 }]}>
                          <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                          <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 }]}>{data.challenge_status === 'Waiting' ? "Waiting" : data.joinerUser.name}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[globalStyles.displayRowbetween, globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2]}>
                      <Text variant="bodyMedium" style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 2 }, { borderBottomLeftRadius: 8 }, { backgroundColor: '#FFE3A5' }]}>Winning: {(data.amount - (data.amount * 10) / 100) * 2}</Text>
                      <Text variant="bodyMedium" style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 2 }, { borderBottomRightRadius: 8 }, { backgroundColor: '#CBFFC5' }]}
                      >{data.challenge_status === "Waiting" ? (userDetail.id === data.creator ? "Waiting" : "Accept") : data.challenge_status}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            }
            {/* conent for 50 -100 */}
            {
              activeTab === 'tab3' &&
              <View >
                {challengs && challengs.filter(challenge => challenge.amount >= 100 && challenge.amount <= 500).map((data, i) => (
                  <TouchableOpacity style={globalStyles.challangesBox} key={i} onPress={() => challangeFunction(data)}>
                    <View style={globalStyles.challangeBoxTop}>
                      <View style={[globalStyles.displayRowbetween, { gap: 5 }, { justifyContent: 'space-between' }, { alignItems: 'flex-end' }]}>
                        <View style={[{ alignItems: 'center' }, { gap: 5 }, globalStyles.challangeschallenger]}>
                          <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                          <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 }]}>{data.creatorUser.name}</Text>
                        </View>
                        <View style={globalStyles.challangeFor}>
                          <View style={[globalStyles.chip]}  >
                            <Text variant='labelMedium' style={{ textAlign: 'center' }}>KC - {data.id}</Text>
                          </View>
                          <Text variant="labelMedium" textColor={theme.colors.primary} >Has Challenge for</Text>
                          <Text variant="titleMedium" style={{ textAlign: 'center', color: theme.colors.red }} >{data.amount} Coins</Text>
                        </View>
                        <View style={[{ alignItems: 'center' }, { gap: 5 }]}>
                          <Avatar.Image size={32} source={require('../../../assets/images/avatar.png')} />
                          <Text variant="labelMedium" numberOfLines={1} ellipsizeMode="tail" textColor={theme.colors.primary} style={[{ overflow: 'hidden' }, { width: 100 }]}>{data.challenge_status === 'Waiting' ? "Waiting" : data.joinerUser.name}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[globalStyles.displayRowbetween, globalStyles.challangeBoxBottom, globalStyles.challangeBoxBottom2]}>
                      <Text variant="bodyMedium" style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 2 }, { borderBottomLeftRadius: 8 }, { backgroundColor: '#FFE3A5' }]}>Winning: {(data.amount - (data.amount * 10) / 100) * 2}</Text>
                      <Text variant="bodyMedium" style={[globalStyles.width50, { textAlign: 'center' }, { paddingVertical: 2 }, { borderBottomRightRadius: 8 }, { backgroundColor: '#CBFFC5' }]}
                      >{data.challenge_status === "Waiting" ? (userDetail.id === data.creator ? "Waiting" : "Accept") : data.challenge_status}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            }
          </ScrollView>
        </ScrollView>
        <View style={[globalStyles.bottomTabs, globalStyles.displayRowbetween]}>
          <TouchableOpacity style={[globalStyles.displaycolumn,]} onPress={() => { refreshContent(), refreshContent2() }}>
            <MaterialIcons name="refresh" color="#000" size={22} />
            <Text variant="titleMedium">Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.displaycolumn,]} onPress={() => navigation.navigate("paymentdetail")}>
            <MaterialCommunityIcons name="hand-coin" color="#000" size={22} />
            <Text variant="titleMedium" >Add Coin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.displaycolumn,]} onPress={showModalChallange}>
            <MaterialCommunityIcons name="plus" color="#000" size={22} />
            <Text variant="titleMedium">Create Chllange</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Createchallangemodal visiblemodal={visiblemodal} hideModalChallange={hideModalChallange} setUpdateChallenge={setUpdateChallenge} />
    </>
  )
}

export default Gametable

const styles = StyleSheet.create({})