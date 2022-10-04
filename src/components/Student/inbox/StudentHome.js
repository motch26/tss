import { Email, EventNote, Forward, Logout } from "@mui/icons-material";
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
  List,
  ListItemButton,
  MenuItem,
  Menu,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import OSA from "./forms/OSA";
import BSIS from "./forms/BSIS";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CIT from "./forms/CIT";

const StudentHome = () => {
  const navigate = useNavigate();
  const [isCompose, setCompose] = useState(false);

  const [to, setTo] = useState("");
  const [transacDate, setTransacDate] = useState(new Date());

  const [anchor, setAnchor] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box sx={styles.body}>
      <Dialog
        open={isCompose}
        onClose={() => {
          setTo("");
          setCompose(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={styles.dialogTitle}>Compose a Request</DialogTitle>
        <DialogContent>
          <Grid container mt={2} gap={1}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h6">To:</Typography>
                <Select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="cit">CIT Dean</MenuItem>
                  <MenuItem value="bsis">BSIS Program Chair</MenuItem>
                  {/* <MenuItem value="guidance">Guidance Counselor</MenuItem> */}
                  <MenuItem value="osa">OSA</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Date of Transaction:</Typography>
                <DateTimePicker
                  renderInput={(props) => <TextField fullWidth {...props} />}
                  value={transacDate}
                  onChange={(val) => setTransacDate(val)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Subject:</Typography>
                <TextField fullWidth />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Contact No.:</Typography>
                <TextField
                  fullWidth
                  type="tel"
                  inputProps={{ maxLength: 11 }}
                  helperText="ex: 09123456789"
                />
              </Grid>
            </Grid>
          </Grid>
          {to === "osa" ? <OSA /> : null}
          {to === "bsis" ? <BSIS /> : null}
          {to === "cit" ? <CIT /> : null}
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Forward />}
            fullWidth
            sx={styles.sendBtn}
          >
            Send Request
          </Button>
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
        <MenuItem>
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
            <Tooltip title="Catherine">
              <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
                <Avatar sx={styles.avatar}>C</Avatar>
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
              <Menu />
            </IconButton>
          </Toolbar>
          <Drawer
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
          </Drawer>
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
export default StudentHome;
