"use client";
import * as React from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
} from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import Icons from "../components/icons";
import DATA_DASHBOARD from "../components/utils/helper/dataDashboard";
import { RootState } from "./store";
import Layout from "@/components/layout";
import { useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const Block = styled(Paper)(({ color }: any) => ({
  height: 200,
  lineHeight: "60px",
  padding: 10,
  borderRadius: "15px",
  backgroundColor: color,
}));

const Home = () => {
  const [open, setOpen] = React.useState(
    Cookies.get("showDrawer") === "1" ? true : false
  );
  const param = useParams();

  const statusDrawer = useSelector(
    (state: RootState) => state.user.statusDrawer
  );
  const [data, setData] = React.useState<any>({});
  const [dateTime, setDateTime] = React.useState({ from: "", to: "" });
  const [dataDate, setDataDate] = React.useState({});

  const fetchAPi = async () => {
    try {
      const data = await axios("api/v1/document/summary", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        method: "POST",
        data: JSON.stringify(dataDate),
      });
      if (data.data) {
        setData(data.data.data);
      }
    } catch (e: any) {
      (err: any) => console.log("Error Dasboard: " + err);
    }
  };

  React.useEffect(() => {
    fetchAPi();
  }, [dataDate]);

  const handleSearch = (e: any, key: any) => {
    const value = new DateObject(e).format(`YYYY-MM-DD`);
    setDateTime((preState) => ({
      ...preState,
      [key]: value,
    }));
  };

  const handleSearchDate = () => {
    setDataDate(dateTime);
  };

  React.useEffect(() => {
    const cb = (resp: any) => {
      setData(resp);
    };
    socket.on("sever:sendAllDocuments", cb);

    return () => {
      socket.off("sever:sendAllDocuments", cb);
    };
  }, []);

  return (
    <div>
      <Layout open={open} setOpen={setOpen} pathname={"/"}>
        <Box style={{ marginTop: "30px" }}>
          <Accordion sx={{ marginBottom: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{ fontWeight: "bold", color: "#4c4e64de" }}
                variant={"h5"}
              >
                Search Criteria
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className={"grid grid-cols-2 gap-4 mb-4"}>
                <Box
                  sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
                >
                  <InputLabel>Date Range:</InputLabel>
                  <Box display={"flex"} gap={"20px"}>
                    <DatePicker
                      onChange={(e) => {
                        handleSearch(e, "from");
                      }}
                      containerClassName={
                        "w-full rounded [&>div>div>input]:w-full [&>div>div>input]:h-[55px]"
                      }
                      inputClass={
                        "h-[56px] w-full rounded border-[#ccc] border-[1px] border-[solid] py-[14.5px] px-[14px]"
                      }
                      format={"YYYY-MM-DD"}
                      range={false}
                      render={<InputIcon />}
                      placeholder={"from"}
                      calendarPosition={"bottom-end "}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icons name="rightArrow" />
                    </Box>
                    <DatePicker
                      onChange={(e: any) => {
                        handleSearch(e, "to");
                      }}
                      containerClassName={
                        "w-full rounded [&>div>div>input]:w-full [&>div>div>input]:h-[55px]"
                      }
                      inputClass={
                        "h-[56px] w-full rounded border-[#ccc] border-[1px] border-[solid] py-[14.5px] px-[14px]"
                      }
                      format={"YYYY-MM-DD"}
                      range={false}
                      render={<InputIcon />}
                      placeholder={"to"}
                      calendarPosition={"bottom-end "}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className="flex justify-end w-full">
                <Button
                  onClick={handleSearchDate}
                  fullWidth
                  className="bg-blue-500"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "300px" }}
                >
                  Search
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Grid
            container
            spacing={3}
            className={"w-full"}
            justifyContent={statusDrawer ? "space-between" : "center"}
          >
            {DATA_DASHBOARD.map((dt: any, index: number) => (
              <Grid key={index} item xs={3}>
                <Block elevation={3} color={dt.colorBackground}>
                  <Typography variant="subtitle2" color={dt.colorText}>
                    {dt.title}
                  </Typography>
                  <Box className="flex justify-center items-center h-[calc(100%_-_40px)]">
                    <Typography
                      variant="h2"
                      fontWeight={"800"}
                      color={dt.colorText}
                    >
                      {data && data[dt.key] ? data[dt.key] : 0}
                    </Typography>
                  </Box>
                </Block>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
    </div>
  );
};

export default Home;
