import React, { useEffect, useState } from 'react'
import {SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import List from '../components/PeopleList'


import api from '../services/api'




export default function Main({ navigation }){
    const [token, setToken] = useState('')

    function handleLogout(){
        navigation.navigate('Login')
    }

    useEffect(() => {
        async function getToken(){
            const getToken = await AsyncStorage.getItem('token')
            setToken(getToken)
        }
        getToken()
    }, [token])


    
    

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text>Voltar</Text>
            </TouchableOpacity>
            <List/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    button: {
        marginTop: 40,
        height: 42,
        backgroundColor: '#43a047',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    }
})