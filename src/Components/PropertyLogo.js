import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'
import allConstants, { Constants } from '../Components/constants/Constants'

const PropertyLogo = () => {
    return (
        <View style={styles.logoContainer}>
            <Text style={styles.logoText}>{Constants.APP_NAME}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: theme.mainGold,
        marginBottom: 20,
    },
    logoText: {
        margin: 5,
        marginHorizontal: 5,
        fontSize: 24,
        fontWeight: 'bold',
    },
})

export default PropertyLogo
