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
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Guidance = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  const submit = (e) => e.preventDefault();
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white", p: 1 }}>
          Compose a Letter
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={submit} sx={{ p: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <strong>Student Name:</strong>
                <TextField name="name" required fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <strong>Course, Year & Section:</strong>
                <TextField name="yearSection" required fullWidth />
              </Grid>
              <Grid item xs={12}>
                <strong>Additional Message:</strong>
                <TextField
                  name="message"
                  required
                  fullWidth
                  multiline
                  maxRows={7}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={closeDialog}>
            Submit
          </Button>
        </DialogActions>
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
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "warning.main" }}>A</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Student Name"
                secondary="Course, Year & Section"
              />
              <Box sx={{}}>
                <Chip
                  size="small"
                  label="June 26, 2022"
                  sx={{ bgcolor: "success.main", color: "white" }}
                />
              </Box>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "warning.main" }}>A</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Student Name"
                secondary="Course, Year & Section"
              />
              <Box sx={{}}>
                <Typography variant="caption">Not scheduled</Typography>
              </Box>
            </ListItemButton>
          </List>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonGroup size="small">
              <Button variant="contained" startIcon={<ArrowLeft />}>
                Prev
              </Button>
              <Button variant="contained" startIcon={<ArrowRight />}>
                Next
              </Button>
            </ButtonGroup>
          </Box>
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
