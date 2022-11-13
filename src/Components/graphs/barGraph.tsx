import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
} from 'victory-native'
import { theme } from '../../theme'
import React from 'react'
import { Dimensions } from 'react-native'
import { barGraphStyles } from './barGraph.styles'

export const barGraphComponent = (data: any) => {
    const chartHeight = Dimensions.get('window').height * 0.4
    const chartWidth = Dimensions.get('window').width

    return (
        <VictoryChart
            height={chartHeight}
            width={chartWidth}
            padding={{
                left: 70,
                bottom: 30,
                right: 50,
                top: 30,
            }}
        >
            <VictoryGroup offset={15} colorScale={'qualitative'}>
                <VictoryBar
                    data={[
                        { x: 1, y: data.data['70pc_range'][0] },
                        { x: 2, y: data.data['80pc_range'][0] },
                        { x: 3, y: data.data['90pc_range'][0] },
                        {
                            x: 4,
                            y: data.data['100pc_range'][0],
                        },
                    ]}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 },
                    }}
                    cornerRadius={6}
                    style={{
                        data: {},
                    }}
                    barWidth={10}
                />

                <VictoryBar
                    data={[
                        { x: 1, y: data.data['70pc_range'][1] },
                        { x: 2, y: data.data['80pc_range'][1] },
                        { x: 3, y: data.data['90pc_range'][1] },
                        {
                            x: 4,
                            y: data.data['100pc_range'][1],
                        },
                    ]}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 },
                    }}
                    cornerRadius={6}
                    style={{
                        data: {
                            fill: theme.mainGold,
                        },
                    }}
                    barWidth={10}
                    // labelComponent={}
                />
                <VictoryAxis
                    tickValues={['70% ', '80% ', '90% ', '100% ']}
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
