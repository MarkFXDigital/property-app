import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PropertyLogo from "../../Components/PropertyLogo";

// Images
import homeImageOne from "../../Assets/Images/home-one.jpg";
import homeImageTwo from "../../Assets/Images/home-two.jpg";
import homeImageThree from "../../Assets/Images/home-three.jpg";

const PriceSearchScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.mainContainerView}>
        <PropertyLogo />
        <View style={styles.firstSearchContainer}>
          <TouchableOpacity
            styles={styles.imageContainer}
            onPress={() => navigation.navigate("Avg Price Search")}
          >
            <ImageBackground
              source={homeImageOne}
              style={styles.images}
              imageStyle={{ opacity: 0.5, borderRadius: 25 }}
            >
              <Text style={styles.imageText}>Average Price Sold </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            styles={styles.imageContainer}
            onPress={() => navigation.navigate("5 Year Growth Search")}
          >
            <ImageBackground
              source={homeImageTwo}
              style={styles.images}
              imageStyle={{ opacity: 0.5, borderRadius: 25 }}
            >
              <Text style={styles.imageText}> 5 Year Growth </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.firstSearchContainer}>
          <TouchableOpacity
            styles={styles.imageContainer}
            onPress={() => navigation.navigate("Sold Prices")}
          >
            <ImageBackground
              source={homeImageOne}
              style={styles.images}
              imageStyle={{ opacity: 0.5, borderRadius: 25 }}
            >
              <Text style={styles.imageText}>Sold Prices </Text>
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
        </View>

        <View style={styles.firstSearchContainer}>
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
            onPress={() => navigation.navigate("DemandYield", { data: data })}
          >
            <ImageBackground
              source={homeImageTwo}
              style={styles.images}
              imageStyle={{ opacity: 0.5, borderRadius: 25 }}
            >
              <Text style={styles.imageText}> Demand & Yield </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
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
    marginRight: 20,
  },
  images: {
    width: 120,
    height: 120,
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
    textAlign: "center",
    paddingHorizontal: 2.5,
  },
  firstSearchContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PriceSearchScreen;
