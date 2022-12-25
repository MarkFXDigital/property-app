import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native'
import PropertyLogo from '../../../../../Components/PropertyLogo'
import { FontAwesome } from '@expo/vector-icons'
import { theme } from '../../../../../theme'
import { Ionicons } from '@expo/vector-icons'
import Dropdown from '../../../../../Components/Dropdown'
import { barGraphComponent } from '../../../../../Components/graphs/barGraph'
import { errorMessage } from '../../../../../Components/errorMessage/errorMessage'
import { API_KEY, API_URL } from '../../../../../utils/consts'

const SoldPrices = ({ navigation }: any) => {
    console.log('API KEY', API_KEY)
    // On Screen State
    const [tips, setTips] = useState(false)
    // To redux response data
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [showSearchErrorPopup, setShowSearchErrorPopup] = useState(false)
    const [searchErrorResponse, setSearchErrorResponse] = useState('')

    // Search Params
    const [postcode, setPostcode] = useState('')
    const [propertyType, setPropertyType] = useState('')

    const dropDownData = [
        { label: 'Flat', value: 'flat' },
        { label: 'Terraced House', value: 'terraced_house' },
        { label: 'Semi-Detached House', value: 'semi-detached_house' },
        { label: 'Detached House', value: 'detached_house' },
        { label: 'Any', value: '' },
    ]
    const fetchPriceSearch = async () => {
        fetch(
            `https://${API_URL}/sold-prices?key=${API_KEY}&postcode=${postcode}&type=flat&max_age=30
`
        )
            .then(async (response) => {
                const json = await response.json()

                setData(json)

                if (json['status'] === 'success') {
                    setIsLoaded(true)
                }
                if (json['status'] === 'error') {
                    setSearchErrorResponse(json['message'])
                    setShowSearchErrorPopup(true)
                }
            })
            .catch((error) => {
                setSearchErrorResponse(error['message'])
                setShowSearchErrorPopup(true)
            })
    }
    console.log('Show search popup', showSearchErrorPopup)
    if (isLoaded) {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.mainGraphContainer}>
                        <PropertyLogo />
                        <Text style={styles.infoText}>
                            Welcome to Property Analyser your one stop shop for
                            property data.
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
                                        * Y axis is in GBP
                                    </Text>
                                    <Text style={styles.tipText}>
                                        * X axis is the range in which values
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
                                onPressIn={() => setShowSearchErrorPopup(false)}
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
                        {showSearchErrorPopup
                            ? errorMessage(
                                  searchErrorResponse,
                                  'Please ensure you have entered the correct details'
                              )
                            : null}
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
                        onPressIn={() => setShowSearchErrorPopup(false)}
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
                    {showSearchErrorPopup
                        ? errorMessage(
                              searchErrorResponse,
                              'Please ensure you have entered the correct details'
                          )
                        : null}
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

        marginTop: 20,
    },
    mainGraphContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 50,
    },
    searchAgainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
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
        paddingHorizontal: 10,
    },
    tipText: {
        textAlign: 'center',
    },
})

export default SoldPrices
