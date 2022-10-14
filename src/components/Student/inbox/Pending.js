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
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import moment from "moment";
import emails from "./../../../email.json";
const Pending = () => {
  const officeNames = {
    osa: "Office of the Student Affairs",
    cit: "CIT Dean's Office",
    bsis: "BSIS Program Chairman",
  };
  const [isRequestOpen, setRequestOpen] = useState(false);
  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);
  const [thisYear, setThisYear] = useState([]);
  const [older, setOlder] = useState([]);

  const [cookies] = useCookies(["email", "type"]);

  const [dSubject, setDSubject] = useState("");
  const [dOffice, setDOffice] = useState("");
  const [dOfficeEmail, setDOfficeEmail] = useState("");
  const [dDate, setDDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    axios
      .get(
        `http://localhost/tss/api/getRequests.php?email=${encodeURIComponent(
          cookies.email
        )}&type=${cookies.type}`
      )
      .then(({ data }) => {
        // if (data) setRequests(data);
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
        console.log(year);
      });
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
                              setDSubject(r.subject);
                              setDOffice(r.office);
                              setDDate(
                                moment(new Date(r.requestDate)).format(
                                  "MMM D, YYYY"
                                )
                              );
                              setDOfficeEmail(emails[r.office]);

                              setRequestOpen(true);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={styles.avatar}>
                                {r.office.toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {r.subject}
                                </Typography>
                              }
                              secondary={
                                <>
                                  {"To: "}
                                  <Typography variant="body2" component="span">
                                    {officeNames[r.office]}
                                  </Typography>
                                </>
                              }
                            />
                            <Typography>
                              {moment(new Date(r.requestDate)).format("MMM D")}
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
                          <ListItemButton onClick={() => setRequestOpen(true)}>
                            <ListItemAvatar>
                              <Avatar sx={styles.avatar}>
                                {r.office.toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {r.subject}
                                </Typography>
                              }
                              secondary={
                                <>
                                  {"To: "}
                                  <Typography variant="body2" component="span">
                                    {officeNames[r.office]}
                                  </Typography>
                                </>
                              }
                            />
                            <Typography>
                              {moment(new Date(r.requestDate)).format("MMM D")}
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
                          <ListItemButton onClick={() => setRequestOpen(true)}>
                            <ListItemAvatar>
                              <Avatar sx={styles.avatar}>
                                {r.office.toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {r.subject}
                                </Typography>
                              }
                              secondary={
                                <>
                                  {"To: "}
                                  <Typography variant="body2" component="span">
                                    {officeNames[r.office]}
                                  </Typography>
                                </>
                              }
                            />
                            <Typography>
                              {moment(new Date(r.requestDate)).format("MMM D")}
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
                          <ListItemButton onClick={() => setRequestOpen(true)}>
                            <ListItemAvatar>
                              <Avatar sx={styles.avatar}>
                                {r.office.toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {r.subject}
                                </Typography>
                              }
                              secondary={
                                <>
                                  {"To: "}
                                  <Typography variant="body2" component="span">
                                    {officeNames[r.office]}
                                  </Typography>
                                </>
                              }
                            />
                            <Typography>
                              {moment(new Date(r.requestDate)).format(
                                "MMM D, YYYY"
                              )}
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
          onClose={() => setRequestOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Request Subject</DialogTitle>
          <DialogContent>
            <Box sx={styles.requestContainer}>
              <Card sx={styles.card}>
                <CardHeader
                  sx={styles.cardHeader}
                  avatar={<Avatar sx={styles.avatar}>GO</Avatar>}
                  action={
                    <IconButton onClick={() => setRequestOpen(false)}>
                      <Close />
                    </IconButton>
                  }
                  title="To: Guidance Office"
                  subheader="Jun 3, 2022"
                />
                <CardContent>
                  <Box sx={styles.requestBody}>
                    <Typography mb={1}>
                      Subject: <strong>Seek Guidance Help</strong>
                    </Typography>
                    <Typography mb={1}>
                      {" "}
                      Office Email: <strong>officeemail@chmsc.edu.ph</strong>
                    </Typography>
                    <Typography mb={1}>
                      {" "}
                      Date of Transaction: <strong>June 10, 2022</strong>
                    </Typography>
                    <Typography mb={1}>
                      Status:
                      <Typography
                        component="span"
                        variant="subtitle2"
                        sx={styles.status}
                      >
                        Pending
                      </Typography>
                    </Typography>
                    <Divider />
                    <Box sx={styles.innerRequestBody}>
                      <Typography fontWeight={600} sx={styles.requestBodyTitle}>
                        REQUEST BODY
                      </Typography>
                      <Typography p={2}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Molestiae similique voluptatum quisquam
                        reprehenderit obcaecati pariatur animi quis! Cum eveniet
                        sapiente vel quia debitis unde provident sequi!
                        Asperiores velit, cum dignissimos voluptatem fugit
                        necessitatibus inventore. Obcaecati asperiores hic porro
                        numquam dolor!
                      </Typography>
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
  status: {
    bgcolor: "secondary.main",
    px: 1,
    ml: 1,
  },
};
export default Pending;
