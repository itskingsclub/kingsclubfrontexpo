import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
  userDetail: {},
  setUserDetail: (userDetail) => {},
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getuser } from '../service/apicalls';

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({})
    const [userDetail, setUserDetail] = useState({})
    const value = {userDetail, setUserDetail}
    useEffect(() => {
      const fetchUserDetail = async () => {
        try {
          const userDetail = await AsyncStorage.getItem('userDetail');
          if( userDetail != null ){
            setUserDetails(JSON.parse(userDetail))
          };
        } catch (error) {
          console.error('Error retrieving Mobile Number:', error);
        }
      };
      fetchUserDetail();
    }, []);  

    useEffect(()=>{
      if(userDetails?.id){
        getuser(userDetails.id).then((res)=>{
          setUserDetail(res.data)
        }).catch((err)=>{
          console.log(err)
        })
      }
    },[userDetails])
    
    return(
        <UserContext.Provider value={value} >
      {children}
    </UserContext.Provider>
    )
}