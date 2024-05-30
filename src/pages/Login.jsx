import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import logo from "../assets/icons/Logo 1.svg";
import whiteLogo from "../assets/icons/white-logo.png";
import DarkMode from "../components/DarkMode";
import { useTheme } from "@emotion/react";

const Login = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,20}$/;

  // LOGIN INITIAL VALUES
  const initialLoginValues = {
    email: "",
    name: "",
    key: "",
    secret: "",
  };

  // INPUT VALUES VALIDATION INITIAL VALUES
  const validationBooleans = {
    validName: false,
    validEmail: false,
    validKey: false,
    validSecret: false,
  };

  const [inputValues, setInputValues] = useState(initialLoginValues);
  const [validInputs, setValidInputs] = useState(validationBooleans);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const theme = useTheme();

  // EMAIL VALIDATION
  useEffect(() => {
    const result = EMAIL_REGEX.test(inputValues.email);
    setValidInputs((prevState) => ({ ...prevState, validEmail: result }));

    // eslint-disable-next-line
  }, [inputValues.email]);

  // NAME VALIDATION
  useEffect(() => {
    const result = NAME_REGEX.test(inputValues.name);
    setValidInputs((prevState) => ({ ...prevState, validName: result }));

    // eslint-disable-next-line
  }, [inputValues.name]);

  // KEY VALIDATION
  useEffect(() => {
    if (inputValues.key.length > 2) {
      setValidInputs((prevState) => ({ ...prevState, validKey: true }));
    } else {
      setValidInputs((prevState) => ({ ...prevState, validKey: false }));
    }

    // eslint-disable-next-line
  }, [inputValues.key]);

  // SECRET VALIDATION
  useEffect(() => {
    if (inputValues.secret.length > 2) {
      setValidInputs((prevState) => ({ ...prevState, validSecret: true }));
    } else {
      setValidInputs((prevState) => ({ ...prevState, validSecret: false }));
    }

    // eslint-disable-next-line
  }, [inputValues.secret]);

  useEffect(() => {
    setErrMessage("");
  }, [inputValues.name, inputValues.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("Key", inputValues.key);
    localStorage.setItem("Secret", inputValues.secret);
    try {
      const userData = await login(inputValues).unwrap();
      dispatch(setCredentials(userData?.data));

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

  return (
    <Box>
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
            bgcolor: theme.palette.mode === "dark" ? "#262626" : "#fff",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            maxWidth: "500px",
            height: "600px",
            padding: "30px",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
          }}
        >
          <DarkMode alignSelfRight={"flex-end"} />
          <ImageListItem>
            <img
              src={theme.palette.mode === "dark" ? whiteLogo : logo}
              alt={"Book shelf logo"}
              width={140}
              height={80}
              loading="lazy"
              style={{ width: "140px", height: "90px" }}
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
            <Typography
              id="emailError"
              variant="span"
              component={"span"}
              mb={"20px"}
              sx={
                errMessage
                  ? { display: "inline", color: "red" }
                  : { display: "none" }
              }
            >
              {errMessage}
            </Typography>
            <TextField
              size="small"
              label="Enter your email address"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={inputValues.email}
              onChange={handleChange}
              aria-invalid={validInputs.validEmail}
              aria-describedby="emailError"
              fullWidth
              autoFocus
              sx={
                inputValues.email
                  ? {
                      marginTop: "20px",
                      marginBottom: 0,
                    }
                  : {
                      marginTop: "20px",
                      marginBottom: "20px",
                    }
              }
            />
            <Typography
              id="emailError"
              variant="span"
              component={"span"}
              sx={
                inputValues.email && !validInputs.validEmail
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
              value={inputValues.name}
              onChange={handleChange}
              aria-invalid={validInputs.validName}
              aria-describedby="nameError"
              fullWidth
              sx={
                inputValues.name
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
                inputValues.name && !validInputs.validName
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
              value={inputValues.key}
              onChange={handleChange}
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
              value={inputValues.secret}
              onChange={handleChange}
              required
              fullWidth
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={Object.values(validInputs).includes(false) || isLoading}
              sx={{ mt: 3, mb: 2, color: "white" }}
              size="small"
            >
              {isLoading ? (
                <>
                  <CircularProgress
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "10px",
                      color: "primary.main",
                    }}
                  />
                  Processing
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
