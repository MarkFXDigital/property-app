import React, { useEffect } from 'react'
import { LogBox, StyleSheet } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { theme } from './src/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

//screens
import LoginScreen from './src/Screens/Login/LoginScreen'
import SearchScreen from './src/Screens/SearchScreen'
import AccountScreen from './src/Screens/AccountScreen'

//Price Search Screens
import PriceSearchScreen from './src/Screens/Searches/PriceSearch/PriceSearchScreen'
import AvgPriceSearch from './src/Screens/Searches/PriceSearch/Searches/AvgPriceSearch'
import GrowthSearch from './src/Screens/Searches/PriceSearch/Searches/GrowthSearch'
import SoldPrices from './src/Screens/Searches/PriceSearch/Searches/SoldPrice/SoldPrices'
import SoldPriceData from './src/Screens/Searches/PriceSearch/Searches/SoldPrice/SoldPriceData'

//Demand Yield Screens
import DemandYieldSearchScreen from './src/Screens/Searches/Demand&Yield/DemandYieldScreen'
import AvgRentsScreen from './src/Screens/Searches/Demand&Yield/Searches/AvgRentsScreen'
import PropertyYieldScreen from './src/Screens/Searches/Demand&Yield/Searches/PropertyYield/PropertyYield'

// Area Statistic Screens
import AreaStatisticsScreen from './src/Screens/Searches/AreaStatistics/AreaStatisticsScreen'
import SocialPoliticsScreen from './src/Screens/Searches/AreaStatistics/Searches/SocialPoliticsScreen'
import { RegisterScreen } from './src/Screens/Login/register/RegisterScreen'
import { Provider, useSelector } from 'react-redux'

import { store } from './src/redux/reducerSlice/store'
// import { helpStack as helpStack1 } from './src/navigation/AuthStackNavigation/AuthStackNavigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from './firebase'
import { login } from './src/redux/reducerSlice/slice'
import * as SecureStore from 'expo-secure-store'
import { checkLoggedIn } from './src/Screens/Login/AuthCheckBeforeLogin'
import { ForgotPasswordScreen } from './src/Screens/Login/forgotPassword/ForgotPasswordScreen'
import AvgRentsHmoScreen from './src/Screens/Searches/Demand&Yield/Searches/RentsHmo/AvgRentsHmo'

// Stack Navigators
const loggedInStack = createNativeStackNavigator()
const notLoggedInStack = createNativeStackNavigator()
const helpStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

const AuthStackScreen = () => {
    const mainStack = createNativeStackNavigator()
    const notLoggedInStack = createNativeStackNavigator()
    let isLoggedIn = useSelector(
        (state: any) => state.userLoginAndOut.isSignedIn
    )

    return (
        <AuthStack.Navigator>
            <>
                {!isLoggedIn ? (
                    <>
                        <mainStack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                        <mainStack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                        <mainStack.Screen
                            name="Forgot Password"
                            component={ForgotPasswordScreen}
                        />
                    </>
                ) : (
                    <>
                        <mainStack.Screen
                            name="Search"
                            component={SearchScreen}
                        />
                        <mainStack.Screen
                            name="Price Search"
                            component={PriceSearchScreen}
                        />
                        <mainStack.Screen
                            name="Avg Price Search"
                            component={AvgPriceSearch}
                        />
                        <mainStack.Screen
                            name="5 Year Growth Search"
                            component={GrowthSearch}
                        />
                        <mainStack.Screen
                            name="Sold Prices"
                            component={SoldPrices}
                        />
                        <mainStack.Screen
                            name="Sold Price Data"
                            component={SoldPriceData}
                        />
                        <mainStack.Screen
                            name="Demand & Yield"
                            component={DemandYieldSearchScreen}
                        />
                        <mainStack.Screen
                            name="Average Rents"
                            component={AvgRentsScreen}
                        />
                        <mainStack.Screen
                            name="Average HMO Rents"
                            component={AvgRentsHmoScreen}
                        />
                        <mainStack.Screen
                            name="Property Yield"
                            component={PropertyYieldScreen}
                        />
                        <mainStack.Screen
                            name="Area Statistics"
                            component={AreaStatisticsScreen}
                        />
                        <mainStack.Screen
                            name="Demographics"
                            component={SocialPoliticsScreen}
                        />
                    </>
                )}
            </>
        </AuthStack.Navigator>
    )
}

// Initialized all Navigator
const Tab = createBottomTabNavigator()

export function AppTabsNavigation() {
    const isLoggedIn = useSelector(
        (state: any) => state.userLoginAndOut.isSignedIn
    )

    return (
        <Tab.Navigator
            initialRouteName="Login"
            screenOptions={{
                tabBarInactiveBackgroundColor: '#011f3b',
                tabBarActiveBackgroundColor: '#032845',
                tabBarInactiveTintColor: theme.mainGold,
                tabBarActiveTintColor: '#ffffff',
                tabBarIconStyle: { marginTop: 4 },
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: theme.mainGold,
                    paddingBottom: 3,
                },
                tabBarStyle: {
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 4,
                    borderTopWidth: 0,
                    borderColor: '#011f3b',
                },

                headerShown: false,
                unmountOnBlur: true,
            }}
        >
            <Tab.Screen
                name="LoginStack"
                component={AuthStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="home"
                            color={color}
                            size={29}
                            style={{ paddingBottom: 5 }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="HelpStack"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="account-circle"
                            color={color}
                            size={29}
                            style={{ paddingBottom: 5 }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const App = (props: any) => {
    const Stack = createNativeStackNavigator()

    checkLoggedIn(props)
    // const loginFromForm = (email: string, password: string) => {}

    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={AppTabsNavigation}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
