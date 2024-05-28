import React from "react";
import { Grid, LinearProgress } from "@mui/material";
import BookCard from "../components/BookCard";
import { useSelector } from "react-redux";

const HomePage = () => {
  const searchBooks = useSelector((state) => state.auth.searchBooks);
  const searchLoading = useSelector((state) => state.auth.searchLoading);

  return searchLoading ? (
    <LinearProgress
      variant="indeterminate"
      sx={{
        backgroundColor: "rgb(250, 124, 84, 0.3)",
        "& .MuiLinearProgress-bar": { backgroundColor: "#fa7c54" },
      }}
    />
  ) : (
    <Grid container spacing={3}>
      {searchBooks?.map((book) => {
        return <BookCard key={book?.isbn} bookInfo={book} />;
      })}
    </Grid>
  );
};

export default HomePage;
