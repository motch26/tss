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
function App() {
  return (
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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
