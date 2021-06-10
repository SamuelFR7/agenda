import React, {useState} from 'react'
import { View, KeyboardAvoidingView, StyleSheet, Platform, Text, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../services/api'

export default function Login({ navigation }){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 

    async function handleSubmit(){ 
        const response = await api.get('/user/login', {
            headers: {
                email,
                password
            }
        })
        await AsyncStorage.setItem('token', response.data.token)
        navigation.navigate('Main')
    }

    return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>

        <View style={styles.form}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
            placeholder="Seu email"
            style={styles.input}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={text => setEmail(text)}

            />

            <Text style={styles.label}>SENHA</Text>
            <TextInput
            placeholder="Sua senha"
            style={styles.input}
            placeholderTextColor="#999"
            secureTextEntry={true}
            keyboardType="visible-password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    button: {
        height: 42,
        backgroundColor: '#43a047',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
})