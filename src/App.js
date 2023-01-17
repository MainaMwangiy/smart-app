import "./App.css";
import { Login } from "./components/auth/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { Register } from "./components/auth/Register";
import PrivateRoute from "./components/utils/PrivateRoute";
import "./assets/css/base.css";
import { MsalProvider } from "@azure/msal-react";

function App({ msalInstance }) {
  return (
    <>
      <MsalProvider instance={msalInstance}>
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
      </MsalProvider>
    </>
  );
}

export default App;
