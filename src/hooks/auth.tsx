import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import * as AuthSession from 'expo-auth-session';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signOut(): Promise<void>;
    userStoragedDataLoading: boolean;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const dataKey = '@gofinances:user';

    const [ user, setUser ] = useState({} as User);

    const [ userStoragedDataLoading, setUserStoragedDataLoading ] = useState(true);

    async function signInWithGoogle() {

        try {

            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const redirect_url = 'https://auth.expo.io/@cmoreiradev/gofinances'

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${redirect_url}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession
            .startAsync({ authUrl }) as AuthorizationResponse;

            if(type === 'success') {

                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);

                const userInfo = await response.json();

                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    image: userInfo.picture
                });

                await AsyncStorage.setItem(dataKey, JSON.stringify(user));
            }

        } catch (error) {
            throw new Error(error )
        }
    }

    async function signOut() {

        setUser({} as User);
        await AsyncStorage.removeItem(dataKey);
    }

    useEffect(() => {

        async function loadUserStorageData() {
            
            const userStorageData = await AsyncStorage.getItem('@gofinances:user');

            if(userStorageData) {

                const userLogged = JSON.parse(userStorageData) as User;
                setUser(userLogged);

                setUserStoragedDataLoading(false);
            }
        }

        loadUserStorageData();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            userStoragedDataLoading,
            signInWithGoogle,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };