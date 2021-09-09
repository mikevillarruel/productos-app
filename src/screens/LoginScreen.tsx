import React from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';

export const LoginScreen = () => {
    return (
        <>

            {/* Background */}
            <Background />

            <View style={loginStyles.formContainer}>

                {/* Keyboard avoid view */}
                <WhiteLogo />

                <Text style={loginStyles.title}>Login</Text>

                <Text style={loginStyles.label}>Email:</Text>
                <TextInput
                    placeholder='Enter your email'
                    placeholderTextColor='rgba(255,255,255,0.4)'
                    keyboardType='email-address'
                    underlineColorAndroid='white'
                    style={[
                        loginStyles.inputField,
                        (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                    ]}
                    selectionColor='white'

                    // TODO: onChange, value

                    autoCapitalize='none'
                    autoCorrect={false}


                />

                <Text style={loginStyles.label}>Password:</Text>
                <TextInput
                    placeholder='**********'
                    placeholderTextColor='rgba(255,255,255,0.4)'
                    underlineColorAndroid='white'
                    style={[
                        loginStyles.inputField,
                        (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                    ]}
                    selectionColor='white'

                    // TODO: onChange, value

                    autoCapitalize='none'
                    autoCorrect={false}


                />

                {/* Login Button */}
                <View style={loginStyles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={loginStyles.button}
                    >
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Create new account */}
                <View style={loginStyles.newUserContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => console.log('press')}
                    >
                        <Text style={loginStyles.buttonText}>Nueva Cuenta</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </>
    )
}
