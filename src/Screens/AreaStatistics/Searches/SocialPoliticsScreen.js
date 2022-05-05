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
import PropertyLogo from "../../../Components/PropertyLogo";
import {
  VictoryPie,
  VictoryChart,
  VictoryLegend,
  VictoryAxis,
  CenteredLabel,
} from "victory-native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

const SocialPoliticsScreen = () => {
  // On Screen State
  const [tips, setTips] = useState(false);
  const [secondTips, setSecondTips] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);
  // To store response data
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Search Params
  const [postcode, setPostcode] = useState("");
  const [bedroomNum, setBedroomNum] = useState("");

  const chartHeight = Dimensions.get("window").height * 0.6;
  const chartWidth = Dimensions.get("window").width;

  const fetchPriceSearch = async () => {
    try {
      const response = await fetch(
        `https://api.propertydata.co.uk/demographics?key=TORGPUR3KY&postcode=${postcode}`
      );
      const json = await response.json();
      //   console.log(json.data["politics"]["results"]);
      setData(json);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoaded) {
    console.log(data.data["commute_method"]);
    return (
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.mainContainer}>
          <PropertyLogo />
          <Text style={styles.infoText}>
            Welcome to Property Analyser your one stop shop for property Data.
          </Text>
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
            <View style={styles.questionIcon}>
              <Text style={styles.graphTitle}>Polical Party Split</Text>
              <FontAwesome name="question-circle-o" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <View>
            <VictoryChart
              height={chartHeight}
              width={chartWidth}
              padding={{ left: 70, bottom: 0, right: 50, top: 40 }}
            >
              <VictoryLegend
                x={10}
                y={0}
                centerTitle
                orientation="vertical"
                gutter={30}
                style={{
                  border: { stroke: "black" },
                  title: { fontSize: 10 },
                  labels: { fontSize: 9 },
                }}
                data={[
                  { name: "Labour", symbol: { fill: "red" } },
                  { name: "Conservative", symbol: { fill: "#0087DC" } },
                  { name: "Lib Dems", symbol: { fill: "gold" } },
                  { name: "Greens", symbol: { fill: "green" } },

                  { name: "Brexit Party", symbol: { fill: "#ADD8E6" } },
                ]}
              />
              <VictoryPie
                // style={{
                //   data: { fillOpacity: 0.3, stroke: "black", strokeWidth: 1 },
                // }}
                colorScale={[
                  "red",
                  "#0087DC",
                  "gold",
                  "#FDBB30",
                  "green",
                  "#ADD8E6.",
                ]}
                labels={() => null}
                data={[
                  {
                    y: data.data["politics"]["results"]["Labour"],
                  },
                  {
                    y: data.data["politics"]["results"]["Conservative"],
                  },

                  {
                    // x: "Liberal Democrat",
                    y: data.data["politics"]["results"]["Liberal Democrat"],
                  },
                  {
                    // x: "Green",
                    y: data.data["politics"]["results"]["Green"],
                  },

                  //   {
                  //     // x: "Brexit Party",
                  //     y: data.data["politics"]["results"]["Brexit Party"],
                  //   },
                ]}
              />

              <VictoryAxis
                style={{
                  axis: { stroke: "transparent" },
                  ticks: { stroke: "transparent" },
                  tickLabels: { fill: "transparent" },
                }}
              />
            </VictoryChart>
            <TouchableOpacity
              style={styles.secondTipContainer}
              onPress={() => {
                if (tips === false) {
                  console.log(tips);
                  return setSecondTips(true);
                } else if (tips === true) {
                  console.log(tips);
                  return setSecondTips(false);
                }
              }}
            >
              <View style={styles.questionIcon}>
                <Text style={styles.secondGraphTitle}>Transport Methods</Text>
                <FontAwesome name="question-circle-o" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <VictoryChart
              height={chartHeight}
              width={chartWidth}
              padding={{ left: 70, bottom: 0, right: 50, top: 40 }}
            >
              <VictoryLegend
                x={10}
                y={0}
                itemsPerRow={3}
                centerTitle
                orientation="horizontal"
                gutter={30}
                style={{
                  border: { stroke: "black" },
                  title: { fontSize: 10 },
                  labels: { fontSize: 9 },
                }}
                data={[
                  { name: "Work From Home", symbol: { fill: "#f72119" } },
                  { name: "Bicycle", symbol: { fill: "#0087DC" } },
                  { name: "Bus", symbol: { fill: "gold" } },
                  { name: "Car", symbol: { fill: "green" } },
                  { name: "Foot", symbol: { fill: "pink" } },
                  { name: "Motorcycle", symbol: { fill: "purple" } },
                  { name: "Taxi", symbol: { fill: "black" } },
                  { name: "Train", symbol: { fill: "grey" } },
                  { name: "Underground", symbol: { fill: "#34eb77" } },
                  { name: "Other", symbol: { fill: "#ffff00" } },
                ]}
              />

              {/* Second Pie Chart --- Commute Method */}
              <VictoryPie
                colorScale={[
                  "#f72119",
                  "#0087DC",
                  "gold",
                  "green",
                  "pink",
                  "purple",
                  "black",
                  "grey",
                  "#34eb77",
                  "#ffff00",
                ]}
                labels={() => null}
                data={[
                  {
                    y: data.data["commute_method"]["at_home"],
                  },
                  {
                    y: data.data["commute_method"]["bicycle"],
                  },
                  {
                    y: data.data["commute_method"]["bus"],
                  },
                  {
                    y:
                      data.data["commute_method"]["car_driver"] +
                      data.data["commute_method"]["car_passenger"],
                  },
                  {
                    y: data.data["commute_method"]["foot"],
                  },
                  {
                    y: data.data["commute_method"]["motorcycle"],
                  },
                  {
                    y: data.data["commute_method"]["other"],
                  },
                  {
                    y: data.data["commute_method"]["taxi"],
                  },
                  {
                    y: data.data["commute_method"]["train"],
                  },
                  {
                    y: data.data["commute_method"]["underground_light_rail"],
                  },
                ]}
              />

              <VictoryAxis
                style={{
                  axis: { stroke: "transparent" },
                  ticks: { stroke: "transparent" },
                  tickLabels: { fill: "transparent" },
                }}
              />
            </VictoryChart>

            {secondTips && (
              <View style={styles.tipContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (secondTips === false) {
                      console.log(secondTips);
                      return setSecondTips(true);
                    } else if (secondTips === true) {
                      console.log(secondTips);
                      return setSecondTips(false);
                    }
                  }}
                >
                  <Text style={styles.tipText}>
                    Tips <Ionicons name="help-circle" size={22} color="black" />
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.tipText}>
                    Work from home: {data.data["commute_method"]["at_home"]}
                    {"  "}
                    Bicycle: {data.data["commute_method"]["bicycle"]}
                  </Text>
                  <Text style={styles.tipText}>
                    Bus: {data.data["commute_method"]["bus"]}
                    {"  "}
                    Car:{" "}
                    {data.data["commute_method"]["car_driver"] +
                      data.data["commute_method"]["car_passenger"]}
                  </Text>

                  <Text style={styles.tipText}>
                    Foot: {data.data["commute_method"]["foot"]}
                    {"  "}
                    Motorcycle: {data.data["politics"]["results"]["Green"]}
                  </Text>
                  <Text style={styles.tipText}>
                    Taxi: {data.data["commute_method"]["taxi"]}
                    {"  "}
                    Train: {data.data["commute_method"]["train"]}
                  </Text>
                  <Text style={styles.tipText}>
                    Underground:{" "}
                    {data.data["commute_method"]["underground_light_rail"]}
                    {"  "}
                    Other: {data.data["commute_method"]["other"]}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.searchAgainContainer}>
            <Text> Like to do another search? </Text>
            <TextInput
              style={styles.input}
              onChangeText={(val) => setPostcode(val)}
              value={text}
              placeholder=" Please entered desired postcode "
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

          <Text style={styles.infoText}>
            Welcome to Property Analyser your one stop shop for property Data.
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={(val) => setPostcode(val)}
            value={text}
            placeholder=" Please entered desired postcode "
          />

          <TouchableOpacity onPress={fetchPriceSearch} style={styles.button}>
            <Text style={styles.buttonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "transparent",
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 80,
  },
  searchAgainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 80,
  },
  graphTitle: {
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    paddingRight: 50,
  },
  secondGraphTitle: {
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    paddingRight: 70,
  },
  infoText: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  questionIcon: {
    width: 250,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginBottom: 10,
    marginTop: 10,
  },
  graphContainer: {
    width: "100%",
    marginTop: 20,
  },
  secondTipContainer: {
    marginRight: 10,
  },
  button: {
    width: 120,
    height: 30,
    backgroundColor: theme.mainGold,
    justifyContent: "center",
    borderRadius: 25,
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
  tipContainer: {
    alignItems: "center",
  },
  tipText: {
    textAlign: "center",
  },
});

export default SocialPoliticsScreen;
