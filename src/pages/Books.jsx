import React from "react";

import Box from "@mui/material/Box";

import BookCards from "../components/BookCards";
import AddingBooksInput from "../components/AddingBooksInput";

const Books = () => {
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <AddingBooksInput />
      <BookCards />
    </Box>
  );
};
export default Books;
