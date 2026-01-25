import type { Action, Reducer, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import { listsSlice } from "@/features/lists/listSlice";
import { RecordsSlice } from "@/features/records/recordSlice";
import { boardSlice } from "@/features/stores";

import { mainSlice } from "./AppMainSlice";
// import { examSlice } from "./features/exam/ExamSlice";
// export const listenerMiddleware = createListenerMiddleware();

// listenerMiddleware.startListening({
//   actionCreator: updateCompleted,
//   effect: async (action, listenerApi) => {
//     listenerApi.dispatch(
//       updateList({
//         id: action.payload.listId,
//         isCompleted: action.payload.done,
//       }),
//     );
//     listenerApi.cancelActiveListeners();
//   },
// });

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const combineReducers = combineSlices(
  boardSlice,
  listsSlice,
  RecordsSlice,
  mainSlice,
);
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // يمكنك تحديد أي slices تحفظها
  // whitelist: ["list", "record"], // فقط list و record
  // أو تستثني slices معينة
  // blacklist: ['someSlice']
};
const rootReducer: Reducer<ReturnType<typeof combineReducers>, Action> = (
  state,
  action,
) => {
  if (action.type === "RESET_ALL_STATE") {
    state = undefined; // Reset to initial state
  }
  return combineReducers(state, action);
};

// examSlice
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof combineReducers>;
const persistedReducer = persistReducer(persistConfig, rootReducer);

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};
export const store = makeStore();
export const persistor = persistStore(store);
// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
