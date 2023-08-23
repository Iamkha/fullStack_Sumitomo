"use client";
import * as React from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// Redux defination
import { useSelector, useDispatch } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RootState } from "../store";
import { getRequest } from "@/components/utils/axios";
import { setToken } from "@/components/features/user/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../assets/images/logo.png";

// Request defination

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const request = getRequest();

  const [errorMessage, setErrorMessage] = React.useState("");

  const token = useSelector((state: RootState) => state.user.token);
  React.useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        className={"relative h-[calc(100vh-64px)]"}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            alt="logo"
            src={logo}
            width={400}
            height={208}
            className="object-fit: cover"
          />
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                const data: any = await axios("/api/login", {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  data: JSON.stringify(values),
                });
                if (data.data.token) {
                  dispatch(setToken(data.data.token));
                  router.push("/");
                }
                setSubmitting(false);
                // dispatch(setToken(res.token));
              } catch (e: any) {
                setErrorMessage(e?.response?.data.message);
                setSubmitting(false);
              }
              // .then((res: any) => {
              //   console.log(res);
              //   if (!res?.error) {
              //     dispatch(setToken(res.token));
              //   } else {
              //     setErrorMessage(res.message);
              //   }
              //   setErrorMessage("");
              // })
              // .catch((e) => {
              //   setErrorMessage(e.massege);
              //   console.log(e, "e");
              // });
              // const data = await ress.json();
              // console.log(data);
              // const data =
              // request
              //   .post(DOCUMENT_ENDPOINT + "/summary", dataDate)
              //   .then((res: any) => setData(res.data.data))
              //   .catch((err: any) => console.log("Error Dasboard: " + err));
              // const ress = await fetch("/api/v1/user/login");
              // request.post(LOGIN_ENDPOINT, values).then((res: any) => {
              //   if (!res.data.error) {
              //     dispatch(setToken(res.data.token));
              //     router.push("/");
              //   } else {
              //     setErrorMessage(res.data.message);
              //   }
              // });
              // setSubmitting(false);
            }}
            validationSchema={SigninSchema}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              isSubmitting,
              errors,
              touched,
            }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  defaultValue={values.email}
                  onChange={handleChange}
                  error={!!errors.email && touched.email}
                  helperText={touched.email ? errors.email : undefined}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  defaultValue={values.password}
                  onChange={handleChange}
                  error={!!errors.password && touched.password}
                  helperText={touched.password ? errors.password : undefined}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {errorMessage && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errorMessage}
                  </div>
                )}
                <Button
                  type="submit"
                  fullWidth
                  className="bg-blue-500"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    isSubmitting ||
                    !!errors.email ||
                    !!errors.password ||
                    !values.email ||
                    !values.password
                  }
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright
          sx={{ mt: 8, mb: 4 }}
          className={"absolute bottom-4 left-1/2 translate-x-[-50%]"}
        />
      </Container>
    </ThemeProvider>
  );
}
