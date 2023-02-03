import React, { useEffect, useState } from 'react'
import { theme } from '../../theme'
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../firebase'

// Components
import PropertyLogo from '../../Components/PropertyLogo'
import { Button, Card, TextInput } from 'react-native-paper'
import { loginStyle } from './login.style'
import { Formik } from 'formik'
import { loginForm } from './login.form'
import { LoadingState } from '../../redux/loading/LoadingState'
import { useSelector, useDispatch } from 'react-redux'
import { LoginState } from '../../redux/login/LoginState'
import {
    login,
    stopLoading,
    startLoading,
    AuthState,
} from '../../redux/reducerSlice/slice'
import { store } from '../../redux/reducerSlice/store'
import * as SecureStore from 'expo-secure-store'
import { errorMessage } from '../../Components/errorMessage/errorMessage'
import { Constants } from '../../Components/constants/Constants'
import { checkLoggedIn } from './AuthCheckBeforeLogin'
import Spinner from 'react-native-loading-spinner-overlay'

interface LoginScreenProps {
    navigation: any
    loadingState: LoadingState
    loginState: LoginState
    recoverPassword: Function
    recoverPasswordSuccess: Function
    recoverPasswordFail: Function
    recoveredPasswordReset: Function
    hideLoading: Function
    showLoading: Function
    loggingInWithRedux: Function
}

const LoginScreen = (props: any) => {
    const [formError, setFormError] = useState(false)
    const isLoading = useSelector(
        (state: any) => state.userLoginAndOut.isLoading
    )

    async function save(key: string, value: string) {
        await SecureStore.setItemAsync(key, value)
    }

    const register = () => props.navigation.navigate('Register')

    const loginFromForm = async (email: string, password: string) => {
        signInWithEmailAndPassword(authentication, email, password)
            .then(async () => {
                console.log('goes into then')
                store.dispatch(login())
                props.navigation.navigate('Search')
                await save('email', email)
                await save('password', password)
                setFormError(false)
            })
            .catch((error) => {
                const errorCode = error.code

                setFormError(true)
            })
    }

    const handleForgotPassword = () => {
        props.navigation.navigate('LoginStack', { screen: 'Forgot Password' })
    }

    return (
        <SafeAreaView style={loginStyle.content}>
            <KeyboardAvoidingView style={loginStyle.view}>
                <PropertyLogo />
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={isLoading}
                    color={'#032845'}
                    //Text with the Spinner
                    textContent={'Loading...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />
                <Card>
                    <Card.Title
                        titleNumberOfLines={2}
                        titleStyle={loginStyle.cardTitle}
                        title="Welcome to Property Analyser"
                    ></Card.Title>
                    <Card.Content>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={loginForm}
                            onSubmit={() => {}}
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
                                        theme={{
                                            colors: { primary: theme.mainGold },
                                        }}
                                        label="Email"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('email')}
                                        onPressIn={() => setFormError(false)}
                                        testID="email"
                                        onFocus={() => setFieldTouched('email')}
                                    />
                                    {touched.email && errors.email ? (
                                        <Text
                                            style={{
                                                marginTop: 5,
                                                padding: 1,
                                                textAlign: 'center',
                                                color: 'white',
                                                backgroundColor: '#b32134',
                                                borderRadius: 10,
                                            }}
                                            testID="error-email"
                                        >
                                            {errors.email}
                                        </Text>
                                    ) : null}

                                    <TextInput
                                        label="Password"
                                        theme={{
                                            colors: { primary: theme.mainGold },
                                        }}
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
                                                marginTop: 5,
                                                padding: 1,
                                                textAlign: 'center',
                                                backgroundColor: '#b32134',
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}
                                            testID="error-password"
                                        >
                                            {errors.password}
                                        </Text>
                                    ) : null}
                                    <Button
                                        onPress={handleForgotPassword}
                                        style={loginStyle.cardButton}
                                        uppercase={false}
                                        mode={'contained'}
                                        testID="recoveryButton"
                                        disabled={
                                            !!(
                                                values.email === '' ||
                                                errors.email
                                            )
                                        }
                                    >
                                        Forgot Password
                                    </Button>
                                    <Button
                                        color={'rgb(8,8,8)'}
                                        style={loginStyle.cardButton}
                                        uppercase={false}
                                        onPress={() =>
                                            loginFromForm(
                                                values.email,
                                                values.password
                                            )
                                        }
                                        disabled={
                                            !!(
                                                values.email === '' ||
                                                errors.email
                                            )
                                        }
                                        mode="contained"
                                        testID="loginButton"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        style={loginStyle.cardButton}
                                        onPress={register}
                                        uppercase={false}
                                        mode={'contained'}
                                        testID="registerButton"
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </Formik>
                        {formError
                            ? errorMessage(
                                  Constants.INCORRECT_PASSWORD_ERROR,
                                  Constants.INCORRECT_PASSWORD_ERROR_ADVICE
                              )
                            : null}
                    </Card.Content>
                </Card>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // marginTop: 50,
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
    spinnerTextStyle: {
        textAlign: 'center',
        marginTop: -50,
        color: '#032845',
    },
})
function dispatch(arg0: { payload: undefined; type: string }, arg1: void) {
    throw new Error('Function not implemented.')
}
