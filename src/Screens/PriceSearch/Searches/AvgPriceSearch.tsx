import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    FlatList,
} from 'react-native'
import PropertyLogo from '../../../Components/PropertyLogo'
import {
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryAxis,
} from 'victory-native'
import { FontAwesome } from '@expo/vector-icons'
import { theme } from '../../../theme'
import { Ionicons } from '@expo/vector-icons'
import { barGraphComponent } from '../../../Components/graphs/barGraph'

const AvgPriceSearch = () => {
    // On Screen State
    const [tips, setTips] = useState(false)
    const [firstSearch, setFirstSearch] = useState(true)
    // To redux response data
    const [data, setData] = useState<any>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Search Params
    const [postcode, setPostcode] = useState('')
    const [bedroomNum, setBedroomNum] = useState('')

    const fetchPriceSearch = async () => {
        console.log('search pressed')
        try {
            const response = await fetch(
                `https://api.propertydata.co.uk/prices?key=R1AGPYU2O1&postcode=${postcode}&bedrooms=${bedroomNum}`
            )

            const json = await response.json()
            console.log(json)

            setData(json)
            setIsLoaded(true)
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoaded) {
        console.log(isLoaded)
        return (
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.mainContainer}>
                    <PropertyLogo />
                    <Text style={styles.infoText}>
                        Welcome to Property Analyser your one stop shop for
                        property Data.
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (!tips) {
                                return setTips(true)
                            } else if (tips) {
                                return setTips(false)
                            }
                        }}
                    >
                        <View style={styles.questionIcon}>
                            <FontAwesome
                                name="question-circle-o"
                                size={24}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.graphContainer}>
                        {barGraphComponent(data)}
                        {tips && (
                            <View style={styles.tipContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!tips) {
                                            console.log(tips)
                                            return setTips(true)
                                        } else if (tips) {
                                            console.log(tips)
                                            return setTips(false)
                                        }
                                    }}
                                >
                                    <Text style={styles.tipText}>
                                        Tips{' '}
                                        <Ionicons
                                            name="help-circle"
                                            size={22}
                                            color="black"
                                        />
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.tipText}>
                                    * Y axis is in thousands
                                </Text>
                                <Text style={styles.tipText}>
                                    * X axis it the range in which values occur
                                    within designated search area
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.searchAgainContainer}>
                        <Text> Like to do another search? </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setPostcode(val)}
                            placeholder=" Please entered desired postcode "
                            placeholderTextColor="grey"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setBedroomNum(val)}
                            placeholder="Please enter number of bedrooms"
                            placeholderTextColor="grey"
                        />
                        <TouchableOpacity
                            onPress={fetchPriceSearch}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>SEARCH</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    <PropertyLogo />

                    <Text style={styles.infoText}>
                        Welcome to Property Analyser your one stop shop for
                        property Data.
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setPostcode(val)}
                        placeholder="Please entered desired postcode "
                        placeholderTextColor="grey"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setBedroomNum(val)}
                        placeholder="Please enter number of bedrooms"
                        placeholderTextColor="grey"
                    />
                    <TouchableOpacity
                        onPress={fetchPriceSearch}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>SEARCH</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: 'transparent',
        paddingLeft: 10,
        paddingRight: 10,
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 80,
    },
    searchAgainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        paddingBottom: 80,
    },
    infoText: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionIcon: {
        width: 250,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    graphContainer: {
        width: '100%',

        marginTop: 20,
    },
    button: {
        width: 120,
        height: 30,
        backgroundColor: theme.mainGold,
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
    },
    input: {
        height: 40,
        width: '65%',
        textAlign: 'center',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    tipContainer: {
        alignItems: 'center',
    },
    tipText: {
        textAlign: 'center',
    },
})

export default AvgPriceSearch
