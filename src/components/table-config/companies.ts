import { LinkFormat } from "../table/cell-format";
import Range from "../table/filter-components/range";
import { COMPANY_ENDPOINT } from "../utils/endpoint";
import { DataType, FilterOperator } from "../utils/enums/filter";
import { EtableConfigType } from "../utils/types/etable-config";

export const COMPANY_TABLE_CONFIG: EtableConfigType = {
  title: "Companies",
  keySearch: "companies",
  endpoint: "/api/v1/company" + "/listing",
  colDefs: [
    {
      colId: "no",
      title: "No.",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      component: LinkFormat,
      colId: "name",
      title: "Name",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "searchName",
      title: "Short Name",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
      type: DataType.STRING,
    },
    {
      colId: "address",
      title: "Address",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "phone",
      title: "Phone",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
      type: DataType.STRING,
    },
    {
      colId: "totalTemplates",
      title: "Total Templates",
      filter: {
        type: DataType.INT,
        operator: FilterOperator.LIKE,
        minmax: true,
      },
      filterComponent: Range,
      type: DataType.INT,
    },
  ],
};
