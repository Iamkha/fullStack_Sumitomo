import { get } from "lodash";

import { Box, TextField } from "@mui/material";

const Range = ({ col, setFieldValue, values, getFieldProps }: any) => {
  const colId = get(col, ["colId"], "");

  const handleMinMax = (evt: any, string: any) => {
    const value = getFieldProps(col.colId)?.value;
    setFieldValue(col.colId, {
      ...value,
      [string]: evt.target.value,
    });
  };

  return (
    <Box sx={{ display: "flex", gap: "20px" }}>
      <TextField
        variant={"outlined"}
        placeholder={"min"}
        className={"w-full bg-white"}
        name={col.colId}
        type="number"
        onChange={(e) => handleMinMax(e, "min")}
        value={values[colId]?.min}
      />
      <TextField
        variant={"outlined"}
        placeholder={"max"}
        className={"w-full bg-white"}
        type="number"
        name={col.colId}
        onChange={(e) => handleMinMax(e, "max")}
        value={values[colId]?.max}
      />
    </Box>
  );
};

export default Range;
