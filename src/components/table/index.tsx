"use client";
import * as React from "react";

import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { get, uniq } from "lodash";
import { SearchCriteria } from "./search-criteria";
import { Button, Checkbox } from "@mui/material";
import { convertRowValue } from "../utils/helper/table";
import Cookies from "js-cookie";
import { EtableConfigType } from "../utils/types/etable-config";
import axios from "axios";

const Table = ({
  config,
  endpoint,
  children,
}: {
  config: EtableConfigType;
  endpoint?: string;
  children?: any;
}) => {
  const [rows, setRows] = React.useState<any>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState([]);
  const [listInvoiceDelete, setListInvoiceDelete] = React.useState<any>([]);
  const [deleting, setDeleting] = React.useState<Boolean>(false);
  const [isCheckAll, setIsCheckAll] = React.useState<Boolean>(false);
  const colAlignCenter = ["totalTemplates"];
  const [isClickSearch, setIsClickSearch] = React.useState<Boolean>(false);
  const [totalSearch, setTotalSearch] = React.useState<Number>(0);

  const searchLS: any = get(
    JSON.parse(Cookies.get("searchCriteria") || '""'),
    `${config.keySearch}`,
    []
  );

  const fetchAPi = () => {
    axios(endpoint || config.endpoint || "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      method: "POST",
      data: JSON.stringify({
        pagination: {
          page: page + 1,
          rowsPerPage,
        },
        filters: searchLS.length > 0 ? searchLS : filters,
        isSearch: isClickSearch,
      }),
    })
      .then((res: any) => {
        setRows(res.data.data.rows);
        setTotal(res.data.data.pagination.total);
        if (isClickSearch) {
          setPage(0);
        }

        const fakeRows: any = [];
        if (location.pathname == "/users") {
          res?.data?.data?.rows.forEach((el: any, index: any) => {
            fakeRows[index] = { ...el, action: ["Edit", "Delete"] };
          });
          setRows(fakeRows);
        }
        const checkToSetTick = (res.data.data.rows || []).every((el: any) =>
          listInvoiceDelete.includes(el?._id)
        );
        checkToSetTick && res.data.data.rows?.length
          ? setIsCheckAll(true)
          : setIsCheckAll(false);
        setIsClickSearch(false);
      })
      .catch((e) => {});
  };

  React.useEffect(() => {
    fetchAPi();
  }, [page, rowsPerPage, filters]);

  React.useEffect(() => {
    const totalCount = searchLS.reduce((a: number, b: any) => {
      if (
        (typeof b?.value == "object" &&
          Object.values(b?.value).every((val) => !!val)) ||
        (typeof b?.value == "string" && b?.value)
      ) {
        a += 1;
      }
      return a;
    }, 0);

    setTotalSearch(totalCount);
  }, [searchLS]);

  const handleChangePage = (_: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefeshData = async () => {
    try {
      const data = await axios(endpoint || config.endpoint || "", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        method: "POST",
        data: JSON.stringify({
          pagination: {
            page: page + 1,
            rowsPerPage,
          },
          filters: searchLS.length > 0 ? searchLS : filters,
          isSearch: isClickSearch,
        }),
      });

      setRows(data.data.data.rows);
      setTotal(data.data.data.pagination.total);
    } catch (error) {}

    // request
    //   .post(endpoint || config.endpoint || "", {
    //     pagination: {
    //       page: page + 1,
    //       rowsPerPage,
    //     },
    //     filters: searchLS.length > 0 ? searchLS : filters,
    //   })
    //   .then((res) => {
    //     if (!res.data.error) {
    //     }
    //   });
  };

  const handleCheckAll = () => {
    if (rows) {
      setListInvoiceDelete((prev: any) => {
        return uniq([...prev, ...rows.map((el: any) => el?._id)]);
      });
    }
    if (isCheckAll) {
      rows.forEach((row: any) => {
        setListInvoiceDelete((prev: any) => {
          return prev.filter((el: any) => el != row?._id);
        });
      });
    }
    setIsCheckAll(!isCheckAll);
  };

  const handleCheckBox = (id: any) => {
    if (listInvoiceDelete.includes(id)) {
      setListInvoiceDelete((prev: any) => {
        return prev.filter((el: any) => el != id);
      });
    } else {
      setListInvoiceDelete([...listInvoiceDelete, id]);
    }
  };
  const headersRender = config.colDefs.map((el: any) => {
    if (el.colId == "checkBox") {
      return (
        <TableCell key={el.colId}>
          <Checkbox
            color="primary"
            onChange={handleCheckAll}
            defaultChecked={isCheckAll ? true : false}
            checked={isCheckAll ? true : false}
          />
        </TableCell>
      );
    }
    return <TableCell key={el.colId}>{el.title}</TableCell>;
  });

  const rowsRender = rows.map((row: any) => {
    return (
      <TableRow
        key={row._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {config.colDefs.map((cellConfig: any) => {
          const CellComponent = cellConfig.component;
          if (CellComponent) {
            if (cellConfig.colId == "actionDelete") {
              return (
                <TableCell align="left" key={cellConfig.colId}>
                  <CellComponent
                    key={cellConfig.colId}
                    id={row._id}
                    refreshData={handleRefeshData}
                  />
                </TableCell>
              );
            }
            return (
              <TableCell align="left" key={cellConfig.colId}>
                <CellComponent
                  key={cellConfig.colId}
                  cellConfig={cellConfig}
                  row={row}
                />
              </TableCell>
            );
          }
          if (cellConfig.colId == "checkBox") {
            return (
              <TableCell align="left" key={cellConfig.colId}>
                <Checkbox
                  color="primary"
                  onChange={() => handleCheckBox(row._id)}
                  checked={listInvoiceDelete.includes(row._id)}
                />
              </TableCell>
            );
          }
          return (
            <TableCell
              align={
                colAlignCenter.includes(cellConfig.colId) ? "center" : "left"
              }
              key={cellConfig.colId}
            >
              {convertRowValue(row[cellConfig.colId], cellConfig.type)}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

  const handleDeleteMuiltiInvoice = async () => {
    const noti = confirm("Do you want to remove invoices?");
    if (noti) {
      setDeleting(true);
      try {
        await axios("/api/v1/invoices/multiple/delete", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          method: "DELETE",
          data: JSON.stringify({
            list: listInvoiceDelete,
          }),
        });

        setDeleting(false);
        handleRefeshData();
        setListInvoiceDelete([]);
      } catch (error) {
        setDeleting(false);
        // "Error Delete: ", e.message;
      }

      // request
      //   .delete("/invoice/multiple/delete", {
      //     data: {
      //       list: listInvoiceDelete,
      //     },
      //   })
      //   .then((res) => {
      //     if (!res.data.error) {
      //       setDeleting(false);
      //       handleRefeshData();
      //       setListInvoiceDelete([]);
      //     }
      //   })
      //   .catch((e) => {
      //     setDeleting(false);
      //     ("Error Delete: ", e.message);
      //   });
    }
  };

  return (
    <Box>
      {children}
      <SearchCriteria
        colDefs={config.colDefs}
        setFilters={setFilters}
        keyCriteria={config.keySearch}
        setIsClick={setIsClickSearch}
        totalSearch={totalSearch}
      />
      {listInvoiceDelete.length ? (
        <Button
          variant="contained"
          style={{ marginBottom: "15px" }}
          color="error"
          className="bg-red-500"
          onClick={handleDeleteMuiltiInvoice}
          disabled={deleting ? true : false}
        >
          {`Delete ${listInvoiceDelete.length} Invoice`}
        </Button>
      ) : null}
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
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Table;
