import { DataType, FilterOperator } from "../utils/enums/filter";
import { EtableConfigType } from "../utils/types/etable-config";

export const INVOICE_ITEM_TABLE_CONFIG: EtableConfigType = {
  title: "Invoice Items",
  colDefs: [
    {
      colId: "itemCode",
      title: "Grade",
      filter: {
        type: DataType.INT,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "name",
      title: "Name",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "qty",
      title: "Qty",
    },
    {
      colId: "price",
      title: "Price",
    },
    {
      colId: "uom",
      title: "UOM",
    },
    {
      colId: "amount",
      title: "Amount",
    },
  ],
};
