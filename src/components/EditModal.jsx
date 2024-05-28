import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDeleteBookMutation } from "../features/authApiSlice";

const EditModal = (props) => {
  const { bookId, showEditModal, setShowStatusRadioModal, setShowEditModal } =
    props;

  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDeleteBook = async () => {
    try {
      await deleteBook(bookId).unwrap();
      setShowStatusRadioModal(false);
      showEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={
        showEditModal
          ? {
              position: "absolute",
              zIndex: "1",
              top: "40px",
              left: "-120px",
              display: "block",
              backgroundColor: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              borderRadius: "6px",
              paddingX: "10px",
              paddingY: "5px",
            }
          : { display: "none" }
      }
    >
      <List sx={{ width: "100%", maxWidth: 200, paddingY: 0 }}>
        <ListItem
          disableGutters
          secondaryAction={
            <IconButton
              aria-label="comment"
              onClick={() => {
                setShowEditModal(false);
                setShowStatusRadioModal(true);
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`Edit status`} />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment" onClick={handleDeleteBook}>
              <DeleteOutlineOutlinedIcon color="error" />
            </IconButton>
          }
        >
          <ListItemText primary={`Delete book`} />
        </ListItem>
      </List>
    </Box>
  );
};

export default EditModal;
