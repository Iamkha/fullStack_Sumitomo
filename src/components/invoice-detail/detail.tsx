import * as React from "react";
import { cloneDeep, get } from "lodash";

// Request defination

import Box from "@mui/material/Box";
import { Grid, Button, CircularProgress, Tabs, Tab } from "@mui/material";
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
import Icons from "../icons";
import { PDFDocument } from "pdf-lib";
import { convertRowValue } from "../utils/helper/table";
import Link from "next/link";
import { INVOICE_ENDPOINT, PDFHEADER_ENDPOINT } from "../utils/endpoint";
import { useNotification } from "../hooks/notification/use-notification";
import PDFViewer from "@/pdf-viewer";
import { EtableConfigType } from "../utils/types/etable-config";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const excludeInfomation = [
  "invoice_id",
  "due_date",
  "issue_date",
  "payable_amount",
  "tax_amount",
];
const listHeaderDetail = [
  "companyName",
  "vendor",
  "companycode",
  "gstreg",
  "searchterm",
];
const listInvoiceDetail = [
  "purchaseorderno",
  "invoicedate",
  "invoiceId",
  "duedate",
  "deliverydate",
  "invtype",
  "paymentterms",
  "customer",
];
const listAmountDetail = [
  "currency",
  "taxvalue",
  "amount",
  "incoterm",
  "salesref",
  "portofloadfrom",
  "portofloadto",
  "countryoforigin",
  "countryfinaldest",
  "deliveryno",
  "meansoftransport",
  "packaging",
  "bankinfo",
  "taxcode",
  "swiftcode",
  "purchasegroup",
  "vesselname",
  "informationofbank",
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const InvoiceInformation = ({
  data,
  setData,
  fields,
  mappedDataLabel,
}: any) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box className={"flex flex-wrap"}>
          {fields.sort().map((field: any) => {
            return (
              <Box key={field} className={"flex gap-[1px] flex-[0_0_50%]"}>
                <Box className={"flex-[40%] p-1"}>
                  <Typography>
                    {field === "_status"
                      ? "Status"
                      : field === "shortName"
                      ? "Short Name"
                      : mappedDataLabel[field] || field}
                    :
                  </Typography>
                </Box>
                <Box className={"flex-[60%] p-1"}>
                  {data._status === "PENDING" ? (
                    <EditableText
                      text={convertRowValue(
                        data[field],
                        field == "createdAt" ? "datetime" : "String"
                      )}
                      onChangeText={(value: any) => {
                        setData({
                          ...data,
                          [field]: value,
                        });
                      }}
                      disableEdit={field === "createdAt"}
                    />
                  ) : (
                    <Typography style={{ whiteSpace: "pre-line" }}>
                      {convertRowValue(
                        data[field],
                        field == "createdAt" ? "datetime" : "String"
                      )}
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

const Detail = ({
  id,
  config,
}: {
  id: string | undefined;
  config: EtableConfigType;
}) => {
  const [data, setData] = React.useState<any>({});
  const [originalData, setOriginalData] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [isShowPdf, setIsShowPdf] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const [mappedDataLabel, setMappedDataLabel] = React.useState({});
  const [pdf, setPdf] = React.useState<any>(null);
  const [url, setUrl] = React.useState<string>("");
  console.log(url, "url");
  console.log(data);

  const [pdfHeader, setPdfHeader] = React.useState(null);
  const [mergePdfBase64, setMergePdfBase64] = React.useState<string>("");
  const { showNotification } = useNotification();
  const router = useRouter();
  console.log(data);

  const optionsTab: any = {
    0: listHeaderDetail,
    1: listInvoiceDetail,
    2: listAmountDetail,
    3: [
      ...(data.mappingFields || []).filter(
        (field: any) =>
          !field.startsWith("inter") &&
          !field.startsWith("userid") &&
          !listHeaderDetail.includes(field) &&
          !listInvoiceDetail.includes(field) &&
          !listAmountDetail.includes(field)
      ),
      "_status",
    ],
    4: [
      ...(data.mappingFields || []).filter((field: any) =>
        field.startsWith("inter")
      ),
      "createdAt",
      "userid",
    ],
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const rowsRender = (data.items || []).map((row: any, index: number) => {
    return (
      <TableRow
        key={row.itemCode}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {config.colDefs.map((el: any) => {
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
                    `/${row.id || row[el.colId]}`
                  }
                  className={"text-[#1976d2]"}
                >
                  {convertRowValue(row[el.colId], el.type)}
                </Link>
              ) : (
                <EditableText
                  text={convertRowValue(row[el.colId], el.type)}
                  onChangeText={(value: any) => {
                    const tmp = cloneDeep(row);
                    tmp[el.colId] = value;
                    setData({
                      ...data,
                      items: data.items.map((ele: any, idx: number) =>
                        idx === index ? tmp : ele
                      ),
                    });
                  }}
                />
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

  const totalAmount = React.useMemo(() => {
    const amount =
      data.totalAmount ||
      (data.items || []).reduce(
        (a: any, b: any) =>
          a + +((b.amount || "0").match(/(\d|\.)+/g) || ["0"]).join(""),
        0
      );
    return amount ? amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "";
  }, [data]);
  const fetchApi = async (searchInvoices: any) => {
    try {
      const data = await axios(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/invoices" + `/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          method: "POST",
          data: JSON.stringify({
            filters: searchInvoices,
          }),
        }
      );
      setData(data.data.data || {});
      setOriginalData(data.data.data || {});
      if (data.data.data.documentId) {
        try {
          const resss = await axios(
            process.env.NEXT_PUBLIC_API_URL +
              "/api/v1/document" +
              `/${data.data.data.documentId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
              method: "GET",
            }
          );
          if (resss.data.data.data) {
            if (data.data.data?.pdf) {
              setPdf(data.data.data?.pdf);
            } else {
              setPdf(resss.data.data.data);
            }
          }
        } catch (error) {}

        try {
          const res = await axios(
            process.env.NEXT_PUBLIC_API_URL +
              "/api/v1/pdf-header" +
              `/${data.data.data.documentId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
              method: "GET",
            }
          );
          console.log(res.data.data.data);

          if (res.data.data.data) {
            setPdfHeader(res.data.data.data);
          }
          if (res.data.data.data) {
            if (data.data.data?.pdf) {
              setPdf(data.data.data?.pdf);
            } else {
              setPdf(res.data.data.data);
            }
          }
        } catch (error) {}
      }
    } catch (error) {}
  };
  const fetchApiKv = async () => {
    try {
      const data = await axios(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/kv/templateMappingFields",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          method: "GET",
        }
      );

      if (!data.data.error) {
        const labels = data.data.data.reduce(
          (a: any, b: any) => {
            return {
              ...a,
              [b.value]: b.label,
            };
          },
          {
            companyName: "Vendor Name",
            createdAt: "Created At",
          }
        );
        setMappedDataLabel(labels);
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    const search = JSON.parse(String(localStorage.getItem("searchCriteria")));
    const searchInvoices = get(search, ["invoices"], []);
    fetchApi(searchInvoices);
    fetchApiKv();
    // request.get(KV_ENDPOINT + `/templateMappingFields`).then((res: any) => {
    //   if (!res.data.error) {
    //     const labels = res.data.data.reduce(
    //       (a: any, b: any) => {
    //         return {
    //           ...a,
    //           [b.value]: b.label,
    //         };
    //       },
    //       {
    //         companyName: "Vendor Name",
    //         createdAt: "Created At",
    //       }
    //     );
    //     setMappedDataLabel(labels);
    //   }
    // });
  }, [id]);

  React.useEffect(() => {
    const blob = base64ToBlob(mergePdfBase64, "application/pdf");
    const urlBlob = URL.createObjectURL(blob);
    if (urlBlob) {
      setUrl(urlBlob);
    }
    function base64ToBlob(base64: any, type = "application/octet-stream") {
      const binStr = atob(base64);
      const len = binStr.length;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      return new Blob([arr], { type: type });
    }
  }, [mergePdfBase64]);

  const handleAddItem = () => {
    setData({
      ...data,
      items: data.items ? [...data.items, {}] : [{}],
    });
  };

  const handleSaveInvoice = async () => {
    // setLoading(true);
    // try {
    //   const res = await axios(
    //     process.env.NEXT_PUBLIC_API_URL + "/api/v1/invoices/sendToSap",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${Cookies.get("token")}`,
    //       },
    //       method: "POST",
    //       data: JSON.stringify({ invoiceId: data._id, pdf }),
    //     }
    //   );
    //   if (!res.data.error) {
    //     try {
    //       const ress = await axios(
    //         process.env.NEXT_PUBLIC_API_URL + "/api/v1/invoices" + data._id,
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${Cookies.get("token")}`,
    //           },
    //           method: "PUT",
    //           data: JSON.stringify({ data, _status: "Sent to SAP" }),
    //         }
    //       );
    //       if (!ress.data.error) {
    //         setOriginalData(data);
    //         setData({
    //           ...data,
    //           _status: "Sent to SAP",
    //         });
    //       }
    //       showNotification({
    //         title: ress.data.message,
    //         type: "success",
    //       });
    //     } catch (error) {
    //       setLoading(false);
    //     }
    //   } else {
    //     showNotification({
    //       title: res.data.message || "Can not send to SAP!",
    //       type: "error",
    //     });
    //   }
    // } catch (error) {
    //   setLoading(false);
    // }
    // setLoading(false);
    //   request
    //     .post("/invoice/sendToSap", { invoiceId: data._id, pdf })
    //     .then((res: any) => {
    //       if (!res.data.error) {
    //         request
    //           .put("/invoice/" + data._id, { data, _status: "Sent to SAP" })
    //           .then((res: any) => {
    //             console.log("Success: ", res);
    //             if (!res.data.error) {
    //               setOriginalData(data);
    //               setData({
    //                 ...data,
    //                 _status: "Sent to SAP",
    //               });
    //             }
    //           })
    //           .catch((e: any) => {
    //             console.log("Error: ", e.message);
    //             setLoading(false);
    //           });
    //         showNotification({
    //           title: res.data.message,
    //           type: "success",
    //         });
    //       } else {
    //         showNotification({
    //           title: res.data.message || "Can not send to SAP!",
    //           type: "error",
    //         });
    //       }
    //     })
    //     .catch((e: any) => {
    //       console.log("Error Send To SAP: ", e.message);
    //       setLoading(false);
    //     });
    //   setLoading(false);
  };

  const handleDeleteInvoice = async (id: any) => {
    const noti = confirm("Do you want to remove invoices?");
    if (noti) {
      setDeleting(true);
      try {
        const data = await axios(
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/invoices/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            method: "DELETE",
          }
        );
        console.log(data);

        setDeleting(false);
        router.push("/invoices");
      } catch (error) {
        setDeleting(false);
      }

      // request
      //   .delete("/invoice/" + id)
      //   .then((res: any) => {
      //     if (!res.data.error) {
      //       setDeleting(false);
      //       navigate("/invoices");
      //     }
      //   })
      //   .catch((e: any) => {
      //     setDeleting(false);
      //     console.log("Error Delete: ", e.message);
      //   });
    }
  };

  const returnTab = () => {
    return data.mappingFields ? (
      <TabPanel value={value} index={value}>
        <InvoiceInformation
          data={data}
          setData={setData}
          fields={optionsTab[value]}
          mappedDataLabel={mappedDataLabel}
        />
      </TabPanel>
    ) : null;
  };

  const handlePopout = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  React.useEffect(() => {
    const handleMergePdf = async () => {
      if (pdfHeader && pdf) {
        const mergedPdf = await PDFDocument.create();
        const docInvoice = await PDFDocument.load(pdf);
        const docHeader = await PDFDocument.load(pdfHeader);

        const copiedHeader = await mergedPdf.copyPages(
          docHeader,
          docHeader.getPageIndices()
        );
        copiedHeader.forEach((page: any) => mergedPdf.addPage(page));

        const copiedInvoice = await mergedPdf.copyPages(
          docInvoice,
          docInvoice.getPageIndices()
        );
        copiedInvoice.forEach((page: any) => mergedPdf.addPage(page));

        const pdfBase = await mergedPdf.saveAsBase64();
        setMergePdfBase64(pdfBase);
      } else if (pdf) {
        setMergePdfBase64(pdf);
      }
    };
    handleMergePdf();
  }, [pdfHeader, pdf]);

  return (
    <>
      {data ? (
        <Box className="flex gap-1">
          <Box
            className={`flex flex-col gap-4 ${
              isShowPdf ? "flex-[0_0_60%]" : "flex-[0_0_100%]"
            }`}
          >
            <Box
              className={`border-[1px] border-solid border-[#4c4e641f] rounded-[15px] ${
                isShowPdf ? "flex-[0_0_60%]" : "flex-[0_1_80%]"
              }`}
            >
              <Box className="text-[#4c4e64ad]">
                {/* HEADER */}
                <Grid container padding={"1.5rem"}>
                  <Grid item xs={6}>
                    <Box className="[&>img]:h-[80px]">
                      <img alt="logo" src={logo.src} />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    className={"flex items-end"}
                    flexDirection={"column"}
                  >
                    {/* <div className={'w-[300px]'}>
                    <Box className="flex flex-row justify-between ">
                      <Typography className={'flex-[40%]'} variant="body1">
                        Invoice:
                      </Typography>
                      <Typography className={'flex-[60%]'} variant="body1">
                        #{data['invoiceId']}
                      </Typography>
                    </Box>
                    <Box className="flex flex-row justify-between ">
                      <Typography className={'flex-[40%]'} variant="body1">
                        Date Issued:
                      </Typography>
                      <Typography className={'flex-[60%]'} variant="body1">
                        {moment(data['date']).format('DD-MM-YYYY')}
                      </Typography>
                    </Box>
                    <Box className="flex flex-row justify-between ">
                      <Typography className={'flex-[40%]'} variant="body1">
                        Date Due:
                      </Typography>
                      <Typography className={'flex-[60%]'} variant="body1">
                        {moment(data['date']).format('DD-MM-YYYY')}
                      </Typography>
                    </Box>
                  </div> */}
                  </Grid>
                </Grid>
                <Divider />
                {/* INVOICE INFOMATION */}
                <Box
                  className={
                    " text-[#4c4e64de] text-[20px] font-bold px-5 pt-4"
                  }
                >
                  Invoice Information
                </Box>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label={`Vendor Header Details`} {...a11yProps(0)} />
                    <Tab label={`Invoice Details`} {...a11yProps(1)} />
                    <Tab label={`Amount Details`} {...a11yProps(2)} />
                    <Tab label="PDF related fields" {...a11yProps(3)} />
                    <Tab label="PDF Invoice properties" {...a11yProps(4)} />
                  </Tabs>
                </Box>
                <Box>{returnTab()}</Box>
                <Divider />
                {/* TABLE INVOICE */}
                <Box>
                  <Paper className="bg-[unset]" sx={{ boxShadow: 0 }}>
                    <TableContainer>
                      <MuiTable
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                      >
                        <TableHead className="bg-[#FFFFF]">
                          <TableRow>{headersRender}</TableRow>
                        </TableHead>
                        <TableBody className="bg-[#FFFFF]">
                          {rowsRender}
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <Button onClick={handleAddItem}>
                                <Icons name={"plus"} />
                                Add item
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </MuiTable>
                    </TableContainer>
                  </Paper>
                </Box>
                {/* TOTAL & TAX */}
                <Divider />
                <Grid container padding={"1.5rem"}>
                  <Grid item xs={6}></Grid>
                  <Grid
                    item
                    xs={6}
                    className={"flex items-end"}
                    flexDirection={"column"}
                  >
                    <div className={"w-[300px]"}>
                      <Box className="flex flex-row justify-between ">
                        <Typography className={"flex-[60%]"} variant="body1">
                          Total amount:
                        </Typography>
                        <Typography className={"flex-[40%]"} variant="body1">
                          {convertRowValue(totalAmount, "")}
                        </Typography>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className="flex justify-between">
              <Box>
                <Button disabled={!data.prevId}>
                  <Link href={"/invoices" + `/${data.prevId}`}>Previous</Link>
                </Button>
                <Button disabled={!data.nextId}>
                  <Link href={"/invoices" + `/${data.nextId}`}>Next</Link>
                </Button>
              </Box>
              <Box className="flex gap-x-2 justify-end mr-5 pb-[20px] flex-wrap gap-y-[10px]">
                <Button
                  onClick={() => window.open(window.location.href + "/sap")}
                >
                  To SAP
                </Button>
                {url ? (
                  <Button onClick={() => setIsShowPdf(!isShowPdf)}>
                    {isShowPdf ? "Hide PDF" : "Show PDF"}
                  </Button>
                ) : null}
                <Button onClick={() => handlePopout()}>
                  Show PDF (Pop-out)
                </Button>
                {data._status === "Sent to SAP" ? (
                  <Button
                    onClick={() =>
                      window.open(window.location.href + "/filenet")
                    }
                  >
                    {"Get FileNet"}
                  </Button>
                ) : null}
                {data._status === "PENDING" ? (
                  <Button onClick={() => setData(originalData)}>
                    Reset invoice
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  color="error"
                  className="bg-red-500"
                  disabled={deleting}
                  onClick={() => handleDeleteInvoice(id)}
                >
                  Delete Invoice
                </Button>
                {data._status === "PENDING" ? (
                  <Button
                    className="bg-blue-500"
                    variant="contained"
                    onClick={handleSaveInvoice}
                    disabled={loading}
                  >
                    Approve
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Box>
          {isShowPdf && (
            <Box className="flex-[0_0_40%] flex-col items-center justify-center min-h-[100vh]">
              <Box className="flex justify-center w-[100%] h-[100vh]">
                {url ? (
                  <PDFViewer url={url} />
                ) : (
                  <Box className={"w-full flex items-center justify-center"}>
                    <CircularProgress />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default Detail;
