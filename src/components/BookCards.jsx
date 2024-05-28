import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useGetBooksQuery } from "../features/authApiSlice";
import { useDispatch } from "react-redux";
import { setBooks } from "../features/authSlice";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";

const BookCards = () => {
  const { data: books, isLoading } = useGetBooksQuery();

  return (
    <Grid container spacing={1}>
      {books?.data?.map((book) => {
        const bookInfo = book?.book ?? book?.data;
        return <BookCard key={bookInfo?.id} bookInfo={bookInfo} book={book} />;
      })}
    </Grid>
  );
};

export default BookCards;
