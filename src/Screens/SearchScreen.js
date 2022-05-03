import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PropertyLogo from "../Components/PropertyLogo";

// Images
import homeImageOne from "../Assets/Images/home-one.jpg";
import homeImageTwo from "../Assets/Images/home-two.jpg";
import homeImageThree from "../Assets/Images/home-three.jpg";

const SearchScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.mainContainerView}>
        <PropertyLogo />
        <TouchableOpacity
          styles={styles.imageContainer}
          onPress={() => navigation.navigate("PriceSearch")}
        >
          <ImageBackground
            source={homeImageOne}
            style={styles.images}
            imageStyle={{ opacity: 0.5, borderRadius: 25 }}
          >
            <Text style={styles.imageText}>Price Searches </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          styles={styles.imageContainer}
          onPress={() => navigation.navigate("DemandYield")}
        >
          <ImageBackground
            source={homeImageTwo}
            style={styles.images}
            imageStyle={{ opacity: 0.5, borderRadius: 25 }}
          >
            <Text style={styles.imageText}> Demand & Yield </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AreaStatistics")}>
          <View styles={styles.imageContainer}>
            <ImageBackground
              source={homeImageThree}
              style={styles.images}
              imageStyle={{ opacity: 0.5, borderRadius: 25 }}
            >
              <Text style={styles.imageText}>Area Statistics </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  mainContainerView: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    marginLeft: 0,
    marginBottom: 60,
  },
  imageContainer: {
    marginBottom: 50,
    marginTop: 15,
  },
  images: {
    width: 170,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(0,0,0)",
    marginBottom: 20,
    borderRadius: 25,
  },

  imageText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default SearchScreen;
