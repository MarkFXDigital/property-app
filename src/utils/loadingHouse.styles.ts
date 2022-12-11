import { StyleSheet } from 'react-native'
import { theme } from '../theme'

const carrotHeight = 100
const carrotWidth = carrotHeight / 4
const carrotContainerHeight = (60 / 100) * carrotHeight
export const carrotTopValue = (20 / 100) * carrotHeight

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 225,
    },
    carrotContainer: {
        height: carrotContainerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    icon: {
        width: carrotWidth,
        height: carrotHeight,
        color: theme.mainGold,
    },
    IconText: {
        fontSize: 16,
        color: '#032845',
        fontWeight: '600',
    },
    wonkyEdge: {
        width: '100%',
        height: 12,
        color: 'green',
        position: 'absolute',
        bottom: 0,
    },
})
