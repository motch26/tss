import React, { useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
const OSA = () => {
  const [osaComplainant, setOsaComplainant] = useState("");
  const [osaRespondent, setOsaRespondent] = useState("");
  const [osaAcademicYr, setOsaAcademicYr] = useState(new Date());

  const [osaDateTimeIncident, setOsaDateTimeIncident] = useState(new Date());
  const [osaPlace, setOsaPlace] = useState("");
  const [osaIncident, setOsaIncident] = useState("");
  const [osaWitnesses, setOsaWitnesses] = useState("");

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
          <strong>Name of Complainant</strong>
          <TextField
            value={osaComplainant}
            onChange={(e) => setOsaComplainant(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <strong>Name of Respondent</strong>
          <TextField
            value={osaRespondent}
            onChange={(e) => setOsaRespondent(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <strong>Academic Year</strong>
          <Select
            value={osaAcademicYr}
            onChange={(e) => setOsaAcademicYr(e.target.value)}
            fullWidth
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
            onChange={(val) => setOsaDateTimeIncident(val)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
        <Grid item xs={6}>
          <strong>Place of Incident</strong>
          <TextField
            fullWidth
            value={osaPlace}
            onChange={(e) => setOsaPlace(e.target.value)}
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
          />
        </Grid>
        <Grid item xs={12}>
          <strong>Name of Witness/es</strong>
          <TextField
            fullWidth
            value={osaWitnesses}
            onChange={(e) => setOsaWitnesses(e.target.value)}
            helperText="Seperate with comma if witnesses are more than two."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OSA;
