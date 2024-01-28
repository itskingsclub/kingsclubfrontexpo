import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import { Platform } from 'react-native';
import Home from './Home';
import Wallet from './Wallet';
import Contact from './Contact';
const BottomNavigator = () => {
  const navigation = useNavigation();
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'dots-grid', unfocusedIcon: 'dots-square'},
    { key: 'mywallet', title: 'My Wallet', focusedIcon: 'wallet',unfocusedIcon: 'wallet-outline' },
    { key: 'contact', title: 'Contact Us', focusedIcon: 'plus-box', unfocusedIcon: 'plus' },
  ]);

  // Pass navigation prop to Home component
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <Home navigation={navigation} />; // Pass navigation prop to Home component
      case 'mywallet':
        return <Wallet navigation={navigation}  icon = {true } />;
      case 'contact':
        return <Contact navigation={navigation} />;
      default:
        return null;
    }
  };

  const bottomNavStyles = {
    barStyle: {
      height: 70,
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 7,
      elevation: 5,
      borderWidth: Platform.OS === 'ios' ? 0 : 1,
      borderStyle: 'solid',
      borderColor: '#000',
      marginBottom: Platform.OS === 'ios' ? 25 : 0,
    },
  };

  return (
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={bottomNavStyles.barStyle} // Apply barStyle directly
    />
  );
};

export default BottomNavigator;
