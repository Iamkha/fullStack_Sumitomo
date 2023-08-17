import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface UserInfoInterface {
  active: number;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
}
export interface UserState {
  token: string;
  userInfo: UserInfoInterface | null;
  statusDrawer: boolean;
  userId: string;
}
const initialState: UserState = {
  token: Cookies.get("token") || "",
  userInfo: {
    active: 0,
    email: "",
    firstname: "",
    lastname: "",
    roles: [],
  },
  statusDrawer: Cookies.get("showDrawer") === "1" ? true : false,
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      Cookies.set("token", action.payload);
    },
    removeToken: (state) => {
      state.token = "";
      Cookies.set("token", "");
      Cookies.set("userId", "");
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      Cookies.set("userId", action.payload);
    },
    setUserInfo: (state, action: PayloadAction<UserInfoInterface | null>) => {
      state.userInfo = action.payload;
    },
    setStatusDrawer: (state, action: PayloadAction<boolean>) => {
      state.statusDrawer = action.payload;
    },
  },
});

export const {
  setToken,
  removeToken,
  setUserInfo,
  setStatusDrawer,
  setUserId,
} = userSlice.actions;

export default userSlice.reducer;
