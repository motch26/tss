import { EventNote } from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoginAdmin, setIsLoginAdmin] = useState(false);
  const [isAbout, setIsAbout] = useState(false);

  const [adminPass, setAdminPass] = useState("");
  const [isPassWrong, setPassWrong] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const checkAdminPass = () => {
    if (adminPass === "admin123") setPassWrong(false);
    else setPassWrong(true);
  };

  const login = () => {
    navigate("/home");
  };

  return (
    <Box sx={styles.body}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <EventNote sx={styles.logo} />
            <Typography variant="h6">Transaction Scheduler</Typography>
            <ButtonGroup variant="text" sx={styles.btnGroup}>
              <Button
                color="inherit"
                sx={styles.btns}
                onClick={() => setIsAbout(true)}
              >
                About
              </Button>
              <Button
                color="inherit"
                sx={styles.btns}
                onClick={() => setIsLoginAdmin(true)}
              >
                Admin
              </Button>
            </ButtonGroup>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog open={isAbout} onClose={() => setIsAbout(false)} maxWidth="md">
        <DialogTitle sx={styles.aboutDialogTitle}>About</DialogTitle>
        <DialogContent>
          <Typography variant="body1" mt={1}>
            A web based scheduler made for users to make appointments regarding
            their chosen offices. Built in order to have fast and easy
            transactions.
            <br />
            <br />
            Co-developed by <strong>Catherine Vera Contrevida</strong> and{" "}
            <strong>John Lester Doromal</strong>. As time have become an
            important part of people's lives, the system can help lessen the
            time of transactions being done.
          </Typography>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isLoginAdmin}
        onClose={() => setIsLoginAdmin(false)}
        maxWidth="md"
      >
        <DialogTitle sx={styles.adminDialogTitle}>Admin</DialogTitle>
        <DialogContent>
          <Box sx={styles.adminForm}>
            <Typography variant="h6" textAlign="center">
              Enter Admin Password:
            </Typography>
            <TextField
              type="password"
              onChange={(e) => setAdminPass(e.target.value)}
            />
            <Button
              variant="contained"
              sx={styles.adminBtn}
              onClick={checkAdminPass}
            >
              Enter
            </Button>

            {isPassWrong ? (
              <Alert severity="error">Wrong admin password!</Alert>
            ) : null}
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isLogin} onClose={() => setIsLogin(false)} maxWidth="md">
        <DialogTitle sx={styles.dialogTitle}>Login</DialogTitle>
        <DialogContent>
          <Grid container mt={1} spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6">First Name:</Typography>
              <TextField
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Last Name:</Typography>
              <TextField
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={7}>
              <FormControlLabel
                control={<Switch />}
                label="Are you a CHMSU student?"
              />
            </Grid>
            <Grid item xs={5}>
              <Button
                color="secondary"
                variant="contained"
                sx={styles.loginBtn}
                onClick={login}
              >
                Login via Google
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Box sx={styles.content}>
        <Outlet context={[setIsLogin]} />
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
  },
  btns: {
    mr: 2,
  },
  content: {
    flex: 1,
  },
  dialogTitle: {
    bgcolor: "primary.main",
    color: "white",
  },
  loginBtn: {
    display: "block",
    ml: "auto",
  },
  adminDialogTitle: {
    bgcolor: "secondary.main",
  },
  adminForm: {
    mt: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  adminBtn: {
    mt: 1,
  },
  aboutDialogTitle: {
    bgcolor: "primary.main",
    color: "white",
  },
};

export default Home;
