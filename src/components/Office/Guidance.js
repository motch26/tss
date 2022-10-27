import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Guidance = () => {
  return (
    <>
      <Paper sx={styles.paper} elevation={10}>
        <Box sx={styles.title}>
          <Typography variant="h5">Guidance Requests Section</Typography>
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
