import { StyleSheet } from 'react-native'
import { theme } from '../../../theme'

export const registerStyle = StyleSheet.create({
    content: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    icon: {
        color: theme.mainGold,
    },
    button: {
        margin: 15,
        marginRight: 0,
        marginLeft: 0,
    },
    formCard: {
        width: '90%',
    },
    cardTitle: {
        color: '#ad974f',
        textAlign: 'center',
    },
})
