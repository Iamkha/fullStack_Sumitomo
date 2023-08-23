import * as React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

// Request defination

import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

const CreateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const CreateForm = ({ handleClose }: any) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  // const request = getRequest();

  return (
    <Box className={"px-4"}>
      <Formik
        initialValues={{ name: "", address: "", phone: "", searchName: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setErrorMessage("");
          try {
            await axios("/api/v1/company", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
              method: "POST",
              data: JSON.stringify(values),
            });

            window.location.reload();
            handleClose();
          } catch (error: any) {
            console.log(error.response.data.massege);

            setErrorMessage(error?.response?.data.massege || "");
          }

          // request.post(COMPANY_ENDPOINT, values).then((res: any) => {
          //   if (!res.data.error) {
          //     window.location.reload();
          //     handleClose();
          //   } else {
          //     setErrorMessage(res.data.message);
          //   }
          // });
          // setSubmitting(false);
        }}
        validationSchema={CreateSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          isSubmitting,
          errors,
          touched,
          setFieldValue,
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              defaultValue={values.name}
              onChange={handleChange}
              error={!!errors.name && touched.name}
              helperText={touched.name ? errors.name : undefined}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="searchName"
              label="Short Name"
              name="searchName"
              autoComplete="searchName"
              defaultValue={values.searchName}
              onChange={handleChange}
              error={!!errors.searchName && touched.searchName}
              helperText={touched.searchName ? errors.searchName : undefined}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              defaultValue={values.address}
              onChange={handleChange}
              error={!!errors.address && touched.address}
              helperText={touched.address ? errors.address : undefined}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              defaultValue={values.phone}
              onChange={handleChange}
              error={!!errors.phone && touched.phone}
              helperText={touched.phone ? errors.phone : undefined}
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
              disabled={isSubmitting || !!errors.name || !values.name}
            >
              Submit
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default CreateForm;
