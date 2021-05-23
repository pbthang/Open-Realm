import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
