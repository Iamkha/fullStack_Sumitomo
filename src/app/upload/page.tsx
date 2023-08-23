"use client";
import Layout from "@/components/layout";
import React from "react";
import Cookies from "js-cookie";

const Upload = () => {
  const [open, setOpen] = React.useState(
    Cookies.get("showDrawer") === "1" ? true : false
  );
  return <Layout open={open} setOpen={setOpen} pathname={"/upload"}></Layout>;
};

export default Upload;
