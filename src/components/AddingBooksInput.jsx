import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAddBookMutation } from "../features/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../features/authSlice";

const AddingBooksInput = () => {
  const [addingBookInput, setAddingBookInput] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const [addBook, { isLoading }] = useAddBookMutation();

  const handleAddBook = async () => {
    try {
      await addBook(addingBookInput).unwrap();
      setAddingBookInput("");
      setErrMessage("");
    } catch (error) {
      console.log(error);
      if (!error) {
        setErrMessage("No server response");
      } else if (error?.status === 500) {
        setErrMessage(error?.data?.message);
      } else if (error?.status === 401) {
        setErrMessage("Unauthorized");
      } else {
        setErrMessage("Adding book failed");
      }
    }
  };

  return (
    <Container>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          marginBottom: "30px",
          marginLeft: "auto",
          marginRight: "20px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <TextField
            type="text"
            name="bookNumber"
            id="bookNumber"
            value={addingBookInput}
            onChange={(e) =>
              setAddingBookInput(e.target.value.replace(/[^0-9-]/g, ""))
            }
            fullWidth
            size="small"
            label="Enter book ISBN"
          />

          <Button
            onClick={handleAddBook}
            sx={{
              whiteSpace: "nowrap",
              backgroundColor: "#fa7c54",
              color: "#fff",
              paddingX: "10px",
              "&:hover": {
                backgroundColor: "#fa7c54",
                opacity: 0.8,
              },
            }}
          >
            Add book
          </Button>
        </Box>
        <Typography
          id="emailError"
          variant="span"
          component={"span"}
          sx={
            errMessage
              ? { display: "inline", color: "red" }
              : { display: "none" }
          }
        >
          {errMessage}
        </Typography>
      </Box>
    </Container>
  );
};

export default AddingBooksInput;