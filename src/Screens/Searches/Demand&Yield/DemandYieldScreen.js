import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import PropertyLogo from '../../../Components/PropertyLogo'

import homeImageOne from '../../../Assets/Images/home-one.jpg'
import homeImageTwo from '../../../Assets/Images/home-two.jpg'
import homeImageThree from '../../../Assets/Images/home-three.jpg'

const DemandYieldScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.mainContainerView}>
                <PropertyLogo />
                <View style={styles.firstSearchContainer}>
                    <TouchableOpacity
                        styles={styles.imageContainer}
                        onPress={() => navigation.navigate('Average Rents')}
                    >
                        <ImageBackground
                            source={homeImageOne}
                            style={styles.images}
                            imageStyle={styles.ImageBackgroundContainer}
                        >
                            <Text style={styles.imageText}>Average Rents </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity styles={styles.imageContainer}>
                        <ImageBackground
                            source={homeImageTwo}
                            style={styles.images}
                            imageStyle={styles.ImageBackgroundContainer}
                        >
                            <Text style={styles.imageTextComingSoon}>
                                Coming Soon! Property Yield
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                <View style={styles.firstSearchContainer}>
                    <TouchableOpacity styles={styles.imageContainer}>
                        <ImageBackground
                            source={homeImageOne}
                            style={styles.images}
                            imageStyle={styles.ImageBackgroundContainer}
                        >
                            <Text style={styles.imageTextComingSoon}>
                                Coming Soon! Rents HMO
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity styles={styles.imageContainer}>
                        <ImageBackground
                            source={homeImageTwo}
                            style={styles.images}
                            imageStyle={styles.ImageBackgroundContainer}
                        >
                            <Text style={styles.imageTextComingSoon}>
                                Coming Soon! Rental Demand
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                <View style={styles.firstSearchContainer}>
                    <TouchableOpacity styles={styles.imageContainer}>
                        <ImageBackground
                            source={homeImageOne}
                            style={styles.images}
                            imageStyle={styles.ImageBackgroundContainer}
                        >
                            <Text style={styles.imageTextComingSoon}>
                                Coming Soon! Rental Valuation
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity styles={styles.imageContainer}>
                        <ImageBackground
                            source={homeImageTwo}
                            style={styles.images}
                            imageStyle={styles.ImageBackgroundContainer}
                        >
                            <Text style={styles.imageTextComingSoon}>
                                Coming Soon! HMO Valuation
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {},
    mainContainerView: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center',
        marginLeft: 0,
        marginBottom: 60,
    },
    imageContainer: {
        marginBottom: 50,
        marginTop: 15,
        marginRight: 20,
    },
    ImageBackgroundContainer: {
        opacity: 0.5,
        borderRadius: 25,
    },
    images: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',
        marginBottom: 20,
        borderRadius: 25,
    },
    ImageBackgroundContainer: {
        opacity: 0.5,
        borderRadius: 25,
    },

    imageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
    },
    imageTextComingSoon: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 3,
        opacity: 0.75,
    },
    firstSearchContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default DemandYieldScreen
