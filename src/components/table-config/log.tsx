import { LOG_ENDPOINT } from "../utils/endpoint";
import { DataType, FilterOperator } from "../utils/enums/filter";
import { EtableConfigType } from "../utils/types/etable-config";

export const LOG_TABLE_CONFIG: EtableConfigType = {
  title: "Log",
  keySearch: "log",
  endpoint: LOG_ENDPOINT + "/listing",
  colDefs: [
    {
      colId: "name",
      title: "File Name / Invoice Id",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "type",
      title: "Action",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "logType",
      title: "Log Type",
    },
    {
      colId: "error",
      title: "Message",
    },
    {
      colId: "createdAt",
      title: "Create At",
      type: DataType.DATETIME,
    },
  ],
};
