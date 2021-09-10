import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    const { status } = useContext(AuthContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                }
            }}
        >
            {
                (status !== 'authenticated')
                    ? (
                        <>
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        </>
                    ) : (
                        <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />

                    )
            }
        </Stack.Navigator>
    )
}
