import "./App.css";
import { Login } from "./components/auth/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { Register } from "./components/auth/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Landing />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/Register"} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
