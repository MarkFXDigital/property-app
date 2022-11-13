import { StyleSheet } from 'react-native'

export const errorMessageStyles = StyleSheet.create({
    view: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'red',
        padding: 4,
        borderRadius: 20,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
})
