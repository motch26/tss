import { AutoGraph, EventNote, Logout, RateReview } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

const OfficeHome = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "family_name",
    "given_name",
    "picture",
    "name",
    "email",
    "office",
  ]);

  const [anchor, setAnchor] = useState(null);

  const logout = () => {
    removeCookie("family_name", { path: "/" });
    removeCookie("given_name", { path: "/" });
    removeCookie("picture", { path: "/" });
    removeCookie("name", { path: "/" });
    removeCookie("email", { path: "/" });
    removeCookie("office", { path: "/" });

    navigate("/office");
  };
  const navigate = useNavigate();

  const toGuidance = () => {
    navigate("/office/home/guidance");
  };

  return (
    <Box sx={styles.body}>
      <Menu
        anchorEl={anchor}
        id="account-menu"
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        onClick={() => setAnchor(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {cookies.office === "cit" || cookies.office === "bsis" ? (
          <MenuItem onClick={() => toGuidance()}>
            <ListItemIcon>
              <RateReview fontSize="small" />
            </ListItemIcon>
            Request to Guidance Office
          </MenuItem>
        ) : null}

        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <AutoGraph fontSize="small" />
          </ListItemIcon>
          Analytics
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <EventNote sx={styles.logo} />
            <Typography variant="h6">Transaction Scheduler</Typography>
            <ButtonGroup variant="text" sx={styles.btnGroup}>
              <Button
                color="inherit"
                sx={styles.btns}
                onClick={() => navigate("/office/home")}
              >
                Requests
              </Button>
              <Button
                color="inherit"
                sx={styles.btns}
                onClick={() => navigate("/office/home/calendar")}
              >
                Schedule
              </Button>
            </ButtonGroup>
            <Typography variant="h6">{cookies.name}</Typography>
            <Tooltip title={cookies.given_name}>
              <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
                <Avatar
                  alt={cookies.name}
                  src={cookies.picture}
                  sx={styles.avatar}
                />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

const styles = {
  body: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    mr: 1,
  },
  btnGroup: {
    ml: "auto",
    display: { xs: "none", md: "block" },
  },
  btns: {
    mr: 2,
  },
  avatar: {
    ml: 2,
    bgcolor: "secondary.main",
    display: { xs: "none", md: "flex" },
  },
  dialogTitle: {
    bgcolor: "secondary.main",
  },
  sendBtn: {
    mt: 2,
  },
};
export default OfficeHome;
