// import createStackNavigator from 'react-native-screens/createNativeStackNavigator'
// import { useSelector } from 'react-redux'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import LoginScreen from '../../Screens/Login/LoginScreen'
// import { RegisterScreen } from '../../Screens/Login/register/RegisterScreen'
// import SearchScreen from '../../Screens/SearchScreen'
// import PriceSearchScreen from '../../Screens/PriceSearch/PriceSearchScreen'
// import AvgPriceSearch from '../../Screens/PriceSearch/Searches/AvgPriceSearch'
// import GrowthSearch from '../../Screens/PriceSearch/Searches/GrowthSearch'
// import SoldPrices from '../../Screens/PriceSearch/Searches/SoldPrice/SoldPrices'
// import SoldPriceData from '../../Screens/PriceSearch/Searches/SoldPrice/SoldPriceData'
// import DemandYieldSearchScreen from '../../Screens/Demand&Yield/DemandYieldScreen'
// import AvgRentsScreen from '../../Screens/Demand&Yield/Searches/AvgRentsScreen'
// import AreaStatisticsScreen from '../../Screens/AreaStatistics/AreaStatisticsScreen'
// import SocialPoliticsScreen from '../../Screens/AreaStatistics/Searches/SocialPoliticsScreen'
// import React from 'react'
//
// export default function AuthStackNavigation() {
//     const selector = useSelector(
//         (state: any) => state.userLoginAndOut.isSignedIn
//     )
//     // Stack Navigators
//
//     const loggedInStack = createNativeStackNavigator()
//     const notLoggedInStack = createNativeStackNavigator()
//
//     const LoginStackScreen = () => (
//         <loggedInStack.Navigator>
//             <loggedInStack.Screen name="Login" component={LoginScreen} />
//             <loggedInStack.Screen name="Register" component={RegisterScreen} />
//             <loggedInStack.Screen name="Search" component={SearchScreen} />
//
//             <loggedInStack.Screen
//                 name="Price Search"
//                 component={PriceSearchScreen}
//             />
//             <loggedInStack.Screen
//                 name="Avg Price Search"
//                 component={AvgPriceSearch}
//             />
//             <loggedInStack.Screen
//                 name="5 Year Growth Search"
//                 component={GrowthSearch}
//             />
//             <loggedInStack.Screen name="Sold Prices" component={SoldPrices} />
//             <loggedInStack.Screen
//                 name="Sold Price Data"
//                 component={SoldPriceData}
//             />
//
//             <loggedInStack.Screen
//                 name="Demand Yield"
//                 component={DemandYieldSearchScreen}
//             />
//             <loggedInStack.Screen
//                 name="Average Rents"
//                 component={AvgRentsScreen}
//             />
//
//             <loggedInStack.Screen
//                 name="Area Statistics"
//                 component={AreaStatisticsScreen}
//             />
//             <loggedInStack.Screen
//                 name="Demographics"
//                 component={SocialPoliticsScreen}
//             />
//         </loggedInStack.Navigator>
//     )
//
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerTitleStyle: navigationStyle.headerTitleStyle,
//                 headerStyle: navigationStyle.headerStyle,
//                 headerTintColor: navigationStyle.headerTitleStyle.color,
//                 headerShown: false,
//             }}
//         >
//             {isSignedIn ? (
//                 <>
//                     <Stack.Screen
//                         name="LoggedIn"
//                         component={LoggedInBottomTabNavigation}
//                         options={{
//                             headerTitle: t('HomeTabHeaderTitle'),
//                             animationTypeForReplace: 'push',
//                         }}
//                     />
//                 </>
//             ) : (
//                 <Stack.Screen
//                     name="LoggedOut"
//                     options={{
//                         animationTypeForReplace: 'pop',
//                     }}
//                     component={Login}
//                 />
//             )}
//         </Stack.Navigator>
//     )
// }
// export const helpStack = createNativeStackNavigator()
export const test = () => {}
