import React from 'react';
import { Container } from '@material-ui/core';
import './css/LeverageCard.css'
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'

const LeverageCard = ( {props} ) => {
    
    return (
        <Container className='Leverage-Card'>
            <Container>
                <h3 className='ui header'>{props.title} Leveraged Position</h3>
                <h4 className='ui header'>Current Position: </h4>
            </Container>
            <Container>
                <form className="ui form">
                    <div className="field">
                        <label>Amount</label>
                        <input type="text" name="first-name" placeholder="1"/>
                    </div>
                    <Button className="ui basic green button">Take Leverage</Button>
                </form>
            </Container>
            <Container>
                <Form className="ui form">
                    <Form.Field className="field">
                        <label>Amount</label>
                        <Form.Input type="text" name="first-name" placeholder="1"/>
                    </Form.Field>
                    <Button className="ui basic red button">Close Leverage</Button>
                </Form>
            </Container>   
        </Container>
    );
}
 
export default LeverageCard;