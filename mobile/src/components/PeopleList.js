import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation'
import { Text, View, StyleSheet, SafeAreaView, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'

import api from '../services/api'

function List({ navigation }){
    const [allPeople, setAllPeople] = useState([])
    const [text, setText] = useState('')
    const [currentPage, setCurrentPage] = useState(3)
    const [people, setPeople] = useState([])
    
    useEffect(() => {
        async function loadAll(){
            const token = await AsyncStorage.getItem('token')
            const response = await api.get('/', {
                headers: {
                    authorization: token
                }
            })
            setAllPeople(response.data)
        }
        loadAll()
    }, [])

    useEffect(() => {
        async function search(){
          const token = await AsyncStorage.getItem('token')
          if(text) {
            const response = await api.get('/filter', {
              headers: {
                authorization: token,
                name: text.toUpperCase(),
                limit: 1
              }
            })
            const resdata = response.data
            setPeople(resdata)
          }
          else {
            setCurrentPage(1)
            const response = await api.get('/', {
              headers: {
                authorization: token,
                page: 1,
                limit: 1
              }
            })
            const resdata = response.data
            setPeople(resdata)
          }
      }
      search()
      }, [text])



    useEffect(() => {
        async function loadPage(){
            const token = await AsyncStorage.getItem('token')
            const response = await api.get('/', {
                headers: {
                    authorization: token,
                    page: 1,
                    limit: currentPage
                }
            })
            setPeople(response.data)
        }
        loadPage()
    }, [currentPage])

    function handleNavigate(){
        navigation.navigate('Login')
    }


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Pesquisar"
                style={styles.input}
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={text}
                onChangeText={text => setText(text)}
                />
            </View>

            <FlatList 
            style={styles.list}
            data={people}
            keyExtractor={people => people._id}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.listItem} onPress={handleNavigate}>
                    <Text style={styles.name}>{item.RazaoSocial}</Text>
                </TouchableOpacity>
            )}
            onEndReached={() => {if(!text) (setCurrentPage(currentPage + 1))}}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#e0e0e0',
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',

    },

    inputContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 10
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 10,
        borderRadius: 2
    }
})

export default withNavigation(List)