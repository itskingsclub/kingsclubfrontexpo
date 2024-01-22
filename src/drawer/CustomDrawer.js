import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Drawer } from 'react-native-paper';
import globalStyles from '../../globalstyle';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = ({navigation}) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

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

  const handleNavigation = (screenName) => {
    setIsDrawerOpen(false); // Close the drawer on navigation
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };

  return (
    <SafeAreaView style={{width:'100%'}}>
      <View style={[globalStyles.drawerTop, globalStyles.displaycolumn, {backgroundColor:theme.colors.primaryBlue}]}>
      <Icon name="user-large" color="#fff" size={60} style={{marginBottom:10}}/>
        <Text style={{color:theme.colors.whiteColor}}>mukesh jat</Text>
        <Text style={{color:theme.colors.whiteColor}}>1234567890</Text>
      </View>
      <View style={{marginVertical:10}}>
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
     icon="account-supervisor-circle"
     label="Friends"
     />
      <Drawer.Item
     style={{ backgroundColor: '#fff' }}
     icon="exit-to-app"
     label="Log Out"
    //  onPress={()=>clearAsyncStorage()}
     />
      <Drawer.Item
     style={{ backgroundColor: '#fff' }}
     icon="cog"
     label="Setting"
     onPress={()=>handleNavigation('setting')}
     />
     </View>
     <View style={[globalStyles.displayRowCenter, {marginVertical:10}]}>
     <FontAwesome name="facebook" color={theme.colors.primaryBlue} size={30}/>
     <Icon name="instagram" color={theme.colors.primaryBlue} size={30} style={{marginHorizontal:20}}/>
     <FontAwesome name="telegram" color={theme.colors.primaryBlue} size={30}/>
     </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
