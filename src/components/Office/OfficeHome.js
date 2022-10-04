import { EventNote, Menu } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const OfficeHome = () => {
  const navigate = useNavigate();
  const [isCompose, setCompose] = useState(false);

  const [to, setTo] = useState("");
  const [transacDate, setTransacDate] = useState(new Date());

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box sx={styles.body}>
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
                Pending
              </Button>
              <Button
                color="inherit"
                sx={styles.btns}
                onClick={() => navigate("/office/home/calendar")}
              >
                Approved
              </Button>
            </ButtonGroup>
            <Typography variant="h6">Guidance Office</Typography>
            <Tooltip title="Guidance Office">
              <Avatar sx={styles.avatar}>GO</Avatar>
            </Tooltip>
            <IconButton
              sx={{
                color: "white",
                display: { md: "none", xs: "block" },
                ml: "auto",
              }}
              onClick={() => setOpenDrawer(true)}
            >
              <Menu />
            </IconButton>
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
