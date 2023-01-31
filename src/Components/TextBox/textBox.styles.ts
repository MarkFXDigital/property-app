import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const textBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 25,
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    titleContainer: {
        borderBottomColor: theme.mainGold,
        borderBottomWidth: 3,
        width: 150,
        alignSelf: 'center',
        marginBottom: 5,
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 5,
    },
    standardText: {
        textAlign: 'center',
        marginRight: 20,
    },
})
