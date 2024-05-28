import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import EditModal from "./EditModal";
import StatusRadioButtons from "./StatusRadioButtons";

const BookCard = ({ bookInfo, book }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusRadioModal, setShowStatusRadioModal] = useState(false);

  const changeStatusIntoString = (status) => {
    switch (status) {
      case 0:
        return "New";
      case 1:
        return "Reading";
      case 2:
        return "Finished";
      default:
        return status;
    }
  };

  return (
    <Grid item xs={4}>
      <Card
        sx={{
          width: 345,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "510px",
        }}
      >
        <Box sx={{ position: "relative", alignSelf: "end" }}>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
            sx={{ marginRight: "0px" }}
            onClick={() => {
              setShowStatusRadioModal(false);
              setShowEditModal(!showEditModal);
            }}
          >
            <MoreIcon />
          </IconButton>
          <EditModal
            bookId={bookInfo?.id}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            setShowStatusRadioModal={setShowStatusRadioModal}
          />
          {showStatusRadioModal && (
            <StatusRadioButtons
              setShowEditModal={setShowEditModal}
              setShowStatusRadioModal={setShowStatusRadioModal}
              bookId={bookInfo?.id}
            />
          )}
        </Box>
        <CardMedia
          component="img"
          alt={`The picture of ${bookInfo?.title} book`}
          width="200"
          image={bookInfo?.cover}
          style={{
            alignSelf: "center",
            width: "200px",
            height: "250px",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            flexGrow: 1,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {bookInfo?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {bookInfo?.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ISBN: {bookInfo?.isbn}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {changeStatusIntoString(book?.status)}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "8px 16px 16px" }}>
          <Button
            size="small"
            sx={{
              backgroundColor: "#fa7c54",
              color: "#fff",
              paddingX: "10px",
              "&:hover": {
                backgroundColor: "#fa7c54",
                opacity: 0.8,
              },
            }}
          >
            See More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default BookCard;
