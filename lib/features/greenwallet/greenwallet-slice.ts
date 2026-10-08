import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { checklistSections } from './checklist';

type ChecklistState = {
  completed: Record<string, boolean>;
  collapsed: Record<string, boolean>;
};

const initialState: ChecklistState = { completed: {}, collapsed: {} };
const itemIds = new Set(checklistSections.flatMap(section => section.items.map(item => item.id)));

const greenwalletSlice = createSlice({
  name: 'greenwallet',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<string>) {
      if (itemIds.has(action.payload)) state.completed[action.payload] = !state.completed[action.payload];
    },
    toggleSection(state, action: PayloadAction<string>) {
      state.collapsed[action.payload] = !state.collapsed[action.payload];
    },
    setAllCollapsed(state, action: PayloadAction<boolean>) {
      checklistSections.forEach(section => { state.collapsed[section.id] = action.payload; });
    },
  },
});

export const { toggleItem, toggleSection, setAllCollapsed } = greenwalletSlice.actions;
export default greenwalletSlice.reducer;
