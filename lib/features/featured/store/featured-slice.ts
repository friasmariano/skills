import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FeaturedCardId = "interview" | "frontend" | "react" | "typescript";
const initialState: { focusedCardId: FeaturedCardId } = { focusedCardId: "interview" };

const featuredSlice = createSlice({
  name: "featured",
  initialState,
  reducers: {
    setFocusedCard: (state, action: PayloadAction<FeaturedCardId>) => {
      state.focusedCardId = action.payload;
    },
  },
});

export const { setFocusedCard } = featuredSlice.actions;
export default featuredSlice.reducer;
