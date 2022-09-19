import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from "./components/Student/inbox/StudentHome";
import StudentStart from "./components/Student/Start";
import Pending from "./components/Student/inbox/Pending";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <BrowserRouter>
        <Routes>
          <Route path="/student">
            <Route index element={<StudentStart />} />
            <Route path="home" element={<StudentHome />}>
              <Route index element={<Pending />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
