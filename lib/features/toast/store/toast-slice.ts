import { createSlice } from "@reduxjs/toolkit";
import ToastState from "@/types/ToastState";
import { PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

const initialState: ToastState = {
  data: {
    isVisible: false,
    message: "",
    type: "success",
    duration: 3000,
    isClosable: false,
  },
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state) => {
      state.data.isVisible = true;
    },
    hideToast: (state) => {
      state.data.isVisible = false;
    },
    setToastMessage: (state, action: PayloadAction<string>) => {
      state.data.message = action.payload;
    },
    setToastType: (state, action: PayloadAction<"success" | "error" | "info">) => {
      state.data.type = action.payload;
    },
    setToastDuration: (state, action: PayloadAction<number>) => {
      state.data.duration = action.payload;
    },
    setToastClosable: (state, action: PayloadAction<boolean>) => {
      state.data.isClosable = action.payload;
    },
    setToast: (state,
               action: PayloadAction<{ message: string; type: "success" | "error" | "info"; duration?: number;}>,
    ) => {
      state.data.message = action.payload.message;
      state.data.type = action.payload.type;
      state.data.duration = action.payload.duration || 3000;

      state.data.isVisible = true;
    },
  },
});

export const { showToast, hideToast, setToastMessage, setToastType, setToast } =
  toastSlice.actions;
export default toastSlice.reducer;
