import React from "react";
import Login from "./pages/Login";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Books from "./pages/Books";
import HomePage from "./pages/HomePage";
import Sidebar from "./pages/Sidebar";
import { Container } from "@mui/material";
import UserAccount from "./pages/UserAccount";
import Footer from "./components/Footer";

const App = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      {pathname === "/signup" ? "" : <Sidebar />}
      <main className={`${pathname === "/signup" ? "" : "main-body"}`}>
        <Container>
          <Routes>
            <Route element={<Navigate to={"/signup"} replace />} />
            <Route index path="/signup" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/bookshelf" element={<Books />} />
            <Route path="/account" element={<UserAccount />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
