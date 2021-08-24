import React from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Container} from 'semantic-ui-react';
import './css/Navigation.css'

const Navigation = () => {
    return (
       <Container id='NavBar'>
            <NavLink to="/">
                <Button type="button">
                        Dashboard
                </Button> 
            </NavLink>
            <NavLink to="/about">
                <Button type="button">
                        My Portfolio
                </Button> 
            </NavLink>
            <NavLink to="/about">
                <Button type="button">
                        Governance
                </Button> 
            </NavLink>
       </Container>
    );
}
 
export default Navigation;