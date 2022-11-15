import { Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import emails from "./../../../email.json";
import { useOutletContext } from "react-router-dom";

const Pending = () => {
  // @ts-ignore
  const [getRequests, thisMonth, lastMonth, thisYear, older] =
    useOutletContext();
  const officeNames = {
    osa: "Office of the Student Affairs",
    cit: "CIT Dean's Office",
    bsis: "BSIS Program Chairman",
  };
  const [isRequestOpen, setRequestOpen] = useState(false);

  // @ts-ignore
  const [dSubject, setDSubject] = useState("");
  // @ts-ignore
  const [dOffice, setDOffice] = useState("");
  // @ts-ignore
  const [dOfficeEmail, setDOfficeEmail] = useState("");
  // @ts-ignore
  const [dDate, setDDate] = useState("");
  // @ts-ignore
  const [dStatus, setDStatus] = useState("");
  const [dSchedule, setDSchedule] = useState("");
  const [dOfficeMessage, setDOfficeMessage] = useState("");
  const [requestBody, setRequestBody] = useState({});

  useEffect(() => {
    getRequests();
  }, []);

  const getRequestBody = (office, id) => {
    axios
      .get(
        `https://tss.miracodes.com/api/getRequestBody.php?office=${office}&id=${id}`
      )
      .then(({ data }) => {
        if (data) setRequestBody(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Paper sx={styles.paper} elevation={10}>
        <Box sx={styles.title}>
          <Typography variant="h5">Requests</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} p={1}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ bgcolor: "primary.light" }}
              >
                <Typography width="40%" fontWeight={600}>
                  This Month
                </Typography>
                <Typography variant="subtitle2" sx={styles.summary}>
                  {`${thisMonth.length} requests`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {thisMonth.length > 0
                    ? thisMonth.map((r, i) => (
                        <Box key={i}>
                          <ListItemButton
                            onClick={() => {
                              getRequestBody(r.office, r.id);
                              // @ts-ignore
                              setDSubject(r.subject);
                              // @ts-ignore
                              setDOffice(r.office);
                              setDDate(
                                // @ts-ignore
                                moment(new Date(r.requestDate)).format(
                                  "MMM D, YYYY"
                                )
                              );
                              // @ts-ignore
                              setDOfficeEmail(emails[r.office]["email"]);
                              setDStatus(r.status);
                              if (r.status !== "pending") {
                                setDSchedule(r.scheduleDate);
                                setDOfficeMessage(r.message);
                              }
                              setRequestOpen(true);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={styles.avatar}>
                                {r.office // @ts-ignore
                                  .toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {
                                    // @ts-ignore
                                    r.subject
                                  }
                                </Typography>
                              }
                              secondary={
                                <>
                                  {"To: "}
                                  <Typography variant="body2" component="span">
                                    {emails[r.office]["name"]}
                                  </Typography>
                                </>
                              }
                            />
                            <Typography>
                              {moment(
                                new Date(
                                  // @ts-ignore
                                  r.requestDate
                                )
                              ).format("MMM D")}
                            </Typography>
                          </ListItemButton>
                          <Divider />
                        </Box>
                      ))
                    : null}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ bgcolor: "primary.light" }}
              >
                <Typography width="40%" fontWeight={600}>
                  Last Month
                </Typography>
                <Typography variant="subtitle2" sx={styles.summary}>
                  {`${lastMonth.length} requests`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {lastMonth.length > 0
                    ? lastMonth.map((r, i) => (
                        <Box key={i}>
                          <ListItemButton
                            onClick={() => {
                              getRequestBody(r.office, r.id);
                              // @ts-ignore
                              setDSubject(r.subject);
                              // @ts-ignore
                              setDOffice(r.office);
                              setDDate(
                                // @ts-ignore
                                moment(new Date(r.requestDate)).format(
                                  "MMM D, YYYY"
                                )
                              );
                              // @ts-ignore
                              setDOfficeEmail(emails[r.office]["email"]);
                              setDStatus(r.status);
                              if (r.status !== "pending") {
                                setDSchedule(r.scheduleDate);
                                setDOfficeMessage(r.message);
                              }
                              setRequestOpen(true);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={styles.avatar}>
                                {r.office // @ts-ignore
                                  .toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {
                                    // @ts-ignore
                                    r.subject
                                  }
                                </Typography>
                              }
                              secondary={
                                <>
                                  {"To: "}
                                  <Typography variant="body2" component="span">
                                    {emails[r.office]["name"]}
                                  </Typography>
                                </>
                              }
                            />
                            <Typography>
                              {moment(
                                new Date(
                                  // @ts-ignore
                                  r.requestDate
                                )
                              ).format("MMM D")}
                            </Typography>
                          </ListItemButton>
                          <Divider />
                        </Box>
                      ))
                    : null}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ bgcolor: "primary.light" }}
              >
                <Typography width="40%" fontWeight={600}>
                  This Year
                </Typography>
                <Typography variant="subtitle2" sx={styles.summary}>
                  {`${thisYear.length} requests`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {thisYear.length > 0
                    ? thisYear.map((r, i) => (
                        <Box key={i}>
                          <ListItemButton
                            onClick={() => {
                              getRequestBody(r.office, r.id);
                              // @ts-ignore
                              setDSubject(r.subject);
                              // @ts-ignore
                              setDOffice(r.office);
                              setDDate(
                                // @ts-ignore
                                moment(new Date(r.requestDate)).format(
                                  "MMM D, YYYY"
                                )
                              );
                              // @ts-ignore
                              setDOfficeEmail(emails[r.office]["email"]);
                              setDStatus(r.status);
                              if (r.status !== "pending") {
                                setDSchedule(r.scheduleDate);
                                setDOfficeMessage(r.message);
                              }
                              setRequestOpen(true);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={styles.avatar}>
                                {r.office // @ts-ignore
                                  .toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {
                                    // @ts-ignore
                                    r.subject
                                  }
                                </Typography>
                              }
                              secondary={
                                <>
                                  {"To: "}
                                  <Typography variant="body2" component="span">
                                    {emails[r.office]["name"]}
                                  </Typography>
                                </>
                              }
                            />
                            <Typography>
                              {moment(
                                new Date(
                                  // @ts-ignore
                                  r.requestDate
                                )
                              ).format("MMM D")}
                            </Typography>
                          </ListItemButton>
                          <Divider />
                        </Box>
                      ))
                    : null}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ bgcolor: "primary.light" }}
              >
                <Typography width="40%" fontWeight={600}>
                  Older
                </Typography>
                <Typography variant="subtitle2" sx={styles.summary}>
                  {`${older.length} requests`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {older.length > 0
                    ? older.map((r, i) => (
                        <Box key={i}>
                          <ListItemButton
                            onClick={() => {
                              getRequestBody(r.office, r.id);
                              // @ts-ignore
                              setDSubject(r.subject);
                              // @ts-ignore
                              setDOffice(r.office);
                              setDDate(
                                // @ts-ignore
                                moment(new Date(r.requestDate)).format(
                                  "MMM D, YYYY"
                                )
                              );
                              // @ts-ignore
                              setDOfficeEmail(emails[r.office]["email"]);
                              setDStatus(r.status);
                              if (r.status !== "pending") {
                                setDSchedule(r.scheduleDate);
                                setDOfficeMessage(r.message);
                              }
                              setRequestOpen(true);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={styles.avatar}>
                                {r.office // @ts-ignore
                                  .toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {
                                    // @ts-ignore
                                    r.subject
                                  }
                                </Typography>
                              }
                              secondary={
                                <>
                                  {"To: "}
                                  <Typography variant="body2" component="span">
                                    {emails[r.office]["name"]}
                                  </Typography>
                                </>
                              }
                            />
                            <Typography>
                              {moment(
                                new Date(
                                  // @ts-ignore
                                  r.requestDate
                                )
                              ).format("MMM D")}
                            </Typography>
                          </ListItemButton>
                          <Divider />
                        </Box>
                      ))
                    : null}
                </List>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Dialog
          open={isRequestOpen}
          onClose={() => {
            getRequests();
            setRequestOpen(false);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ textTransform: "capitalize" }}>
            {dSubject}
          </DialogTitle>
          <DialogContent>
            <Box sx={styles.requestContainer}>
              <Card sx={styles.card}>
                <CardHeader
                  sx={styles.cardHeader}
                  avatar={
                    <Avatar sx={styles.avatar}>{dOffice.toUpperCase()}</Avatar>
                  }
                  action={
                    <IconButton onClick={() => setRequestOpen(false)}>
                      <Close />
                    </IconButton>
                  }
                  title={`To: ${
                    isRequestOpen ? emails[dOffice]["name"] : null
                  }`}
                  subheader={moment(dDate).format("MMM D, YYYY")}
                />
                <CardContent>
                  <Box sx={styles.requestBody}>
                    <Typography sx={{ textTransform: "capitalize" }} mb={1}>
                      Subject: <strong>{dSubject}</strong>
                    </Typography>
                    <Typography mb={1}>
                      {" "}
                      Office Email: <strong>{dOfficeEmail}</strong>
                    </Typography>
                    <Typography mb={1}>
                      {" "}
                      Date of Transaction:{" "}
                      <strong>{moment(dDate).format("MMMM D, YYYY")}</strong>
                    </Typography>
                    <Typography mb={1}>
                      Status:
                      <Typography
                        component="span"
                        variant="subtitle2"
                        sx={{
                          bgcolor:
                            dStatus === "pending"
                              ? "secondary.main"
                              : dStatus === "approved"
                              ? "success.main"
                              : "error.main",
                          px: 1,
                          ml: 1,
                          textTransform: "capitalize",
                        }}
                      >
                        {dStatus}
                      </Typography>
                      {dStatus !== "pending" ? (
                        <Box sx={{ mt: 1 }}>
                          {dStatus === "approved" ? (
                            <Typography mb={1}>
                              {" "}
                              Schedule Date:{" "}
                              <strong>
                                {moment(dSchedule).format("MMMM D, YYYY")}
                              </strong>
                            </Typography>
                          ) : null}

                          <Typography mb={1}>
                            {" "}
                            Message from the Office:{" "}
                            <strong>{dOfficeMessage}</strong>
                          </Typography>
                        </Box>
                      ) : null}
                    </Typography>
                    <Divider />
                    <Box>
                      {dOffice === "osa" ? (
                        <Paper elevation={20} sx={{ p: 1, mt: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              bgcolor: "secondary.light",
                              textAlign: "center",
                            }}
                          >
                            Incident Report Form
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              mt: 1,
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="body1">
                              Complainant:{" "}
                              <strong>{requestBody.complainant}</strong>
                            </Typography>
                            <Typography variant="body1">
                              Respondent:{" "}
                              <strong>{requestBody.respondent}</strong>
                            </Typography>
                            <Divider />

                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body1">
                                <strong>Incident Details</strong>
                              </Typography>
                              <Grid container columnSpacing={1}>
                                <Grid item xs={6}>
                                  <Typography>
                                    Date:{" "}
                                    <strong>
                                      {moment(requestBody.dateTime).format(
                                        "MMM D, YYYY"
                                      )}
                                    </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography>
                                    Time:{" "}
                                    <strong>
                                      {moment(requestBody.dateTime).format(
                                        "hh:mm A"
                                      )}
                                    </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography>
                                    Place: <strong>{requestBody.place}</strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Divider />
                              <Typography sx={{ mt: 1 }}>
                                <strong>Narration:</strong>
                              </Typography>
                              <Typography variant="caption">
                                {requestBody.narration}
                              </Typography>
                              <Divider />
                              <Typography sx={{ mt: 1 }}>
                                <strong>Witness(es):</strong>
                                {requestBody.hasOwnProperty("witnesses")
                                  ? requestBody.witnesses
                                      .split(",")
                                      .map((w, i) => (
                                        <Box>
                                          <Typography>{w}</Typography>
                                        </Box>
                                      ))
                                  : null}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      ) : null}
                      {dOffice === "cit" ? (
                        <Paper elevation={20} sx={{ p: 1, mt: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              bgcolor: "secondary.light",
                              textAlign: "center",
                            }}
                          >
                            CIT Office Form
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              mt: 1,
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="body1">
                              Course:{" "}
                              <strong>
                                {requestBody.hasOwnProperty("course")
                                  ? requestBody.course.toUpperCase()
                                  : null}
                              </strong>
                            </Typography>
                            <Typography variant="body1">
                              Year Graduated:{" "}
                              <strong>{requestBody.year}</strong>
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ textTransform: "capitalize" }}
                            >
                              Transaction Type:{" "}
                              <strong>{requestBody.transacType}</strong>
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Additional Message:</strong>
                            </Typography>
                            <Typography variant="caption">
                              {requestBody.message}
                            </Typography>
                          </Box>
                        </Paper>
                      ) : null}
                      {dOffice === "bsis" ? (
                        <Paper elevation={20} sx={{ p: 1, mt: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              bgcolor: "secondary.light",
                              textAlign: "center",
                            }}
                          >
                            BSIS Office Form
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              mt: 1,
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="body1">
                              Course:{" "}
                              <strong>
                                {requestBody.hasOwnProperty("course")
                                  ? requestBody.course.toUpperCase()
                                  : null}
                              </strong>
                            </Typography>
                            <Typography variant="body1">
                              Year Graduated:{" "}
                              <strong>{requestBody.year}</strong>
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ textTransform: "capitalize" }}
                            >
                              Transaction Type:{" "}
                              <strong>{requestBody.transacType}</strong>
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Additional Message:</strong>
                            </Typography>
                            <Typography variant="caption">
                              {requestBody.message}
                            </Typography>
                          </Box>
                        </Paper>
                      ) : null}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </DialogContent>
        </Dialog>
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
export default Pending;
