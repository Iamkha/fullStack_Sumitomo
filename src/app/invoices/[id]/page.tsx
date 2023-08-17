import { useParams } from "react-router-dom";

import { INVOICE_ITEM_TABLE_CONFIG } from "src/table-config/invoice-item";

import Box from "@mui/material/Box";

import Detail from "./detail";

const InvoiceDetail = () => {
  const { id } = useParams();

  return (
    <Box className={"flex flex-col gap-y-5"}>
      <Detail id={id} config={INVOICE_ITEM_TABLE_CONFIG} />
    </Box>
  );
};

export default InvoiceDetail;
