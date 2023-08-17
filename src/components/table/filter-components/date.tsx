import { get } from "lodash";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";

import { Box } from "@mui/material";
import Icons from "@/components/icons";

const Date = ({ values, setFieldValue, col, getFieldProps }: any) => {
  const colId = get(col, ["colId"], "");

  const handleChangeDate = (newDate: any, string: any) => {
    const value = getFieldProps(colId)?.value;
    setFieldValue(colId, {
      ...value,
      [string]: newDate ? new DateObject(newDate).format(`YYYY-MM-DD`) : "",
    });
  };

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <DatePicker
        onChange={(e) => handleChangeDate(e, "from")}
        containerClassName={
          "w-full rounded [&>div>div>input]:w-full [&>div>div>input]:h-[55px]"
        }
        inputClass={
          "h-[56px] w-full rounded border-[#ccc] border-[1px] border-[solid] py-[14.5px] px-[14px]"
        }
        format={"YYYY-MM-DD"}
        range={false}
        render={<InputIcon />}
        placeholder={"from"}
        value={values[colId]?.from}
      />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Icons name="rightArrow" />
      </Box>
      <DatePicker
        onChange={(e) => handleChangeDate(e, "to")}
        containerClassName={
          "w-full rounded [&>div>div>input]:w-full [&>div>div>input]:h-[55px]"
        }
        inputClass={
          "h-[56px] w-full rounded border-[#ccc] border-[1px] border-[solid] py-[14.5px] px-[14px]"
        }
        format={"YYYY-MM-DD"}
        range={false}
        render={<InputIcon />}
        placeholder={"to"}
        value={values[colId]?.to}
      />
    </Box>
  );
};

export default Date;
