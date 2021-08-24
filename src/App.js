import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Navigation from './Pages/Navigation';
import LeveragedPool from './Pages/LeveragedPool'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter>
          <div>
            <Navigation />
              <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/about" component={About}/>
              <Route path="/leveragedAsset" component={LeveragedPool}/>

            </Switch>
          </div> 
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
