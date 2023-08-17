import { LinkFormat } from "../table/cell-format";
import { DataType, FilterOperator } from "../utils/enums/filter";
import { EtableConfigType } from "../utils/types/etable-config";
import Date from "../../components/table/filter-components/date";
import Selection from "../table/filter-components/selection";
export const INVOICE_TABLE_CONFIG: EtableConfigType = {
  title: "Invoices",
  keySearch: "invoices",
  endpoint: "/api/v1/invoices/listing",
  colDefs: [
    {
      colId: "checkBox",
      title: "Check Box",
    },
    {
      component: LinkFormat,
      colId: "invoiceId",
      title: "Invoice Id",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    // {
    //   colId: 'title',
    //   title: 'Title',
    //   filter: {
    //     type: DataType.STRING,
    //     operator: FilterOperator.LIKE,
    //   },
    // },
    {
      colId: "companyName",
      title: "Company Name",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "shortName",
      title: "Short Name",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
    },
    {
      colId: "issueDate",
      title: "Issue Date",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
      // type: DataType.DATE,
    },
    {
      colId: "_status",
      title: "Status",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.IS,
      },
      type: DataType.STRING,
      filterComponent: Selection,
      filterComponentProps: {
        options: [
          {
            value: "",
            label: "All",
          },
          {
            value: "Sent to SAP",
            label: "Sent to SAP",
          },
          {
            value: "PENDING",
            label: "PENDING",
          },
        ],
      },
    },
    {
      colId: "idSap",
      title: "FileNet ID",
      filter: {
        type: DataType.STRING,
        operator: FilterOperator.LIKE,
      },
      type: DataType.STRING,
    },
    {
      colId: "createdAt",
      title: "Received Date",
      filter: {
        type: DataType.DATE,
        operator: FilterOperator.LIKE,
      },
      filterComponent: Date,
      type: DataType.DATETIME,
    },
    {
      colId: "timeSentFileNet",
      title: "Approved Date",
      filter: {
        type: DataType.DATE,
        operator: FilterOperator.LIKE,
      },
      type: DataType.DATETIME,
    },
  ],
};
