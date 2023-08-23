"use client";
import Layout from "@/components/layout";
import Table from "@/components/table";
import { INVOICE_TABLE_CONFIG } from "@/components/table-config/invoices";
import React from "react";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [open, setOpen] = React.useState(
    Cookies.get("showDrawer") === "1" ? true : false
  );
  return (
    <Layout open={open} setOpen={setOpen} pathname={"/invoices"}>
      <Table config={INVOICE_TABLE_CONFIG} />
    </Layout>
  );
};

export default Dashboard;
