import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import './css/LiquidityCard.css'
import { Button, Form, Input } from 'semantic-ui-react'
import { queryTokenBalance } from '../Helpers/helpers';
import { LocalTerra, LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import LoadingMask from 'react-loadingmask';
import "react-loadingmask/dist/react-loadingmask.css";

const LiquidityCard = ( { props } ) => {
    
    const terra = new LocalTerra;
    const myWallet = terra.wallets.test3;

    const [isLoading, setIsLoading] = useState(false)
    const [assetInPool, setAssetInPool] = useState(0)
    const [totalLP, setTotalLP] = useState(0)
    const [assetInPoolUST, setAssetInPoolUST] = useState("")

    const [assetInWallet, setAssetInWallet] = useState(0)
    const [removeAmount, setRemoveAmount] = useState(0)
    const [addAmount, setAddAmount] = useState(0)

    useEffect( ()=> {
        getMyBalance()
    },[isLoading]);

    async function getMyBalance(){
        const myTokenBalance = await props.getMyBalance(terra,myWallet.key.accAddress)
        const myTokenBalanceInPool = await props.getMyBalanceInPool(terra,myWallet.key.accAddress)

        setTotalLP(myTokenBalanceInPool.total)
        setAssetInPool(myTokenBalanceInPool.raw)
        setAssetInPoolUST(myTokenBalanceInPool.ust)
        setAssetInWallet(myTokenBalance.raw)
    }

    function getMaxWithdrawable(){
        return Math.min(assetInPool )
    }

    function handleMaxAdd(){
        setAddAmount(assetInWallet)
    }

   async function handleAddLiquidityClick(){
        setIsLoading(true);
        await props.addLiquidity(terra,myWallet, addAmount.toString());
        setIsLoading(false);
        getMyBalance();
        resetVals();
    }
    function handleAddAmountChange(e){
        setAddAmount(e.target.value)
    }

    function handleRemoveChange(e){
        setRemoveAmount(e.target.value)
    }
    function handleMaxClick(){
        setRemoveAmount(getMaxWithdrawable())
    }

    function resetVals(){
        setRemoveAmount(0);
        setAddAmount(0);
    }

    async function handleWithdrawClick(){
        setIsLoading(true);
        await props.withdrawLiquidity(terra,myWallet, removeAmount.toString());
        setIsLoading(false);
        getMyBalance();
        resetVals();
    }

    return (
        <LoadingMask loading={isLoading} text={'Loading...'}>
            <Container className='Liquidity-Card'>
                <Container>
                    <h3>Liquidity/Hedged Position</h3>
                    <div> 
                        <h4 className="header">{assetInPool} LP Shares owned in pool <h4>{totalLP} LP Shares in total</h4> </h4>
                        ~ {assetInPoolUST} UST
                    </div>
                    <h4 >{assetInWallet} {props.assetInfo.symbol} in Wallet </h4>
                </Container>
                <Container>
                    <Form className="ui form">
                        <div className="field">
                            <label>Provide {props.assetInfo.symbol}</label>
                            <Input type="number" 
                            name="first-name"
                            placeholder="0" 
                            onChange={handleAddAmountChange}
                            />
                        </div>
                        <Button onClick={handleMaxAdd} className="ui basic green button">Max</Button>
                        <Button onClick={handleAddLiquidityClick} className="ui basic green button">Add Liquidity</Button>
                    </Form>
                </Container>
                <Container>
                    <Form className="ui form">
                        <div className="field">
                            <label>Remove LP Shares from Pool</label>
                            <Input type="number" 
                            name="first-name" 
                            placeholder="0"
                            onChange={handleRemoveChange}/>
                        </div>
                        <Button className="ui basic red button" onClick={handleMaxClick}>Max</Button>
                        <Button className="ui basic red button" onClick={handleWithdrawClick}>Remove Liquidity</Button>

                    </Form>
                </Container>   
            </Container>
        </LoadingMask>
    );
}
 
export default LiquidityCard;