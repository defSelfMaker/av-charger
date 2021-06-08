import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Map from "./components/Map";
import Home from "./components/Home";
import About from "./components/About";
import MoreInfo from "./components/MoreInfo";

function App() {
  return (
    <Router>
      <div className="nav">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/more/:id">
            <MoreInfo />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <h1>Sorry, no matching url...</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
