import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../../firebase'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { loginStyle } from '../login.style'
import { Button, Card, TextInput } from 'react-native-paper'
import { registerStyle } from './register.style'
import { Formik } from 'formik'
import { loginForm } from '../login.form'
import { errorMessage } from '../../../Components/errorMessage/errorMessage'
import { theme } from '../../../theme'
import PropertyLogo from '../../../Components/PropertyLogo'
import { checkLoggedIn } from '../AuthCheckBeforeLogin'

export const RegisterScreen = (props: any) => {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [approvedPassword, setApprovedPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(false)

    const handleSignup = (email: string, password: string, props: any) => {
        // if (password === confirmPassword) {
        //     setApprovedPassword(password)
        // }

        console.log(email, password)

        createUserWithEmailAndPassword(authentication, email, password)
            .then((userCredentials) => {
                console.log('registered with : ', userCredentials)
                checkLoggedIn(props)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                alert(errorCode)
            })
    }

    return (
        <View style={registerStyle.content}>
            {/*<Form>*/}
            {/*    <TextInput label="Email" keyboardType="email-address" />*/}
            {/*    <TextInput*/}
            {/*        label="Password"*/}
            {/*        secureTextEntry={true}*/}
            {/*        onChangeText={(password) => setPassword(password)}*/}
            {/*        right={*/}
            {/*            <TextInput.Icon*/}
            {/*                name="eye-off-outline"*/}
            {/*                color={registerStyle.icon.color}*/}
            {/*            />*/}
            {/*        }*/}
            {/*    />*/}
            {/*    <TextInput*/}
            {/*        label="Confirm Password"*/}
            {/*        secureTextEntry={false}*/}
            {/*        onChangeText={(password) =>*/}
            {/*            setConfirmPassword(password)*/}
            {/*        }*/}
            {/*        right={*/}
            {/*            <TextInput.Icon*/}
            {/*                name="eye-off-outline"*/}
            {/*                color={registerStyle.icon.color}*/}
            {/*            />*/}
            {/*        }*/}
            {/*    />*/}
            {/*    {passwordErrorMessage*/}
            {/*        ? errorMessage(*/}
            {/*              'Password are not the same',*/}
            {/*              'Please make sure passwords match'*/}
            {/*          )*/}
            {/*        : null}*/}
            {/*    <Button style={registerStyle.button} mode="contained">*/}
            {/*        Register*/}
            {/*    </Button>*/}
            {/*</Form>*/}
            <PropertyLogo />
            <Card style={registerStyle.formCard}>
                <Card.Title
                    titleStyle={registerStyle.cardTitle}
                    title="Property Analyser Signup"
                ></Card.Title>
                <Card.Content>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={loginForm}
                        onSubmit={() => {}}
                    >
                        {({
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
                                    theme={{
                                        colors: { primary: theme.mainGold },
                                    }}
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
                                    secureTextEntry={true}
                                    onChangeText={handleChange('password')}
                                    testID="password"
                                    onFocus={() => setFieldTouched('password')}
                                    theme={{
                                        colors: { primary: theme.mainGold },
                                    }}
                                />
                                <TextInput
                                    label="Confirm Password"
                                    secureTextEntry={true}
                                    onChangeText={() =>
                                        setConfirmPassword(
                                            values.confirmPassword
                                        )
                                    }
                                    testID="password"
                                    onFocus={() => setFieldTouched('password')}
                                    theme={{
                                        colors: { primary: theme.mainGold },
                                    }}
                                />
                                {touched.password && errors.password ? (
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            marginBottom: 5,
                                            padding: 1,
                                            textAlign: 'center',
                                            color: 'white',
                                            backgroundColor: '#b32134',
                                            borderRadius: 10,
                                        }}
                                        testID="error-password"
                                    >
                                        {errors.password}
                                    </Text>
                                ) : null}
                                <Button
                                    style={loginStyle.cardButton}
                                    mode="contained"
                                    testID="loginButton"
                                    onPress={() =>
                                        handleSignup(
                                            values.email,
                                            values.password,
                                            props
                                        )
                                    }
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Formik>
                    {passwordErrorMessage
                        ? errorMessage(
                              'Incorrect password or login details.',
                              'Please try again or reset password.'
                          )
                        : null}
                </Card.Content>
            </Card>
        </View>
    )
}
