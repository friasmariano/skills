import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import themeReducer from "./features/theme/store/theme-slice";
import toastReducer from "./features/toast/store/toast-slice";
import featuredReducer from "./features/featured/store/featured-slice";
import greenwalletReducer from "./features/greenwallet/greenwallet-slice";
import opportunitiesReducer, { initialOpportunitiesState } from "./features/opportunities/store/opportunities-slice";

const rootReducer = combineReducers({
  theme: themeReducer,
  toast: toastReducer,
  featured: featuredReducer,
  opportunities: opportunitiesReducer,
  greenwallet: greenwalletReducer,
});

const persisteConfig = {
  key: "root",
  storage,
  version: 1,
  migrate: createMigrate({
    1: (state) => {
      if (!state) return state;
      const previous = state as typeof state & { opportunities?: { items?: unknown[] } };
      if (previous.opportunities?.items?.length) return state;
      return { ...state, opportunities: initialOpportunitiesState };
    },
  }),
};

const persistedReducer = persistReducer(persisteConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppPersistor = ReturnType<typeof makeStore>["persistor"];
export type AppDispatch = AppStore["dispatch"];
