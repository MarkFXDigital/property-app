import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { generalButtonStyles } from './generalButtonStyles'

type buttonText = {
    title: string
    onPress: Function
    marginTop: number
}

export const GeneralButton = ({ title, onPress, marginTop }: buttonText) => (
    <TouchableOpacity
        onPress={onPress}
        style={[{ marginTop: marginTop }, generalButtonStyles.button]}
    >
        <Text style={generalButtonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
)
