import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import errorReducer from "./features/error/errorSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        error: errorReducer,
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
