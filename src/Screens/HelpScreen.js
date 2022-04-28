import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropertyLogo from "../Components/PropertyLogo";

const HelpScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <PropertyLogo />
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

export default HelpScreen;
