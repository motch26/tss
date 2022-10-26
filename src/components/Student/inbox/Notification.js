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
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect } from "react";
import emails from "./../../../email.json";
import moment from "moment";
const Notification = () => {
  const [cookies] = useCookies(["currentId"]);
  const [updates, setUpdates] = useState([]);

  const getUpdates = () => {
    axios
      .get(`http://localhost/tss/api/getUpdates.php?id=${cookies.currentId}`)
      .then(({ data }) => setUpdates(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => getUpdates(), []);

  const colorStatus = {
    new: "secondary",
    approved: "success",
    rejected: "error",
  };

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
          {updates.map((u, i) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  {u.office.toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={u.subject}
                secondary={emails[u.office]["name"]}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Badge
                  badgeContent={
                    u.action.charAt(0).toUpperCase() + u.action.slice(1)
                  }
                  color={colorStatus[u.action]}
                  sx={{ mr: 5 }}
                />
                <Typography variant="caption">
                  {moment(u.timestamp, "YYYY-MM-DD hh:mm:ss").fromNow()}
                </Typography>
              </Box>
            </ListItem>
          ))}

          <Divider />
        </List>
        {/* <Box sx={{ display: "flex" }}>
          <ButtonGroup sx={{ ml: "auto" }}>
            <Button size="small" variant="contained" startIcon={<ArrowLeft />}>
              Prev
            </Button>
            <Button size="small" variant="contained" endIcon={<ArrowRight />}>
              Next
            </Button>
          </ButtonGroup>
        </Box> */}
      </Paper>
    </>
  );
};

export default Notification;
