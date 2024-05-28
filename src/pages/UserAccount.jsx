import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetLoginDataQuery } from "../features/authApiSlice";

const UserAccount = () => {
  const { data: loginData } = useGetLoginDataQuery();

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "80px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Avatar
          sx={{
            bgcolor: "#fa7c54",
            width: "60px",
            height: "60px",
            marginRight: "18px",
          }}
        >
          {loginData?.data?.name.slice(0, 2).toUpperCase()}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{loginData?.data?.name}</Typography>
          <Typography>{loginData?.data?.email}</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginBottom: "25px" }} />
      <Grid container spacing={3}>
        <Grid item xs={6} sx={{ paddingY: "25px" }}>
          Name:
        </Grid>
        <Grid item xs={6}>
          {loginData?.data?.name}
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: "25px" }} />
      <Grid container spacing={3}>
        <Grid item xs={6} sx={{ paddingY: "25px" }}>
          Email:
        </Grid>
        <Grid item xs={6}>
          {loginData?.data?.email}
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: "25px" }} />
      <Grid container spacing={3}>
        <Grid item xs={6} sx={{ paddingY: "25px" }}>
          Key:
        </Grid>
        <Grid item xs={6}>
          {loginData?.data?.key}
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: "25px" }} />
      <Grid container spacing={3}>
        <Grid item xs={6} sx={{ paddingY: "25px" }}>
          Secret:
        </Grid>
        <Grid item xs={6}>
          {loginData?.data?.secret}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserAccount;
