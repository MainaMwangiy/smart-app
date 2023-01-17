import {
  Box,
  Divider,
  List,
  MenuItem,
  Toolbar,
  Typography,
  AppBar,
  Drawer,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
// import { navHeaders } from "./utils/constants";
import AddEmployee from "./AddEmployee";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

// const constants = navHeaders;
const Landing = (props) => {
  const { window } = props;
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMsAuthenticated = useIsAuthenticated();
  const {instance}  = useMsal();
  const isAuthenticated = localStorage.getItem("token") ;
  useEffect(() => {
    if (isAuthenticated === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [isAuthenticated]);

  const login = async() => {
    await instance.loginRedirect({
      scopes: ['user.read']
  })
  }

  const logOut = async() => {
    setIsLoggedIn(false);
    // await instance.logoutRedirect()
    localStorage.removeItem("token")
    navigate("/Login");
  };

  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleNavbarToggle = () => {
    setOpenMobile(!openMobile);
  };
  const drawer = (
    <Box onClick={handleNavbarToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {"Smart App"}
      </Typography>
      <Divider />
      <List>
        {/* {constants &&
          constants?.map((item) =>
            item.url === "/AddNew" ? (
              <ListItem key={item.id}>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={handleOpen}
                >
                  <ListItemText> {"Add New"} </ListItemText>
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem key={item.id}>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  href={`${item.url || "/"}`}
                >
                  <ListItemText> {item.NavValue} </ListItemText>
                </ListItemButton>
              </ListItem>
            )
          )} */}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar>
            <>
              <MenuIcon
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleNavbarToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuItem />
              </MenuIcon>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Link sx={{ color: "#fff" }} href="/">
                  {"Smart App"}
                </Link>
              </Typography>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <>
                  {isLoggedIn ? (
                    <>
                      <div className="navbar">
                        <div className="nav-item">
                          <AddEmployee
                            isDialogOpened={openDialog}
                            handleCloseDialog={handleClose}
                          />
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              flexGrow: 1,
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Link
                              sx={{ color: "#fff" }}
                              to="/AddNew"
                              onClick={handleOpen}
                            >
                              {"Add Employee"}
                            </Link>
                          </Typography>
                        </div>
                        <div className="nav-item">
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              flexGrow: 1,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Link
                              sx={{ color: "#fff" }}
                              to="/Logout"
                              onClick={logOut}
                            >
                              {"Logout"}
                            </Link>
                          </Typography>
                        </div>
                      </div>
                      <div className="d-flex justify-space-between"></div>
                    </>
                  ) : null}
                  {/* {isMsAuthenticated ?  <div className="nav-item">
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              flexGrow: 1,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Link
                              sx={{ color: "#fff" }}
                              to="/login"
                              onClick={login}
                            >
                              {"login"}
                            </Link>
                          </Typography>
                        </div> :  <div className="nav-item">
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              flexGrow: 1,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Link
                              sx={{ color: "#fff" }}
                              to="/Logout"
                              onClick={logOut}
                            >
                              {"Logout"}
                            </Link>
                          </Typography>
                        </div>} */}
                </>
              </Box>
            </>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={openMobile}
            onClose={handleNavbarToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </div>
  );
};

export default Landing;
