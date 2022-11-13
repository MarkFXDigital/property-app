import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const loginStyle = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(242,242,242)',
    },
    view: {
        width: '80%',
        justifyContent: 'center',
    },
    cardTitle: {
        color: '#ad974f',
        height: 50,
    },
    textInput: {
        marginBottom: 15,
    },
    cardButton: {
        margin: 2,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: '#ad974f',
        // color: 'rgb(8,8,8)',
    },
    textColor: {
        color: 'black',
    },
})
