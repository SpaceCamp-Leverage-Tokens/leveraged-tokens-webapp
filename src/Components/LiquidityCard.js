import React, {useState} from 'react';
import { Container } from '@material-ui/core';
import './css/LiquidityCard.css'
import { Button, Form, Input } from 'semantic-ui-react'

const LiquidityCard = ( {props} ) => {
    
    const [removeAmount, setRemoveAmount] = useState(0)
    const dummyPosition = 100000

    function getMaxWithdrawable(){
        return Math.min(props.tlv - props.rbr*props.tmv,dummyPosition )
    }

    function handleRemoveChange(e){
        setRemoveAmount(e.target.value)
    }
    function handleMaxClick(){
        setRemoveAmount(getMaxWithdrawable())
    }

    return (
        <Container className='Liquidity-Card'>
            <Container>
                <h3 className='ui header'>Liquidity Position</h3>
                <h3 className='ui header'>Current Position: {dummyPosition} {props.assetName}</h3>
            </Container>
            <Container>
                <Form className="ui form">
                    <div className="field">
                        <label>Amount</label>
                        <Input type="number" 
                        name="first-name"
                        placeholder="0" 
                        />
                    </div>
                    <Button className="ui basic green button">Max</Button>
                    <Button className="ui basic green button">Add Liquidity</Button>
                </Form>
            </Container>
            <Container>
                <Form className="ui form">
                    <div className="field">
                        <label>Amount</label>
                        <Input type="number" 
                        name="first-name" 
                        placeholder="0"
                        type='number'
                        value={removeAmount}
                        onChange={handleRemoveChange}/>
                    </div>
                    <Button className="ui basic red button" onClick={handleMaxClick}>Max</Button>
                    <Button className="ui basic red button">Remove Liquidity</Button>

                </Form>
            </Container>   
        </Container>
    );
}
 
export default LiquidityCard;