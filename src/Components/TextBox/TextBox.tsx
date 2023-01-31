import React from 'react'
import { View, Text } from 'react-native'
import { textBoxStyles } from './textBox.styles'

export type TextBoxProps = {
    textTitle: string
    textOne: any
    textTwo?: string
    textThree?: string
}

export const TextBox = (props: TextBoxProps) => {
    return (
        <View style={textBoxStyles.container}>
            <View style={textBoxStyles.titleContainer}>
                <Text style={textBoxStyles.textTitle}>{props.textTitle}</Text>
            </View>

            <Text style={textBoxStyles.standardText}>{props.textOne}</Text>
            <Text style={textBoxStyles.standardText}>{props.textTwo}</Text>
            <Text style={textBoxStyles.standardText}>{props.textThree}</Text>
        </View>
    )
}
