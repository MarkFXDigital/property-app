import { Dimensions } from 'react-native'
import {
    VictoryAxis,
    VictoryChart,
    VictoryClipContainer,
    VictoryLine,
} from 'victory-native'
import { theme } from '../../../theme'
import React from 'react'

export const lineGraphComponent = (data: any) => {
    const chartHeight = Dimensions.get('window').height * 0.4
    const chartWidth = Dimensions.get('window').width
    let firstYearDate = data.data[0][0]
    let secondYearDate = data.data[1][0]
    let thirdYearDate = data.data[2][0]
    let fourthYearDate = data.data[3][0]
    let fifthYearDate = data.data[4][0]

    return (
        <VictoryChart
            height={chartHeight}
            width={chartWidth}
            padding={{
                left: 70,
                bottom: 30,
                right: 50,
                top: 20,
            }}
        >
            <VictoryChart>
                <VictoryLine
                    groupComponent={
                        <VictoryClipContainer
                            clipPadding={{ top: 5, right: 10 }}
                        />
                    }
                    style={{
                        data: {
                            stroke: theme.mainGold,
                            strokeWidth: 10,
                            strokeLinecap: 'round',
                        },
                    }}
                    data={[
                        { x: 1, y: data.data[0][1] },
                        { x: 2, y: data.data[1][1] },
                        { x: 3, y: data.data[2][1] },
                        { x: 4, y: data.data[3][1] },
                        { x: 5, y: data.data[4][1] },
                    ]}
                />
            </VictoryChart>
            <VictoryAxis
                tickValues={[
                    firstYearDate,
                    secondYearDate,
                    thirdYearDate,
                    fourthYearDate,
                    fifthYearDate,
                ]}
                style={{
                    ticks: { color: theme.mainGold },
                }}
            />
        </VictoryChart>
    )
}
