import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Information from './components/Information/Information';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route to="/">
            <Information />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
