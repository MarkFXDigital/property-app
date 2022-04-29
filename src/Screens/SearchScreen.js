import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PropertyLogo from "../Components/PropertyLogo";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryLabel,
  VictoryStack,
  VictoryAxis,
  CenteredLabel,
} from "victory-native";

const SearchScreen = () => {
  // To store response data
  const [data, setData] = useState([]);

  // Search Params
  const [postcode, setPostcode] = useState("SW12");
  const [bedroomNum, setBedroomNum] = useState("2");

  //   const fetchPriceSearch = async (e) => {
  //     try {
  //       const response = await fetch(
  //         `https://api.propertydata.co.uk/prices?key=TORGPUR3KY&postcode=${postcode}&bedrooms=${bedroomNum}`
  //       );
  //       console.log(response);
  //     } catch {}
  //   };

  const fetchPriceSearch = async () => {
    try {
      const response = await fetch(
        `https://api.propertydata.co.uk/prices?key=TORGPUR3KY&postcode=${postcode}&bedrooms=${bedroomNum}`
      );
      const json = await response.json();

      console.log(json.data["70pc_range"][0]);
      console.log(json.data["70pc_range"][1]);
      setData(json);

      return setData;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <PropertyLogo />
      <Text>
        Welcome to Property Analyser your one stop shop for property Data.
      </Text>
      <TouchableOpacity onPress={fetchPriceSearch} style={styles.button}>
        <Text style={styles.buttonText}>search</Text>
      </TouchableOpacity>
      <VictoryChart
      // width={moderateScale(320)}
      // height={moderateScaleVertical(220)}
      >
        <VictoryGroup offset={15} colorScale={"qualitative"}>
          <VictoryBar
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 3 },
              { x: 3, y: 3 },
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
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
            ]}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            cornerRadius={6}
            style={{
              data: {
                // fill: colors.primary,
              },
            }}
            barWidth={10}
            labelComponent={CenteredLabel}
          />
          <VictoryAxis
            tickValues={["70% Range", "Aug", "Sep"]}
            style={{
              tickLabels: {
                fontSize: 5,
                padding: 1,
                angle: 10,
                verticalAnchor: "middle",
                textAnchor: "start",
              },
              //   tickLabels: { color: colors.blackL },
              //   ticks: { color: colors.blackL },
            }}
          />
          <VictoryAxis
            dependentAxis={true}
            tickValues={["₹0K", "₹10K", "₹20K", "₹30K"]}
            style={
              {
                //   tickLabels: { fill: colors.blackL },
                //   ticks: { stroke: colors.blackL },
              }
            }
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  SVmainContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    alignItems: "center",
  },
});

export default SearchScreen;
