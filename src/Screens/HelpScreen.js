import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  text,
  number,
} from "react-native";
import PropertyLogo from "../Components/PropertyLogo";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
  CenteredLabel,
} from "victory-native";
import { theme } from "../theme";

const HelpScreen = () => {
  // On Screen State
  const [tips, setTips] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);
  // To store response data
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Search Params
  const [postcode, setPostcode] = useState("");
  const [bedroomNum, setBedroomNum] = useState("");

  const chartHeight = Dimensions.get("window").height * 0.4;
  const chartWidth = Dimensions.get("window").width;

  const fetchPriceSearch = async () => {
    try {
      const response = await fetch(
        `https://api.propertydata.co.uk/prices?key=TORGPUR3KY&postcode=${postcode}&bedrooms=${bedroomNum}`
      );
      const json = await response.json();
      console.log(json);
      setData(json);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoaded) {
    return (
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.mainContainer}>
          <PropertyLogo />
          <Text>
            Welcome to Property Analyser your one stop shop for property Data.
          </Text>
          <TouchableOpacity onPress={fetchPriceSearch} style={styles.button}>
            <Text style={styles.buttonText}>search</Text>
          </TouchableOpacity>

          <View style={styles.graphContainer}>
            <VictoryChart
              height={chartHeight}
              width={chartWidth}
              padding={{ left: 70, bottom: 30, right: 50 }}
            >
              <VictoryGroup offset={15} colorScale={"qualitative"}>
                <VictoryBar
                  data={[
                    { x: 1, y: data.data["70pc_range"][0] },
                    { x: 2, y: data.data["80pc_range"][0] },
                    { x: 3, y: data.data["90pc_range"][0] },
                    { x: 4, y: data.data["100pc_range"][0] },
                  ]}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 1000 },
                  }}
                  cornerRadius={6}
                  style={{
                    data: {
                      // fill: colors.skyBle,
                    },
                  }}
                  barWidth={10}
                />

                <VictoryBar
                  data={[
                    { x: 1, y: data.data["70pc_range"][1] },
                    { x: 2, y: data.data["80pc_range"][1] },
                    { x: 3, y: data.data["90pc_range"][1] },
                    { x: 4, y: data.data["100pc_range"][1] },
                  ]}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 },
                  }}
                  cornerRadius={6}
                  style={{
                    data: {
                      fill: theme.mainGold,
                    },
                  }}
                  barWidth={10}
                  labelComponent={CenteredLabel}
                />
                <VictoryAxis
                  tickValues={["70% ", "80% ", "90% ", "100% "]}
                  style={{
                    tickLabels: {
                      fontSize: 7,
                    },
                    tickLabels: { color: theme.mainGold },
                    ticks: { color: theme.mainGold },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  orientation="left"
                  style={{ tickLabels: { fontSize: 5 } }}
                  fixLabelOverlap={true}
                />
              </VictoryGroup>
            </VictoryChart>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (tips === false) {
                console.log(tips);
                return setTips(true);
              } else if (tips === true) {
                console.log(tips);
                return setTips(false);
              }
            }}
          >
            <Text>????</Text>
          </TouchableOpacity>
          {tips && (
            <View>
              <Text>Tips are here! </Text>
            </View>
          )}

          <View>
            <Text> Like to do another search? </Text>
            <TextInput
              style={styles.input}
              onChangeText={(val) => setPostcode(val)}
              value={text}
              placeholder=" Please entered desired postcode "
            />
            <TextInput
              style={styles.input}
              onChangeText={(val) => setBedroomNum(val)}
              value={text}
              placeholder="Please enter number of bedrooms"
            />
            <TouchableOpacity onPress={fetchPriceSearch} style={styles.button}>
              <Text style={styles.buttonText}>SEARCH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <PropertyLogo />
          <Text>
            Welcome to Property Analyser your one stop shop for property Data.
          </Text>
          <TouchableOpacity onPress={fetchPriceSearch} style={styles.button}>
            <Text style={styles.buttonText}>SEARCH</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            onChangeText={(val) => setPostcode(val)}
            value={text}
            placeholder=" Please entered desired postcode "
          />
          <TextInput
            style={styles.input}
            onChangeText={(val) => setBedroomNum(val)}
            value={text}
            placeholder="Please enter number of bedrooms"
          />
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    alignItems: "center",
    paddingBottom: 80,
  },
  graphContainer: {
    width: "100%",
    paddingLeft: 5,
  },
  button: {
    width: 100,
    backgroundColor: theme.mainGold,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default HelpScreen;
