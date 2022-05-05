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

const AreaStatisticsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.mainContainerView}>
        <PropertyLogo />
        <View style={styles.firstSearchContainer}>
          <TouchableOpacity
            styles={styles.imageContainer}
            onPress={() => navigation.navigate("Demographics")}
          >
            <ImageBackground
              source={homeImageOne}
              style={styles.images}
              imageStyle={{ opacity: 0.5, borderRadius: 25 }}
            >
              <Text style={styles.imageText}> Demographics </Text>
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
    // marginRight: 20,
    justifyContent: "space-evenly",
  },
  images: {
    width: 130,
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
    fontSize: 17,
    textAlign: "center",
  },
  firstSearchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default AreaStatisticsScreen;
