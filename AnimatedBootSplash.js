import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { UserContext } from './src/userDetail/Userdetail';
import AppNavigator from './Appnavigator';

const AnimatedSplash = () => {
    const {userDetail, setUserDetail} = useContext(UserContext);
    const [visible, setVisible] = useState(true);
  useEffect(()=>{
    setTimeout(() => {
        setVisible(false);
      }, 3000);
  })
  return (
    <> 
    {visible ? (
        <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image
      source={require('./assets/images/logo.png')} // Adjust the path accordingly
      style={{ width: 200, height: 200 }} // Adjust the dimensions accordingly
      />
    <Text style={{ fontSize: 24, marginTop: 16 }}>Kings CLub</Text>
    <ActivityIndicator size="large" style={{ marginTop: 16 }} />
    <Text>Loading...</Text>
  </View>
      </>
  ) : 
      <AppNavigator user={userDetail.id != undefined} />
    }
      </>
);
};

// // Usage in your main component
// const App = () => {
//   const [visible, setVisible] = useState(true);

//   return (
//     <>
//       {/* Your main content here */}
//       {visible && <AnimatedSplash onAnimationEnd={() => setVisible(false)} />}
//     </>
//   );
// };

export default AnimatedSplash;
