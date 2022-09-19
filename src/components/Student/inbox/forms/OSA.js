import React, { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
const OSA = () => {
  const [osaComplainant, setOsaComplainant] = useState("");
  const [osaRespondent, setOsaRespondent] = useState("");
  const [osaAcademicYr, setOsaAcademicYr] = useState(new Date());
  const [osaAcademicYrEnd, setOsaAcademicYrEnd] = useState(new Date());
  const [osaDateTimeIncident, setOsaDateTimeIncident] = useState(new Date());
  const [osaPlace, setOsaPlace] = useState("");
  const [osaIncident, setOsaIncident] = useState("");
  const [osaWitnesses, setOsaWitnesses] = useState("");

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
          <strong>Academic Year Start</strong>
          <DatePicker
            views={["year"]}
            value={osaAcademicYr}
            onChange={(val) => setOsaAcademicYr(val)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
        <Grid item xs={6}>
          <strong>Academic Year End</strong>
          <DatePicker
            views={["year"]}
            value={osaAcademicYrEnd}
            onChange={(val) => setOsaAcademicYrEnd(val)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
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
            helperText="Seperate with comma if witnesses are more that two."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OSA;
