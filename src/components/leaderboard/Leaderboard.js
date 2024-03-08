import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyles from '../../../globalstyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from 'react-native-paper';
import { Text, useTheme, Button } from 'react-native-paper';
import Header from '../header/Header';
import { leaderboardapi } from '../../service/apicalls';
import baseaddress from '../../service/baseAddress';
import getDate from '../../utility/getDate';

const Leaderboard = ({ navigation }) => {
    const theme = useTheme();
    const [leaderbaordData, setleaderboardData] = useState([])
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState('all');

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const refreshContent = async () => {
        setLoading(true);
        const { fromDate, toDate } = getDate(activeButton);
        const data = {
            limit: 2,
            from_date: fromDate,
            to_date: toDate,
        }
        try {
            const response = await leaderboardapi(data);
            const fetchedChallenges = response?.data?.leaderboard;
            setleaderboardData(fetchedChallenges)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        refreshContent()
    }, [activeButton])

    return (
        <>
            <View style={globalStyles.container}>
                <Header title="Leaderboard" navigation={navigation} />

                <View style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
                    <View style={globalStyles.displayRowCenter}>
                        <Button onPress={() => handleButtonClick('all')} buttonColor={activeButton === 'all' ? '#FFCE6D' : '#fff'} labelStyle={globalStyles.tabButtonlabel} style={[globalStyles.tabButton, activeButton === 'all' && globalStyles.activeTabButton]}>All</Button>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={{
                                width: 60,
                                height: 60,
                                objectFit: 'contain',
                                marginHorizontal: 30
                            }}
                        />
                        <Button onPress={() => handleButtonClick('daily')} buttonColor={activeButton === 'daily' ? '#FFCE6D' : '#fff'} labelStyle={globalStyles.tabButtonlabel} style={[globalStyles.tabButton, activeButton === 'daily' && globalStyles.activeTabButton]}>Daily </Button>
                    </View>
                    <View style={[globalStyles.displayRowbetween, { marginTop: 10 }, { marginBottom: 5 }, { paddingHorizontal: 20 }]}>
                        <Button onPress={() => handleButtonClick('weekly')} buttonColor={activeButton === 'weekly' ? '#FFCE6D' : '#fff'} labelStyle={globalStyles.tabButtonlabel} style={[globalStyles.tabButton, activeButton === 'weekly' && globalStyles.activeTabButton]}>
                            Weekly
                        </Button>
                        <Button onPress={() => handleButtonClick('monthly')} buttonColor={activeButton === 'monthly' ? '#FFCE6D' : '#fff'} labelStyle={globalStyles.tabButtonlabel} style={[globalStyles.tabButton, activeButton === 'monthly' && globalStyles.activeTabButton]}>
                            Monthly
                        </Button>
                        <Button onPress={() => handleButtonClick('yearly')} buttonColor={activeButton === 'yearly' ? '#FFCE6D' : '#fff'} labelStyle={globalStyles.tabButtonlabel} style={[globalStyles.tabButton, activeButton === 'yearly' && globalStyles.activeTabButton]}>
                            Yearly
                        </Button>
                    </View>
                </View>
                <ScrollView>
                    <>
                        {loading ? (
                            <ActivityIndicator animating={true} size='large' color={globalStyles.backgroundColor.primaryBlue} />
                        ) : (
                            <View style={{ paddingBottom: 30 }}>
                                {leaderbaordData && leaderbaordData.map((data, i) => (
                                    <View style={[globalStyles.transBox, globalStyles.displayRowbetween,]} key={i}>
                                        <View style={[globalStyles.displayRowbetween, { gap: 8 }, { alignItems: 'center' }]}>
                                            <Text style={[globalStyles.rankText, { minWidth: 35 }]} >#{i < 10 ? `0${i + 1}` : i + 1}</Text>
                                            {data.profile ?

                                                <Image
                                                    source={{ uri: `${baseaddress}/upload/${data.profile}` }}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        objectFit: 'cover',
                                                        borderRadius: 50,
                                                    }}
                                                />
                                                :
                                                <FontAwesome name="user-tie" color="#000" size={30} style={{ marginHorizontal: 12, }} />
                                            }
                                            <Text style={globalStyles.rankText} numberOfLines={1} ellipsizeMode="tail">{data.mobile}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={globalStyles.rankCount} >{data.totalWinCoin}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                </ScrollView>
            </View>
        </>
    )
}

export default Leaderboard;

const styles = StyleSheet.create({
    playGameBox: {
        borderRadius: 8,
        backgroundColor: globalStyles.backgroundColor.primaryBlue,
        paddingVertical: 5,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
    },
    coinTop: {
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#fff',
        borderStyle: 'solid',
        paddingBottom: 10
    },
    coinsTop: {
        alignItems: 'center',
        width: '50%',
        paddingTop: 5
    },
})