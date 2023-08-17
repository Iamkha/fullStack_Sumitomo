import { Formik } from "formik";

import { Button, Box } from "@mui/material";
import Icons from "../icons";

const Action = ({
  disabled,
  handleError,
  setError,
  pathname,
  id,
}: {
  disabled: boolean;
  handleError?: any;
  setError?: any;
  pathname: any;
  id: any;
}) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(_, { setSubmitting }) => {
        setError([]);
        setTimeout(() => {
          // request
          //   .post(INVOICE_ENDPOINT + "/sendToSesami", {
          //     id,
          //   })
          //   .then((res: any) => {
          //     if (res.data.error) {
          //       handleError(res.data.message);
          //     } else {
          //       window.location.reload();
          //     }
          //     setSubmitting(false);
          //   })
          //   .catch(() => {
          //     setSubmitting(false);
          //   });
        }, 400);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={
            "flex flex-col gap-y-4 w-[300px] p-4 justify-center border-[1px] border-solid border-[#4c4e641f] rounded-[15px]"
          }
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ maxWidth: "300px" }}
            disabled={isSubmitting || disabled}
          >
            <Box className="flex gap-3">
              <Icons name={"send"} />
              <span>Send to Sesami</span>
            </Box>
          </Button>
          <a href={`${pathname}/rawData`} target={"_blank"} rel="noreferrer">
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ maxWidth: "300px" }}
            >
              <Box className="flex gap-3">
                <span>Raw Data</span>
              </Box>
            </Button>
          </a>
          <a href={`${pathname}/xmlData`} target={"_blank"} rel="noreferrer">
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ maxWidth: "300px" }}
            >
              <Box className="flex gap-3">
                <span>XML Data</span>
              </Box>
            </Button>
          </a>
          <a href={`${pathname}/base64data`} target={"_blank"} rel="noreferrer">
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ maxWidth: "300px" }}
            >
              <Box className="flex gap-3">
                <span>Base64 Data</span>
              </Box>
            </Button>
          </a>
        </Box>
      )}
    </Formik>
  );
};

export default Action;
