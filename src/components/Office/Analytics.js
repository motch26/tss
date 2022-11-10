import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Analytics = () => {
  const [studentsCount, setStudentCounts] = useState([]);
  const [alumniCount, setAlumniCounts] = useState([]);
  const [visitorsCount, setVisitorsCounts] = useState([]);

  const getRecordsByType = async () => {
    try {
      const data = await axios.get(
        "http://localhost/tss/api/getRecordsByType.php"
      );
      setStudentCounts(data[0]);
      setAlumniCounts(data[1]);
      setVisitorsCounts(data[2]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => await getRecordsByType();
    fetchData();
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Requests",
      },
    },
  };
  const monthNumbers = Array.from(Array(12).keys());
  const data = {
    labels: monthNumbers.map((m) => moment().month(m).format("MMMM")),
    datasets: [
      {
        label: "Students",
        data: monthNumbers.map((m) => {
          return studentsCount ? studentsCount.find((c) => c.month === m) : 0;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Alumni",
        data: [765, 651, 756],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Visitors",
        data: [765, 423, 756],
        backgroundColor: "rgba(160, 180, 235, 0.5)",
      },
    ],
  };
  return (
    <Paper sx={styles.paper} elevation={10}>
      <Box sx={styles.title}>
        <Typography variant="h5">Analytics</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Bar options={options} data={data} />
        </Grid>
      </Grid>
    </Paper>
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
export default Analytics;
