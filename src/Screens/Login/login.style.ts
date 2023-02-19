import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const loginStyle = StyleSheet.create({
    content: {
        flex: 1,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginTop: 60,
        flexDirection: 'column',
        backgroundColor: 'rgb(242,242,242)',
    },
    view: {
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        color: '#ad974f',
        height: 50,
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
