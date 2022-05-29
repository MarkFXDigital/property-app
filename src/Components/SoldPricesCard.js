import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PropertyLogo from "./PropertyLogo";

const SoldPriceCard = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContainer}>
        {/* <Text style={styles.cardTitle}>{props.cardTitle} </Text> */}
        <PropertyLogo />
        <Text style={styles.cardAddress}> {props.address}</Text>
      </View>
      <Text style={styles.text}>Date Sold : {props.date}</Text>
      <Text style={styles.text}>Purchase Price:{props.price}</Text>
      <Text style={styles.text}>Property Type: {props.type}</Text>
      <Text style={styles.text}>Tenure: {props.tenure}</Text>
      <View>
        {/* <Text style={styles.text}> Longitude: {props.lng}</Text>
        <Text style={styles.text}>Latitude: {props.lat}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderTopColor: "#f0f",
    marginBottom: 10,
  },
  cardAddress: {
    paddingHorizontal: 20,
    textAlign: "center",
  },
});

export default SoldPriceCard;
