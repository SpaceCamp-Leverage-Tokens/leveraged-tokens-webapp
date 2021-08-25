import React from 'react';
import { VictoryChart, VictoryLegend, VictoryAxis, VictoryScatter, VictoryTooltip, VictoryLine} from "victory";
import { Container } from '@material-ui/core';

const LeverageChart = ({props}) => {
    const Data=[
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 }
      ]

    const LeverageData = [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 4, y: 2.5 },
        { x: 5, y: 9 }
      ]
    return (
        <Container>
        <div class="ui card fluid">
            <div class="content">
                <h2 class="ui header">{props.assetName}-{props.poolLeverage}x Pool</h2>
                <VictoryChart>
                <VictoryLine style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc"}
                }}
                data={Data}/>
                <VictoryLine style={{
                  data: { stroke: "green", strokeDasharray:[3] },
                  parent: { border: "1px solid #ccc"}
                }}
                data={LeverageData}/>
                <VictoryLegend x={75} y={20}
                gutter={20}
                data={[
                { name: "Price", symbol: { fill: "#c43a31", type: "line" } },
                { name: "Leveraged Price", symbol: { fill: "green" } },
                ]}
            />
              </VictoryChart>
            </div>
        </div>
        </Container>
    );
}
 
export default LeverageChart;