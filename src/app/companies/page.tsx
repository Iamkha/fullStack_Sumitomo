"use client";
import Layout from "@/components/layout";
import React from "react";
import Cookies from "js-cookie";
import Table from "@/components/table";
import { Box } from "@mui/material";
import { COMPANY_TABLE_CONFIG } from "@/components/table-config/companies";
import Dialog from "@/components/dialog";
import CreateForm from "@/components/company/create-form";

const Companies = () => {
  const [open, setOpen] = React.useState(
    Cookies.get("showDrawer") === "1" ? true : false
  );
  return (
    <Layout open={open} setOpen={setOpen} pathname={"/companies"}>
      <Table config={COMPANY_TABLE_CONFIG}>
        <Box className={"flex justify-end mb-5"}>
          <Dialog
            label={"New Company"}
            classes={{ scrollPaper: "!items-baseline" }}
          >
            <CreateForm />
          </Dialog>
        </Box>
      </Table>
    </Layout>
  );
};

export default Companies;
