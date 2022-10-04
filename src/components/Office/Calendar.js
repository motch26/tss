import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {} from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
const Schedule = () => {
  const now = new Date();
  const [calendarValue, calendarOnchange] = useState(now);
  const newDate = now.setDate(now.getDate() + 5);
  const datesToAddContentTo = [newDate.toString()];
  console.log(newDate.toString());
  function tileContent({ activeStartDate, date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddContentTo.find((ddate) => ddate === date))
        return "My Content";
      else return;
    }
  }
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
            asda
          </Grid>
          <Grid item xs={12} md={6}>
            <Calendar
              value={calendarValue}
              onChange={calendarOnchange}
              tileContent={tileContent}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Schedule;
