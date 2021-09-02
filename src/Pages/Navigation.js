import React from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Container} from 'semantic-ui-react';
import './css/Navigation.css'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

const Navigation = () => {
    const {
        status,
        connect,
        disconnect,
      } = useWallet();
    
    return (
    <Container id='TopBar'>
        <h2 id='Title'>Leveraged TerraSwap Pools</h2>
        <Container id='NavBar'>
                    <NavLink to="/">
                        <Button type="button">
                                Dashboard
                        </Button> 
                    </NavLink>
                    <NavLink to="/MyPortfolio">
                        <Button type="button">
                                My Portfolio
                        </Button> 
                    </NavLink>
                    <NavLink to="/about">
                        <Button type="button">
                                Governance
                        </Button> 
                    </NavLink>

                    <div>
                        {status === WalletStatus.WALLET_NOT_CONNECTED && (
                            <Button
                                key={'connect-wallet'}
                                onClick={() => connect("CHROME_EXTENSION")}
                            >
                            Connect Wallet <i class="sign in icon"></i>  
                            </Button>
                        )}
                        {status === WalletStatus.WALLET_CONNECTED && (
                        <Button onClick={() => disconnect()}>Disconnect <i class="sign out icon"></i>  </Button>
                        )}
                    </div>
            </Container>
    </Container>
       
    );
}
 
export default Navigation;