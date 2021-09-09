import React from 'react'
import { Dimensions, View } from 'react-native'

const { width, height } = Dimensions.get('window');

export const Background = () => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#5856D6',
                top: -height * 0.8,
                width: width * 3,
                height: height * 2,
                transform: [
                    {
                        rotate: '-70deg',
                    }
                ]
            }}
        />
    )
}
