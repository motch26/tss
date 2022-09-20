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
const CIT = () => {
  const [citType, setCitType] = useState("");
  const [citCourse, setCitCourse] = useState("");
  const [citAcademicYr, setCitAcademicYr] = useState(
    parseInt(moment().format("YYYY"))
  );
  const [citYrGraduated, setCitYrGraduated] = useState(
    parseInt(moment().format("YYYY"))
  );
  const [citTransaction, setCitTransaction] = useState("");
  const [citMessage, setCitMessage] = useState("");

  const years = [];
  for (let i = 2000; i <= parseInt(moment().format("YYYY")); i++) {
    years.push(i);
  }
  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        CIT Dean's Office Transaction/Visit Form
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <strong>Category</strong>
          <Select
            value={citType}
            onChange={(e) => setCitType(e.target.value)}
            fullWidth
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="alumnus">Alumnus</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <strong>Course</strong>
          <TextField
            value={citCourse}
            onChange={(e) => setCitCourse(e.target.value)}
            fullWidth
          />
        </Grid>

        {citType ? (
          citType === "student" ? (
            <Grid item xs={6}>
              <strong>Academic Year</strong>
              <Select
                value={citAcademicYr}
                onChange={(e) => setCitAcademicYr(parseInt(e.target.value))}
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
                value={citYrGraduated}
                onChange={(e) => setCitYrGraduated(e.target.value)}
                fullWidth
              />
            </Grid>
          )
        ) : null}
        <Grid item xs={6}>
          <strong>Type of Transaction</strong>
          <TextField
            value={citTransaction}
            onChange={(e) => setCitTransaction(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <strong>Additional Message</strong>
          <TextField
            fullWidth
            value={citMessage}
            multiline
            minRows={5}
            onChange={(e) => setCitMessage(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CIT;
