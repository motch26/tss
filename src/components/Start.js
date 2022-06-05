import { Box, Button, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";

const Start = () => {
  const [setIsLogin] = useOutletContext();
  return (
    <Box sx={styles.mainBox}>
      <Container sx={{ height: "100%" }}>
        <Box sx={styles.centerBox}>
          <Box sx={styles.leftBox}>
            <Typography variant="h3" fontWeight={600} color="white">
              Transaction Scheduler
            </Typography>
            <Typography variant="h2" color="white">
              For CHMSU Offices
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              fontWeight={300}
              color="white"
              mt={3}
              mb={2}
            >
              CIT Dean, BSIS Program Chair, Guidance Counselor, <br /> and
              Office of the Student Affair's office.
            </Typography>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => setIsLogin(true)}
            >
              Compose a Request
            </Button>
          </Box>
          <Box sx={styles.rightBox}>
            <img src="./img/clip2.png" width="100%" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const styles = {
  mainBox: {
    bgcolor: "primary.main",
    height: "100%",
  },
  leftBox: {
    width: "500px",
    whiteSpace: "nowrap",
    zIndex: 2,
  },
  rightBox: {
    flex: 1,
    display: {
      sm: "none",
      md: "block",
    },
  },
  centerBox: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
};
export default Start;
