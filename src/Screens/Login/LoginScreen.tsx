import React, { useEffect, useState } from 'react'
import { theme } from '../../theme'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../firebase'

// Components
import PropertyLogo from '../../Components/PropertyLogo'
import { Button, Card, TextInput } from 'react-native-paper'
import { loginStyle } from './login.style'
import { Formik } from 'formik'
import { loginForm } from './login.form'
import { LoadingState } from '../../redux/loading/LoadingState'
import { hide, show } from '../../redux/loading/loading.actions'
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { AppState } from '../../AppState'
import {
    loggingInWithRedux,
    recoverPassword,
    recoverPasswordFail,
    recoverPasswordReset,
    recoverPasswordSuccess,
} from '../../redux/login/login.actions'
import { LoginState } from '../../redux/login/LoginState'
import { login } from '../../redux/reducerSlice/slice'
import { store } from '../../redux/reducerSlice/store'
import * as SecureStore from 'expo-secure-store'
import { errorMessage } from '../../Components/errorMessage/errorMessage'
import { Constants } from '../../Components/constants/Constants'

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
    // const dispatch = useDispatch()
    // const selector = useSelector(
    //     (state: any) => state.userLoginAndOut.isSignedIn
    // )

    async function save(key: string, value: string) {
        await SecureStore.setItemAsync(key, value)
    }

    const register = () => props.navigation.navigate('Register')

    const loginFromForm = (email: string, password: string) => {
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
            <View style={loginStyle.view}>
                <PropertyLogo />
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
                                                padding: 1,
                                                textAlign: 'center',
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
                                        style={loginStyle.textInput}
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
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

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
