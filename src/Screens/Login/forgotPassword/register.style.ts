import { StyleSheet } from 'react-native'
import { theme } from '../../../theme'

export const registerStyle = StyleSheet.create({
    content: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: 15,
        paddingTop: 0,
    },
    icon: {
        color: theme.mainGold,
    },
    button: {
        margin: 15,
        marginRight: 0,
        marginLeft: 0,
    },
})
