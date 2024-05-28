import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  ImageListItem,
  Link,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/authSlice";
import logo from "../assets/icons/Logo 1.svg";

const Login = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,20}$/;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);

    // eslint-disable-next-line
  }, [email]);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);

    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    setErrMessage("");
  }, [name, email]);

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ name, email, key, secret }).unwrap();
      dispatch(setCredentials(userData?.data));
      localStorage.setItem("Key", userData?.data.key);
      localStorage.setItem("Secret", userData?.data.secret);
      navigate("/home");
    } catch (error) {
      console.log(error);
      if (!error) {
        setErrMessage("No server response");
      } else if (error?.status === 400) {
        setErrMessage("Fill out all the field");
      } else if (error?.status === 500) {
        setErrMessage(error?.data?.message);
      } else {
        setErrMessage("Login failed");
      }
    }
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#fa7c54",
      },
    },
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            maxWidth: "400px",
            height: "600px",
            padding: "30px",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
          }}
        >
          <ImageListItem>
            <img
              src={logo}
              alt={"Book shelf logo"}
              width={150}
              height={93}
              loading="lazy"
              style={{ width: "120px", height: "80px" }}
            />
          </ImageListItem>
          <Typography
            variant={"h5"}
            component={"h1"}
            sx={{ mb: 2, mt: "10px" }}
          >
            Sign up
          </Typography>

          <Box component={"form"} onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Enter your email address"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={validEmail}
              aria-describedby="emailError"
              fullWidth
              autoFocus
              sx={
                email
                  ? {
                      marginBottom: 0,
                    }
                  : {
                      marginBottom: "20px",
                    }
              }
            />
            <Typography
              id="emailError"
              variant="span"
              component={"span"}
              sx={
                email && !validEmail
                  ? { display: "inline", color: "red" }
                  : { display: "none" }
              }
            >
              Please, fill email field correctly
            </Typography>
            <TextField
              size="small"
              label="Enter your name"
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={validName}
              aria-describedby="nameError"
              fullWidth
              sx={
                name
                  ? {
                      marginTop: "20px",
                      marginBottom: 0,
                    }
                  : {
                      marginTop: "10px",
                      marginBottom: "10px",
                    }
              }
            />
            <Typography
              id="nameError"
              variant="span"
              component={"span"}
              sx={
                name && !validName
                  ? { display: "inline", color: "red" }
                  : { display: "none" }
              }
            >
              Please, fill name field correctly
            </Typography>
            <TextField
              size="small"
              label="Enter your key"
              type="text"
              name="key"
              id="key"
              autoComplete="off"
              margin="normal"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
              fullWidth
            />
            <TextField
              size="small"
              label="Enter your secret"
              type="text"
              name="secret"
              id="secret"
              autoComplete="off"
              margin="normal"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              fullWidth
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!validEmail || !validName || isLoading}
              sx={{ mt: 3, mb: 2, color: "white" }}
              size="small"
            >
              {isLoading ? (
                <>
                  <CircularProgress />
                  Processing
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
