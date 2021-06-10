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
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute
            exact
            auth={isAuthenticated}
            path="/home/:bookId"
            component={Story}
          />
          <PrivateRoute
            exact
            auth={isAuthenticated}
            path="/home"
            component={Home}
          />
          <PrivateRoute
            exact
            auth={isAuthenticated}
            path="/profile"
            component={Profile}
          />
          <PrivateRoute
            exact
            auth={isAuthenticated}
            path="/profile/:username"
            component={Profile}
          />
          <PrivateRoute
            exact
            auth={isAuthenticated}
            path="/create"
            component={Create}
          />
          <PrivateRoute
            exact
            auth={isAuthenticated}
            path="/bookmarked"
            component={Bookmarked}
          />
          <PrivateRoute
            exact
            auth={isAuthenticated}
            path="/about"
            component={About}
          />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
