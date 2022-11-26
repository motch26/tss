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
  const [isGuidance, setIsGuidance] = useState(false);
  const [bar1Data, setBar1Data] = useState({
    labels: [],
    datasets: [],
  });
  const [bar2Data, setBar2Data] = useState({
    labels: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
    datasets: [],
  });
  const [bar3Data, setBar3Data] = useState({
    labels: ["Student", "Alumnus", "Visitor"],
    datasets: [],
  });
  const [guidanceBar1Data, setGuidanceBar1Data] = useState({
    labels: [],
    datasets: [],
  });
  const [guidanceBar2Data, setGuidanceBar2Data] = useState({
    labels: ["CIT Office", "BSIS Office", "OSA"],
    datasets: [],
  });

  const getRecordsByType = async () => {
    const monthNumbers = Array.from(Array(12).keys());
    try {
      const { data } = await axios.get(
        ` https://tss.miracodes.com/api/getRecordsByType.php?office=${cookies.office}`
      );
      // console.log(data[0]);
      setBar1Data({
        labels: monthNumbers.map((m) => moment().month(m).format("MMM")),
        datasets: [
          // @ts-ignore
          {
            label: "Students",
            data: monthNumbers.map((m) => {
              const obj = data[0].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(183, 200, 206, 1)",
          },
          // @ts-ignore
          {
            label: "Alumni",
            data: monthNumbers.map((m) => {
              const obj = data[1].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(116, 237, 100, 1)",
          },
          // @ts-ignore
          {
            label: "Visitors",
            data: monthNumbers.map((m) => {
              const obj = data[2].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(242, 173, 95, 1)",
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
  const getRecordsByLevel = async () => {
    const yearLevelArr = [...Array(5).keys()];
    try {
      const { data } = await axios.get(
        ` https://tss.miracodes.com/api/getRecordsByYearLevel.php?office=${cookies.office}`
      );

      setBar2Data({
        labels: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
        datasets: [
          // @ts-ignore
          {
            label: "Total Requests",
            data: yearLevelArr.map((y) => {
              const obj = data.find((d) => d.yearLevel == y + 1);
              if (obj !== undefined) return obj.count;
              else return 0;
            }),
            backgroundColor: "rgba(183, 200, 206, 1)",
          },
        ],
      });
    } catch (error) {}
  };
  const getRecordsByUser = async () => {
    const typeArr = ["alumnus", "student", "visitor"];
    try {
      const { data } = await axios.get(
        ` https://tss.miracodes.com/api/getRecordsByUser.php?office=${cookies.office}`
      );

      setBar3Data({
        labels: ["Alumnus", "Student", "Visitor"],
        datasets: [
          // @ts-ignore
          {
            label: "Total Requests",
            data: typeArr.map((y) => {
              const obj = data.find((d) => d.type == y);
              if (obj !== undefined) return obj.count;
              else return 0;
            }),
            backgroundColor: "rgba(183, 200, 206, 1)",
          },
        ],
      });
    } catch (error) {}
  };

  const getGuidanceRecordsByType = async () => {
    const monthNumbers = Array.from(Array(12).keys());
    try {
      const { data } = await axios.get(
        ` https://tss.miracodes.com/api/getGuidanceRecordsByType.php`
      );
      console.log(data);
      setGuidanceBar1Data({
        labels: monthNumbers.map((m) => moment().month(m).format("MMM")),
        datasets: [
          // @ts-ignore
          {
            label: "CIT Office",
            data: monthNumbers.map((m) => {
              const obj = data[0].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(183, 200, 206, 1)",
          },
          // @ts-ignore
          {
            label: "BSIS Office",
            data: monthNumbers.map((m) => {
              const obj = data[1].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(116, 237, 100, 1)",
          },
          // @ts-ignore
          {
            label: "OSA",
            data: monthNumbers.map((m) => {
              const obj = data[2].find((d) => d.MONTH == m + 1);
              if (obj !== undefined) return obj.COUNT;
              else return 0;
            }),
            backgroundColor: "rgba(242, 173, 95, 1)",
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
  const getGuidanceTotalRecords = async () => {
    const typeArr = ["cit", "bsis", "osa"];
    try {
      const { data } = await axios.get(
        ` https://tss.miracodes.com/api/getGuidanceTotalRecords.php`
      );

      setGuidanceBar2Data({
        labels: ["CIT Office", "BSIS Office", "OSA"],
        datasets: [
          // @ts-ignore
          {
            label: "Total Requests",
            data: typeArr.map((y) => {
              const obj = data.find((d) => d.office == y);
              if (obj !== undefined) return obj.count;
              else return 0;
            }),
            backgroundColor: "rgba(183, 200, 206, 1)",
          },
        ],
      });
    } catch (error) {}
  };
  useEffect(() => {
    if (cookies.office === "guidance") setIsGuidance(true);
    const fetchData = async () => {
      if (cookies.office === "guidance") {
        await getGuidanceRecordsByType();
        await getGuidanceTotalRecords();
      } else {
        await getRecordsByType();
        await getRecordsByLevel();
        await getRecordsByUser();
      }
    };
    fetchData();
  }, []);
  const bar1Options = {
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
  const bar2Options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Requests per Year Level",
      },
    },
  };
  const bar3Options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Requests per User Type",
      },
    },
  };
  const guidanceBar1Options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Requests per Office (monthly)",
      },
    },
  };
  const guidanceBar2Options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Requests per Office",
      },
    },
  };

  return (
    <Paper sx={styles.paper} elevation={10}>
      <Box sx={styles.title}>
        <Typography variant="h5">Analytics</Typography>
      </Box>
      <Grid container spacing={2}>
        {isGuidance ? (
          <>
            <Grid item xs={12}>
              <Bar options={guidanceBar1Options} data={guidanceBar1Data} />
            </Grid>
            <Grid item xs={12}>
              <Bar options={guidanceBar2Options} data={guidanceBar2Data} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Bar options={bar1Options} data={bar1Data} />
            </Grid>
            <Grid item xs={12}>
              <Bar options={bar2Options} data={bar2Data} />
            </Grid>
            <Grid item xs={12}>
              <Bar options={bar3Options} data={bar3Data} />
            </Grid>
          </>
        )}
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
