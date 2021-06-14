import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Create from "./pages/Create";
import Bookmarked from "./pages/Bookmarked";
import Story from "./pages/Story";
import FourOFour from "./pages/FourOFour";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/home/:bookId" component={Story} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/:username" component={Profile} />
          <PrivateRoute exact path="/create" component={Create} />
          <PrivateRoute exact path="/bookmarked" component={Bookmarked} />
          <PrivateRoute exact path="/about" component={About} />
          <Route exact path="/" component={Login} />
          <Route exact path="*" component={FourOFour} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;