import React, { useState, useEffect } from 'react'
import { theme } from '../../theme'
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native'

//firestore
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

// Navigation
import {
    NavigationContainer,
    NavigationProp,
    ParamListBase,
} from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

// Firebase
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { authentication } from '../../../firebase'

// Components
import PropertyLogo from '../../Components/PropertyLogo'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Card, TextInput } from 'react-native-paper'
import { loginStyle } from './login.style'
import { Formik } from 'formik'
import { loginForm } from './login.form'

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignedIn, setIsSignedIn] = useState(false)

    const handleSignup = () => {
        createUserWithEmailAndPassword(authentication, email, password)
            .then((userCredentials) => {
                // Signed in
                setEmail('')
                setPassword('')
                console.log('registered with : ', userCredentials)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // ..
            })
    }

    // const handleLogin = () => {
    //   signInWithEmailAndPassword(authentication, email, password)
    //     .then(() => {
    //       setIsSignedIn(true);
    //       navigation.navigate("Search");
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //     });
    // };

    const login = () => navigation.navigate('Search')
    const register = () => navigation.navigate('Register')

    const handleLogout = () => {
        signOut(authentication)
            .then(() => {
                setIsSignedIn(false)
            })
            .catch((userCredentials) => {})
    }
    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <PropertyLogo />
                <Card>
                    <Card.Title
                        titleStyle={loginStyle.cardTitle}
                        title="Property App"
                    ></Card.Title>
                    <Card.Content>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={login}
                            validationSchema={loginForm}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                errors,
                                setFieldTouched,
                                touched,
                                values,
                            }) => (
                                <>
                                    <TextInput
                                        label="Email"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('email')}
                                        testID="email"
                                        onFocus={() => setFieldTouched('email')}
                                    />
                                    {touched.email && errors.email ? (
                                        <Text
                                            style={{
                                                color: 'white',
                                                backgroundColor: 'red',
                                            }}
                                            testID="error-email"
                                        >
                                            {errors.email}
                                        </Text>
                                    ) : null}

                                    <TextInput
                                        label="Password"
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        testID="password"
                                        onFocus={() =>
                                            setFieldTouched('password')
                                        }
                                    />
                                    {touched.password && errors.password ? (
                                        <Text
                                            style={{
                                                color: 'white',
                                                backgroundColor: 'red',
                                            }}
                                            testID="error-password"
                                        >
                                            {errors.password}
                                        </Text>
                                    ) : null}
                                    <Button
                                        style={loginStyle.cardButton}
                                        uppercase={false}
                                        testID="recoveryButton"
                                        disabled={
                                            values.email === '' || errors.email
                                                ? true
                                                : false
                                        }
                                    >
                                        Forgot email/password
                                    </Button>
                                    <Button
                                        style={loginStyle.cardButton}
                                        onPress={handleSubmit}
                                        mode="contained"
                                        testID="loginButton"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        style={loginStyle.cardButton}
                                        onPress={register}
                                        uppercase={false}
                                        testID="registerButton"
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </Formik>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

        marginTop: 50,
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',

        marginTop: 40,
    },
    button: {
        backgroundColor: theme.mainGold,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        // borderColor: "white",
        // borderWidth: 2,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
    },
    buttonText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 16,
    },
    buttonOutlineText: {
        fontWeight: '700',
        color: theme.mainGold,
        fontSize: 16,
    },
})

export default LoginScreen
