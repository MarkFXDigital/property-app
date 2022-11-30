import React, { useRef } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PropertyLogo from '../Components/PropertyLogo'
import { GeneralButton } from '../Components/buttons/SubmitButton'
import { getAuth, signOut } from 'firebase/auth'
import * as SecureStore from 'expo-secure-store'
import { checkLoggedIn } from './Login/AuthCheckBeforeLogin'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logout } from '../redux/reducerSlice/slice'
import { store } from '../redux/reducerSlice/store'
import { useSelector } from 'react-redux'

interface LoginScreenProps {
    navigation: any
}
const AccountScreen = (props: any) => {
    let isLoggedIn = useSelector(
        (state: any) => state.userLoginAndOut.isSignedIn
    )
    const submitFeedbackForm = () => {}

    const submitLogout = () => {
        const auth = getAuth()
        signOut(auth)
            .then(async () => {
                store.dispatch(logout())
                await SecureStore.deleteItemAsync('email')
                await SecureStore.deleteItemAsync('password')
                checkLoggedIn(props)
                // sendToLoginScreen()
            })

            .catch((error) => {
                // An error happened.
            })
        console.log(isLoggedIn, 'is logged in acc screen')
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
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
        </SafeAreaView>
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
