import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from "./components/Student/inbox/StudentHome";
import StudentStart from "./components/Student/Start";
import Pending from "./components/Student/inbox/Pending";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import OfficeStart from "./components/Office/Start";
import OfficeHome from "./components/Office/OfficeHome";
import OfficePending from "./components/Office/OfficePending";
import Notification from "./components/Student/inbox/Notification";
import Schedule from "./components/Office/Calendar";
import Link from "./components/Office/Link";
import { GoogleOAuthProvider } from "@react-oauth/google";
import googleCreds from "./google.json";

function App() {
  const { client_id } = googleCreds.web;

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StudentStart />} />
            <Route path="home" element={<StudentHome />}>
              <Route index element={<Pending />} />
              <Route path="notification" element={<Notification />} />
            </Route>

            <Route path="/office">
              <Route index element={<OfficeStart />} />
              <Route path="home" element={<OfficeHome />}>
                <Route index element={<OfficePending />} />
                <Route path="calendar" element={<Schedule />} />
              </Route>
              <Route path="q" element={<Link />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
