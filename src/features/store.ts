import { configureStore } from "@reduxjs/toolkit";

import formReducer from "./form/formSlice";
import builderReducer from "./builder/builderSlice";
import historyReducer from "./builder/historySlice";
import notificationReducer from "./notification/notificationSlice";
import loadingReducer from "./loading/loadingSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    builder: builderReducer,
    history: historyReducer,
    notification: notificationReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "builder/setForms",
          "builder/addForm",
          "builder/updateForm",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
