import { get } from "lodash";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Selection = ({ col, values, setFieldValue }: any) => {
  const colId = get(col, ["colId"], "");
  const options = get(col, ["filterComponentProps", "options"], []);
  return (
    <FormControl sx={{ m: 1, minWidth: "100%", margin: 0 }}>
      <Select
        displayEmpty
        value={values[colId] || ""}
        onChange={(e) => setFieldValue(colId, e.target.value)}
      >
        {options.map(({ value, label }: any) => {
          return (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Selection;
