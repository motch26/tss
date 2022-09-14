import {
  Email,
  EventNote,
  ExpandMore,
  Forward,
  Menu,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  ListItem,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const [isCompose, setCompose] = useState(false);

  const [to, setTo] = useState("");
  const [transacDate, setTransacDate] = useState(new Date());

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box sx={styles.body}>
      <Dialog
        open={isCompose}
        onClose={() => setCompose(false)}
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
                  <MenuItem value="">CIT Dean</MenuItem>
                  <MenuItem value="">BSIS Program Chair</MenuItem>
                  <MenuItem value="">Guidance Counselor</MenuItem>
                  <MenuItem value="">OSA</MenuItem>
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
                <Typography variant="h6">Email:</Typography>
                <TextField
                  fullWidth
                  defaultValue="youremail@gmail.com"
                  InputProps={{ readOnly: true }}
                  helperText="Non-editable"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Message:</Typography>
                <TextField fullWidth multiline rows={4} />
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<Forward />}
                  fullWidth
                  sx={styles.sendBtn}
                >
                  Send Request
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
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
                Pending
              </Button>
              <Button color="inherit" sx={styles.btns}>
                History
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
              <Avatar sx={styles.avatar}>C</Avatar>
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
export default UserHome;
