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
import { navHeaders } from "./utils/constants";
import AddEmployee from "./AddEmployee";

const constants = navHeaders;
const Landing = (props) => {
  const { window } = props;
  const [openMobile, setOpenMobile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
        {constants &&
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
          )}
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
                    <>
                      <AddEmployee
                        isDialogOpened={openDialog}
                        handleCloseDialog={handleClose}
                      />
                      <Button sx={{ color: "#fff" }} onClick={handleOpen}>
                        {"Add New Button"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        key={item.id}
                        sx={{ color: "#fff" }}
                        href={`${item.url || "/"}`}
                      >
                        {item.NavValue}
                      </Button>
                    </>
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
