import React, { useEffect } from "react";
import {
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
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";
const Schedule = () => {
  const now = new Date();
  const [cookies] = useCookies(["office"]);
  const [calendarValue, calendarOnchange] = useState(now);
  const [schedules, setSchedules] = useState([]);
  const [offset, setOffset] = useState(0);

  const [isRequestOpen, setRequestOpen] = useState(false);
  // @ts-ignore
  const [dID, setDID] = useState("");
  const [dSubject, setDSubject] = useState("");
  // @ts-ignore
  const [dOffice, setDOffice] = useState("");
  // @ts-ignore
  const [dSenderEmail, setdSenderEmail] = useState("");
  const [dSenderName, setDSenderName] = useState("");
  const [dSenderPicture, setdSenderPicture] = useState("");
  const [dScheduleDate, setDScheduleData] = useState("");
  const [requestBody, setRequestBody] = useState({});

  // @ts-ignore
  const [dDate, setDDate] = useState("");
  // @ts-ignore
  const [dStatus, setDStatus] = useState("");
  const getRequestBody = (id, office) => {
    axios
      .get(
        `http://localhost/tss/api/getRequestBody.php?id=${id}&office=${office}`
      )
      .then(({ data }) => {
        if (data) setRequestBody(data);
      })
      .catch((err) => console.log(err));
  };
  const getRequests = () => {
    axios
      .get(
        `http://localhost/tss/api/getRequests.php?office=${cookies.office}&schedule`
      )
      .then(({ data }) => {
        setSchedules(data);
      });
  };

  useEffect(() => {
    getRequests();
  }, []);
  const getUserInfo = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost/tss/api/getUserInfo.php?id=${id}`
      );
      return res;
    } catch (error) {
      return error;
    }
  };

  const ScheduleListItem = ({ s }) => {
    const { name, subject, scheduleDate, id, userId, office, requestDate } = s;
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
      getUserInfo(userId).then((d) => setUserInfo(d.data));
    }, []);

    return (
      <Box>
        <ListItemButton
          onClick={() => {
            getRequestBody(id, office);
            setDID(id);
            setDScheduleData(
              moment(new Date(scheduleDate)).format("MMM D, YYYY hh:mm A")
            );
            setDOffice(office);
            // @ts-ignore
            setDSubject(subject);
            // @ts-ignore
            setdSenderPicture(userInfo.picture); //picture key is still blank after render
            // @ts-ignore
            setDSenderName(userInfo.name); //name key is still blank after render
            setDDate(
              // @ts-ignore
              moment(new Date(requestDate)).format("MMM D, YYYY")
            );
            // @ts-ignore
            setdSenderEmail(userInfo.email);

            setRequestOpen(true);
          }}
        >
          <ListItemText primary={name} secondary={subject} />
          <Typography variant="body2">
            {moment(scheduleDate).format("MMM D")}{" "}
          </Typography>
        </ListItemButton>
        <Divider />
      </Box>
    );
  };

  const datesToAddContentTo = new Date();
  function tileContent({ activeStartDate, date, view }) {
    const dateNowString = moment(datesToAddContentTo).format("YYYY-MM-DD");
    const dateString = moment(date).format("YYYY-MM-DD");
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      // if (datesToAddContentTo.find((ddate) => ddate === date))
      if (dateNowString === dateString)
        return <Box sx={{ fontSize: 8 }}>Something</Box>;
      else return;
    }
  }

  return (
    <>
      <Paper
        sx={{
          m: 3,
          p: 2,
        }}
        elevation={10}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 1,
          }}
        >
          <Typography variant="h5">Calendar</Typography>
        </Box>
        <Grid container sx={{ mt: 2 }} columnSpacing={1}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              Upcoming Schedules
            </Typography>
            <List dense>
              {schedules.map((s, i) => (
                <ScheduleListItem s={s} key={i} />
              ))}
            </List>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box>
              <Calendar
                value={calendarValue}
                onChange={calendarOnchange}
                tileContent={tileContent}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={isRequestOpen}
        onClose={() => {
          setRequestOpen(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{dSubject}</DialogTitle>
        <DialogContent>
          <Box sx={styles.requestContainer}>
            <Card sx={styles.card}>
              <CardHeader
                sx={styles.cardHeader}
                avatar={
                  <Avatar sx={styles.avatar}>
                    <img src={dSenderPicture} alt={dSenderName} />
                  </Avatar>
                }
                action={
                  <IconButton onClick={() => setRequestOpen(false)}>
                    <Close />
                  </IconButton>
                }
                title={`From: ${dSenderName}`}
                subheader={dDate}
              />
              <CardContent>
                <Box sx={styles.requestBody}>
                  <Typography mb={1} sx={{ textTransform: "capitalize" }}>
                    Subject: <strong>{dSubject}</strong>
                  </Typography>
                  <Typography mb={1}>
                    {" "}
                    Sender Email: <strong>{dSenderEmail}</strong>
                  </Typography>
                  <Typography mb={1}>
                    {" "}
                    Date of Transaction: <strong>{dDate}</strong>
                  </Typography>
                  <Typography mb={1}>
                    {" "}
                    Schedule Date: <strong>{dScheduleDate}</strong>
                  </Typography>

                  <Divider />
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
                          Year Graduated: <strong>{requestBody.year}</strong>
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
                          Respondent: <strong>{requestBody.respondent}</strong>
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
                              ? requestBody.witnesses.split(",").map((w, i) => (
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
                          Year Graduated: <strong>{requestBody.year}</strong>
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
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
      </Dialog>
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
  requestBody: {
    display: "flex",
    flexDirection: "column",
  },
  innerRequestBody: {
    border: "1px solid",
    mt: 2,
    borderColor: "primary.main",
  },
  requestBodyTitle: {
    textAlign: "center",
    bgcolor: "secondary.main",

    p: 1,
  },
};
export default Schedule;
