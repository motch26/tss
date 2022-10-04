import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { ArrowLeft, ArrowRight, Close } from "@mui/icons-material";
const Notification = () => {
  const [isNotifOpen, setNotifOpen] = useState(false);
  return (
    <>
      <Paper sx={{ m: 3, p: 2 }} elevation={10}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 1,
          }}
        >
          <Typography variant="h5">Updates</Typography>
        </Box>
        <List dense>
          <ListItemButton onClick={() => setNotifOpen(true)}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "secondary.main" }}>GO</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Request Subject"
              secondary="Guidance Office"
            />
            <Badge badgeContent="Declined" color="error" sx={{ mr: 5 }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "secondary.main" }}>BO</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Request Subject"
              secondary="BSIS Program Chair"
            />
            <Badge badgeContent="Approved" color="success" sx={{ mr: 5 }} />
          </ListItemButton>
        </List>
        <Box sx={{ display: "flex" }}>
          <ButtonGroup sx={{ ml: "auto" }}>
            <Button size="small" variant="contained" startIcon={<ArrowLeft />}>
              Prev
            </Button>
            <Button size="small" variant="contained" endIcon={<ArrowRight />}>
              Next
            </Button>
          </ButtonGroup>
        </Box>
      </Paper>
      <Dialog
        open={isNotifOpen}
        onClose={() => setNotifOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Request Subject</DialogTitle>
        <DialogContent>
          {" "}
          <Box
            sx={{
              p: 2,
              width: "100%",
              height: "70vh",
              alignSelf: "flex-start",
              border: "5px dashed",
              borderColor: "primary.main",
              overflowY: "auto",
            }}
          >
            <Card sx={{ width: "100%" }}>
              <CardHeader
                sx={{
                  bgcolor: "primary.light",
                }}
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: "secondary.main",
                    }}
                  >
                    GO
                  </Avatar>
                }
                action={
                  <IconButton onClick={() => setNotifOpen(false)}>
                    <Close />
                  </IconButton>
                }
                title="From: Guidance Office"
                subheader="Jun 3, 2022"
              />
              <CardContent>
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
                    Office Email: <strong>officeemail@chmsc.edu.ph</strong>
                  </Typography>
                  <Typography mb={1}>
                    {" "}
                    Date: <strong>June 10, 2022</strong>
                  </Typography>
                  <Typography mb={1}>
                    Status:
                    <Typography
                      component="span"
                      variant="subtitle2"
                      sx={{
                        bgcolor: "error.main",
                        px: 1,
                        ml: 1,
                        color: "white",
                      }}
                    >
                      Declined
                    </Typography>
                  </Typography>
                  <Divider />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Your request is declined for the following reason:{" "}
                  </Typography>
                  <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus maiores omnis pariatur dolorum nulla quis
                    eaque quaerat odit soluta culpa!
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Notification;
