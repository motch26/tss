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
const CIT = () => {
  const [cookies] = useCookies(["type"]);
  const [citYearLevel, setCitYearLevel] = useState("");
  const [citSection, setCitSection] = useState("");
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
  const transacTypes = [
    "Grades",
    "Dropped Subjects",
    "Schedule of Classes",
    "Retrieval of Forms",
    "Complaints",
    "Inquire Services",
    "Requirements for Enrolment",
    "Counseling",
  ];
  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        CIT Dean's Office Transaction/Visit Form
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <strong>Course</strong>
          <TextField
            value={citCourse}
            onChange={(e) => setCitCourse(e.target.value)}
            fullWidth
            name="course"
          />
        </Grid>

        {cookies.type === "student" ? (
          <>
            <Grid item xs={6}>
              <strong>Year Level</strong>
              <Select
                value={citYearLevel}
                onChange={(e) => setCitYearLevel(e.target.value)}
                fullWidth
                name="yearLevel"
              >
                {[...Array(5).keys()].map((n) => (
                  <MenuItem key={n + 1} value={n + 1}>
                    {n + 1}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <strong>Section</strong>
              <TextField
                value={citSection}
                onChange={(e) => setCitSection(e.target.value)}
                fullWidth
                name="section"
              />
            </Grid>
            <Grid item xs={6}>
              <strong>Academic Year</strong>
              <Select
                value={citAcademicYr}
                onChange={(e) => setCitAcademicYr(parseInt(e.target.value))}
                fullWidth
                name="year"
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>{`${y} - ${y + 1} `}</MenuItem>
                ))}
              </Select>
            </Grid>
          </>
        ) : null}
        {cookies.type === "alumnus" ? (
          <Grid item xs={6}>
            <strong>Year Graduated</strong>
            <TextField
              value={citYrGraduated}
              onChange={(e) => setCitYrGraduated(e.target.value)}
              fullWidth
              name="year"
            />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <strong>Type of Transaction</strong>
          <Select
            value={citTransaction}
            onChange={(e) => setCitTransaction(e.target.value)}
            fullWidth
            name="transacType"
          >
            {transacTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <strong>Additional Message</strong>
          <TextField
            fullWidth
            value={citMessage}
            multiline
            minRows={5}
            onChange={(e) => setCitMessage(e.target.value)}
            name="message"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CIT;
