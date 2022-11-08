import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import offices from "./../../email.json";
const Guidance = () => {
  const [requests, setRequests] = useState([]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [currentObj, setCurrentObj] = useState({});

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);
  const [cookies] = useCookies(["office"]);
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("office", cookies.office);
    axios
      .post("http://localhost/tss/api/guidanceRequest.php", formData)
      .then(({ data }) => {
        if (data) {
          console.log(data);
          getRequests();
          closeDialog();
        }
      })
      .catch((err) => console.log(err));
  };
  const getRequests = () => {
    axios
      .get(
        `http://localhost/tss/api/getGuidanceRequests.php?office=${cookies.office}`
      )
      .then(({ data }) => {
        if (data) setRequests(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => getRequests(), []);

  return (
    <>
      {currentObj.hasOwnProperty("office") ? (
        <Dialog
          open={displayDialog}
          maxWidth="sm"
          fullWidth
          onClose={() => setDisplayDialog(false)}
        >
          <DialogTitle
            sx={{ bgcolor: "primary.main", color: "white", p: 1 }}
          >{`From ${offices[currentObj.office]["name"]}`}</DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", py: 2, px: 1 }}
            >
              <Box sx={{ display: "flex" }}>
                <strong>Student Name:</strong>
                <Typography sx={{ ml: 3 }}>{currentObj.studentName}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", mt: 1 }}>
                <strong>Course, Year & Section:</strong>
                <Typography sx={{ ml: 3 }}>{currentObj.section}</Typography>
              </Box>
              <Divider />

              <Box sx={{ display: "flex", mt: 1 }}>
                <strong>Schedule:</strong>
                {currentObj.schedule ? (
                  <Typography
                    variant="subtitle1"
                    sx={{ ml: 3, fontWeight: 600 }}
                  >
                    {moment(currentObj.schedule).format("MMM DD, YYYY")}
                  </Typography>
                ) : (
                  <Typography variant="subtitle1" sx={{ ml: 3 }}>
                    Not yet scheduled
                  </Typography>
                )}
              </Box>
              <Divider />

              <Box sx={{ display: "flex", mt: 1, flexDirection: "column" }}>
                <strong>Additional Message:</strong>
                <Typography sx={{ ml: 2 }}>{currentObj.message}</Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      ) : null}

      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white", p: 1 }}>
          Compose a Letter
        </DialogTitle>
        <Box component="form" onSubmit={submit} sx={{}}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <strong>Student Name:</strong>
                <TextField name="studentName" required fullWidth size="small" />
              </Grid>
              <Grid item xs={12} md={6}>
                <strong>Course, Year & Section:</strong>
                <TextField name="section" required fullWidth size="small" />
              </Grid>
              <Grid item xs={12}>
                <strong>Additional Message:</strong>
                <TextField
                  name="message"
                  size="small"
                  required
                  fullWidth
                  multiline
                  maxRows={7}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Paper sx={styles.paper} elevation={10}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Guidance Requests Section</Typography>
          <Button
            variant="text"
            sx={{ color: "white" }}
            size="small"
            onClick={() => setDialogOpen(true)}
          >
            Compose a Letter
          </Button>
        </Box>
        <Box>
          <List dense>
            {requests.map((r, i) => (
              <ListItemButton
                key={i}
                onClick={() => {
                  setCurrentObj(r);
                  setDisplayDialog(true);
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "warning.main" }}>
                    {r.studentName.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={toTitleCase(r.studentName)}
                  secondary={r.section}
                />
                {r.schedule ? (
                  <Chip
                    size="small"
                    label={moment(r.schedule).format("MMM DD")}
                    sx={{ bgcolor: "success.main", color: "white" }}
                  />
                ) : (
                  <Typography variant="caption">Not scheduled</Typography>
                )}
              </ListItemButton>
            ))}
          </List>
          {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonGroup size="small">
              <Button variant="contained" startIcon={<ArrowLeft />}>
                Prev
              </Button>
              <Button variant="contained" startIcon={<ArrowRight />}>
                Next
              </Button>
            </ButtonGroup>
          </Box> */}
        </Box>
      </Paper>
    </>
  );
};
const styles = {
  paper: {
    m: 3,
    p: 2,
  },
  title: {
    bgcolor: "primary.main",
    color: "white",
    p: 1,
  },
  summary: {
    fontWeight: 100,
    px: 1,
  },
  emptyBox: {
    p: 2,
    width: "100%",
    border: "5px dashed",
    borderColor: "primary.main",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    height: "70vh",
  },
  requestContainer: {
    p: 2,
    width: "100%",
    height: "70vh",
    alignSelf: "flex-start",
    border: "5px dashed",
    borderColor: "primary.main",
    overflowY: "auto",
  },
  card: {
    width: "100%",
  },
  avatar: {
    bgcolor: "secondary.main",
  },
  cardHeader: {
    bgcolor: "primary.light",
  },
};
export default Guidance;
