import React, { useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCookies } from "react-cookie";
const BSIS = () => {
  const [cookies] = useCookies(["type"]);
  const [bsisCourse, setBsisCourse] = useState("");
  const [bsisAcademicYr, setBsisAcademicYr] = useState(
    parseInt(moment().format("YYYY"))
  );
  const [bsisYrGraduated, setBsisYrGraduated] = useState(
    parseInt(moment().format("YYYY"))
  );
  const [bsisTransaction, setBsisTransaction] = useState("");
  const [bsisMessage, setBsisMessage] = useState("");

  const years = [];
  for (let i = 2000; i <= parseInt(moment().format("YYYY")); i++) {
    years.push(i);
  }
  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        BSIS Office Transaction/Visit Form
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <strong>Course</strong>
          <TextField
            value={bsisCourse}
            onChange={(e) => setBsisCourse(e.target.value)}
            fullWidth
            name="course"
          />
        </Grid>

        {cookies.type === "student" ? (
          <Grid item xs={6}>
            <strong>Academic Year</strong>
            <Select
              value={bsisAcademicYr}
              onChange={(e) => setBsisAcademicYr(parseInt(e.target.value))}
              fullWidth
              name="year"
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>{`${y} - ${y + 1} `}</MenuItem>
              ))}
            </Select>
          </Grid>
        ) : null}
        {cookies.type === "alumnus" ? (
          <Grid item xs={6}>
            <strong>Year Graduated</strong>
            <TextField
              value={bsisYrGraduated}
              onChange={(e) => setBsisYrGraduated(e.target.value)}
              fullWidth
              name="year"
            />
          </Grid>
        ) : null}
        <Grid item xs={6}>
          <strong>Type of Transaction</strong>
          <TextField
            value={bsisTransaction}
            onChange={(e) => setBsisTransaction(e.target.value)}
            fullWidth
            name="transacType"
          />
        </Grid>
        <Grid item xs={12}>
          <strong>Additional Message</strong>
          <TextField
            fullWidth
            value={bsisMessage}
            multiline
            minRows={5}
            onChange={(e) => setBsisMessage(e.target.value)}
            name="message"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BSIS;
