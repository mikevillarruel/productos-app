import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { ProductsStackParams } from '../navigator/ProductsNavigator'

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ route, navigation }: Props) => {

    const { id, name = 'New Product' } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: name,
        })
    }, [])

    return (
        <View>
            <Text>{id} {name}</Text>
        </View>
    )
}
