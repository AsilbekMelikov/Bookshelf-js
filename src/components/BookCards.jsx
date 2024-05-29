import React from "react";
import { Grid, LinearProgress } from "@mui/material";

import BookCard from "./BookCard";

const BookCards = ({ books, isLoading }) => {
  return isLoading ? (
    <LinearProgress
      variant="indeterminate"
      sx={{
        backgroundColor: "rgb(250, 124, 84, 0.3)",
        "& .MuiLinearProgress-bar": { backgroundColor: "primary.main" },
      }}
    />
  ) : (
    <Grid container spacing={1}>
      {books?.data?.map((book) => {
        const bookInfo = book?.book ?? book?.data;
        return <BookCard key={bookInfo?.id} bookInfo={bookInfo} book={book} />;
      })}
    </Grid>
  );
};

export default BookCards;
