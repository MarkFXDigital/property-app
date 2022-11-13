import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const generalButtonStyles = StyleSheet.create({
    button: {
        width: 120,
        height: 30,
        backgroundColor: theme.mainGold,
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
    },
})
