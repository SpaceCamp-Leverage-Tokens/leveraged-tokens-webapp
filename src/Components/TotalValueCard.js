import React from 'react';
import { Container } from '@material-ui/core';
import { VictoryPie } from 'victory';
import './css/TotalValueCard.css'

const TotalValueCard = ({props}) => {

    function renderListItem( item ){
        return <div className="item"> 
            <div className="header">{item.assetName} </div>
            100 UST
        </div>
    }

    return (
        <div className="ui card fluid">
            <div className="content">
                    <Container className="Panels" style={{display:"flex"}}>
                        <Container className="Portfolio-Text">
                            <div className="ui list">
                                <h2 className="ui header">Total Value: {"1000 UST"}</h2>
                                {Object.values(props).map(renderListItem)}
                            </div>
                        </Container>
                        <Container>
                            <VictoryPie
                            colorScale="qualitative"
                            width={300} height={180}
                            startAngle={90}
                            endAngle={450}
                            innerRadius={50}
                            data={[
                                { x: 1, y: 2, label: "Luna" },
                                { x: 2, y: 3, label: "mTSLA" },
                                { x: 3, y: 5, label: "mAPPL" }
                            ]}
                            />
                        </Container>                  
                </Container>
            </div>
    </div>
    );
}
 
export default TotalValueCard;