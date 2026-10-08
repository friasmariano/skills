import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { togglPreparationSteps } from "@/config/preparationPaths";
import { togglArchitectureLessons } from "@/config/togglArchitectureStudy";

export type Opportunity = {
  id: string;
  role: string;
  company: string;
  nextStep: string;
};

type OpportunitiesState = {
  items: Opportunity[];
  priorityId: string | null;
  focusedId: string | null;
  completedPreparationSteps?: Record<string, string[]>;
  completedArchitectureItems?: Record<string, string[]>;
};

export const initialOpportunitiesState: OpportunitiesState = {
  items: [
    {
      id: "toggl-senior-full-stack",
      role: "Senior Full Stack Engineer",
      company: "Toggl",
      nextStep: "To be confirmed",
    },
    {
      id: "truelogic-front-end",
      role: "Front End position",
      company: "Truelogic",
      nextStep: "To be confirmed",
    },
  ],
  priorityId: "toggl-senior-full-stack",
  focusedId: "toggl-senior-full-stack",
};

const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState: initialOpportunitiesState,
  reducers: {
    toggleArchitectureItem: (state, action: PayloadAction<{ opportunityId: string; itemId: string }>) => {
      const { opportunityId, itemId } = action.payload;
      if (opportunityId !== "toggl-senior-full-stack" || !state.items.some(item => item.id === opportunityId)) return;
      if (itemId !== "breaks-review" && !togglArchitectureLessons.some(lesson => lesson.id === itemId)) return;
      state.completedArchitectureItems ??= {};
      const completed = state.completedArchitectureItems[opportunityId] ?? [];
      state.completedArchitectureItems[opportunityId] = completed.includes(itemId)
        ? completed.filter(id => id !== itemId)
        : [...completed, itemId];
    },
    togglePreparationStep: (state, action: PayloadAction<{ opportunityId: string; stepId: string }>) => {
      const { opportunityId, stepId } = action.payload;
      if (opportunityId !== "toggl-senior-full-stack" || !state.items.some(item => item.id === opportunityId)) return;
      if (!togglPreparationSteps.some(step => step.id === stepId)) return;
      state.completedPreparationSteps ??= {};
      const completed = state.completedPreparationSteps[opportunityId] ?? [];
      state.completedPreparationSteps[opportunityId] = completed.includes(stepId)
        ? completed.filter(id => id !== stepId)
        : [...completed, stepId];
    },
    addOpportunity: (state, action: PayloadAction<Opportunity>) => {
      if (state.items.some(item => item.id === action.payload.id)) return;
      state.items.push(action.payload);
      if (state.items.length === 1) {
        state.priorityId = action.payload.id;
        state.focusedId = action.payload.id;
      }
    },
    setPriorityOpportunity: (state, action: PayloadAction<string>) => {
      if (state.items.some(item => item.id === action.payload)) {
        state.priorityId = action.payload;
      }
    },
    setFocusedOpportunity: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null || state.items.some(item => item.id === action.payload)) {
        state.focusedId = action.payload;
      }
    },
  },
});

export const { addOpportunity, setPriorityOpportunity, setFocusedOpportunity, togglePreparationStep, toggleArchitectureItem } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;
