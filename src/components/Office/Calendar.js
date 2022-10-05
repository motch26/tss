import React from "react";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {} from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
const Schedule = () => {
  const now = new Date();
  const [calendarValue, calendarOnchange] = useState(now);

  // const datesToAddContentTo = [newDate.toString()];

  // function tileContent({ activeStartDate, date, view }) {
  //   // Add class to tiles in month view only
  //   if (view === "month") {
  //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
  //     if (datesToAddContentTo.find((ddate) => ddate === date))
  //       return "My Content";
  //     else return;
  //   }
  // }
  return (
    <>
      <Paper
        sx={{
          m: 3,
          p: 2,
        }}
        elevation={10}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 1,
          }}
        >
          <Typography variant="h5">Calendar</Typography>
        </Box>
        <Grid container sx={{ mt: 2 }} columnSpacing={1}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              {`Schedule for the month of ${now.toLocaleString("default", {
                month: "long",
              })}`}
            </Typography>
            <List dense>
              <ListItemButton>
                <ListItemText
                  primary="Juan Dela Cruz"
                  secondary="Request Subject"
                />
                <Typography variant="body2">Jun 3</Typography>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText
                  primary="Juan Dela Cruz"
                  secondary="Request Subject"
                />
                <Typography variant="body2">Jun 3</Typography>
              </ListItemButton>
            </List>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box>
              <Calendar
                value={calendarValue}
                onChange={calendarOnchange}
                // tileContent={tileContent}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Schedule;
