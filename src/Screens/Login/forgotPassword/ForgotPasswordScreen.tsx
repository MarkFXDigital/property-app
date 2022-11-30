import React, { useState } from 'react'
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth'
import { authentication } from '../../../../firebase'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { loginStyle } from '../login.style'
import { Button, Card, TextInput } from 'react-native-paper'
import { registerStyle } from './register.style'
import { Formik } from 'formik'
import { loginForm } from '../login.form'
import PropertyLogo from '../../../Components/PropertyLogo'
import { errorMessage } from '../../../Components/errorMessage/errorMessage'

export const ForgotPasswordScreen = () => {
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(false)
    const [formError, setFormError] = useState(false)

    const handleForgotPassword = (email: string) => {
        sendPasswordResetEmail(authentication, email)
            .then(() => {
                setConfirmPassword(true)
            })
            .catch((error) => {
                const errorCode = error.code
                setFormError(true)
            })
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={registerStyle.content}>
                    <Card>
                        <Card.Title
                            titleStyle={loginStyle.cardTitle}
                            title=""
                        ></Card.Title>
                        <PropertyLogo />
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
                                            onPressOut={() =>
                                                setFormError(false)
                                            }
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
                                                handleForgotPassword(
                                                    values.email
                                                )
                                            }
                                        >
                                            Reset Password
                                        </Button>
                                    </>
                                )}
                            </Formik>
                            {formError
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
