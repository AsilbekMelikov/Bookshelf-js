import React from "react";

import Box from "@mui/material/Box";

import BookCards from "../components/BookCards";
import AddingBooksInput from "../components/AddingBooksInput";
import { useGetBooksQuery } from "../features/authApiSlice";

const Books = () => {
  const { data: books, isLoading, refetch } = useGetBooksQuery();
  return (
    <Box>
      <AddingBooksInput refetch={refetch} />
      <BookCards books={books} isLoading={isLoading} />
    </Box>
  );
};
export default Books;
