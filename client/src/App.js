import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavbarAfterLogin from './components/NavbarAfterLogin';
import CalendarComponent  from './components/CalendarComponent';
import Home from './components/Home';

// driver file for the js bundle.
function App() {
  return (
    <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
        </Route>
        <Route exact path="/signup">
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
     </Router>
  );
}

export default App;
