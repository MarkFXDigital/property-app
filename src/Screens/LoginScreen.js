import React, { useState, useEffect } from "react";
import { theme } from "../theme";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

//firestore
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authentication } from "../../firebase";

// Components
import PropertyLogo from "../Components/PropertyLogo";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignup = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        // Signed in
        setEmail("");
        setPassword("");
        console.log("registered with : ", userCredentials);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(() => {
        setIsSignedIn(true);
        navigation.navigate("Search");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleLogout = () => {
    signOut(authentication)
      .then(() => {
        setIsSignedIn(false);
      })
      .catch((userCredentials) => {});
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
      <PropertyLogo />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          //   value={"" }
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          //   value={"" }
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          {isSignedIn === true ? (
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSignup}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // flexDirection: "column",
    marginTop: 50,
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",

    marginTop: 40,
  },
  button: {
    backgroundColor: theme.mainGold,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    // borderColor: "white",
    // borderWidth: 2,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    fontSize: 16,
  },
  buttonOutlineText: {
    fontWeight: "700",
    color: theme.mainGold,
    fontSize: 16,
  },
});

export default LoginScreen;
