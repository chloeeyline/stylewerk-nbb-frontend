import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user-slice";
import templateReducer from "./features/template/template-slice";
import editorSlice from "./features/editor/editor-slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        template: templateReducer,
        editor: editorSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
