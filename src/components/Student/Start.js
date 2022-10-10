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
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const StudentStart = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "family_name",
    "given_name",
    "picture",
    "name",
    "email",
    "userId",
    "type",
  ]);

  const [loginError, setLoginError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAbout, setIsAbout] = useState(false);

  const [type, setType] = useState("");
  const [userId, setUserId] = useState("");

  const loginSuccessful = (res) => {
    const userObject = jwt_decode(res.credential);
    const { family_name, given_name, picture, name, email } = userObject;

    const setCookies = (_name, _value) => {
      setCookie(_name, _value, {
        path: "/",
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      });
    };
    setCookies("family_name", family_name);
    setCookies("given_name", given_name);
    setCookies("name", name);
    setCookies("email", email);
    setCookies("picture", picture);
    setCookies("type", type);
    setCookies("userId", userId);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("type", type);
    formData.append("name", name);
    formData.append("userId", userId);

    axios
      .post("http://localhost/tss/api/checkUser.php", formData)
      .then(({ data }) => {
        if (data) navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
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
        open={isLogin}
        onClose={() => setIsLogin(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={styles.dialogTitle}>Login</DialogTitle>
        <DialogContent>
          <Grid container mt={1} spacing={1}>
            <Grid item xs={12}>
              <strong>User Type:</strong>
              <Select
                fullWidth
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="alumnus">Alumnus</MenuItem>
                <MenuItem value="visitor">Visitor</MenuItem>
              </Select>
            </Grid>
            {type === "student" ? (
              <Grid item xs={12}>
                <strong>Student ID:</strong>
                <TextField
                  value={userId}
                  fullWidth
                  onChange={(e) => setUserId(e.target.value)}
                  helperText=""
                />
              </Grid>
            ) : null}
            {type === "alumnus" ? (
              <Grid item xs={12}>
                <strong>Almunus ID Number:</strong>
                <TextField
                  value={userId}
                  fullWidth
                  onChange={(e) => setUserId(e.target.value)}
                  helperText=""
                />
              </Grid>
            ) : null}
            {type === "visitor" ? (
              <Grid item xs={12}>
                <strong>Name:</strong>
                <TextField
                  value={userId}
                  fullWidth
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Grid>
            ) : null}
          </Grid>

          <Box
            sx={{
              display: userId ? "flex" : "none",
              pt: 1,
              justifyContent: "flex-end",
            }}
          >
            <GoogleLogin
              onSuccess={loginSuccessful}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Box>
          <Alert
            severity="error"
            sx={{ display: loginError ? "flex" : "none", mt: 1 }}
          >
            A problem has occured during login!
          </Alert>
        </DialogContent>
      </Dialog>
      <Box sx={styles.content}>
        <Box sx={styles.mainBox}>
          <Container sx={{ height: "100%" }}>
            <Box sx={styles.centerBox}>
              <Box sx={styles.leftBox}>
                <Typography variant="h3" fontWeight={600} color="white">
                  Transaction Scheduler
                </Typography>
                <Typography variant="h2" color="white">
                  For CHMSU Offices
                </Typography>
                <Divider />
                <Typography
                  variant="h5"
                  fontWeight={300}
                  color="white"
                  mt={3}
                  mb={2}
                >
                  CIT Dean, BSIS Program Chair, Guidance Counselor, <br /> and
                  Office of the Student Affair
                </Typography>
                <Button
                  size="large"
                  color="secondary"
                  variant="contained"
                  onClick={() => setIsLogin(true)}
                >
                  Compose a Request
                </Button>
              </Box>
              <Box sx={styles.rightBox}>
                <img src="./img/clip2.png" alt="profile" width="100%" />
              </Box>
            </Box>
          </Container>
        </Box>
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
  mainBox: {
    bgcolor: "primary.main",
    height: "100%",
  },
  leftBox: {
    width: { xs: "fit-content", md: "500px" },
    whiteSpace: "nowrap",
    zIndex: 2,
  },
  rightBox: {
    flex: 1,
    display: {
      sm: "none",
      md: "block",
    },
  },
  centerBox: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
};

export default StudentStart;
