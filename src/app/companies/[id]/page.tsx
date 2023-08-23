"use client";
import Box from "@mui/material/Box";
import { COMPANY_TEMPLATE_TABLE_CONFIG } from "@/components/table-config/company-templates";
import Layout from "@/components/layout";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import Detail from "@/components/company-detail/detail";

const CompanyDetail = () => {
  const [open, setOpen] = React.useState(
    Cookies.get("showDrawer") === "1" ? true : false
  );
  const param: any = useParams();

  return (
    <Layout open={open} setOpen={setOpen} pathname={"/companies"}>
      <Box className={"flex flex-col gap-y-5"}>
        <Detail id={param?.id || ""} config={COMPANY_TEMPLATE_TABLE_CONFIG} />
      </Box>
    </Layout>
  );
};

export default CompanyDetail;
