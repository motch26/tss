import { Check, Close, Dangerous, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
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
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import moment from "moment";
import emails from "./../../email.json";
import { DateTimePicker } from "@mui/x-date-pickers";
const OfficePending = () => {
  const [isGuidance, setIsGuidance] = useState(false);
  const [currentGuidanceObj, setCurrentGuidanceObj] = useState(null);

  const [cookies] = useCookies(["office"]);
  const [isRequestOpen, setRequestOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);
  const [thisYear, setThisYear] = useState([]);
  const [older, setOlder] = useState([]);

  // @ts-ignore
  const [dID, setDID] = useState("");
  const [dSubject, setDSubject] = useState("");
  // @ts-ignore
  const [dOffice, setDOffice] = useState("");
  // @ts-ignore
  const [dSenderEmail, setdSenderEmail] = useState("");
  const [dSenderName, setDSenderName] = useState("");
  const [dSenderPicture, setdSenderPicture] = useState("");
  const [dContact, setDContact] = useState("");
  // @ts-ignore
  const [dDate, setDDate] = useState("");
  // @ts-ignore
  const [dStatus, setDStatus] = useState("");
  const [requestBody, setRequestBody] = useState({});

  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [updatedDateTime, setUpdatedDateTime] = useState(new Date());

  const getRequests = () => {
    axios
      .get(
        ` https://tss.miracodes.com/api/getRequests.php?office=${cookies.office}`
      )
      .then(({ data }) => {
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        setThisMonth(
          data.filter((d) => {
            const rowMonth = new Date(d.requestDate).getMonth();
            return rowMonth === month;
          })
        );
        setLastMonth(
          data.filter((d) => {
            const rowMonth = new Date(d.requestDate).getMonth();
            return rowMonth === month - 1;
          })
        );
        setThisYear(
          data.filter((d) => {
            const rowMonth = new Date(d.requestDate).getMonth();
            const rowYear = new Date(d.requestDate).getFullYear();
            return rowMonth < month - 1 && rowYear === year;
          })
        );
        setOlder(
          data.filter((d) => {
            const rowYear = new Date(d.requestDate).getFullYear();
            return rowYear < year;
          })
        );
      });
  };

  useEffect(() => {
    if (cookies.office === "guidance") setIsGuidance(true);
    getRequests();
  }, []);
  const getRequestBody = (id, office = null) => {
    axios
      .get(
        ` https://tss.miracodes.com/api/getRequestBody.php?id=${id}&office=${office}`
      )
      .then(({ data }) => {
        if (data) setRequestBody(data);
      })
      .catch((err) => console.log(err));
  };

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

  const submitUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", dID);
    formData.append("updatedMessage", updatedMessage);
    formData.append("updatedStatus", updatedStatus);
    formData.append(
      "updatedDateTime",
      moment(updatedDateTime).format("YYYY-MM-DD hh:mm:ss")
    );
    if (isGuidance) formData.append("guidance", true);

    axios
      .post(` https://tss.miracodes.com/api/updateRequest.php`, formData)
      .then(async ({ data }) => {
        if (data) {
          closeDialog();
          const formData = new FormData();
          formData.append("number", dContact);
          formData.append(
            "message",
            `Request Subject: ${dSubject}\nRequest Status: ${updatedStatus}\n${
              updatedStatus === "approved"
                ? `Schedule Date: ${updatedDateTime.toString().toUpperCase()}`
                : ""
            }\nAdditional Message: ${updatedMessage}
              `
          );

          try {
            const { data } = await axios.post(
              " https://tss.miracodes.com/api/sms.php",
              formData
            );
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const closeDialog = () => {
    getRequests();
    setButtonClicked(false);
    setUpdatedStatus("");
    setUpdatedMessage("");
    setRequestOpen(false);
  };

  const ListItem = ({ r }) => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
      if (!isGuidance) getUserInfo(r.userId).then((d) => setUserInfo(d.data));
    }, []);

    return (
      <Box>
        <ListItemButton
          onClick={() => {
            if (isGuidance) {
              setCurrentGuidanceObj(r);
            } else {
              getRequestBody(r.id, r.office);
              setDContact(r.contact);
              setDOffice(r.office);
              // @ts-ignore
              setDSubject(r.subject);
              // @ts-ignore
              setdSenderPicture(userInfo.picture); //picture key is still blank after render
              // @ts-ignore
              setDSenderName(userInfo.name); //name key is still blank after render
              setDDate(
                // @ts-ignore
                moment(new Date(r.requestDate)).format("MMM D, YYYY")
              );
              // @ts-ignore
              setdSenderEmail(userInfo.email);
              setDStatus(r.status);
            }
            setDID(r.id);
            setRequestOpen(true);
          }}
        >
          <ListItemAvatar>
            <Avatar sx={styles.avatar}>
              {isGuidance ? (
                r.office.toUpperCase()
              ) : (
                <img src={userInfo.picture} />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight={500}
                sx={{ textTransform: "capitalize" }}
              >
                {isGuidance ? r.studentName : userInfo.name}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2" component="span">
                  {isGuidance ? r.section : r.subject}
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
    );
  };

  return (
    <>
      <Paper sx={styles.paper} elevation={10}>
        <Box sx={styles.title}>
          <Typography variant="h5">Pending Requests</Typography>
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
                    ? thisMonth.map((r, i) => <ListItem key={i} r={r} />)
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
                    ? lastMonth.map((r, i) => <ListItem key={i} r={r} />)
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
                    ? thisYear.map((r, i) => <ListItem key={i} r={r} />)
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
                    ? older.map((r, i) => <ListItem key={i} r={r} />)
                    : null}
                </List>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Dialog
          open={isRequestOpen}
          onClose={() => {
            closeDialog();
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
                      {isGuidance && currentGuidanceObj ? (
                        currentGuidanceObj.office.toUpperCase()
                      ) : (
                        <img src={dSenderPicture} alt={dSenderName} />
                      )}
                    </Avatar>
                  }
                  action={
                    <IconButton onClick={closeDialog}>
                      <Close />
                    </IconButton>
                  }
                  title={`From: ${
                    isGuidance && currentGuidanceObj
                      ? emails[currentGuidanceObj.office]["name"]
                      : dSenderName
                  }`}
                  subheader={
                    isGuidance && currentGuidanceObj
                      ? moment(currentGuidanceObj.requestDate).fromNow()
                      : dDate
                  }
                />
                <CardContent>
                  <Box sx={styles.requestBody}>
                    <Typography mb={1} sx={{ textTransform: "capitalize" }}>
                      {isGuidance && currentGuidanceObj ? (
                        <>
                          Student Name:{" "}
                          <strong>{currentGuidanceObj.studentName}</strong>
                        </>
                      ) : (
                        <>
                          {" "}
                          Subject: <strong>{dSubject}</strong>
                        </>
                      )}
                    </Typography>
                    {isGuidance && currentGuidanceObj ? (
                      <Typography mb={1} sx={{ textTransform: "capitalize" }}>
                        Section: <strong>{currentGuidanceObj.section}</strong>
                      </Typography>
                    ) : null}
                    <Typography mb={1}>
                      {isGuidance && currentGuidanceObj ? (
                        <>
                          {" "}
                          Office Email:{" "}
                          <strong>
                            {emails[currentGuidanceObj.office]["email"]}
                          </strong>
                        </>
                      ) : (
                        <>
                          {" "}
                          Sender Email: <strong>{dSenderEmail}</strong>
                        </>
                      )}
                    </Typography>
                    <Typography mb={1}>
                      {" "}
                      Date of Transaction:{" "}
                      <strong>
                        {isGuidance && currentGuidanceObj
                          ? moment(currentGuidanceObj.requestDate).format(
                              "MMM DD, YYYY hh:MM A"
                            )
                          : dDate}
                      </strong>
                    </Typography>
                    <Typography mb={1}>
                      Status:
                      {isGuidance ? (
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{
                            bgcolor: updatedStatus
                              ? "success.main"
                              : "secondary.main",
                            px: 1,
                            ml: 1,
                            textTransform: "capitalize",
                          }}
                        >
                          {updatedStatus !== "" ? "Approved" : "Pending"}
                        </Typography>
                      ) : (
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{
                            bgcolor: updatedStatus
                              ? updatedStatus === "approved"
                                ? "success.main"
                                : "error.main"
                              : "secondary.main",
                            px: 1,
                            ml: 1,
                            textTransform: "capitalize",
                            color:
                              updatedStatus === "rejected" ? "white" : "black ",
                          }}
                        >
                          {updatedStatus !== "" ? updatedStatus : dStatus}
                        </Typography>
                      )}
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
                    <Box
                      sx={{
                        display: buttonClicked ? "none" : "flex",
                        justifyContent: "space-around",
                        mt: 2,
                      }}
                    >
                      <Button
                        startIcon={<Check />}
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setUpdatedStatus("approved");
                          setButtonClicked(true);
                        }}
                      >
                        {isGuidance ? "Set Schedule" : "Approve"}
                      </Button>
                      {isGuidance ? null : (
                        <Button
                          startIcon={<Dangerous />}
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setUpdatedStatus("rejected");
                            setButtonClicked(true);
                          }}
                        >
                          Decline
                        </Button>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {updatedStatus ? (
                      <Box
                        component="form"
                        onSubmit={submitUpdate}
                        sx={{ mt: 3 }}
                      >
                        <Divider />
                        {updatedStatus === "approved" ? (
                          <Box>
                            {" "}
                            <strong>Schedule Date:</strong>
                            <DateTimePicker
                              renderInput={(props) => (
                                <TextField {...props} fullWidth />
                              )}
                              value={updatedDateTime}
                              onChange={(val) => setUpdatedDateTime(val)}
                            />
                          </Box>
                        ) : null}

                        <strong>Additional Message:</strong>
                        <TextField
                          fullWidth
                          value={updatedMessage}
                          multiline
                          rows={4}
                          onChange={(e) => setUpdatedMessage(e.target.value)}
                          required
                        />
                        <Button
                          variant="contained"
                          size="small"
                          type="submit"
                          sx={{ mt: 1, display: "block", ml: "auto" }}
                        >
                          Submit
                        </Button>
                      </Box>
                    ) : null}
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
export default OfficePending;
