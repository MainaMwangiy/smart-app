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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { navHeaders } from "./utils/constants";

const constants = navHeaders;
const Landing = (props) => {
  const { window } = props;
  const [openMobile, setOpenMobile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
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
        {constants &&
          constants?.map((item) => (
            <ListItem key={item.id}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                href={`${item.url || "/"}`}
              >
                <ListItemText> {item.NavValue} </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const addNewEmployee = (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter details to add new employee on table
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fullname"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="contact"
            label="Contact"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
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
              {constants &&
                constants?.map((item) =>
                  item.url === "/AddNew" ? (
                    <Button sx={{ color: "#fff" }} onClick={handleOpenDialog}>
                      {"Add New Button"} {addNewEmployee}
                    </Button>
                  ) : (
                    <Button
                      key={item.id}
                      sx={{ color: "#fff" }}
                      href={`${item.url || "/"}`}
                    >
                      {item.NavValue}
                    </Button>
                  )
                )}
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
      </Box>
    </div>
  );
};

export default Landing;
