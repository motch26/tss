import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import {} from "@mui/icons-material";
const Notification = () => {
  <>
    <Paper sx={{ m: 3, p: 2 }} elevation={10}>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 1,
        }}
      >
        <Typography variant="h5">Requests</Typography>
      </Box>
    </Paper>
  </>;
};

export default Notification;
