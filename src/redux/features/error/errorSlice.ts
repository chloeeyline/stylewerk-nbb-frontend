import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/redux/store";

export type ErrorState = {
    error: null | Error;
};

const initialState: ErrorState = {
    error: null,
};


export const errorSlice = createSlice({
    name: "error",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setError: (state, action: PayloadAction<Error | null>) => {
            state.error = action.payload;
        },
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectError = (state: RootState) => state.error.error;

export default errorSlice.reducer;
