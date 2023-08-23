"use client";
import * as React from "react";

import { Box } from "@mui/material";
import Table from "@/components/table";
import { USER_TABLE_CONFIG } from "@/components/table-config/user";
import Dialog from "@/components/dialog";
import Register from "@/components/form/register";
import Layout from "@/components/layout";
import Cookies from "js-cookie";

// Table defination

const Users = () => {
  const [open, setOpen] = React.useState(
    Cookies.get("showDrawer") === "1" ? true : false
  );
  return (
    <Layout open={open} setOpen={setOpen} pathname={"/users"}>
      <Box>
        <Table config={USER_TABLE_CONFIG}>
          <Box className={"flex justify-end mb-5 "}>
            <Dialog
              label={"New User"}
              classes={{ scrollPaper: "!items-baseline" }}
            >
              <Register />
            </Dialog>
          </Box>
        </Table>
      </Box>
    </Layout>
  );
};

export default Users;
