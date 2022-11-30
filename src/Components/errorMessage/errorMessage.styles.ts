import { StyleSheet } from 'react-native'

export const errorMessageStyles = StyleSheet.create({
    view: {
        marginTop: 10,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#b32134',
        paddingTop: 3,
        borderRadius: 20,
        width: '70%',
        opacity: 0.65,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
