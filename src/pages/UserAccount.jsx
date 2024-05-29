import {
  Avatar,
  Box,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetLoginDataQuery } from "../features/authApiSlice";

const UserAccount = () => {
  const { data: loginData, isLoading } = useGetLoginDataQuery();

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: { xs: "30px", sm: 80 },
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        borderRadius: "10px",
      }}
    >
      {isLoading ? (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <Skeleton
              variant="circular"
              width={60}
              height={60}
              sx={{ marginRight: "18px" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Skeleton variant="text" width={120} sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" width={120} sx={{ fontSize: "1rem" }} />
            </Box>
          </Box>
          <Divider sx={{ marginBottom: "25px" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} sx={{ paddingY: "25px" }}>
              <Skeleton
                variant="text"
                width={400}
                height={25}
                sx={{ fontSize: "1rem" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Skeleton
                variant="text"
                width={400}
                height={25}
                sx={{ fontSize: "1rem" }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "25px" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} sx={{ paddingY: "25px" }}>
              <Skeleton
                variant="text"
                width={400}
                height={25}
                sx={{ fontSize: "1rem" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Skeleton
                variant="text"
                width={400}
                height={25}
                sx={{ fontSize: "1rem" }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "25px" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} sx={{ paddingY: "25px" }}>
              <Skeleton
                variant="text"
                width={400}
                height={25}
                sx={{ fontSize: "1rem" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Skeleton
                variant="text"
                width={400}
                height={25}
                sx={{ fontSize: "1rem" }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "25px" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} sx={{ paddingY: "25px" }}>
              <Skeleton
                variant="text"
                width={400}
                height={25}
                sx={{ fontSize: "1rem" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Skeleton
                variant="text"
                width={400}
                height={25}
                sx={{ fontSize: "1rem" }}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
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
          <Divider />
        </>
      )}
    </Box>
  );
};

export default UserAccount;
