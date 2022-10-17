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
import { Button, Card, Snackbar, TextInput } from 'react-native-paper'
import { loginStyle } from './login.style'
import { Formik } from 'formik'
import { loginForm } from './login.form'
import { LoadingState } from '../../store/loading/LoadingState'
import { hide, show } from '../../store/loading/loading.actions'
import { toast } from 'react-toastify'
import dismiss = toast.dismiss
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { AppState } from '../../AppState'
import {
    recoverPassword,
    recoverPasswordSuccess,
} from '../../store/login/login.actions'
import { LoginState } from '../../store/login/LoginState'
import AuthService from '../../services/AuthService'

interface LoginScreenProps {
    navigation: any
    loadingState: LoadingState
    loginState: LoginState
    recoverPassword: Function
    recoverPasswordSuccess: Function
    hideLoading: Function
    showLoading: Function
}

const LoginScreen = (props: LoginScreenProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [recoveryEmail, setRecoveryEmail] = useState('')

    const login = () => props.navigation.navigate('Search')
    const register = () => props.navigation.navigate('Register')

    useEffect(() => {
        if (props.loginState.isRecoveringPassword) {
            props.showLoading()
            AuthService.recoverPassword(recoveryEmail).then(() => {
                props.recoverPasswordSuccess()
                setTimeout(() => {
                    props.hideLoading()
                }, 2000)
            })
        } else {
            props.hideLoading
        }
    }, [props.loginState.isRecoveringPassword])

    const forgotEmailPassword = (email: string) => {
        setRecoveryEmail(email)
        props.recoverPassword()
    }

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
                                        onPress={() =>
                                            forgotEmailPassword(values.email)
                                        }
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
            {props.recoverPasswordSuccess ? (
                <Snackbar
                    duration={5000}
                    visible={true}
                    onDismiss={() => {}}
                    testID="recoverPasswordSuccess"
                >
                    Recovery email sent
                </Snackbar>
            ) : null}
        </SafeAreaView>
    )
}

const mapStateToProps = (store: AppState) => ({
    loadingState: store.loading,
    loginState: store.login,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            showLoading: show,
            hideLoading: hide,
            recoverPassword: recoverPassword,
            recoverPasswordSuccess: recoverPasswordSuccess,
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

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
