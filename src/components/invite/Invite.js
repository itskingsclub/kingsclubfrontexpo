import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Linking, Share } from 'react-native'
import React, { useContext } from 'react'
import globalStyles from '../../../globalstyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { } from 'react-native-paper';
import { Text, useTheme, Button } from 'react-native-paper';
import Header from '../header/Header';
import { UserContext } from '../../userDetail/Userdetail';

const Invite = ({ navigation }) => {
    const theme = useTheme();
    const { userDetail } = useContext(UserContext);
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `📲 Download KingsClub App: https://kingsclub.vercel.app/kingsclub.apk
                    🔥 Sign Up with Code ${userDetail.invite_code}: During registration, enter the invite code to claim your ₹100 bonus.
                    🎉 Enjoy Gaming: Dive into thrilling games and challenges!
                
                Don't miss out on this exclusive offer! 🚀
                
                Download now and let the gaming fun begin! 🕹️✨
                
                https://kingsclub.vercel.app/kingsclub.apk
                
                Happy gaming! 🎉"`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
            <View style={globalStyles.container}>
                <Header title="Refer & Earn" icon={true} navigation={navigation} />
                <ScrollView>
                    <View style={[globalStyles.displaycolumn]}>
                        <Image source={require('../../../assets/images/invite.png')}
                            style={{
                                width: 400,
                                height: 280,
                                objectFit: 'contain',
                                marginBottom: 10
                            }} />
                        <Text variant='titleSmall'>Your Invite Code</Text>
                        <View style={{ backgroundColor: '#FFCE6D', paddingVertical: 10, paddingHorizontal: 30, borderColor: "#000", borderStyle: 'dotted', borderWidth: 2, marginTop: 5 }}>
                            <Text variant='titleLarge'>{userDetail.invite_code}</Text>
                        </View>
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
                                    <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >Share Via Whatsapp</Text>
                                    <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize10 }, { fontWeight: '700' }, { lineHeight: 12 }]} >Share Your Friends Using Whatsapp</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 5 }]}
                            onPress={() => { Linking.openURL(`https://t.me/9116724908`) }} >
                            <View style={[globalStyles.displayRowbetween, { justifyContent: 'flex-start' }]}>
                                <View style={[globalStyles.transIcon, globalStyles.displaycolumn, { backgroundColor: "#2196F3" }, { marginRight: 10 }]}>
                                    {/* <View style={globalStyles.transIcon2}> */}
                                    <EvilIcons name="sc-telegram" color={theme.colors.primary} size={36} />
                                    {/* </View> */}
                                </View>
                                <View>
                                    <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >Share Via Telegram</Text>
                                    <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize10 }, { fontWeight: '700' }, { lineHeight: 12 }]} >Share Your Friends Using Telegram</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.contactusBox, globalStyles.transBox, { paddingHorizontal: 5 }]}
                            onPress={onShare} >
                            <View style={[globalStyles.displayRowbetween, { justifyContent: 'flex-start' }]}>
                                <View style={[globalStyles.transIcon, globalStyles.displaycolumn, { backgroundColor: "#F44236" }, { marginRight: 10 }]}>
                                    {/* <View style={globalStyles.transIcon2}> */}
                                    <MaterialCommunityIcons name="share-all" color={theme.colors.primary} size={36} />
                                    {/* </View> */}
                                </View>
                                <View>
                                    <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize16 }, { fontWeight: '700' }]} >Share Via Other</Text>
                                    <Text style={[{ color: theme.colors.primary }, { fontSize: globalStyles.fonts.fontSize10 }, { fontWeight: '700' }, { lineHeight: 12 }]} >Share Your Friends Using Any App</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.playGameBox, { marginTop: 20 }]}>
                            <Text variant="bodyMedium" style={[{ color: theme.colors.whiteColor }, { textAlign: 'center' }, { paddingHorizontal: 20 }]}>Invite Your Friends and get 5% Referral Bonus on Every Game Play of Your Friend </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default Invite

const styles = StyleSheet.create({
    playGameBox: {
        borderRadius: 8,
        backgroundColor: globalStyles.backgroundColor.primaryBlue,
        paddingVertical: 5,
        alignItems: 'center',
        marginBottom: 7,
    },
})