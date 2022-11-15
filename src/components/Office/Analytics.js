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
import { useCookies } from "react-cookie";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Analytics = () => {
  const [cookies] = useCookies(["office"]);
  const [_data, setData] = useState({
    labels: [],
    datasets: [],
  });
  const monthNumbers = Array.from(Array(12).keys());
  const getRecordsByType = async () => {
    try {
      const { data } = await axios.get(
        `https://tss.miracodes.com/api/getRecordsByType.php?office=${cookies.office}`
      );
      // console.log(data[0]);
      setData({
        labels: monthNumbers.map((m) => moment().month(m).format("MMMM")),
        datasets: [
          // @ts-ignore
          {
            label: "Students",
            data: monthNumbers.map((m) => {
              const obj = data[0].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          // @ts-ignore
          {
            label: "Alumni",
            data: monthNumbers.map((m) => {
              const obj = data[1].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          // @ts-ignore
          {
            label: "Visitors",
            data: monthNumbers.map((m) => {
              const obj = data[2].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(160, 180, 235, 0.5)",
          },
        ],
      });

      // setStudentCounts(data[0]);
      // setAlumniCounts(data[1]);
      // setVisitorsCounts(data[2]);
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

  return (
    <Paper sx={styles.paper} elevation={10}>
      <Box sx={styles.title}>
        <Typography variant="h5">Analytics</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Bar options={options} data={_data} />
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
