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
import { useLocation } from "react-router-dom";

const BookCard = ({ bookInfo, book }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusRadioModal, setShowStatusRadioModal] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const pathname = useLocation().pathname;

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
    <Grid item xs={12} sm={6} lg={4}>
      <Card
        sx={{
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: { xs: 450, sm: 520 },
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 10px 0px",
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
              if (pathname === "/bookshelf") {
                setShowStatusRadioModal(false);
                setShowEditModal(!showEditModal);
              }
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
          {showMoreInfo ? (
            <>
              <Typography variant="body2" color="text.secondary">
                Published: {bookInfo?.published}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pages: {bookInfo?.pages}
              </Typography>
            </>
          ) : (
            ""
          )}
        </CardContent>
        <CardActions sx={{ padding: "8px 16px 16px" }}>
          <Button
            size="small"
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
              paddingX: "10px",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: 0.8,
              },
            }}
            onClick={() => setShowMoreInfo(!showMoreInfo)}
          >
            {showMoreInfo ? "See less" : "See More"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default BookCard;
