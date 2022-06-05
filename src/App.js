import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserHome from "./components/inbox/UserHome";
import Home from "./components/Home";
import Start from "./components/Start";
import Pending from "./components/inbox/Pending";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Start />} />
          </Route>
          <Route path="home" element={<UserHome />}>
            <Route index element={<Pending />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
