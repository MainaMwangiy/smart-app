import { Box } from "@mui/material";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Box sx={{ width: "100%", m: 2 }}>
        <Home />
        <Login />
        <Register/>
      </Box>
    </>
  );
}

export default App;
