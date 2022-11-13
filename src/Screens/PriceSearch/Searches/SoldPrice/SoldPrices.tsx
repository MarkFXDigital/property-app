import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native'
import PropertyLogo from '../../../../Components/PropertyLogo'
import { FontAwesome } from '@expo/vector-icons'
import { theme } from '../../../../theme'
import { Ionicons } from '@expo/vector-icons'
import Dropdown from '../../../../Components/Dropdown'
import { barGraphComponent } from '../../../../Components/graphs/barGraph'

const SoldPrices = ({ navigation }: any) => {
    // On Screen State
    const [tips, setTips] = useState(false)
    // To redux response data
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Search Params
    const [postcode, setPostcode] = useState('')
    const [propertyType, setPropertyType] = useState('')

    const dropDownData = [
        { label: 'Flat', value: 'flat' },
        { label: 'Terraced House', value: 'terraced_house' },
        { label: 'Semi-Detached House', value: 'semi-detached_house' },
        { label: 'Detached House', value: 'detached_house' },
    ]
    const fetchPriceSearch = async () => {
        try {
            const response = await fetch(
                `https://api.propertydata.co.uk/sold-prices?key=R1AGPYU2O1&postcode=${postcode}&type=${propertyType}&max_age=12
`
            )
            const json = await response.json()
            //   console.log(json);
            setData(json)
            setIsLoaded(true)
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoaded) {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.mainGraphContainer}>
                        <PropertyLogo />
                        <Text style={styles.infoText}>
                            Welcome to Property Analyser your one stop shop for
                            property Data. Sold Prices
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
                                                return setTips(true)
                                            } else if (tips) {
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
                                        {' '}
                                        * Y axis is in thousands
                                    </Text>
                                    <Text style={styles.tipText}>
                                        * X axis it the range in which values
                                        occur within designated search area
                                    </Text>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                navigation.navigate('Sold Price Data', {
                                    data,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>Link to Data</Text>
                        </TouchableOpacity>
                        <View style={styles.searchAgainContainer}>
                            <Text> Like to do another search? </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val) => setPostcode(val)}
                                placeholder="Please entered desired postcode "
                            />
                            <View style={styles.container}>
                                <Dropdown
                                    label="Please Select a Property type"
                                    data={dropDownData}
                                    onSelect={setPropertyType}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={fetchPriceSearch}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>SEARCH</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    } else {
        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    <PropertyLogo />

                    <Text style={styles.infoText}>
                        Welcome to Property Analyser your one stop shop for
                        property Data. Sold Prices
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setPostcode(val)}
                        placeholder="Please entered desired postcode "
                    />
                    <View style={styles.container}>
                        <Dropdown
                            label="Property Type"
                            data={dropDownData}
                            onSelect={setPropertyType}
                        />
                    </View>
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
    container: { width: 150 },
    mainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 80,
        marginTop: 20,
    },
    mainGraphContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // paddingBottom: 80,
    },
    searchAgainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        paddingBottom: 30,
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
        marginTop: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
    },
    input: {
        height: 40,
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

export default SoldPrices
