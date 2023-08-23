"use client";
import Box from "@mui/material/Box";
import Detail from "@/components/invoice-detail/detail";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { INVOICE_ITEM_TABLE_CONFIG } from "@/components/table-config/invoice-item";
import Layout from "@/components/layout";
import Cookies from "js-cookie";
import React from "react";
import { Worker } from "@react-pdf-viewer/core";

const InvoiceDetail = (params: any) => {
  const [open, setOpen] = React.useState(
    Cookies.get("showDrawer") === "1" ? true : false
  );
  const param: any = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">
      <Layout open={open} setOpen={setOpen} pathname={`/invoices/${param.id}`}>
        <Box className={"flex flex-col gap-y-5"}>
          <Detail id={param?.id || ""} config={INVOICE_ITEM_TABLE_CONFIG} />
        </Box>
      </Layout>
    </Worker>
  );
};

export default InvoiceDetail;
