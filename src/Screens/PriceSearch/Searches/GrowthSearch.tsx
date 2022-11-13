import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
} from 'react-native'
import PropertyLogo from '../../../Components/PropertyLogo'
import { FontAwesome } from '@expo/vector-icons'
import { theme } from '../../../theme'
import { Ionicons } from '@expo/vector-icons'
import { lineGraphComponent } from '../../../Components/graphs/lineGraph/lineGraph'

const GrowthSearch = () => {
    // On Screen State
    const [tips, setTips] = useState(false)
    const [firstSearch, setFirstSearch] = useState(true)
    // To redux response data
    const [data, setData] = useState<any>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Search Params
    const [postcode, setPostcode] = useState('')

    const fetchPriceSearch = async () => {
        try {
            const response = await fetch(
                `https://api.propertydata.co.uk/growth?key=R1AGPYU2O1&postcode=${postcode}`
            )
            const json = await response.json()
            console.log(json)
            setData(json)
            setIsLoaded(true)
        } catch (error) {
            setIsLoaded(false)
            console.error(error)
        }
    }

    if (isLoaded) {
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
                        {lineGraphComponent(data)}
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
                                    * Y axis is in thousands
                                </Text>
                                <Text style={styles.tipText}>
                                    First Year Growth{'  '} {data.data[1][2]}
                                </Text>
                                <Text style={styles.tipText}>
                                    Second Year Growth{'  '} {data.data[2][2]}
                                </Text>
                                <Text style={styles.tipText}>
                                    Third Year Growth{'  '} {data.data[3][2]}
                                </Text>
                                <Text style={styles.tipText}>
                                    Fourth Year Growth{'  '}
                                    {data.data[4][2]}
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
                        placeholder=" Please entered desired postcode "
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

export default GrowthSearch
