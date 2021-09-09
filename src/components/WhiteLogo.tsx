import React from 'react'
import { Image, View } from 'react-native'

export const WhiteLogo = () => {
    return (
        <View
            style={{
                alignItems: 'center'
            }}
        >
            <Image
                source={require('../assets/react-logo-white.png')}
                style={{
                    width: 120,
                    height: 120,
                    resizeMode: 'center',
                }}
            />
        </View>
    )
}
