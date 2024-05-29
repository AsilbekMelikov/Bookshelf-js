import React, { useState } from "react";
import { Box, Grid, LinearProgress, Pagination } from "@mui/material";
import BookCard from "../components/BookCard";
import { useSelector } from "react-redux";

const HomePage = () => {
  const searchBooks = useSelector((state) => state.auth.searchBooks);
  const searchLoading = useSelector((state) => state.auth.searchLoading);
  const [currentPage, setCurretPage] = useState(1);
  const [recordsPerPage] = useState(9);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPagesOfAllRecords = Math.ceil(searchBooks?.length / recordsPerPage);

  const filteredSearchBooks = searchBooks?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return searchLoading ? (
    <LinearProgress
      variant="indeterminate"
      sx={{
        backgroundColor: "rgb(250, 124, 84, 0.3)",
        "& .MuiLinearProgress-bar": { backgroundColor: "primary.main" },
      }}
    />
  ) : (
    <>
      <Box sx={{ marginBottom: "20px" }}>
        <Pagination
          count={nPagesOfAllRecords}
          page={currentPage}
          onChange={(event, value) => setCurretPage(value)}
          size="large"
          sx={{
            "& .MuiPagination-ul": {
              justifyContent: { xs: "space-between", sm: "flex-end" },
            },
          }}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredSearchBooks?.map((book) => {
          return <BookCard key={book?.isbn} bookInfo={book} />;
        })}
      </Grid>
    </>
  );
};

export default HomePage;
