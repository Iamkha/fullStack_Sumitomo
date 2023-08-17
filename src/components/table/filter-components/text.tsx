import { get } from "lodash";

import { TextField } from "@mui/material";

const Text = ({ col, setFieldValue, values, getFieldProps }: any) => {
  const colId = get(col, ["colId"], "");

  return (
    <TextField
      variant={"outlined"}
      className={"w-full bg-white"}
      name={col.colId}
      onChange={(e) => setFieldValue(colId, e.target.value)}
      value={values[colId] || ""}
    />
  );
};

export default Text;
