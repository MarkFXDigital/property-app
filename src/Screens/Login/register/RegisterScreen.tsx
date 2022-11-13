import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../../firebase'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { loginStyle } from '../login.style'
import { Button, Card, TextInput } from 'react-native-paper'
import { registerStyle } from './register.style'
import { HeaderBar } from '../../../Components/HeaderBar'
import { errorMessage } from '../../../Components/errorMessage/errorMessage'

import { Formik } from 'formik'
import { loginForm } from '../login.form'

export const RegisterScreen = () => {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [approvedPassword, setApprovedPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(false)

    const handleSignup = (email: string, password: string) => {
        // if (password === confirmPassword) {
        //     setApprovedPassword(password)
        // }

        console.log(email, password)

        createUserWithEmailAndPassword(authentication, email, password)
            .then((userCredentials) => {
                console.log('registered with : ', userCredentials)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                alert(errorCode)
            })
    }

    return (
        <SafeAreaView style={loginStyle.content}>
            <ScrollView>
                <HeaderBar title="Register" />
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
                    <Card>
                        <Card.Title
                            titleStyle={loginStyle.cardTitle}
                            title="Property App"
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
                                            onFocus={() =>
                                                setFieldTouched('email')
                                            }
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
                                            secureTextEntry={true}
                                            onChangeText={handleChange(
                                                'password'
                                            )}
                                            testID="password"
                                            onFocus={() =>
                                                setFieldTouched('password')
                                            }
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
                                            mode="contained"
                                            testID="loginButton"
                                            onPress={() =>
                                                handleSignup(
                                                    values.email,
                                                    values.password
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
            </ScrollView>
        </SafeAreaView>
    )
}
