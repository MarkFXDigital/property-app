import React, { useRef } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PropertyLogo from '../Components/PropertyLogo'
import { GeneralButton } from '../Components/buttons/SubmitButton'
import { getAuth, signOut } from 'firebase/auth'
import * as SecureStore from 'expo-secure-store'
import { useSelector } from 'react-redux'
import { LoadingState } from '../redux/loading/LoadingState'
import { LoginState } from '../redux/login/LoginState'

interface LoginScreenProps {
    navigation: any
}
const AccountScreen = (props: LoginScreenProps) => {
    const submitFeedbackForm = () => {}

    const sendToLoginScreen = () => {
        props.navigation.navigate('LoginStack', { screen: 'Login' })
    }

    const submitLogout = async (props: LoginScreenProps) => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                SecureStore.deleteItemAsync('email')
                SecureStore.deleteItemAsync('password')
                sendToLoginScreen()
            })

            .catch((error) => {
                // An error happened.
            })
    }

    // @ts-ignore
    return (
        <View style={styles.mainContainer}>
            <PropertyLogo />

            <Text style={styles.inputLabels}>Full Name:</Text>
            <TextInput
                style={styles.input}
                placeholder=" Please enter full name "
            />
            <Text style={styles.inputLabels}>Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Please enter number of bedrooms"
            />
            <Text style={styles.inputLabels}>Email:</Text>
            <TextInput
                style={styles.messageinput}
                placeholder="Please enter number of bedrooms"
            />

            <GeneralButton
                marginTop={0}
                onPress={submitFeedbackForm}
                title={'Submit'}
            />
            <GeneralButton
                onPress={submitLogout}
                title={'Logout'}
                marginTop={15}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    input: {
        height: 40,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    messageinput: {
        height: 100,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputLabels: {
        alignSelf: 'flex-start',
        marginHorizontal: 20,
        // paddingHorizontal:
    },
})

export default AccountScreen
