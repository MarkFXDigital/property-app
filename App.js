import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "./src/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

//screens
import LoginScreen from "./src/Screens/LoginScreen";
import SearchScreen from "./src/Screens/SearchScreen";
import HelpScreen from "./src/Screens/HelpScreen";

//Price Search Screens
import PriceSearchScreen from "./src/Screens/PriceSearch/PriceSearchScreen";
import AvgPriceSearch from "./src/Screens/PriceSearch/Searches/AvgPriceSearch";

//Demand Yield Screens
import DemandYieldSearchScreen from "./src/Screens/Demand&Yield/DemandYieldScreen";
import AvgRentsScreen from "./src/Screens/Demand&Yield/Searches/AvgRentsScreen";

// Area Statistic Screens
import AreaStatisticsScreen from "./src/Screens/AreaStatistics/AreaStatisticsScreen";
import SocialPoliticsScreen from "./src/Screens/AreaStatistics/Searches/SocialPoliticsScreen";

// Stack Navigators
const loginStack = createNativeStackNavigator();
const searchStack = createNativeStackNavigator();
const helpStack = createNativeStackNavigator();

const LoginStackScreen = () => (
  <loginStack.Navigator>
    <loginStack.Screen name="Login" component={LoginScreen} />
    <loginStack.Screen name="Search" component={SearchScreen} />

    <loginStack.Screen name="Price Search" component={PriceSearchScreen} />
    <loginStack.Screen name="Avg Price Search" component={AvgPriceSearch} />

    <loginStack.Screen
      name="Demand Yield"
      component={DemandYieldSearchScreen}
    />
    <loginStack.Screen name="Average Rents" component={AvgRentsScreen} />

    <loginStack.Screen
      name="Area Statistics"
      component={AreaStatisticsScreen}
    />
    <loginStack.Screen name="Demographics" component={SocialPoliticsScreen} />
  </loginStack.Navigator>
);
// const SearchStackScreen = () => (
//   <searchStack.Navigator>
//     <searchStack.Screen name="Search" component={SearchScreen} />
//   </searchStack.Navigator>
// );
const HelpStackScreen = () => (
  <helpStack.Navigator>
    <helpStack.Screen name="Help" component={HelpScreen} />
  </helpStack.Navigator>
);

// Initialized all Navigator
const Tab = createBottomTabNavigator();

// Ignore log notification by message:
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage",
]);

export function AppTabsNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveBackgroundColor: "#011f3b",
        tabBarActiveBackgroundColor: "#032845",
        tabBarInactiveTintColor: theme.mainGold,
        tabBarActiveTintColor: "#ffffff",
        tabBarIconStyle: { marginTop: 4 },
        tabBarLabelStyle: {
          fontSize: 13,
          color: theme.mainGold,
          paddingBottom: 3,
        },

        tabBarStyle: {
          height: 55,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          borderTopWidth: 0,
        },
        style: { borderColor: "#011f3b" },
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="LoginStack"
        component={LoginStackScreen}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="login"
              color={color}
              size={29}
              style={{ marginTop: 1 }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="SearchStack"
        component={SearchStackScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="home"
              color={color}
              size={29}
              style={{ marginTop: 1 }}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="HelpStack"
        component={HelpStackScreen}
        options={{
          tabBarLabel: "Help",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="person-add"
              color={color}
              size={29}
              style={{ marginTop: 1 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <AppTabsNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
