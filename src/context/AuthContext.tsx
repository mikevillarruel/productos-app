import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useReducer } from 'react';
import cafeApi from '../api/cafeApi';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {

        const token = await AsyncStorage.getItem('token');

        if (!token) return dispatch({ type: 'notAuthenticated' });

        const response = await cafeApi.get<LoginResponse>('/auth');

        if (response.status !== 200) {
            return dispatch({ type: 'notAuthenticated' });
        }

        await AsyncStorage.setItem('token', response.data.token);

        dispatch({
            type: 'signUp',
            payload: {
                token: response.data.token,
                user: response.data.usuario,
            },
        });

    }

    const signUp = async ({ nombre, correo, password }: RegisterData) => {
        try {
            const { data: { token, usuario } } = await cafeApi.post<LoginResponse>('/usuarios', {
                nombre,
                correo,
                password,
            });

            dispatch({
                type: 'signUp',
                payload: { token, user: usuario }
            });

            await AsyncStorage.setItem('token', token);

        } catch (error: any) {
            const payload = error.response.data.errors.map((item: any) => item.msg).join(' \n');
            dispatch({
                type: 'addError',
                payload: payload || 'Incorrect data'
            })
        }

    }

    const signIn = async ({ correo, password }: LoginData) => {
        try {

            const { data: { token, usuario } } = await cafeApi.post<LoginResponse>('/auth/login', {
                correo,
                password,
            })

            dispatch({
                type: 'signUp',
                payload: { token, user: usuario }
            });

            await AsyncStorage.setItem('token', token);

        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Incorrect data'
            })
        }
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    }

    const removeError = () => {
        dispatch({ type: 'removeError' });
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signUp,
                signIn,
                logOut,
                removeError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
