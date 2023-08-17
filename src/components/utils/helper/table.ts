import moment from "moment";
import { DataType } from "../enums/filter";

export const convertRowValue = (value: any, type: any) => {
  switch (type) {
    case DataType.BOOL:
      return value ? "success" : "fail";
    case DataType.DATE:
      return moment(value).format("YYYY-MM-DD");
    case DataType.DATETIME:
      if (value) return moment(value).format("YYYY-MM-DD HH:mm:ss");
      return "";
    case DataType.INT:
      return value;
    default:
      if (value?.startsWith(":")) {
        return value?.replace(":", "");
      }
      return value;
  }
};
