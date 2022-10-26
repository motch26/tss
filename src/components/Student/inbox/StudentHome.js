import {
  Email,
  EventNote,
  Forward,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Menu,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  ListItemIcon,
  Snackbar,
  Alert,
} from "@mui/material";
import OSA from "./forms/OSA";
import BSIS from "./forms/BSIS";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import CIT from "./forms/CIT";
import axios from "axios";
import moment from "moment";
import Mailjet from "node-mailjet";
import emailAPICreds from "./../../../creds.json";
import emails from "./../../../email.json";
const StudentHome = () => {
  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);
  const [thisYear, setThisYear] = useState([]);
  const [older, setOlder] = useState([]);

  const getRequests = () => {
    axios
      .get(
        `http://localhost/tss/api/getRequests.php?currentId=${cookies.currentId}`
      )
      .then(({ data }) => {
        // if (data) setRequests(data);
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        setThisMonth(
          data.filter((d) => {
            const rowMonth = new Date(d.requestDate).getMonth();
            return rowMonth === month;
          })
        );
        setLastMonth(
          data.filter((d) => {
            const rowMonth = new Date(d.requestDate).getMonth();
            return rowMonth === month - 1;
          })
        );
        setThisYear(
          data.filter((d) => {
            const rowMonth = new Date(d.requestDate).getMonth();
            const rowYear = new Date(d.requestDate).getFullYear();
            return rowMonth < month - 1 && rowYear === year;
          })
        );
        setOlder(
          data.filter((d) => {
            const rowYear = new Date(d.requestDate).getFullYear();
            return rowYear < year;
          })
        );
      });
  };
  const [cookies, setCookie, removeCookie] = useCookies([
    "family_name",
    "given_name",
    "picture",
    "name",
    "email",
    "userId",
    "type",
    "currentId",
  ]);
  const navigate = useNavigate();
  const [isCompose, setCompose] = useState(false);

  const [to, setTo] = useState("");

  const [anchor, setAnchor] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [displaySnackBar, setDisplaySnackbar] = useState(false);

  const logout = () => {
    removeCookie("family_name", { path: "/" });
    removeCookie("given_name", { path: "/" });
    removeCookie("picture", { path: "/" });
    removeCookie("name", { path: "/" });
    removeCookie("email", { path: "/" });
    removeCookie("userId", { path: "/" });
    removeCookie("type", { path: "/" });
    removeCookie("currentId", { path: "/" });

    navigate("/");
  };

  const sendEmail = (office, subject, code) => {
    const mailjet = new Mailjet({
      apiKey: emailAPICreds.api_key,
      apiSecret: emailAPICreds.secret_key,
    });
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: cookies.email,
            Name: cookies.name,
          },
          To: [
            {
              Email: emails[office]["email"],
              Name: emails[office]["name"],
            },
          ],
          Subject: `New Request: ${subject.toUpperCase()}`,
          TextPart: `You have a new request from a/an ${cookies.type} - ${cookies.name}`,
          HTMLPart: `<h3><a href="https://localhost:3000/link?code=${code}"/>Click Me</a> to proceed in the request interface</h3>`,
        },
      ],
    });

    request
      .then(({ body }) => console.log(body))
      .catch((err) => console.log(err));
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("userId", cookies.currentId);
    formData.append("action", "new");
    if (formData.has("osaDateTime")) {
      const dateTimeStr = formData.get("osaDateTime");

      const osaDateTime = moment(new Date(dateTimeStr)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      formData.append("osaDateTime", osaDateTime);
    }
    axios
      .post("http://localhost/tss/api/compose.php", formData)
      .then(({ data }) => {
        if (data) {
          getRequests();
          setTo("");
          setCompose(false);
          setDisplaySnackbar(true);
          sendEmail();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={styles.body}>
      <Dialog
        open={isCompose}
        onClose={() => {
          getRequests();
          setTo("");
          setCompose(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={styles.dialogTitle}>Compose a Request</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={submit}
            onKeyDown={(e) => {
              if (e.keyCode === 13) e.preventDefault();
            }}
          >
            <Grid container mt={2} gap={1}>
              <Grid item container xs={12} spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="h6">To:</Typography>
                  <Select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    fullWidth
                    required
                    name="office"
                  >
                    <MenuItem value="cit">CIT Dean</MenuItem>
                    <MenuItem value="bsis">BSIS Program Chair</MenuItem>
                    {/* <MenuItem value="guidance">Guidance Counselor</MenuItem> */}
                    <MenuItem value="osa">OSA</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h6">Contact No.:</Typography>
                  <TextField
                    fullWidth
                    type="tel"
                    inputProps={{ maxLength: 11 }}
                    helperText="ex: 09123456789"
                    required
                    name="contact"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Subject:</Typography>
                  <TextField fullWidth name="subject" required />
                </Grid>
              </Grid>
            </Grid>
            {to === "osa" ? <OSA /> : null}
            {to === "bsis" ? <BSIS /> : null}
            {to === "cit" ? <CIT /> : null}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              endIcon={<Forward />}
              fullWidth
              sx={styles.sendBtn}
            >
              Send Request
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
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
                onClick={() => navigate("/home")}
              >
                Requests
              </Button>
              <Button
                color="inherit"
                sx={styles.btns}
                onClick={() => navigate("/home/notification")}
              >
                Updates
              </Button>
            </ButtonGroup>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setCompose(true)}
              endIcon={<Email />}
              sx={{ display: { md: "flex", xs: "none" } }}
            >
              Compose Request
            </Button>
            <Typography sx={{ ml: 2 }} variant="h6">
              {cookies.name}
            </Typography>
            <Tooltip title={cookies.given_name}>
              <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
                <Avatar
                  alt={cookies.name}
                  src={cookies.picture}
                  sx={styles.avatar}
                />
              </IconButton>
            </Tooltip>
            <IconButton
              sx={{
                color: "white",
                display: { md: "none", xs: "block" },
                ml: "auto",
              }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          {/* <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            PaperProps={{ sx: { bgcolor: "primary.main", color: "white" } }}
          >
            <List>
              <ListItemButton>Pending</ListItemButton>
              <ListItemButton>History</ListItemButton>
              <ListItemButton>Compose A Request</ListItemButton>
              <ListItemButton>
                <Box
                  sx={{
                    display: "flex",

                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>C</Avatar>
                  <Typography variant="body1" color="white">
                    Catherine
                  </Typography>
                </Box>
              </ListItemButton>
            </List>
          </Drawer> */}
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="md">
          <Outlet
            context={[getRequests, thisMonth, lastMonth, thisYear, older]}
          />
        </Container>
      </Box>
      <Snackbar
        open={displaySnackBar}
        autoHideDuration={3000}
        color="primary"
        onClose={(e, reason) => {
          if (reason === "clickaway") return;
          setDisplaySnackbar(false);
        }}
        message="Request Submitted"
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
          onClose={(e, reason) => {
            if (reason === "clickaway") return;
            setDisplaySnackbar(false);
          }}
        >
          Request Submitted!
        </Alert>
      </Snackbar>
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
export default StudentHome;
