import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import PropertyLogo from '../Components/PropertyLogo'

// Images
// @ts-ignore
import homeImageOne from '../Assets/Images/home-one.jpg'
// @ts-ignore
import homeImageTwo from '../Assets/Images/home-two.jpg'
// @ts-ignore
import homeImageThree from '../Assets/Images/home-three.jpg'

import { useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import { checkLoggedIn } from './Login/AuthCheckBeforeLogin'

const SearchScreen = (props: any) => {
    const selector = useSelector(
        (state: any) => state.userLoginAndOut.isSignedIn
    )
    checkLoggedIn(props)

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.mainContainerView}>
                <PropertyLogo />

                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => props.navigation.navigate('Price Search')}
                >
                    <ImageBackground
                        source={homeImageOne}
                        style={styles.images}
                        imageStyle={{ opacity: 0.5, borderRadius: 25 }}
                    >
                        <Text style={styles.imageText}>Price Searches </Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => props.navigation.navigate('Demand Yield')}
                >
                    <ImageBackground
                        source={homeImageTwo}
                        style={styles.images}
                        imageStyle={{ opacity: 0.5, borderRadius: 25 }}
                    >
                        <Text style={styles.imageText}> Demand & Yield </Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Area Statistics')}
                >
                    <View style={styles.imageContainer}>
                        <ImageBackground
                            source={homeImageThree}
                            style={styles.images}
                            imageStyle={{ opacity: 0.5, borderRadius: 25 }}
                        >
                            <Text style={styles.imageText}>
                                Area Statistics{' '}
                            </Text>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
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
        marginTop: 10,
    },
    images: {
        width: 170,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',
        marginBottom: 20,
        borderRadius: 25,
    },

    imageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
})

export default SearchScreen
