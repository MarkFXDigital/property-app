import React from "react";
import { View, Text, StyleSheet } from "react-native";

const boilerplate = () => {
  return (
    <View>
      <Text>Change Me!</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

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
</VictoryChart>;

export default boilerplate;
