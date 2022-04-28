import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropertyLogo from "../Components/PropertyLogo";

const SearchScreen = () => {

    // To store response data
    const [data, setData] = useState("")

    // Search Params
    const [postcode, setPostcode] = useState("")
    const [bedroomNum, setBedroomNum] = useState("")



    

  return (
    <View style={styles.mainContainer}>
      <PropertyLogo />
      <Text>
        Welcome to Property Analyser your one stop shop for property Data.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    alignItems: "center",
  },
});

export default SearchScreen;
