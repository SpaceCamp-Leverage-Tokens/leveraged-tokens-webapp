import React from 'react';
import { useHistory } from "react-router-dom";

const LeveragedPoolRow = ({leveragedPool}) => {
    
    const history = useHistory();

    return (
        <tr onClick={() => { history.push({
            pathname:'/leveragedAsset',
            state: leveragedPool
            }) }}>
            <td>{leveragedPool.assetName}</td>
            <td>{leveragedPool.poolLeverage}x</td>
            <td>{leveragedPool.volume} UST</td>
            <td>{leveragedPool.pr}</td>
            <td>{leveragedPool.mpr}</td>
            <td className="right aligned">{leveragedPool.tlv} UST</td>
        </tr>
    );
}
 
export default LeveragedPoolRow;