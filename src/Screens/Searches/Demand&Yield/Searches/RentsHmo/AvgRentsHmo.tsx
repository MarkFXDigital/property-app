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
import { errorMessage } from '../../../../../Components/errorMessage/errorMessage'
import { API_KEY, API_URL } from '../../../../../utils/consts'
import { barGraphTwoHmoComponent } from '../../../../../Components/graphs/BarGraphHmo'

const AvgRentsHmoScreen = () => {
    // On Screen State
    const [tips, setTips] = useState(false)

    // To redux response data
    const [data, setData] = useState<any>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Error handling
    const [showSearchErrorPopup, setShowSearchErrorPopup] = useState(false)
    const [searchErrorResponse, setSearchErrorResponse] = useState('')

    // Search Params
    const [postcode, setPostcode] = useState('')
    const [bedroomNum, setBedroomNum] = useState('')

    const fetchPriceSearch = async () => {
        const response = await fetch(
            `https://${API_URL}/rents-hmo?key=${API_KEY}&postcode=${postcode}&bedrooms=${bedroomNum}`
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

    if (isLoaded) {
        return (
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.mainContainer}>
                    <PropertyLogo />
                    <Text style={styles.infoText}>
                        Welcome to Property Analyser your one stop shop for
                        property data. Please enter full postcode to get most
                        accurate data set.
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
                                    * Y axis is monthy value in GBP
                                </Text>
                                <Text style={styles.tipText}>
                                    * X axis is the range in which values occur
                                    within designated search area
                                </Text>
                            </View>
                        )}
                        {data.data['single-shared-bath']['100pc_range'] !=
                        undefined
                            ? barGraphTwoHmoComponent(
                                  data,
                                  'single-shared-bath',
                                  'Single with Shared Bath'
                              )
                            : null}

                        {data.data['single-ensuite']['100pc_range'] != undefined
                            ? barGraphTwoHmoComponent(
                                  data,
                                  'single-ensuite',
                                  'Single with Ensuite'
                              )
                            : null}
                        {data.data['double-ensuite']['100pc_range'] != undefined
                            ? barGraphTwoHmoComponent(
                                  data,
                                  'double-ensuite',
                                  'Double Ensuite'
                              )
                            : null}
                        {data.data['double-shared-bath']['100pc_range'] !=
                        undefined
                            ? barGraphTwoHmoComponent(
                                  data,
                                  'double-shared-bath',
                                  'Double Shared Bath'
                              )
                            : null}
                    </View>

                    <View style={styles.searchAgainContainer}>
                        <Text> Like to do another search? </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setPostcode(val)}
                            onPressIn={() => setShowSearchErrorPopup(false)}
                            placeholder="Please enter desired postcode"
                            placeholderTextColor="grey"
                        />

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
        )
    } else {
        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    <PropertyLogo />

                    <Text style={styles.infoText}>
                        Welcome to Property Analyser your one stop shop for
                        property data. Please enter full postcode to get most
                        accurate data set.
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setPostcode(val)}
                        onPressIn={() => setShowSearchErrorPopup(false)}
                        placeholder="Please enter desired postcode"
                        placeholderTextColor="grey"
                    />
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
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
    },
    tipContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    tipText: {
        textAlign: 'center',
        paddingHorizontal: 2,
    },
})

export default AvgRentsHmoScreen
