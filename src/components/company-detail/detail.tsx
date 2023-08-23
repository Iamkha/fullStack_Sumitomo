import * as React from "react";
import { cloneDeep } from "lodash";
import moment from "moment";

// Request defination

import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MuiTable from "@mui/material/Table";
import logo from "../../assets/images/small-logo.jpg";
import EditableText from "../editable-text";
import { COMPANY_TABLE_CONFIG } from "../table-config/companies";
import { convertRowValue } from "../utils/helper/table";
import { EtableConfigType } from "../utils/types/etable-config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

const excludeInfomation = [
  "invoice_id",
  "due_date",
  "issue_date",
  "payable_amount",
  "tax_amount",
];

const Detail = ({
  id,
  config,
}: {
  id: string | undefined;
  config: EtableConfigType;
}) => {
  // const { pathname, search } = useLocation0();
  // const navigate = useNavigate();
  const router = useRouter();

  const [data, setData] = React.useState<any>({});
  const [templateData, setTemplateData] = React.useState<any>([]);

  // const request = getRequest();

  const headersRender = config.colDefs.map((el: any) => {
    return (
      <TableCell
        sx={{
          color: "#4c4e64de",
        }}
        key={el.colId}
      >
        {el.title}
      </TableCell>
    );
  });

  const rowsRender = (templateData || []).map((row: any, index: number) => {
    return (
      <TableRow
        key={row._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {config.colDefs.map((el: any, i: any) => {
          return (
            <TableCell
              sx={{
                color: "#4c4e64de",
              }}
              align="left"
              key={el.colId}
            >
              {el.link ? (
                <Link
                  href={
                    location.pathname.replace(/\/$/, "") +
                    `/template/${row._id || row[el.colId]}`
                  }
                  className={"text-[#1976d2]"}
                >
                  {convertRowValue(row[el.colId], el.type)}
                </Link>
              ) : (
                convertRowValue(row[el.colId], el.type)
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
  const fetchAPi = async () => {
    try {
      const res = await axios(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/company/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          method: "GET",
          // data: JSON.stringify({}),
        }
      );
      setData(res.data.data || {});
    } catch (error) {}

    try {
      const data = await axios(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/company/" + id + "/template",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          method: "GET",
          // data: JSON.stringify({}),
        }
      );
      setTemplateData(data.data.data || {});
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchAPi();
    // request.get(COMPANY_ENDPOINT + `/${id}`).then((res: any) => {
    //   if (!res.data.error) {
    //     setData(res.data.data || {});
    //   }
    // });
    // request.get(COMPANY_ENDPOINT + `/${id}` + "/template").then((res: any) => {
    //   if (!res.data.error) {
    //     setTemplateData(res.data.data || {});
    //   }
    // });
  }, [id]);

  const handleRedirect = () => {
    // return navigate(pathname + "/template" + search);
  };

  return (
    <>
      {data ? (
        <Box className="flex gap-1">
          <Box className={`flex flex-col gap-4 flex-[0_0_100%]`}>
            <Box
              className={`border-[1px] border-solid border-[#4c4e641f] rounded-[15px]`}
            >
              <Box className="text-[#4c4e64ad]">
                {/* HEADER */}
                <Grid container padding={"1.5rem"}>
                  <Grid item xs={6}>
                    <Box className="[&>img]:h-[80px]">
                      <img src={logo.src} />
                    </Box>
                  </Grid>
                </Grid>
                <Divider />
                {/* INVOICE INFOMATION */}
                <Box
                  className={
                    " text-[#4c4e64de] text-[20px] font-bold px-5 pt-4"
                  }
                >
                  Company Information
                </Box>
                <Grid container padding={"1.5rem"}>
                  <Grid item xs={12}>
                    <Box className={"flex flex-wrap"}>
                      {COMPANY_TABLE_CONFIG.colDefs.map((el: any) => {
                        if (excludeInfomation.includes(el.colId)) return <></>;
                        return (
                          <Box
                            key={el.colId}
                            className={"flex gap-[1px] flex-[0_0_50%]"}
                          >
                            <Box className={"flex-[40%] p-1"}>
                              <Typography>{el.title}:</Typography>
                            </Box>
                            <Box className={"flex-[60%] p-1"}>
                              {convertRowValue(data[el.colId], el.type)}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className={"mt-5"}>
              <Box className={"flex justify-between items-center"}>
                <Typography
                  variant="h5"
                  className={"[&.MuiTypography-h5]:font-bold"}
                >
                  Templates
                </Typography>
                <Button
                  className="bg-blue-500"
                  variant="contained"
                  onClick={handleRedirect}
                >
                  Create a template
                </Button>
              </Box>
              {/* TABLE INVOICE */}
              <Box>
                <Paper className="bg-[unset]" sx={{ boxShadow: 0 }}>
                  <TableContainer>
                    <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead className="bg-[#FFFFF]">
                        <TableRow>{headersRender}</TableRow>
                      </TableHead>
                      <TableBody className="bg-[#FFFFF]">
                        {rowsRender}
                      </TableBody>
                    </MuiTable>
                  </TableContainer>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default Detail;
