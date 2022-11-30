import React from 'react'
import { TouchableOpacity, ImageBackground, Text } from 'react-native'
import { comingSoonStyles } from './comingSoon.styles'

export type ComingSoonProps = {
    image: HTMLImageElement
    title: string
}

export const ComingSoonTouchable = (props: ComingSoonProps) => {
    return (
        <TouchableOpacity>
            <ImageBackground
                source={props.image}
                style={comingSoonStyles.images}
                imageStyle={comingSoonStyles.ImageBackgroundContainer}
            >
                <Text style={comingSoonStyles.imageTextComingSoon}>
                    Coming Soon! {props.title}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}
