import React, { useEffect } from "react";
import {
  Avatar,
  Badge,
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
import "./Calendar.css";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";
import emails from "./../../email.json";
const Schedule = () => {
  const [isGuidance, setIsGuidance] = useState(false);
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
        ` https://tss.miracodes.com/api/getRequestBody.php?id=${id}&office=${office}`
      )
      .then(({ data }) => {
        if (data) setRequestBody(data);
      })
      .catch((err) => console.log(err));
  };
  const getRequests = () => {
    axios
      .get(
        ` https://tss.miracodes.com/api/getRequests.php?office=${cookies.office}&schedule`
      )
      .then(({ data }) => {
        setSchedules(data);
      });
  };

  useEffect(() => {
    if (cookies.office === "guidance") setIsGuidance(true);
    getRequests();
  }, []);
  const getUserInfo = async (id) => {
    try {
      const res = await axios.get(
        ` https://tss.miracodes.com/api/getUserInfo.php?id=${id}`
      );
      return res;
    } catch (error) {
      return error;
    }
  };

  const ScheduleListItem = ({ s }) => {
    const {
      name,
      subject,
      scheduleDate,
      id,
      userId,
      office,
      requestDate,
      studentName,
      section,
    } = s;
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
      if (!isGuidance) getUserInfo(userId).then((d) => setUserInfo(d.data));
    }, []);

    return (
      <Box>
        <ListItemButton
          onClick={() => {
            if (!isGuidance) {
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
            }
          }}
        >
          <ListItemText
            primary={isGuidance ? emails[s.office]["name"] : name}
            secondary={isGuidance ? section : subject}
          />
          <Typography variant="body2">
            {moment(scheduleDate).format("MMM D")}{" "}
          </Typography>
        </ListItemButton>
        <Divider />
      </Box>
    );
  };

  const findRequestByDate = (_date) => {
    const calendarDate = moment(_date).format("YYYY-MM-DD");
    const filtered = schedules.filter((r) => {
      // console.log(calendarDate);
      const requestDate = moment(r.scheduleDate).format("YYYY-MM-DD");
      if (requestDate === calendarDate) return true;
      else return false;
    });
    return filtered;
  };

  function tileContent({ activeStartDate, date, view }) {
    if (view === "month") {
      const requests = findRequestByDate(date);

      if (requests.length > 0)
        return (
          <Badge
            sx={{ display: "block", fontSize: "0.7rem" }}
          >{`${requests.length} schedules`}</Badge>
        );
      // if (requests.length > 0) {
      //   return requests.map((r, i) => {
      //     <Typography>1</Typography>;
      //   });
      // }
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
        <Grid container sx={{ mt: 2 }} rowSpacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Calendar
                value={calendarValue}
                onChange={calendarOnchange}
                tileContent={tileContent}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              Upcoming Schedules
            </Typography>
            <List dense>
              {schedules.length ? (
                schedules.map((s, i) => <ScheduleListItem s={s} key={i} />)
              ) : (
                <Typography textAlign="center" variant="h6">
                  No upcoming schedules
                </Typography>
              )}
            </List>
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
