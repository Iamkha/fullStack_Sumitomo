// import { Error } from './globalMessages';
import { createSlice } from "@reduxjs/toolkit";

interface Message {
  key: string;
  title: string;
  messages: string[];
  type: "success" | "error" | "warning" | "info";
}
export interface MessageState {
  message: Message[];
}

const initialState: MessageState = {
  message: [],
};
export const useSliceMessage = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message.push(action.payload);
    },
    removeOneMessage: (state, action) => {
      state.message = action.payload;
      // const abc = state.message.filter((el) => el.key != action.payload);
      // console.log(action.payload);
    },
    removeAllMessage: (state) => {
      state.message = [];
    },
  },
});

export const { setMessage, removeOneMessage, removeAllMessage } =
  useSliceMessage.actions;

export default useSliceMessage.reducer;
