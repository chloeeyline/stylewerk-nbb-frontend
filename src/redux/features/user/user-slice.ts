import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "~/redux/store";
import type { UserIsFailed, UserIsGuest, UserIsLoggedIn } from "./user-api";
import { autoLogin, login, logout, setup, fetchUserData } from "./user-api";
import type { UserData } from "./user-schemas";

export type UserState = {
    status: "guest" | "refresh" | "loggedIn" | "loggingIn" | "loggingOut" | "failed";
    dataStatus: "loading" | "empty" | "loaded" | "error";
    data?: UserData;
    username?: string;
    admin?: boolean;
    error?: {
        code: number;
        text: string;
    };
};

const initialState: UserState = setup();

export const getUserData = createAsyncThunk<
    UserData | false,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "user/getUserData",
    async () => {
        return await fetchUserData();
    },
    {
        condition(_arg, { getState }) {
            const user = selectUser(getState());

            if (user.dataStatus === "loading") {
                return false;
            }
        },
    },
);

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const refreshUser = createAsyncThunk<
    UserState,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "user/refreshUser",
    async () => {
        return await autoLogin();
    },
    {
        condition(_arg, { getState }) {
            const user = selectUser(getState());

            if (user.status === "loggingIn" || user.status === "loggedIn") {
                return false;
            }
        },
    },
);

export const loginUser = createAsyncThunk<
    UserIsLoggedIn | UserIsFailed,
    { username: string; password: string; consistOverSession: boolean },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "user/loginUser",
    async (credentials) => {
        return await login(credentials);
    },
    {
        condition(_arg, { getState }) {
            const user = selectUser(getState());

            if (user.status === "loggingIn" || user.status === "loggedIn") {
                return false;
            }
        },
    },
);

export const logoutUser = createAsyncThunk<
    UserIsGuest,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "user/logoutUser",
    async () => {
        return await logout();
    },
    {
        condition(_arg, { getState }) {
            const user = selectUser(getState());

            if (user.status !== "loggedIn") {
                return false;
            }
        },
    },
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.pending, (state) => {
                state.dataStatus = "loading";
                state.data = undefined;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                if (action.payload === false) {
                    state.dataStatus = "error";
                    state.data = undefined;
                    return;
                }

                state.dataStatus = "loaded";
                state.data = action.payload;
            })
            .addCase(getUserData.rejected, (state) => {
                state.dataStatus = "error";
                state.data = undefined;
            })
            .addCase(refreshUser.pending, (state) => {
                state.status = "loggingIn";
                state.dataStatus = "empty";
                state.data = undefined;
                state.username = undefined;
                state.admin = undefined;
                state.error = undefined;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                switch (action.payload.status) {
                    case "loggedIn":
                        state.status = "loggedIn";
                        state.username = action.payload.username;
                        state.admin = action.payload.admin;
                        state.error = undefined;
                        break;
                    case "failed":
                        state.status = "failed";
                        state.dataStatus = "empty";
                        state.data = undefined;
                        state.error = action.payload.error;
                        state.username = undefined;
                        state.admin = undefined;
                        break;
                    case "guest":
                    default:
                        state.status = "guest";
                        state.dataStatus = "empty";
                        state.data = undefined;
                        state.username = undefined;
                        state.admin = undefined;
                        state.error = undefined;
                        break;
                }
            })
            .addCase(refreshUser.rejected, (state, action) => {
                state.status = "failed";
                state.dataStatus = "empty";
                state.data = undefined;

                const code = Number(action.error?.code ?? "0");

                state.error = {
                    code: Number.isSafeInteger(code) ? code : 0,
                    text: action.error?.name ?? "",
                };
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loggingIn";
                state.dataStatus = "empty";
                state.data = undefined;
                state.username = undefined;
                state.admin = undefined;
                state.error = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                switch (action.payload.status) {
                    case "loggedIn":
                        state.status = "loggedIn";
                        state.username = action.payload.username;
                        state.admin = action.payload.admin;
                        state.error = undefined;
                        break;
                    case "failed":
                        state.status = "failed";
                        state.dataStatus = "empty";
                        state.data = undefined;
                        state.error = action.payload.error;
                        state.username = undefined;
                        state.admin = undefined;
                        break;
                    default:
                        state.status = "guest";
                        state.dataStatus = "empty";
                        state.data = undefined;
                        state.username = undefined;
                        state.admin = undefined;
                        state.error = undefined;
                        break;
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.dataStatus = "empty";
                state.data = undefined;

                const code = Number(action.error?.code ?? "0");

                state.error = {
                    code: Number.isSafeInteger(code) ? code : 0,
                    text: action.error?.name ?? "",
                };
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = "loggingOut";
                state.dataStatus = "empty";
                state.data = undefined;
                state.username = undefined;
                state.admin = undefined;
                state.error = undefined;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = "guest";
                state.dataStatus = "empty";
                state.data = undefined;
                state.username = undefined;
                state.admin = undefined;
                state.error = undefined;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.status = "guest";
                state.dataStatus = "empty";
                state.data = undefined;
                state.username = undefined;
                state.admin = undefined;
                state.error = undefined;
            });
    },
});

// export const {  } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
