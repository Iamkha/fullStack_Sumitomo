import { EtableConfigType } from "../utils/types/etable-config";

export const INVOICE_SESAMI_ITEM_CONFIG: EtableConfigType = {
  title: "Invoice Sesami Items",
  colDefs: [
    {
      colId: "invoice_id",
      title: "Invoice Id",
    },
    {
      colId: "base_quantity",
      title: "Base Quantity",
    },
    {
      colId: "item_id",
      title: "Item Id",
    },
    {
      colId: "item_name",
      title: "Item Name",
    },
    {
      colId: "item_description",
      title: "Item Description",
    },
    {
      colId: "invoice_line_extension_amount",
      title: "Invoice Line Extension Amount",
    },
    {
      colId: "invoice_line_price_amount",
      title: "Invoice Line Price Amount",
    },
  ],
};
