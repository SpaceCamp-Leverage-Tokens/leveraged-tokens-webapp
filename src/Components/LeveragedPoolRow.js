import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { getPoolData } from '../Helpers/QueryHelper';

const LeveragedPoolRow = ({leveragedPoolId, terra}) => {
    
    const history = useHistory();
    const [props, setProps] = useState({assetInfo:{},
        leveragedPoolId:{},
        leveragedPoolInfo:{}})

    const [isLoading, setLoading] = useState(true);

    useEffect( ()=> {
        getPoolQuery().then(setLoading(false));
    }, []);

    async function getPoolQuery(){
        const tempPoolData = await getPoolData(leveragedPoolId,terra)
        setProps(tempPoolData)
    }

    if (isLoading){
        console.log('isLoading')
        return<tr></tr>
    }
    

    return (
        <tr onClick={() => { history.push({
            pathname:'/leveragedAsset',
            state: props
            }) }}>
            <td>{props.assetInfo.symbol}</td>
            <td>{props.leveragedPoolInfo.leverage_amount}</td>
            <td>TODO</td>
            <td>TODO</td>
            <td>{props.leveragedPoolInfo.minimum_protocol_ratio}</td>
            <td>TODO</td>
        </tr>
    );
}
 
export default LeveragedPoolRow;