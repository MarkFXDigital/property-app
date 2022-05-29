import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SoldPriceCard from "../../../../Components/SoldPricesCard";
import MapView from "react-native-maps";
import { Dimensions } from "react-native";

const SoldPriceData = ({ route, navigation }) => {
  const { data } = route.params;
  const { height, width } = Dimensions.get("window");

  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <SoldPriceCard
        cardTitle="Property Info"
        address={item.address}
        date={item.date}
        price={item.price}
        type={item.type}
        tenure={item.tenure}
        lng={item.lng}
        lat={item.lat}
      />

      <View>
        <MapView
          nestedScrollEnabled={true}
          style={{
            width: "100%",
            height: 150,
            borderRadius: 25,
            marginTop: 10,
          }}
          initialRegion={{
            latitude: Number(item.lat),
            longitude: Number(item.lng),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <MapView.Marker
            tracksViewChanges={false}
            optimizeWaypoints={true}
            coordinate={{
              latitude: Number(item.lat),
              longitude: Number(item.lng),
            }}
            title={item.address}
            description={"description"}
          />
        </MapView>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        nestedScrollEnabled={false}
        removeClippedSubviews={false}
        maxToRenderPerBatch={2}
        updateCellsBatchingPeriod={1}
        windowSize={5}
        data={data.data["raw_data"]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        // contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#dedede",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    margin: 15,
    padding: 8,
  },
});

export default SoldPriceData;
