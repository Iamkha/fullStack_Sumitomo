"use client";
import Layout from "@/components/layout";
import Table from "@/components/table";
import { INVOICE_TABLE_CONFIG } from "@/components/table-config/invoices";

const Dashboard = () => {
  return (
    <Layout pathname={"/invoices"}>
      <Table config={INVOICE_TABLE_CONFIG} />
    </Layout>
  );
};

export default Dashboard;
