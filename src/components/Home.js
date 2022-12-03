import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
  AppBar,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const navHeaders = [
  { id: "1", NavValue: "Home" },
  { id: "2", NavValue: "Add New Button" },
  { id: "3", NavValue: "Login" },
];

const columns = [
  { field: "id", headerName: "Id", width: 90 },
  { field: "email", headerName: "Email", width: 150, editable: true },
  { field: "password", headerName: "password", width: 150, editable: true },
];
const rows = [
  { id: "1", email: "test@gmail.com", password: "test@12345" },
  { id: "2", email: "test@gmail.com", password: "test@12345" },
  { id: "3", email: "test@gmail.com", password: "test@12345" },
  { id: "4", email: "test@gmail.com", password: "test@12345" },
  { id: "5", email: "test@gmail.com", password: "test@12345" },
  { id: "6", email: "test@gmail.com", password: "test@12345" },
];

const Home = (props) => {
  const { window } = props;
  const [openMobile, setOpenMobile] = useState(false);

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
        {navHeaders &&
          navHeaders?.map((item) => (
            <ListItem key={item.id}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText> {item.NavValue} </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const grid = () => {
    return (
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    );
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar>
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
              {"Smart App"}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navHeaders &&
                navHeaders?.map((item) => (
                  <Button key={item.id} sx={{ color: "#fff" }}>
                    {item.NavValue}
                  </Button>
                ))}
            </Box>
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
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Box sx={{ height: 400, width: 1200 }}>{grid()}</Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
