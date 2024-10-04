import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Backend from "~/constants/backend-routes";
import type { AppDispatch, RootState } from "~/redux/store";
import type { Paging } from "~/schemas/paging";
import Ajax from "~/utils/ajax";
import type { Template, TemplateItem, TemplateSearchParams } from "./template-schemas";
import { templatePagingSchema, templateSchema } from "./template-schemas";

type TemplateState = {
    status: "idle" | "loading" | "succeeded" | "failed";
    paging: Paging;
    items?: TemplateItem[];
    filter: TemplateSearchParams;
    detail?: Template;
    hideFilters: boolean;
    hideList: boolean;
};

const initialState: TemplateState = {
    status: "idle",
    paging: {
        page: 0,
        perPage: 20,
        count: 0,
        maxPage: 0,
    },
    filter: {},
    hideFilters: false,
    hideList: false,
};

const refreshTemplateList = (template: TemplateState) =>
    Ajax.get(Backend.Template.List, {
        search: {
            page: template.paging.page.toString(),
            perPage: template.paging.perPage.toString(),
            ...template.filter,
        },
        auth: true,
    });

export const listTemplates = createAsyncThunk<
    TemplateState,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "template/list",
    async (_arg, thunkApi) => {
        const template = selectTemplate(thunkApi.getState());

        const response = await refreshTemplateList(template);

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = templatePagingSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        return {
            ...template,
            status: "succeeded",
            paging: result.data.paging,
            items: result.data.items,
        };
    },
    {
        condition(_arg, { getState }) {
            const template = selectTemplate(getState());

            if (template.status === "loading") {
                return false;
            }
        },
    },
);

export const detailTemplates = createAsyncThunk<
    TemplateState,
    { id: string },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "template/detail",
    async ({ id }, thunkApi) => {
        const template = selectTemplate(thunkApi.getState());

        const response = await Ajax.get(Backend.Template.Details, {
            search: {
                id,
            },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = templateSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        return {
            ...template,
            status: "succeeded",
            detail: result.data,
        };
    },
    {
        condition(_arg, { getState }) {
            const template = selectTemplate(getState());

            if (template.status === "loading") {
                return false;
            }
        },
    },
);

export const updateTemplates = createAsyncThunk<
    TemplateState,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "template/update",
    async (_arg, thunkApi) => {
        const template = selectTemplate(thunkApi.getState());
        const response = await Ajax.post(Backend.Template.Update, {
            body: template.detail,
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = templateSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        return {
            ...template,
            status: "succeeded",
            detail: result.data,
        };
    },
    {
        condition(_arg, { getState }) {
            const template = selectTemplate(getState());

            if (template.status === "loading") {
                return false;
            }
        },
    },
);

export const removeTemplates = createAsyncThunk<
    TemplateState,
    { id: string },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "template/remove",
    async ({ id }, thunkApi) => {
        const template = selectTemplate(thunkApi.getState());

        const response = await Ajax.post(Backend.Template.Remove, {
            search: {
                id,
            },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const refreshResponse = await refreshTemplateList(template);

        if (refreshResponse.ok === false) {
            return thunkApi.rejectWithValue(refreshResponse.error);
        }

        const refreshResult = templatePagingSchema.safeParse(refreshResponse.result);

        if (refreshResult.success === false) {
            return thunkApi.rejectWithValue(refreshResult.error);
        }

        return {
            ...template,
            status: "succeeded",
            paging: refreshResult.data.paging,
            items: refreshResult.data.items,
        };
    },
    {
        condition(_arg, { getState }) {
            const template = selectTemplate(getState());

            if (template.status === "loading") {
                return false;
            }
        },
    },
);

export const copyTemplates = createAsyncThunk<
    TemplateState,
    { id: string },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "template/copy",
    async ({ id }, thunkApi) => {
        const template = selectTemplate(thunkApi.getState());

        const response = await Ajax.post(Backend.Template.Copy, {
            search: {
                id,
            },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = templateSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        const refreshResponse = await refreshTemplateList(template);

        if (refreshResponse.ok === false) {
            return thunkApi.rejectWithValue(refreshResponse.error);
        }

        const refreshResult = templatePagingSchema.safeParse(refreshResponse.result);

        if (refreshResult.success === false) {
            return thunkApi.rejectWithValue(refreshResult.error);
        }

        return {
            ...template,
            status: "succeeded",
            detail: result.data,
            paging: refreshResult.data.paging,
            items: refreshResult.data.items,
        };
    },
    {
        condition(_arg, { getState }) {
            const template = selectTemplate(getState());

            if (template.status === "loading") {
                return false;
            }
        },
    },
);

const templateSlice = createSlice({
    name: "user",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setFilter: (
            state,
            action: PayloadAction<{
                type: string;
                value: string | undefined;
            }>,
        ) => {
            switch (action.payload.type) {
                case "name":
                case "username":
                case "description":
                case "tags":
                    state.filter[action.payload.type] = action.payload.value;
                    break;
                case "publicShared":
                case "shared":
                case "includeOwned":
                case "directUser":
                    if (action.payload.value === "true" || action.payload.value === "false") {
                        state.filter[action.payload.type] = action.payload.value;
                        break;
                    }

                    state.filter[action.payload.type] = undefined;
                    break;
            }
        },
        setHideFilters: (state) => {
            state.hideFilters = !state.hideFilters;
        },
        setHideList: (state) => {
            state.hideList = !state.hideList;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(listTemplates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(listTemplates.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.paging = action.payload.paging;
                state.items = action.payload.items;
            })
            .addCase(listTemplates.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(detailTemplates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(detailTemplates.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.detail = action.payload.detail;
            })
            .addCase(detailTemplates.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(updateTemplates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateTemplates.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.detail = action.payload.detail;
            })
            .addCase(updateTemplates.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(removeTemplates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeTemplates.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.paging = action.payload.paging;
                state.items = action.payload.items;
            })
            .addCase(removeTemplates.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(copyTemplates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(copyTemplates.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.detail = action.payload.detail;
                state.paging = action.payload.paging;
                state.items = action.payload.items;
            })
            .addCase(copyTemplates.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { setFilter, setHideFilters, setHideList } = templateSlice.actions;

export const selectTemplate = (state: RootState) => state.template;
export default templateSlice.reducer;