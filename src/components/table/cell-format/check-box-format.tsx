import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { get } from "lodash";

const CheckBoxFormat = ({ row, cellConfig }: any) => {
  const value = get(
    row,
    get(cellConfig, ["componentProps", "value"], cellConfig.colId),
    true
  );
  const compareValue = get(
    cellConfig,
    ["componentProps", "compareValue"],
    false
  );

  return (
    <Box>
      <Checkbox defaultChecked={value === compareValue} disabled />
    </Box>
  );
};
export default CheckBoxFormat;
