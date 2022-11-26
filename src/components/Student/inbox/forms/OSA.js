import React, { useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useCookies } from "react-cookie";

const OSA = () => {
  const [cookies] = useCookies(["type"]);
  const [osaYearLevel, setOsaYearLevel] = useState("");
  const [osaCourse, setOsaCourse] = useState("");

  const [osaSection, setOsaSection] = useState("");
  const [osaComplainant, setOsaComplainant] = useState("");
  const [osaRespondent, setOsaRespondent] = useState("");
  const [osaAcademicYr, setOsaAcademicYr] = useState(new Date().getFullYear());

  const [osaDateTimeIncident, setOsaDateTimeIncident] = useState(new Date());
  const [osaPlace, setOsaPlace] = useState("");
  const [osaIncident, setOsaIncident] = useState("");
  const [osaWitnesses, setOsaWitnesses] = useState("");

  const [values, setValues] = useState([]);
  const [currValue, setCurrValue] = useState("");

  const handleKeyUp = (e) => {
    if (e.keyCode == 13 && currValue) {
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
  };
  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    setValues(arr);
  };

  const years = [];
  for (let i = 2000; i <= parseInt(moment().format("YYYY")); i++) {
    years.push(i);
  }

  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Incident Report Form
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <strong>Course</strong>
          <TextField
            value={osaCourse}
            onChange={(e) => setOsaCourse(e.target.value)}
            fullWidth
            name="course"
          />
        </Grid>
        {cookies.type === "student" ? (
          <>
            <Grid item xs={6}>
              <strong>Year Level</strong>
              <Select
                value={osaYearLevel}
                onChange={(e) => setOsaYearLevel(e.target.value)}
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
                value={osaSection}
                onChange={(e) => setOsaSection(e.target.value)}
                fullWidth
                name="section"
              />
            </Grid>
          </>
        ) : null}
        <Grid item xs={6}>
          <strong>Name of Complainant</strong>
          <TextField
            required
            value={osaComplainant}
            onChange={(e) => setOsaComplainant(e.target.value)}
            fullWidth
            name="complainant"
          />
        </Grid>
        <Grid item xs={6}>
          <strong>Name of Respondent</strong>
          <TextField
            value={osaRespondent}
            onChange={(e) => setOsaRespondent(e.target.value)}
            fullWidth
            required
            name="respondent"
          />
        </Grid>
        <Grid item xs={6}>
          <strong>Academic Year</strong>
          <Select
            required
            value={osaAcademicYr}
            onChange={(e) => setOsaAcademicYr(e.target.value)}
            fullWidth
            name="year"
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>{`${y} - ${y + 1} `}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6}>
          <strong>Date/Time of Incident</strong>
          <DateTimePicker
            value={osaDateTimeIncident}
            onChange={(val) => setOsaDateTimeIncident(val._d)}
            renderInput={(params) => (
              <TextField name="osaDateTime" fullWidth {...params} required />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <strong>Place of Incident</strong>
          <TextField
            fullWidth
            value={osaPlace}
            onChange={(e) => setOsaPlace(e.target.value)}
            name="place"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <strong>Detailed Narration of the Incident</strong>
          <TextField
            fullWidth
            value={osaIncident}
            multiline
            minRows={5}
            onChange={(e) => setOsaIncident(e.target.value)}
            name="narration"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <strong>Name of Witness/es</strong>
          <FormControl fullWidth>
            <div className={"container"}>
              {values.map((item, index) => (
                <Chip
                  key={index}
                  size="small"
                  onDelete={() => handleDelete(item, index)}
                  label={item}
                />
              ))}
            </div>
            <Input
              value={currValue}
              onChange={handleChange}
              onKeyDown={handleKeyUp}
            />
          </FormControl>
          {/* <TextField
            fullWidth
            value={osaWitnesses}
            onChange={(e) => setOsaWitnesses(e.target.value)}
            helperText="Seperate with comma if witnesses are more than two."
          /> */}
          <TextField type="hidden" value={values} name="witnesses" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OSA;
