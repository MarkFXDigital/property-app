import { View, Text } from 'react-native'
import React, { ReactElement } from 'react'
import { errorMessageStyles } from './errorMessage.styles'

export const errorMessage = (text: string, textTwo?: string): ReactElement => {
    return (
        <View style={errorMessageStyles.view}>
            <Text style={errorMessageStyles.text}> {text}</Text>
            <Text style={errorMessageStyles.text}>{textTwo}</Text>
        </View>
    )
}
