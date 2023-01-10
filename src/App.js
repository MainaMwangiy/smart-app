import "./App.css";
import { Login } from "./components/auth/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { Register } from "./components/auth/Register";
import PrivateRoute from "./components/utils/PrivateRoute";
import "./assets/css/base.css"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Landing />
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute authenticated={true} component={Home} />}
          ></Route>
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/Register"} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
