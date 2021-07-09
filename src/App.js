import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import Create from "./pages/Create";
import Bookmarked from "./pages/Bookmarked";
import Story from "./pages/Story";
import FourOFour from "./pages/FourOFour";
import Writing from "./pages/Writing";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/home/:promptId" component={Story} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/writings/:writingId" component={Writing} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/:sub" component={Profile} />
          <PrivateRoute exact path="/create" component={Create} />
          <PrivateRoute exact path="/bookmarked" component={Bookmarked} />
          <PrivateRoute exact path="/about" component={About} />
          <PrivateRoute exact path="/search" component={Search} />
          <Route exact path="/" component={Login} />
          <Route exact path="*" component={FourOFour} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
