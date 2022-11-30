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
import PropertyLogo from '../../../../Components/PropertyLogo'
import {
    VictoryPie,
    VictoryChart,
    VictoryLegend,
    VictoryAxis,
} from 'victory-native'
import { FontAwesome } from '@expo/vector-icons'
import { theme } from '../../../../theme'
import { Ionicons } from '@expo/vector-icons'
import { errorMessage } from '../../../../Components/errorMessage/errorMessage'
import { API_KEY, API_URL } from '@env'

const SocialPoliticsScreen = () => {
    // On Screen State
    const [tips, setTips] = useState(false)
    const [secondTips, setSecondTips] = useState(false)
    const [firstSearch, setFirstSearch] = useState(true)
    // To redux response data
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Search Params
    const [postcode, setPostcode] = useState('')

    // Error handling
    const [showSearchErrorPopup, setShowSearchErrorPopup] = useState(false)
    const [searchErrorResponse, setSearchErrorResponse] = useState('')

    const chartHeight = Dimensions.get('window').height * 0.56
    const chartWidth = Dimensions.get('window').width

    const fetchPriceSearch = async () => {
        const response = await fetch(
            `https://${API_URL}/demographics?key=${API_KEY}&postcode=${postcode}`
        )
            .then(async (response) => {
                const json = await response.json()

                setData(json)

                if (json['status'] === 'success') {
                    setIsLoaded(true)
                    console.log(data)
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
                            <Text style={styles.graphTitle}>
                                Political Party Split
                            </Text>
                            <FontAwesome
                                name="question-circle-o"
                                size={24}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>

                    <View>
                        <VictoryChart
                            height={chartHeight}
                            width={chartWidth}
                            padding={{
                                left: 70,
                                bottom: 0,
                                right: 50,
                            }}
                        >
                            <VictoryLegend
                                x={10}
                                y={0}
                                centerTitle
                                orientation="vertical"
                                gutter={30}
                                style={{
                                    border: { stroke: 'black' },
                                    title: { fontSize: 10 },
                                    labels: { fontSize: 9 },
                                }}
                                data={[
                                    { name: 'Labour', symbol: { fill: 'red' } },
                                    {
                                        name: 'Conservative',
                                        symbol: { fill: '#0087DC' },
                                    },
                                    {
                                        name: 'Lib Dems',
                                        symbol: { fill: 'gold' },
                                    },
                                    {
                                        name: 'Greens',
                                        symbol: { fill: 'green' },
                                    },
                                ]}
                            />
                            <VictoryPie
                                style={{
                                    data: {
                                        stroke: 'black',
                                        strokeWidth: 0.5,
                                    },
                                }}
                                colorScale={['red', '#0087DC', 'gold', 'green']}
                                labels={() => null}
                                data={[
                                    {
                                        x: 'Labour',
                                        y: Number(
                                            data.data['politics']['results'][
                                                'Labour'
                                            ].slice(0, -1)
                                        ),
                                    },
                                    {
                                        x: 'Conservative',

                                        y: Number(
                                            data.data['politics']['results'][
                                                'Conservative'
                                            ].slice(0, -1)
                                        ),
                                    },
                                    {
                                        x: 'Liberal Democrats',

                                        y: Number(
                                            data.data['politics']['results'][
                                                'Liberal Democrat'
                                            ].slice(0, -1)
                                        ),
                                    },
                                    {
                                        x: 'Greens',

                                        y: Number(
                                            data.data['politics']['results'][
                                                'Green'
                                            ].slice(0, -1)
                                        ),
                                    },
                                ]}
                            />

                            <VictoryAxis
                                style={{
                                    axis: { stroke: 'transparent' },
                                    ticks: { stroke: 'transparent' },
                                    tickLabels: { fill: 'transparent' },
                                }}
                            />
                        </VictoryChart>
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
                                    Percentage of votes as follows:
                                </Text>
                                <Text style={styles.tipText}>
                                    Labour -
                                    {data.data['politics']['results']['Labour']}
                                </Text>
                                <Text style={styles.tipText}>
                                    Conservative -{' '}
                                    {
                                        data.data['politics']['results'][
                                            'Conservative'
                                        ]
                                    }
                                </Text>
                                <Text style={styles.tipText}>
                                    Liberal Democrat -
                                    {
                                        data.data['politics']['results'][
                                            'Liberal Democrat'
                                        ]
                                    }
                                </Text>
                                <Text style={styles.tipText}>
                                    Greens -{' '}
                                    {data.data['politics']['results']['Green']}
                                </Text>
                            </View>
                        )}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    marginBottom: 5,
                                    marginLeft: 20,
                                }}
                            >
                                <Text style={styles.secondGraphTitle}>
                                    Transport Methods
                                </Text>
                                <FontAwesome
                                    name="question-circle-o"
                                    size={24}
                                    color="black"
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!tips) {
                                            return setTips(true)
                                        } else if (tips) {
                                            return setTips(false)
                                        }
                                    }}
                                ></TouchableOpacity>
                            </View>
                        </View>
                        <VictoryChart
                            height={chartHeight}
                            width={chartWidth}
                            padding={{
                                left: 70,
                                bottom: 0,
                                right: 50,
                            }}
                        >
                            <VictoryLegend
                                x={10}
                                y={0}
                                itemsPerRow={3}
                                centerTitle
                                orientation="horizontal"
                                gutter={30}
                                style={{
                                    border: { stroke: 'black' },
                                    title: { fontSize: 10 },
                                    labels: { fontSize: 9 },
                                }}
                                data={[
                                    {
                                        name: 'Work From Home',
                                        symbol: { fill: '#f72119' },
                                    },
                                    {
                                        name: 'Bicycle',
                                        symbol: { fill: '#0087DC' },
                                    },
                                    { name: 'Bus', symbol: { fill: 'gold' } },
                                    { name: 'Car', symbol: { fill: 'green' } },
                                    { name: 'Foot', symbol: { fill: 'pink' } },
                                    {
                                        name: 'Motorcycle',
                                        symbol: { fill: 'purple' },
                                    },
                                    { name: 'Taxi', symbol: { fill: 'black' } },
                                    { name: 'Train', symbol: { fill: 'grey' } },
                                    {
                                        name: 'Underground',
                                        symbol: { fill: '#34eb77' },
                                    },
                                    {
                                        name: 'Other',
                                        symbol: { fill: '#ffff00' },
                                    },
                                ]}
                            />

                            <VictoryPie
                                colorScale={[
                                    '#f72119',
                                    '#0087DC',
                                    'gold',
                                    'green',
                                    'pink',
                                    'purple',
                                    'black',
                                    'grey',
                                    '#34eb77',
                                    '#ffff00',
                                ]}
                                labels={() => null}
                                data={[
                                    {
                                        y: Number(
                                            data.data['commute_method'][
                                                'at_home'
                                            ]
                                        ),
                                    },
                                    {
                                        y: Number(
                                            data.data['commute_method'][
                                                'bicycle'
                                            ]
                                        ),
                                    },
                                    {
                                        y: Number(
                                            data.data['commute_method']['bus']
                                        ),
                                    },
                                    {
                                        y:
                                            Number(
                                                data.data['commute_method'][
                                                    'car_driver'
                                                ]
                                            ) +
                                            Number(
                                                data.data['commute_method'][
                                                    'car_passenger'
                                                ]
                                            ),
                                    },
                                    {
                                        y: Number(
                                            data.data['commute_method']['foot']
                                        ),
                                    },
                                    {
                                        y: Number(
                                            data.data['commute_method'][
                                                'motorcycle'
                                            ]
                                        ),
                                    },

                                    {
                                        y: Number(
                                            data.data['commute_method']['taxi']
                                        ),
                                    },
                                    {
                                        y: Number(
                                            data.data['commute_method']['train']
                                        ),
                                    },
                                    {
                                        y: Number(
                                            data.data['commute_method'][
                                                'underground_light_rail'
                                            ]
                                        ),
                                    },
                                    {
                                        y: Number(
                                            data.data['commute_method']['other']
                                        ),
                                    },
                                ]}
                            />

                            <VictoryAxis
                                style={{
                                    axis: { stroke: 'transparent' },
                                    ticks: { stroke: 'transparent' },
                                    tickLabels: { fill: 'transparent' },
                                }}
                            />
                        </VictoryChart>

                        {secondTips && (
                            <View style={styles.tipContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (secondTips === false) {
                                            console.log(secondTips)
                                            return setSecondTips(true)
                                        } else if (secondTips === true) {
                                            console.log(secondTips)
                                            return setSecondTips(false)
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
                                <View>
                                    <Text style={styles.tipText}>
                                        Work from home:{' '}
                                        {data.data['commute_method']['at_home']}
                                        {'  '}
                                        Bicycle:{' '}
                                        {data.data['commute_method']['bicycle']}
                                    </Text>
                                    <Text style={styles.tipText}>
                                        Bus:{' '}
                                        {data.data['commute_method']['bus']}
                                        {'  '}
                                        Car:{' '}
                                        {data.data['commute_method'][
                                            'car_driver'
                                        ] +
                                            data.data['commute_method'][
                                                'car_passenger'
                                            ]}
                                    </Text>

                                    <Text style={styles.tipText}>
                                        Foot:{' '}
                                        {data.data['commute_method']['foot']}
                                        {'  '}
                                        Motorcycle:{' '}
                                        {
                                            data.data['politics']['results'][
                                                'Green'
                                            ]
                                        }
                                    </Text>
                                    <Text style={styles.tipText}>
                                        Taxi:{' '}
                                        {data.data['commute_method']['taxi']}
                                        {'  '}
                                        Train:{' '}
                                        {data.data['commute_method']['train']}
                                    </Text>
                                    <Text style={styles.tipText}>
                                        Underground:{' '}
                                        {
                                            data.data['commute_method'][
                                                'underground_light_rail'
                                            ]
                                        }
                                        {'  '}
                                        Other:{' '}
                                        {data.data['commute_method']['other']}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>

                    <View style={styles.searchAgainContainer}>
                        <Text> Like to do another search? </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setPostcode(val)}
                            placeholder="Please entered desired postcode"
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
                        property data.
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setPostcode(val)}
                        placeholderTextColor="grey"
                        placeholder=" Please entered desired postcode "
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
        marginTop: 30,
        flexDirection: 'column',
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
    graphTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingRight: 50,
    },
    secondGraphTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingRight: 70,
    },
    infoText: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionIcon: {
        width: 250,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 10,
        marginTop: 10,
    },
    questionIconSecond: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 10,
        marginTop: 10,
    },
    graphContainer: {
        width: '100%',
        // marginTop: 20,
    },
    secondTipContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
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
        marginTop: -60,
        marginBottom: 20,
        alignItems: 'center',
    },
    tipText: {
        textAlign: 'center',
    },
})

export default SocialPoliticsScreen
