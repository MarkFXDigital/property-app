import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLegend,
} from 'victory-native'
import { theme } from '../../../theme'
import React from 'react'
import { Dimensions } from 'react-native'

export type SingleBarGraphProps = {
    data: any
}

export const singleBarGraphComponent = (data: SingleBarGraphProps) => {
    const chartHeight = Dimensions.get('window').height * 0.4
    const chartWidth = Dimensions.get('window').width

    return (
        <VictoryChart
            height={chartHeight}
            width={chartWidth}
            padding={{
                left: 55,
                bottom: 30,
                right: 50,
                top: 30,
            }}
            domainPadding={{ y: 50 }}
        >
            <VictoryGroup offset={15} colorScale={'qualitative'}>
                <VictoryBar
                    data={[
                        {
                            x: 1,
                            y: Number(
                                data.data['long_let']['gross_yield'].slice(0, 3)
                            ),
                        },
                    ]}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 },
                    }}
                    cornerRadius={20}
                    style={{
                        data: { fill: theme.mainGold },
                    }}
                    barWidth={130}
                />

                <VictoryAxis
                    tickValues={['Gross Yield In %']}
                    style={{
                        tickLabels: { color: theme.mainGold },
                        ticks: { color: theme.mainGold },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    orientation="left"
                    style={{ tickLabels: { fontSize: 5 } }}
                    fixLabelOverlap={true}
                />
            </VictoryGroup>
        </VictoryChart>
    )
}
