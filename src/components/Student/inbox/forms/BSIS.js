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
const BSIS = () => {
  const [bsisType, setBsisType] = useState("");
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
          <strong>Category</strong>
          <Select
            value={bsisType}
            onChange={(e) => setBsisType(e.target.value)}
            fullWidth
          >
            <MenuItem value="student">Student</MenuItem>   
            <MenuItem value="alumnus">Alumnus</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <strong>Course</strong>
          <TextField
            value={bsisCourse}
            onChange={(e) => setBsisCourse(e.target.value)}
            fullWidth
          />
        </Grid>

        {bsisType ? (
          bsisType === "student" ? (
            <Grid item xs={6}>
              <strong>Academic Year</strong>
              <Select
                value={bsisAcademicYr}
                onChange={(e) => setBsisAcademicYr(parseInt(e.target.value))}
                fullWidth
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>{`${y} - ${y + 1} `}</MenuItem>
                ))}
              </Select>
            </Grid>
          ) : (
            <Grid item xs={6}>
              <strong>Year Graduated</strong>
              <TextField
                value={bsisYrGraduated}
                onChange={(e) => setBsisYrGraduated(e.target.value)}
                fullWidth
              />
            </Grid>
          )
        ) : null}
        <Grid item xs={6}>
          <strong>Type of Transaction</strong>
          <TextField
            value={bsisTransaction}
            onChange={(e) => setBsisTransaction(e.target.value)}
            fullWidth
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
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BSIS;
