import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> { };

export const RegisterScreen = ({ navigation }: Props) => {

    const { top } = useSafeAreaInsets();
    const { signUp, errorMessage, removeError } = useContext(AuthContext)

    const { name, email, password, onChange } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const onRegister = () => {
        // console.log({ name, email, password });
        Keyboard.dismiss();
        signUp({ nombre: name, correo: email, password });
    }

    useEffect(() => {

        if (errorMessage.length === 0) return;

        Alert.alert('Incorrect Register', errorMessage, [{
            text: 'Ok',
            onPress: removeError,
        }]);

    }, [errorMessage])

    return (
        <>

            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#5856D6' }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >

                <View style={loginStyles.formContainer}>

                    {/* Keyboard avoid view */}
                    <WhiteLogo />

                    <Text style={loginStyles.title}>Register</Text>

                    <Text style={loginStyles.label}>Name:</Text>
                    <TextInput
                        placeholder='Enter your name'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                        ]}
                        selectionColor='white'

                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                        onSubmitEditing={onRegister}

                        autoCapitalize='words'
                        autoCorrect={false}
                    />

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

                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <Text style={loginStyles.label}>Password:</Text>
                    <TextInput
                        placeholder='**********'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='white'
                        secureTextEntry
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                        ]}
                        selectionColor='white'

                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/* Login Button */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Create new account */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.replace('LoginScreen')}
                        style={{
                            ...loginStyles.buttonReturn,
                            top: top + 20,
                        }}
                    >
                        <Text style={loginStyles.buttonText}>Sign in</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>

        </>
    )
}
