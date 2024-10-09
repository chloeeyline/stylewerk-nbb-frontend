import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Backend from "~/constants/backend-routes";
import type { AppDispatch, RootState } from "~/redux/store";
import Ajax from "~/utils/ajax";
import type { EntryFolders, EntryItems, EntrySearchParams } from "./entry-schemas";
import { entryFoldersSchema, entryItemsSchema } from "./entry-schemas";

type EntryState = {
    status: "idle" | "loading" | "succeeded" | "failed";
    folders: EntryFolders;
    items: EntryItems;
    filter: EntrySearchParams;
    hideFilters: boolean;
    hideList: boolean;
    dragMode: boolean;
};

const initialState: EntryState = {
    status: "idle",
    folders: [],
    items: [],
    filter: {
        includeOwned: "true",
    },
    hideFilters: true,
    hideList: false,
    dragMode: false,
};

export const listEntry = createAsyncThunk<
    EntryState,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "entry/list",
    async (_arg, thunkApi) => {
        const entry = selectEntry(thunkApi.getState());

        const response = await Ajax.get(Backend.Entry.List, {
            search: {
                ...entry.filter,
            },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }
        console.log(response.result);
        const result = entryItemsSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        return {
            ...entry,
            status: "succeeded",
            folders: [],
            items: result.data,
        };
    },
    {
        condition(_arg, { getState }) {
            const entry = selectEntry(getState());
            if (entry.status === "loading") return false;
        },
    },
);

export const listFolder = createAsyncThunk<
    EntryState,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "entry/folder/list",
    async (_arg, thunkApi) => {
        const entry = selectEntry(thunkApi.getState());

        const response = await Ajax.get(Backend.Entry.Folder.List, {
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = entryFoldersSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        return {
            ...entry,
            status: "succeeded",
            folders: result.data,
            items: [],
            filter: {},
        };
    },
    {
        condition(_arg, { getState }) {
            const entry = selectEntry(getState());
            if (entry.status === "loading") return false;
        },
    },
);

export const detailFolder = createAsyncThunk<
    EntryState,
    { id: string },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "entry/folder/detail",
    async ({ id }, thunkApi) => {
        const entry = selectEntry(thunkApi.getState());

        const response = await Ajax.get(Backend.Entry.Folder.Details, {
            search: {
                id,
            },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = entryItemsSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        const items = entry.folders.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    items: result.data,
                };
            }
            return item;
        });

        return {
            ...entry,
            status: "succeeded",
            folders: items,
        };
    },
    {
        condition(_arg, { getState }) {
            const entry = selectEntry(getState());
            if (entry.status === "loading") return false;
        },
    },
);

const entrySlice = createSlice({
    name: "entry",
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
                case "templateName":
                case "tags":
                    action.payload.value = action.payload.value?.trim();
                    if (action.payload.value && action.payload.value.length > 0) {
                        state.filter[action.payload.type] = action.payload.value;
                    } else {
                        state.filter[action.payload.type] = undefined;
                    }
                    break;
                case "publicShared":
                case "shared":
                case "includeOwned":
                case "directUser":
                    if (action.payload.value === "true" || action.payload.value === "false") {
                        state.filter[action.payload.type] = action.payload.value;
                    } else {
                        state.filter[action.payload.type] = undefined;
                    }
                    if (
                        (state.filter.publicShared === undefined ||
                            state.filter.publicShared === "false") &&
                        (state.filter.shared === undefined || state.filter.shared === "false") &&
                        (state.filter.includeOwned === undefined ||
                            state.filter.includeOwned === "false")
                    ) {
                        state.filter.includeOwned = "true";
                    }
                    break;
            }
        },
        toggleHideFilters: (state) => {
            state.hideFilters = !state.hideFilters;
        },
        toggleHideList: (state) => {
            state.hideList = !state.hideList;
        },
        toggleDragMode: (state) => {
            state.dragMode = !state.dragMode;
        },
        resetFilter: (state) => {
            state.items = [];
            state.filter = {
                includeOwned: "true",
            };
        },
        dragFolder: (state, action: PayloadAction<DragEndEvent>) => {
            if (state.folders.length > 0) {
                const { active, over } = action.payload;

                if (over && active.id !== over.id) {
                    const oldIndex = state.folders.indexOf(
                        state.folders.filter((value) => value.id === active.id)[0],
                    );
                    const newIndex = state.folders.indexOf(
                        state.folders.filter((value) => value.id === over.id)[0],
                    );
                    state.folders = arrayMove(state.folders, oldIndex, newIndex);
                }
            }
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(listFolder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(listFolder.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.folders = action.payload.folders;
                state.items = action.payload.items;
                state.filter = action.payload.filter;
            })
            .addCase(listFolder.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(detailFolder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(detailFolder.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.folders = action.payload.folders;
            })
            .addCase(detailFolder.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(listEntry.pending, (state) => {
                state.status = "loading";
            })
            .addCase(listEntry.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.folders = action.payload.folders;
                state.items = action.payload.items;
                state.filter = action.payload.filter;
            })
            .addCase(listEntry.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const {
    setFilter,
    toggleHideFilters,
    toggleHideList,
    resetFilter,
    dragFolder,
    toggleDragMode,
} = entrySlice.actions;
export const selectEntry = (state: RootState) => state.entry;
export default entrySlice.reducer;
