import React, { useRef } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import PropertyLogo from "../Components/PropertyLogo";
import MapView from "react-native-maps";

const HelpScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <PropertyLogo />
      
      <Text style={styles.inputLabels}>Full Name:</Text>
      <TextInput style={styles.input} placeholder=" Please enter full name " />
      <Text style={styles.inputLabels}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Please enter number of bedrooms"
      />
      <Text style={styles.inputLabels}>Email:</Text>
      <TextInput
        style={styles.messageinput}
        placeholder="Please enter number of bedrooms"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  messageinput: {
    height: 100,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputLabels: {
    alignSelf: "flex-start",
    marginHorizontal: 20,
    // paddingHorizontal:
  },
});

export default HelpScreen;
