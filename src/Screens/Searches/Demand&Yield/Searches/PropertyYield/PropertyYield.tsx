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
import { singleBarGraphComponent } from '../../../../../Components/graphs/barGraphs/SingleBarGraph'
import { TextBox } from '../../../../../Components/TextBox/TextBox'
import { PropertyTypes } from '../../../../../types'
import Dropdown from '../../../../../Components/Dropdown'

const PropertyYieldScreen = () => {
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
    const [propertyType, setPropertyType] = useState<PropertyTypes>({
        label: '',
        value: '',
    })

    const dropDownData = [
        { label: 'Flat', value: 'flat' },
        { label: 'Terraced House', value: 'terraced_house' },
        { label: 'Semi-Detached House', value: 'semi-detached_house' },
        { label: 'Detached House', value: 'detached_house' },
        { label: 'Any', value: '' },
    ]

    const fetchPriceSearch = async () => {
        const response = await fetch(
            `https://${API_URL}/yields?key=${API_KEY}&postcode=${postcode}&type=${propertyType.value}&bedrooms=${bedroomNum}`
        )
            .then(async (response) => {
                const json = await response.json()
                console.log(json)
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
                        {singleBarGraphComponent(data)}
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
                                    Y axis is the % in yearly yield
                                </Text>
                                <Text style={styles.tipText}>
                                    What is yield? Rental yield is the potential
                                    returns on property investment through rent.
                                </Text>
                            </View>
                        )}
                        {data.data['long_let'] ? (
                            <TextBox
                                textTitle="Gross Yield Data"
                                textOne={`Postcode - ${data['postcode']} || Bedrooms -  ${data['bedrooms']}       `}
                                textTwo={`           Gross yield - ${data.data['long_let']['gross_yield']} || Points Analysed - ${data.data['long_let']['points_analysed']}  `}
                                textThree={` Property type - ${
                                    data['type']
                                        .replace(/_/g, ' ')
                                        .replace(/-/g, ' ')
                                        .charAt(0)
                                        .toUpperCase() + data['type'].slice(1)
                                }`}
                            />
                        ) : null}
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
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setBedroomNum(val)}
                            onPressIn={() => setShowSearchErrorPopup(false)}
                            placeholder="Please enter number of bedrooms"
                            placeholderTextColor="grey"
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
        )
    } else {
        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    <PropertyLogo />

                    <Text style={styles.infoText}>
                        Welcome to Property Analyser your one stop shop for
                        property data.
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setPostcode(val)}
                        onPressIn={() => setShowSearchErrorPopup(false)}
                        placeholder="Please enter desired postcode"
                        placeholderTextColor="grey"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setBedroomNum(val)}
                        onPressIn={() => setShowSearchErrorPopup(false)}
                        placeholder="Please enter number of bedrooms"
                        placeholderTextColor="grey"
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
    container: { width: 150 },
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
    },
    tipText: {
        textAlign: 'center',
        paddingHorizontal: 2,
    },
})

export default PropertyYieldScreen
