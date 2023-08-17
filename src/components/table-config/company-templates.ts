import { DataType, FilterOperator } from "../utils/enums/filter";
import { EtableConfigType } from "../utils/types/etable-config";

export const COMPANY_TEMPLATE_TABLE_CONFIG: EtableConfigType = {
  title: "Template",
  colDefs: [
    {
      colId: "name",
      title: "Template Name",
      filter: {
        type: DataType.INT,
        operator: FilterOperator.LIKE,
      },
      link: true,
    },
    {
      colId: "createdAt",
      title: "Created At",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
      type: DataType.DATETIME,
    },
    {
      colId: "updatedAt",
      title: "Updated At",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
      type: DataType.DATETIME,
    },
  ],
};
