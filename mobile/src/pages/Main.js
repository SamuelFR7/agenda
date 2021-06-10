import React, { useEffect, useState } from 'react'
import {SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Main({ navigation }){
    const [token, setToken] = useState('')

    function handleLogout(){
        navigation.navigate('Login')
    }

    useEffect(() => {
        async function getToken(){
            const token = await AsyncStorage.getItem('token')
            setToken(token)
            console.log(token)
        }
        getToken
    }, [])

    
    

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}