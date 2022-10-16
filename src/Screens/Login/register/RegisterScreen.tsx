import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {authentication} from "../../../../firebase";
import {SafeAreaView, ScrollView, View} from "react-native";
import {loginStyle} from "../login.style";
import PropertyLogo from "../../../Components/PropertyLogo";
import {Appbar, Button, Card, TextInput} from "react-native-paper";
import {registerStyle} from "./register.style";
import {HeaderBar} from "../../../Components/HeaderBar";

export const RegisterScreen = () => {

    return (

        <SafeAreaView style={loginStyle.content}>
            <ScrollView>
                <HeaderBar title="Register"/>
                <View style={registerStyle.content}>
                <TextInput label="Name" />
                <TextInput label="Email" keyboardType="email-address" />
                <TextInput label="Password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline" color={registerStyle.icon.color}/>}  />
                <TextInput label="Confirm Password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline" color={registerStyle.icon.color}/>}/>
                <Button style={registerStyle.button} mode="contained">Register</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
