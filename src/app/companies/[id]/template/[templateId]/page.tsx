"use client";
import * as React from "react";
import { useState } from "react";
import { Buffer } from "buffer";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  ToggleButtonGroup,
  ToggleButton,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  TablePagination,
  CircularProgress,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Popover,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useNotification } from "@/components/hooks/notification/use-notification";
import PDFViewer from "@/pdf-viewer";
import Icons from "@/components/icons";

enum ANALYZED_TYPE {
  KEY_VALUE = "keyValue",
  TABLE = "table",
  TEXT = "text",
  MAPPING = "mapping",
}

const initialMappingFields = {
  detectFields: [],
  invoiceId: "",
  issueDate: "",
};

const AnalyzeDocument = () => {
  const { id, templateId } = useParams();

  const router = useRouter();
  const { showNotification } = useNotification();

  const [file, setFile] = useState<any>(null);
  const [pdf, setPdf] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");
  const [anaylzedData, setAnalyzedData] = useState<any>(null);
  const [analyzedType, setAnalyzedType] = React.useState<ANALYZED_TYPE>(
    ANALYZED_TYPE.TEXT
  );
  const [mappedData, setMappedData] = useState<any>(initialMappingFields);
  const [mappedDataLabel, setMappedDataLabel] = useState<any>({});
  const [mappedDataKV, setMappedDataKV] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [emptyNameError, setEmptyNameError] = useState<boolean>(false);
  const [url, setUrl] = React.useState<string>("");

  const handleChange = (event: any, newAnalyzedType: any) => {
    setAnalyzedType(newAnalyzedType);
  };

  const onFileChange = (e: any) => {
    if (e.target.files[0].name.endsWith(".pdf")) {
      setFile(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e) {
        setPdf(
          String(e.target?.result).replace("data:application/pdf;base64,", "")
        );
      };
    }
  }, [file]);

  const fetchMappingFields = () => {
    // request.get(KV_ENDPOINT + `/templateMappingFields`).then(({ data }) => {
    //   if (!data.error) {
    //     const newFields = data.data.reduce(
    //       (a, b) => {
    //         return {
    //           ...a,
    //           [b.value]: mappedData[b.value] || "",
    //         };
    //       },
    //       {
    //         detectFields: mappedData["detectFields"] || [],
    //       }
    //     );
    //     setMappedData(newFields);
    //     setMappedDataKV(data.data || []);
    //   }
    // });
  };

  React.useEffect(() => {
    // if (templateId) {
    //   request.get(TEMPLATE_ENDPOINT + `/${templateId}`).then(({ data }) => {
    //     if (!data.error) {
    //       setPdf(data.data.pdf);
    //       if (data.data.analyzedData) {
    //         const jsonString = Buffer.from(
    //           data.data.analyzedData,
    //           "base64"
    //         ).toString();
    //         setAnalyzedData(JSON.parse(jsonString));
    //       }
    //       setTemplateName(data.data.name);
    //       request.get(KV_ENDPOINT + `/templateMappingFields`).then((res) => {
    //         if (!res.data.error) {
    //           const newMappedData = (res.data.data || []).reduce(
    //             (a, b) => {
    //               return {
    //                 ...a,
    //                 [b.value]: data.data?.mapping?.[b.value] || "",
    //               };
    //             },
    //             {
    //               detectFields: data.data.mapping["detectFields"] || [],
    //             }
    //           );
    //           setMappedData(newMappedData);
    //           const labels = res.data.data.reduce(
    //             (a, b) => {
    //               return {
    //                 ...a,
    //                 [b.value]: b.label,
    //               };
    //             },
    //             {
    //               companyName: "Company Name",
    //               createdAt: "Created At",
    //               detectFields: "Detect Fields",
    //             }
    //           );
    //           setMappedDataLabel(labels);
    //         } else {
    //           setMappedData(data.data.mapping);
    //         }
    //       });
    //     }
    //     // fetchMappingFields();
    //   });
    //   request.get(KV_ENDPOINT + `/templateMappingFields`).then(({ data }) => {
    //     if (!data.error) {
    //       const newFields = data.data.reduce((a, b) => {
    //         return {
    //           ...a,
    //           [b.value]: "",
    //         };
    //       }, {});
    //       setMappedDataKV(data.data);
    //       const labels = data.data.reduce(
    //         (a, b) => {
    //           return {
    //             ...a,
    //             [b.value]: b.label,
    //           };
    //         },
    //         {
    //           companyName: "Company Name",
    //           createdAt: "Created At",
    //           detectFields: "Detect Fields",
    //         }
    //       );
    //       setMappedDataLabel(labels);
    //     }
    //   });
    // } else {
    //   request.get(KV_ENDPOINT + `/templateMappingFields`).then((res) => {
    //     if (!res.data.error) {
    //       const newMappedData = (res.data.data || []).reduce(
    //         (a, b) => {
    //           return {
    //             ...a,
    //             [b.value]: "",
    //           };
    //         },
    //         {
    //           detectFields: [],
    //         }
    //       );
    //       setMappedData(newMappedData);
    //       setMappedDataKV(res.data.data);
    //       const labels = res.data.data.reduce(
    //         (a, b) => {
    //           return {
    //             ...a,
    //             [b.value]: b.label,
    //           };
    //         },
    //         {
    //           companyName: "Company Name",
    //           createdAt: "Created At",
    //           detectFields: "Detect Fields",
    //         }
    //       );
    //       setMappedDataLabel(labels);
    //     } else {
    //       setMappedData(initialMappingFields);
    //     }
    //   });
    // }
  }, [templateId]);

  const formatBytes = (bytes: any, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const analyzeDocument = () => {
    // setLoading(true);
    // request
    //   .post(DOCUMENT_ENDPOINT + "/analyze-document", {
    //     document: pdf,
    //   })
    //   .then(({ data }: any) => {
    //     if (!data.error) {
    //       setAnalyzedData(data.data);
    //     }
    //     console.log({ data });
    //   })
    //   .catch((error) => {
    //     console.log({ error: error.message });
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  React.useEffect(() => {
    setEmptyNameError(false);
  }, [templateName]);

  const saveTemplate = () => {
    if (!templateName) {
      setEmptyNameError(true);
    } else {
      const objToB64 = Buffer.from(JSON.stringify(anaylzedData)).toString(
        "base64"
      );
      const payload = {
        referenceId: id,
        pdf,
        mapping: mappedData,
        analyzedData: anaylzedData ? objToB64 : "",
        name: templateName,
      };
      if (templateId) {
        //     request
        //       .put(TEMPLATE_ENDPOINT + `/${templateId}`, payload)
        //       .then(({ data }) => {
        //         if (data.error) {
        //           showNotification({
        //             title: data.message,
        //             type: "error",
        //           });
        //         } else {
        //           navigate(pathname.replace(/\/template.*/, "") + search);
        //         }
        //       });
        //   } else {
        //     request.post(TEMPLATE_ENDPOINT, payload).then(({ data }) => {
        //       if (data.error) {
        //         showNotification({
        //           title: data.message,
        //           type: "error",
        //         });
        //       } else {
        //         navigate(pathname.replace("/template", "") + search);
        //       }
        //     });
      }
    }
  };

  const analyzeTypeRender = React.useMemo(() => {
    if (analyzedType === ANALYZED_TYPE.MAPPING) {
      return (
        <AnalyzedRender
          data={mappedData}
          templateName={templateName}
          setTemplateName={setTemplateName}
          emptyNameError={emptyNameError}
          fetchMappingFields={fetchMappingFields}
          mappedDataLabel={mappedDataLabel}
        />
      );
    }
    if (!anaylzedData) return null;
    if (analyzedType === ANALYZED_TYPE.KEY_VALUE) {
      return (
        <AnalyzedKeyValueRender
          data={anaylzedData["kvs"]}
          setMappedData={setMappedData}
          mappedData={mappedData}
          mappedFields={mappedDataKV}
        />
      );
    }
    if (analyzedType === ANALYZED_TYPE.TABLE) {
      return <AnalyzedTableRender data={anaylzedData["tables"]} />;
    }
    if (analyzedType === ANALYZED_TYPE.TEXT) {
      return (
        <AnalyzedLineRender
          data={anaylzedData["lines"]}
          setMappedData={setMappedData}
          mappedData={mappedData}
        />
      );
    }
  }, [
    analyzedType,
    anaylzedData,
    mappedData,
    emptyNameError,
    templateName,
    mappedDataKV,
  ]);

  React.useEffect(() => {
    const blob = base64ToBlob(pdf, "application/pdf");
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
  }, [pdf]);

  return (
    <Box className="">
      {templateId ? null : (
        <Box className="flex gap-x-3 items-center h-[100%]">
          <Button
            component="label"
            variant="contained"
            className="w-[130px] whitespace-nowrap"
          >
            Choose File
            <input
              hidden
              accept="application/pdf"
              type="file"
              onChange={onFileChange}
            />
          </Button>
          <span>
            {file
              ? `${file.name} (${formatBytes(file.size)})`
              : "No file chosen"}
          </span>
        </Box>
      )}
      {file || pdf ? (
        <>
          <Box className="mt-[10px] flex justify-between items-center">
            <Button
              component="label"
              variant="contained"
              onClick={analyzeDocument}
              color="success"
              disabled={loading}
            >
              Analyze document
            </Button>
            <Button
              component="label"
              variant="contained"
              onClick={saveTemplate}
              color="primary"
              disabled={loading}
            >
              Save template
            </Button>
          </Box>
          <Box className="flex justify-between mt-4">
            <Box className="flex-[0_0_49%]">
              {url ? (
                <div
                  style={{
                    height: "100vh",
                  }}
                >
                  <PDFViewer url={url} />
                </div>
              ) : null}
            </Box>
            <Box className="flex flex-col gap-y-2 flex-[0_0_49%]">
              <ToggleButtonGroup
                color="primary"
                value={analyzedType}
                exclusive
                onChange={handleChange}
                aria-label="Analyzed Type"
              >
                <ToggleButton value={ANALYZED_TYPE.TEXT}>Text</ToggleButton>
                <ToggleButton value={ANALYZED_TYPE.KEY_VALUE}>
                  Key value
                </ToggleButton>
                <ToggleButton value={ANALYZED_TYPE.TABLE}>Table</ToggleButton>
                <ToggleButton value={ANALYZED_TYPE.MAPPING}>
                  Mapping
                </ToggleButton>
              </ToggleButtonGroup>
              {loading ? (
                <Box className={"w-full flex items-center justify-center"}>
                  <CircularProgress />
                </Box>
              ) : null}
              {analyzeTypeRender}
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

const MenuComponent = ({
  menus,
  children,
  handleMenuItemClick = () => undefined,
}: any) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (value: any) => {
    handleMenuItemClick(value);
    handleClose();
  };

  const menusRender = menus
    .sort((a: any, b: any) => a.value.localeCompare(b.value))
    .map(({ value, label }: any) => {
      return (
        <MenuItem key={value} onClick={() => onMenuItemClick(value)}>
          {label}
        </MenuItem>
      );
    });

  return (
    <>
      <Button onClick={handleClick}>{children}</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menusRender}
      </Menu>
    </>
  );
};

const AnalyzedKeyValueRender = ({
  data,
  setMappedData,
  mappedData,
  isDetectFields,
  mappedFields,
}: any) => {
  const [page, setPage] = useState(0);

  const total = Object.keys(data).length;

  const headersRender = ["KEY", "VALUE"].map((el) => {
    return <TableCell key={el}>{el}</TableCell>;
  });

  const rowsRender = Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .slice(page * 10, (page + 1) * 10)
    .map((key: any) => {
      const hasKey = mappedData.detectFields.some((el: any) => el === key);
      return (
        <TableRow
          key={key}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">
            <Box className={"group"}>
              <Box className={"relative inline-block"}>
                {key}
                {!isDetectFields ? (
                  <Box
                    className={
                      "absolute top-[50%] left-[100%] bg-[#fff] translate-y-[-50%] [&>svg]:w-5 cursor-pointer hidden group-hover:block test"
                    }
                  >
                    <MenuComponent
                      menus={mappedFields}
                      handleMenuItemClick={(value: any) => {
                        setMappedData({
                          ...mappedData,
                          [value]: key,
                        });
                      }}
                    >
                      <span className={"whitespace-nowrap"}>Set as</span>
                    </MenuComponent>
                  </Box>
                ) : (
                  <Tooltip
                    title={
                      hasKey
                        ? "Remove from detectFields"
                        : "Add to detectFields"
                    }
                  >
                    <Box
                      className={
                        "absolute top-[50%] left-[110%] translate-y-[-50%] [&>svg]:w-5 cursor-pointer hidden group-hover:block test"
                      }
                      onClick={() => {
                        const newDetectFields = hasKey
                          ? mappedData.detectFields.filter(
                              (el: any) => el !== key
                            )
                          : [...mappedData.detectFields, key];
                        setMappedData((prevState: any) => {
                          return {
                            ...prevState,
                            detectFields: newDetectFields,
                          };
                        });
                      }}
                    >
                      <Icons name={hasKey ? "minus" : "plus"} />
                    </Box>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </TableCell>
          <TableCell align="left">{data[key]}</TableCell>
        </TableRow>
      );
    });

  const handleChangePage = (_: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <Paper
      className={
        "pb-3 border-[1px] border-solid border-[#4c4e641f] rounded-[15px]"
      }
    >
      <TableContainer>
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#F5F5F7" }}>
            <TableRow>{headersRender}</TableRow>
          </TableHead>
          <TableBody>{rowsRender}</TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={total}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

const AnalyzedLineRender = ({ data, setMappedData, mappedData }: any) => {
  const [page, setPage] = useState(0);

  const total = data.length;

  const headersRender = ["TEXT"].map((el) => {
    return <TableCell key={el}>{el}</TableCell>;
  });

  const rowsRender = data.slice(page * 10, (page + 1) * 10).map((key: any) => {
    const hasKey = mappedData.detectFields.includes(key);
    return (
      <TableRow
        key={key}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="left">
          <Box className={"group"}>
            <Box className={"relative inline-block"}>
              {key}
              <Tooltip
                title={
                  hasKey ? "Remove from detectFields" : "Add to detectFields"
                }
              >
                <Box
                  className={
                    "absolute top-[50%] left-[110%] translate-y-[-50%] [&>svg]:w-5 cursor-pointer hidden group-hover:block test"
                  }
                  onClick={() => {
                    const newDetectFields = hasKey
                      ? mappedData.detectFields.filter((el: any) => el !== key)
                      : [...mappedData.detectFields, key];
                    setMappedData((prevState: any) => {
                      return {
                        ...prevState,
                        detectFields: newDetectFields,
                      };
                    });
                  }}
                >
                  <Icons name={hasKey ? "minus" : "plus"} />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    );
  });

  const handleChangePage = (_: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <Paper
      className={
        "pb-3 border-[1px] border-solid border-[#4c4e641f] rounded-[15px]"
      }
    >
      <TableContainer>
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#F5F5F7" }}>
            <TableRow>{headersRender}</TableRow>
          </TableHead>
          <TableBody>{rowsRender}</TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={total}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

const AnalyzedRender = ({
  data,
  templateName,
  setTemplateName,
  emptyNameError,
  fetchMappingFields,
  mappedDataLabel,
}: any) => {
  // const request = getRequest();

  const headersRender = ["FIELD", "MAPPED"].map((el) => {
    return <TableCell key={el}>{el}</TableCell>;
  });

  const handleRemoveField = (key: any) => {
    // request
    //   .delete(KV_ENDPOINT + `/templateMappingFields/` + key)
    //   .then(({ data }) => {
    //     if (!data.error) {
    //       fetchMappingFields();
    //     }
    //   });
  };

  const rowsRender = Object.keys(data).map((key: any) => {
    return (
      <TableRow
        key={key}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="left">
          <Box className={"group"}>
            <Box className={"relative inline-block"}>
              {mappedDataLabel[key] || key}
              {!["detectFields", "invoiceId", "issueDate"].includes(key) ? (
                <Box
                  className={
                    "absolute top-[50%] left-[110%] translate-y-[-50%] [&>svg]:w-5 cursor-pointer hidden group-hover:block test"
                  }
                >
                  <Button onClick={() => handleRemoveField(key)}>Remove</Button>
                </Box>
              ) : null}
            </Box>
          </Box>
        </TableCell>
        <TableCell align="left">{[].concat(data[key]).join(", ")}</TableCell>
      </TableRow>
    );
  });

  const [newFieldInput, setNewFieldInput] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleAddItem = () => {
    if (newFieldInput) {
      // request
      //   .post(KV_ENDPOINT + `/templateMappingFields`, {
      //     label: newFieldInput,
      //     value: newFieldInput,
      //   })
      //   .then(({ data }) => {
      //     if (!data.error) {
      //       fetchMappingFields();
      //     }
      //   })
      //   .finally(() => {
      //     handleClose();
      //   });
    }
  };

  return (
    <>
      <Box className={"flex flex-col"}>
        <TextField
          error={emptyNameError}
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder={"Enter a template name"}
          helperText={emptyNameError ? "This field is required" : ""}
        />
      </Box>
      <Paper
        className={
          "pb-3 border-[1px] border-solid border-[#4c4e641f] rounded-[15px]"
        }
      >
        <TableContainer>
          <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#F5F5F7" }}>
              <TableRow>{headersRender}</TableRow>
            </TableHead>
            <TableBody>{rowsRender}</TableBody>
          </MuiTable>
        </TableContainer>
      </Paper>
      <Box>
        <Button onClick={handleClick}>
          <Icons name={"plus"} />
          Add field
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box className="flex flex-col p-5">
            <TextField
              helperText="Please enter the field name"
              label="Field"
              value={newFieldInput}
              onChange={(e) => setNewFieldInput(e.target.value)}
            />
            <Box className="flex justify-end mt-2">
              <Button variant="contained" onClick={handleAddItem}>
                Save
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>
    </>
  );
};

const AnalyzedTableRender = ({ data }: any) => {
  const [table, setTable] = useState(0);
  const [page, setPage] = useState(0);

  const total = (data[table] || []).slice(1).length;

  const headersRender =
    ((data[table] || [])[0] || []).map((el: any) => {
      return <TableCell key={el}>{el}</TableCell>;
    }) || null;

  const rowsRender = (data[table] || [])
    .slice(page * 10 + 1, (page + 1) * 10 + 1)
    .map((el: any, idx: number) => {
      return (
        <TableRow
          key={el + idx}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {el.map((ele: any, index: any) => {
            return (
              <TableCell align="left" key={ele + index}>
                {ele}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });

  const handleChangePage = (_: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChange = (event: any, newTable: any) => {
    setTable(newTable);
  };

  return (
    <Box className="flex flex-col gap-y-3">
      <ToggleButtonGroup
        color="primary"
        value={table}
        exclusive
        onChange={handleChange}
        aria-label="Analyzed Type"
      >
        {Array.from({ length: data.length }, (_, index) => {
          return (
            <ToggleButton key={`table_${index}`} value={index}>
              Table {index + 1}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <Paper
        className={
          "pb-3 border-[1px] border-solid border-[#4c4e641f] rounded-[15px]"
        }
      >
        <TableContainer>
          <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#F5F5F7" }}>
              <TableRow>{headersRender}</TableRow>
            </TableHead>
            <TableBody>{rowsRender}</TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={total}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};

export default AnalyzeDocument;
