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

const Pending = () => {
  const [isRequestOpen, setRequestOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  const getRequests = () => {};
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
                  2 requests
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItemButton onClick={() => setRequestOpen(true)}>
                    <ListItemAvatar>
                      <Avatar sx={styles.avatar}>GO</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight={500}>
                          Seek Guidance Help
                        </Typography>
                      }
                      secondary={
                        <>
                          {"To: "}
                          <Typography variant="body2" component="span">
                            Guidance Office
                          </Typography>
                        </>
                      }
                    />
                    <Typography>Jun 3</Typography>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => setRequestOpen(true)}>
                    <ListItemAvatar>
                      <Avatar sx={styles.avatar}>PC</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight={500}>
                          Settle INC Grades
                        </Typography>
                      }
                      secondary={
                        <>
                          {"To: "}
                          <Typography variant="body2" component="span">
                            Program Chair
                          </Typography>
                        </>
                      }
                    />
                    <Typography>Jun 1</Typography>
                  </ListItemButton>
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
                  0 requests
                </Typography>
              </AccordionSummary>
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
                  0 requests
                </Typography>
              </AccordionSummary>
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
