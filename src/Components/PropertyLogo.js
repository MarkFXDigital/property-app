import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { theme } from '../theme'
import allConstants, { Constants } from '../Components/constants/Constants'
import Icon from '../../assets/propertyAnalyserIcon.png'

const PropertyLogo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image
                style={{
                    height: 150,
                    width: 250,
                    padding: 0,
                }}
                source={Icon}
            />
            {/* <Text style={styles.logoText}>{Constants.APP_NAME}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 3,
        borderColor: theme.mainGold,

        padding: 0,
    },
    logoText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
})

export default PropertyLogo
