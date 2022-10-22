// @ts-ignore
import { EventNote, Google } from "@mui/icons-material";
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
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import emails from "./../../email.json";
const OfficeStart = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const [cookies, setCookie, removeCookie] = useCookies([
    "family_name",
    "given_name",
    "picture",
    "name",
    "email",
    "office",
  ]);

  const [isLogin, setIsLogin] = useState(false);
  const [isAbout, setIsAbout] = useState(false);

  const [office, setOffice] = useState("");
  const [wrongLogin, setWrongLogin] = useState(false);

  const loginSuccessful = (res) => {
    const userObject = jwt_decode(res.credential);
    // @ts-ignore
    const { family_name, given_name, picture, name, email } = userObject;
    if (emails[office]["email"] === email) {
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
      setCookies("office", office);

      navigate("/office/home");
    } else setWrongLogin(true);
  };
  const checkCookie = () => {
    if (cookies.office) navigate("/office/home");
  };
  useEffect(() => {
    checkCookie();
  }, []);
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
        fullWidth
        open={isLogin}
        onClose={() => {
          setOffice("");
          setWrongLogin(false);
          setIsLogin(false);
        }}
        maxWidth="xs"
      >
        <DialogTitle sx={styles.dialogTitle}>Login</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pt: 1,
            }}
          >
            <strong>Office:</strong>
            <Select
              fullWidth
              value={office}
              onChange={(e) => setOffice(e.target.value)}
            >
              <MenuItem value="bsis">BSIS Program Chair</MenuItem>
              <MenuItem value="cit">CIT Dean's Office</MenuItem>
              <MenuItem value="osa">Office of the Students Affairs</MenuItem>
            </Select>
            <Box
              sx={{
                display: office ? "flex" : "none",
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
              sx={{ mt: 1, display: wrongLogin ? "flex" : "none" }}
            >
              Wrong credentials!
            </Alert>
          </Box>
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
                <img src="./img/clip2.png" width="100%" />
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
    mx: "auto",
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

export default OfficeStart;
