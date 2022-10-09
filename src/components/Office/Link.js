import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Check, Dangerous, EventNote, Info } from "@mui/icons-material";
const Link = () => {
  const [reqResponse, setReqResponse] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <EventNote
              sx={{
                display: "flex",
                mr: 1,
              }}
            />
            <Typography variant="h6">Transaction Scheduler</Typography>

            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Guidance Office</Typography>
              <Tooltip title="Guidance Office">
                <Avatar
                  sx={{
                    ml: 2,
                    bgcolor: "secondary.main",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  GO
                </Avatar>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 5, pt: 5 }}>
        {submitted ? (
          <Paper
            elevation={24}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "primary.main",
              p: 2,
            }}
          >
            <Avatar sx={{ bgcolor: "success.main", width: 50, height: 50 }}>
              <Info sx={{ bgcolor: "success.main" }} fontSize="large" />
            </Avatar>
            <Typography
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "white",
                p: 2,
                lineHeight: 1,
              }}
              variant="h2"
            >
              Response Submitted
            </Typography>
            <Typography sx={{ color: "white" }} variant="caption">
              Taking you to login page...
            </Typography>
          </Paper>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography mb={1}>
                Subject: <strong>Seek Guidance Help</strong>
              </Typography>
              <Typography mb={1}>
                {" "}
                Sender Email: <strong>officeemail@chmsc.edu.ph</strong>
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
                  sx={{
                    bgcolor: "secondary.main",
                    px: 1,
                    ml: 1,
                  }}
                >
                  Pending
                </Typography>
              </Typography>
              <Divider />
              <Box
                sx={{
                  border: "1px solid",
                  mt: 2,
                  borderColor: "primary.main",
                }}
              >
                <Typography
                  fontWeight={600}
                  sx={{
                    textAlign: "center",
                    bgcolor: "secondary.main",

                    p: 1,
                  }}
                >
                  REQUEST BODY
                </Typography>
                <Typography p={2}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Molestiae similique voluptatum quisquam reprehenderit
                  obcaecati pariatur animi quis! Cum eveniet sapiente vel quia
                  debitis unde provident sequi! Asperiores velit, cum
                  dignissimos voluptatem fugit necessitatibus inventore.
                  Obcaecati asperiores hic porro numquam dolor!
                </Typography>
              </Box>
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
                    setReqResponse("approve");
                    setButtonClicked(true);
                  }}
                >
                  Approve
                </Button>
                <Button
                  startIcon={<Dangerous />}
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setReqResponse("decline");
                    setButtonClicked(true);
                  }}
                >
                  Decline
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              {reqResponse === "approve" || reqResponse === "decline" ? (
                <Box>
                  <strong>Additional Message:</strong>
                  <TextField
                    fullWidth
                    value={resMessage}
                    multiline
                    rows={4}
                    onChange={(e) => setResMessage(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, display: "block", ml: "auto" }}
                    onClick={() => setSubmitted(true)}
                  >
                    Submit
                  </Button>
                </Box>
              ) : null}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Link;
