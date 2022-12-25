import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PropertyLogo from '../Components/PropertyLogo'
import { GeneralButton } from '../Components/buttons/SubmitButton'
import { getAuth, signOut } from 'firebase/auth'
import * as SecureStore from 'expo-secure-store'
import { checkLoggedIn } from './Login/AuthCheckBeforeLogin'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthTopLevel, logout } from '../redux/reducerSlice/slice'
import { store } from '../redux/reducerSlice/store'
import { useSelector } from 'react-redux'
// import email from 'react-native-email'

interface LoginScreenProps {
    navigation: any
}
const AccountScreen = (props: any) => {
    const [fullName, setFullName] = useState('')
    const [message, setMessage] = useState('')
    const [emailFrom, setFromEmail] = useState('')

    // code fragment
    let postData = {
        service_id: 'service_sfe7k3r',
        template_id: 'YOUR_TEMPLATE_ID',
        user_id: 'YOUR_PUBLIC_KEY',
        template_params: {
            username: 'James',
            'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
        },
    }

    let isLoggedIn = useSelector(
        (state: AuthTopLevel) => state.userLoginAndOut.isSignedIn
    )
    // const submitFeedbackForm = () => {
    //     const to = ['markmarleydev@gmail.com', 'markmarley19911@gmail.com.com'] // string or array of email addresses
    //     email(to, {
    //         // Optional additional arguments
    //         cc: [], // string or array of email addresses
    //         bcc: '', // string or array of email addresses
    //         subject: `email from ${emailFrom}`,
    //         body: `From : ${fullName} - message ${message}`,
    //         checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    //     }).catch(console.error)
    // }

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
                placeholder=" Please enter your full name "
            />
            <Text style={styles.inputLabels}>Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Please enter your email"
            />
            <Text style={styles.inputLabels}>Message:</Text>
            <TextInput
                multiline={true}
                onChangeText={(val) => setMessage(val)}
                style={styles.messageinput}
                placeholder="Please enter your message"
            />

            <GeneralButton marginTop={0} onPress={() => {}} title={'Submit'} />
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
        backgroundColor: '#fff',

        borderRadius: 20,
    },
    messageinput: {
        height: 100,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        paddingTop: 15,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    inputLabels: {
        alignSelf: 'flex-start',
        marginHorizontal: 20,
        // paddingHorizontal:
    },
})

export default AccountScreen
