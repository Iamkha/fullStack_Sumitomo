"use client";
import * as React from "react";
// Redux defination
import { useSelector, useDispatch } from "react-redux";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import logo from "../../assets/images/small-logo.jpg";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

import ListItems from "./list-items";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import Image from "next/image";
import {
  removeToken,
  setStatusDrawer,
  setUserId,
  setUserInfo,
} from "../features/user/userSlice";
import { RootState } from "@/app/store";

import Link from "next/link";
import axios from "axios";

const drawerWidth = 310;

const Header = styled("header", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#FFFFFF",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#FFFFFF",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(0),
      },
    }),
  },
}));

const mdTheme = createTheme();

function Layout({ pathname, children, open, setOpen }: any) {
  const router = useRouter();

  const toggleDrawer = () => {
    Cookies.set("showDrawer", !open ? "1" : "0");
    setOpen(!open);
    dispatch(setStatusDrawer(!open));
  };

  const token = useSelector((state: RootState) => state.user.token);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const title: any = React.useMemo(() => {
    if (pathname.split("/")[1]) {
      if (pathname.split("/")[1] == "invoices") {
        return "DOCUMENTS";
      }
      return pathname.split("/")[1].toUpperCase();
    } else {
      return "DASHBOARD";
    }
  }, [pathname]);

  const avatar = React.useMemo(() => {
    if (userInfo?.firstname) {
      return userInfo?.firstname.split("", 2).join("");
    }
    return "";
  }, [userInfo?.firstname]);

  const fetchAPi = async () => {
    try {
      const data: any = await axios(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/user/info",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          method: "GET",
        }
      );
      if (data) {
        dispatch(setUserInfo(data.data.data));
        dispatch(setUserId(data.data.data?._id || ""));
      }
    } catch (e: any) {
      handleSignout();
    }
  };

  const handleSignout = () => {
    dispatch(removeToken());
  };

  React.useEffect(() => {
    if (!token) {
      router.push("/signin");
    } else {
      fetchAPi();
      // request.get(USER_INFO_ENDPOINT).then((res: any) => {
      //   if (res.data.error) {
      //     handleSignout();
      //   } else {
      //     dispatch(setUserInfo(res.data.data));
      //     dispatch(setUserId(res.data.data?._id || ""));
      //   }
      // });
    }
  }, [token]);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header className="fixed h-16 w-full bg-grey-darker shadow flex items-center">
          <Box className="flex justify-between items-center gap-x-3 w-[310px] bg-[#FFFFFF] p-[0_15px] h-[inherit] border-r-[1px] border-r-[#e7e7e7] border-solid border-b-[0px] border-t-[0px] border-l-[0px]">
            <Link href={"/"}>
              <div className="flex flex-row justify-center items-center">
                <Box className="[&>img]:h-16">
                  <Image alt="logo" width={63} height={64} src={logo.src} />
                </Box>
                <Typography
                  component="h1"
                  variant="h6"
                  className="text-black border-none"
                  color="#00000"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Sumitomo Chemical
                </Typography>
              </div>
            </Link>
            {open ? (
              <KeyboardDoubleArrowLeftIcon
                onClick={toggleDrawer}
                className={"cursor-pointer"}
              />
            ) : (
              <KeyboardDoubleArrowRightIcon
                onClick={toggleDrawer}
                className={"cursor-pointer"}
              />
            )}
          </Box>
          <Box className="p-[0_20px] flex justify-between">
            <Typography
              component="h1"
              variant="h6"
              color="#000000"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title.split("-").join(" ")}
            </Typography>
          </Box>
        </Header>
        <Drawer variant="permanent" open={open} style={{ minHeight: "100vh" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          ></Toolbar>
          <Box
            className={"flex flex-row items-center gap-[20px] py-3 px-4 w-full"}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {avatar.toUpperCase()}
            </Avatar>
            <Box className="flex flex-col">
              <Typography variant="body1">{`${userInfo?.firstname} ${userInfo?.lastname}`}</Typography>
              <Typography variant="body2" color={"#7e8299"}>
                {`${userInfo?.email}`}
              </Typography>
              <Typography
                variant="caption"
                color={"#7e8299"}
                className="underline cursor-pointer"
                onClick={handleSignout}
              >
                Sign out
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box className={"flex flex-col justify-between h-full"}>
            <Box>
              <ListItems pathname={pathname} />
            </Box>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            paddingTop: "25px",
          }}
        >
          {/* <Toolbar /> */}
          <Box className={"px-4 pb-3 pt-14 bg-[#FFFFFF] min-h-[100%]"}>
            {/* <Outlet /> */}
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
