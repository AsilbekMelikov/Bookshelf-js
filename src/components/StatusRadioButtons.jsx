import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { useUpdateBookMutation } from "../features/authApiSlice";

const StatusRadioButtons = ({
  bookId,
  setShowEditModal,
  setShowStatusRadioModal,
}) => {
  const [radioValue, setRadioValue] = useState("new");

  const [updateStatus, { isLoading: isUpdating }] = useUpdateBookMutation();

  const changeStatusIntoNumbers = (status) => {
    switch (status) {
      case "new":
        return 0;
      case "reading":
        return 1;
      case "finished":
        return 2;
      default:
        return status;
    }
  };
  const handleChangeStatus = async () => {
    try {
      await updateStatus({
        id: bookId,
        status: changeStatusIntoNumbers(radioValue),
      }).unwrap();
      setShowEditModal(false);
      setShowStatusRadioModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControl
      sx={{
        position: "absolute",
        top: "35px",
        left: "-110px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        padding: "10px",
      }}
    >
      <FormLabel id="status-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        aria-labelledby="status-radio-buttons-group-label"
        defaultValue="new"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="new"
          onChange={(e) => setRadioValue(e.target.value)}
          control={<Radio />}
          label="New"
        />
        <FormControlLabel
          value="reading"
          onChange={(e) => setRadioValue(e.target.value)}
          control={<Radio />}
          label="Reading"
        />
        <FormControlLabel
          value="finished"
          onChange={(e) => setRadioValue(e.target.value)}
          control={<Radio />}
          label="Finished"
        />
      </RadioGroup>
      <Button type="button" onClick={handleChangeStatus}>
        Submit
      </Button>
    </FormControl>
  );
};

export default StatusRadioButtons;
