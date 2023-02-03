import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native'
import PropertyLogo from '../../../Components/PropertyLogo'
import homeImageOne from '../../../Assets/Images/home-one.jpg'
import homeImageTwo from '../../../Assets/Images/home-two.jpg'
import homeImageThree from '../../../Assets/Images/home-three.jpg'
import newIcon from '../../../Assets/Images/newIcon.png'

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
                    <TouchableOpacity
                        styles={styles.imageContainer}
                        onPress={() => navigation.navigate('Property Yield')}
                    >
                        <ImageBackground
                            source={homeImageTwo}
                            style={styles.images}
                            imageStyle={styles.ImageBackgroundContainer}
                        >
                            <Image
                                source={newIcon}
                                style={styles.newSearchIcon}
                            />
                            <Text style={styles.imageText}>
                                Property Yields
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                <View style={styles.firstSearchContainer}>
                    <TouchableOpacity
                        styles={styles.imageContainer}
                        onPress={() => navigation.navigate('Average HMO Rents')}
                    >
                        <ImageBackground
                            source={homeImageOne}
                            style={styles.images}
                            imageStyle={styles.ImageBackgroundContainer}
                        >
                            <Image
                                source={newIcon}
                                style={styles.newSearchIcon}
                            />
                            <Text style={styles.imageTextWithNewIcon}>
                                Average rents HMO
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
    imageTextWithNewIcon: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        paddingTop: 0,
        marginBottom: 10,
    },

    imageTextComingSoon: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 3,
        opacity: 0.75,
    },
    newSearchIcon: {
        alignSelf: 'flex-end',
        marginRight: 5,
        paddingBottom: 5,
        marginBottom: 0,
    },
    firstSearchContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default DemandYieldScreen
