import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, Linking, Alert } from 'react-native'
import PropertyLogo from '../Components/PropertyLogo'
import { GeneralButton } from '../Components/buttons/SubmitButton'
import { getAuth, signOut, deleteUser } from 'firebase/auth'
import * as SecureStore from 'expo-secure-store'
import { checkLoggedIn } from './Login/AuthCheckBeforeLogin'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthTopLevel, logout } from '../redux/reducerSlice/slice'
import { store } from '../redux/reducerSlice/store'
import { useSelector } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
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
    console.log(isLoggedIn)

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

    const deleteUserFromFirebase = () => {
        const auth = getAuth()
        const user: any = auth.currentUser

        deleteUser(user)
            .then(() => {
                store.dispatch(logout())
                SecureStore.deleteItemAsync('email')
                SecureStore.deleteItemAsync('password')
                checkLoggedIn(props)
            })
            .catch((error) => {
                store.dispatch(logout())
                SecureStore.deleteItemAsync('email')
                SecureStore.deleteItemAsync('password')
                checkLoggedIn(props)
            })
    }
    const testAlert = () => {
        const auth = getAuth()
        const user: any = auth.currentUser
        console.log(user)
        Alert.alert(
            `Are you sure you want to delete your account?`,
            'If you have time would you provide some feedback before closing account?',
            [
                {
                    text: 'Delete account',
                    style: 'cancel',
                    onPress: deleteUserFromFirebase,
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                },
            ],
            { cancelable: true }
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <PropertyLogo />

            {/* <Text style={styles.inputLabels}>Full Name:</Text>
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

            <GeneralButton marginTop={0} onPress={() => {}} title={'Submit'} /> */}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>
                    A note from the developer
                </Text>
                <Entypo
                    name="arrow-with-circle-down"
                    size={24}
                    color="#ad974f"
                    style={{
                        marginLeft: 5,
                    }}
                />
            </View>
            <View
                style={{
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 25,
                    marginVertical: 10,
                }}
            >
                <Text
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        fontSize: 15,
                    }}
                >
                    Firstly thank you for taking the time to download the app.
                    The app is currently managed only by myself, improvements
                    and bug fixes will fixed as quickly as possible.
                </Text>
                <Text
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        fontSize: 15,
                    }}
                >
                    If you do find any bugs or would like to get in with touch
                    me please click the link below and drop me an email.
                </Text>

                <Button
                    onPress={() =>
                        Linking.openURL('mailto:markmarleydev@gmail.com')
                    }
                    title="markmarleydev@gmail.com"
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        paddingBottom: 20,
                        paddingHorizontal: 10,
                    }}
                >
                    <Text style={{ fontWeight: '600', paddingBottom: 5 }}>
                        Updates coming up soon...
                    </Text>

                    <Text
                        style={{ textAlign: 'center' }}
                    >{`\u2022 New search - Development gross domestic value(GDV)`}</Text>
                    <Text
                        style={{ textAlign: 'center' }}
                    >{`\u2022 New search - Local estate agent and local schools `}</Text>
                    <Text
                        style={{ textAlign: 'center' }}
                    >{`\u2022  Code improvements to improve perfomance`}</Text>
                </View>
            </View>
            {isLoggedIn ? (
                <>
                    <GeneralButton
                        onPress={submitLogout}
                        title={'Logout'}
                        marginTop={15}
                    />
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 25,
                            marginBottom: 10,
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 15,
                            paddingBottom: 10,
                        }}
                    >
                        <Text style={styles.deleteAccountText}>
                            Would you like to delete your account?
                        </Text>
                        <GeneralButton
                            onPress={testAlert}
                            title={'Delete Account'}
                            marginTop={15}
                        />
                    </View>
                </>
            ) : null}
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
    deleteAccountText: {
        marginTop: 30,
    },
})

export default AccountScreen
