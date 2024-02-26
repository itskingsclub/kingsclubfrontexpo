import { View, Text, SafeAreaView, FlatList, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Drawer } from 'react-native-paper';
import globalStyles from '../../globalstyle';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../userDetail/Userdetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import baseaddress from '../service/baseAddress';

const CustomDrawer = ({ navigation }) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { userDetail } = useContext(UserContext);
  // Close the drawer when the component mounts
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      if (isDrawerOpen) {
        navigation.closeDrawer();
        setIsDrawerOpen(false);
      }
    });
    return unsubscribe;
  }, [isDrawerOpen]);
  const restartApp = async () => {
    await Updates.reloadAsync();
  };
  const handleNavigation = (screenName) => {
    setIsDrawerOpen(false); // Close the drawer on navigation
    if (screenName === "wallet") {
      navigation.navigate(screenName, { icon: false });
    } else {
      navigation.navigate(screenName);
    }
    navigation.closeDrawer();
  };
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      restartApp()
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView style={{ width: '100%', flex: 1, backgroundColor: "fff" }}>
      <View style={[globalStyles.drawerTop, globalStyles.displaycolumn, { backgroundColor: theme.colors.primaryBlue }]}>
        {userDetail.profile != null ? (
          <Image
            source={{ uri: `${baseaddress}/upload/${userDetail.profile}` }}
            style={{
              width: 70,
              height: 70,
              marginBottom: 10,
              objectFit: 'contain',
              borderRadius: 50
            }}
          />
        ) : (
          <Icon name="user-large" color="#fff" size={60} style={{ marginBottom: 10 }} />
        )}
        <Text style={{ color: theme.colors.whiteColor }}>{userDetail.name}</Text>
        <Text style={{ color: theme.colors.whiteColor }}>{userDetail.mobile}</Text>
      </View>
      <View style={{ marginVertical: 10, backgroundColor: '#fff' }}>
        <Drawer.Item
          style={{ backgroundColor: '#fff' }}
          icon="home"
          label="Home"
          onPress={() => handleNavigation('parent')}
        />
        <Drawer.Item
          style={{ backgroundColor: '#fff' }}
          icon="emoticon-confused"
          label="My Profile"
          onPress={() => handleNavigation('myprofile')}
        />
        <Drawer.Item
          style={{ backgroundColor: '#fff' }}
          icon="wallet"
          label="My Wallet"
          onPress={() => handleNavigation('wallet')}
        />
        <Drawer.Item
          style={{ backgroundColor: '#fff' }}
          icon="chart-bar"
          label="Leaderboard"
          onPress={() => handleNavigation('leaderboard')}
        />
        <Drawer.Item
          style={{ backgroundColor: '#fff' }}
          icon="share-variant"
          label="My Referral"
          onPress={() => handleNavigation('invite')}
        />
        <Drawer.Item
          style={{ backgroundColor: '#fff' }}
          icon="plus-box"
          label="Contact Us"
          onPress={() => handleNavigation('contact')}
        />
        <Drawer.Item
          style={{ backgroundColor: '#fff' }}
          icon="exit-to-app"
          label="Log Out"
          onPress={() => clearAsyncStorage()}
        />
        <Drawer.Item
          style={{ backgroundColor: '#fff' }}
          icon="cog"
          label="Setting"
          onPress={() => handleNavigation('setting')}
        />
      </View>
      <View style={[globalStyles.displayRowCenter, { marginVertical: 10 }, { backgroundColor: '#fff' }]}>
        <FontAwesome name="facebook" color={theme.colors.primaryBlue} size={30} />
        <Icon name="instagram" color={theme.colors.primaryBlue} size={30} style={{ marginHorizontal: 20 }} />
        <FontAwesome name="telegram" color={theme.colors.primaryBlue} size={30} />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
