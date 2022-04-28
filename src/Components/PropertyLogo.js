import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

const PropertyLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Property Analyser</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    borderWidth: 3,
    borderColor: theme.mainGold,
    marginBottom: 20,
  },
  logoText: {
    margin: 5,
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default PropertyLogo;
