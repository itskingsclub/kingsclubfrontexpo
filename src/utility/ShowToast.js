import { Text, View } from 'react-native'
import React from 'react'
import Toast from 'react-native-root-toast';

const ShowToast = (message) => {
    return (
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        })
    )
}

export default ShowToast