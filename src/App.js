import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";

// let isLoing = false;

const Profile = () => <h1>Profile</h1>;

const Login = (props) => {
  const history = useHistory();
  const [isLogin, setStateLogin] = props.statelogin;
  const handleLogin = () => {
    localStorage.setItem("isLogin", true);
    setStateLogin(localStorage.getItem("isLogin"));
    history.push("/profile");
  };
  return (
    <div>
      {console.log()}
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const TestRoute = ({ clidren, ...rest }) => {
  const [isLoing, setisLogin] = rest.statelogin;
  if (isLoing) {
    return (
      <Router
        {...rest}
        render={() => {
          return clidren;
        }}
      ></Router>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default function App() {
  const [isLogin, setisLogin] = useState(localStorage.getItem("isLogin"));

  return (
    <div>
      <h1>Hello world</h1>
      <Router>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          {isLogin ? (
            <li>
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("isLogin");
                  setisLogin(null);
                }}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">login</Link>
            </li>
          )}
        </ul>
        <Switch>
          {isLogin ? (
            ""
          ) : (
            <Route path="/login">
              <Login statelogin={[isLogin, setisLogin]} />
            </Route>
          )}
          <TestRoute path="/profile" statelogin={[isLogin, setisLogin]}>
            <Profile />
          </TestRoute>
        </Switch>
      </Router>
    </div>
  );
}
