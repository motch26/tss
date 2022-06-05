import { Email, EventNote, ExpandMore, Forward } from "@mui/icons-material";
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
  Grid,
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
  return (
    <Box sx={styles.body}>
      <Dialog
        open={isCompose}
        onClose={() => setCompose(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={styles.dialogTitle}>Compose a Request</DialogTitle>
        <DialogContent>
          <Grid container mt={2} gap={1}>
            <Grid item container xs={12} md={8} gap={1}>
              <Grid item xs>
                <Typography variant="h6">To:</Typography>
                <Select
                  value={to}
                  label="Select an office"
                  onChange={(e) => setTo(e.target.value)}
                  fullWidth
                >
                  <MenuItem>CIT Dean</MenuItem>
                  <MenuItem>BSIS Program Chair</MenuItem>
                  <MenuItem>Guidance Counselor</MenuItem>
                  <MenuItem>OSA</MenuItem>
                </Select>
              </Grid>
              <Grid item xs>
                <Typography variant="h6">Date of Transaction:</Typography>
                <DateTimePicker
                  renderInput={(props) => <TextField fullWidth {...props} />}
                  value={transacDate}
                  onChange={(val) => setTransacDate(val)}
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs>
                <Typography variant="h6">Subject:</Typography>
                <TextField fullWidth />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">Email:</Typography>
                <TextField
                  fullWidth
                  defaultValue="youremail@gmail.com"
                  InputProps={{ readOnly: true }}
                  helperText="Non-editable"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md>
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
              endIcon={<Email />}
              onClick={() => setCompose(true)}
            >
              Compose Request
            </Button>
            <Tooltip title="Catherine">
              <Avatar sx={styles.avatar}>C</Avatar>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container>
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
  },
  btns: {
    mr: 2,
  },
  avatar: {
    ml: 2,
    bgcolor: "secondary.main",
  },
  dialogTitle: {
    bgcolor: "secondary.main",
  },
  sendBtn: {
    mt: 2,
  },
};
export default UserHome;
