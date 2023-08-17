import { LinkFormat } from "../table/cell-format";
import { INVOICE_SESAMI_ENDPOINT } from "../utils/endpoint";
import { DataType, FilterOperator } from "../utils/enums/filter";
import { EtableConfigType } from "../utils/types/etable-config";

export const INVOICE_SESAMI_CONFIG: EtableConfigType = {
  title: "Invoices Sesami",
  endpoint: INVOICE_SESAMI_ENDPOINT + "/sesamiAll",
  colDefs: [
    {
      component: LinkFormat,
      colId: "invoice_id",
      title: "Invoice Id",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "invoice_type_code",
      title: "Type Code",
      filter: {
        type: DataType.INT,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "issue_date",
      title: "Issue Date",
      filter: {
        type: DataType.DATE,
        operator: FilterOperator.IS,
      },
      type: DataType.DATE,
    },
    {
      colId: "company_id",
      title: "Company Id",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "supplier_endpoint_id",
      title: "Supplier Id",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "supplier_name",
      title: "Supplier Name",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "customer_endpoint_id",
      title: "Customer Id",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "customer_name",
      title: "Customer Name",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "document_currency_code",
      title: "Document Currency Code",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "payable_amount",
      title: "Payable Amount",
      filter: {
        type: DataType.FLOAT,
        operator: FilterOperator.LIKE,
        minmax: true,
      },
      filterComponent: Range,
    },
    {
      colId: "tax_amount",
      title: "Tax Amount",
      filter: {
        type: DataType.FLOAT,
        operator: FilterOperator.LIKE,
        minmax: true,
      },
      filterComponent: Range,
    },
    {
      colId: "source",
      title: "Source",
    },
    {
      colId: "created_at",
      title: "Received Date",
      filter: {
        type: DataType.DATE,
        operator: FilterOperator.IS,
      },
      type: DataType.DATETIME,
    },
  ],
};
