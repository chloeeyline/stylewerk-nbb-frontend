import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import Backend from "#/backend-routes";
import type { AppDispatch, RootState } from "~/redux/store";
import Ajax from "~/utils/ajax";
import type { EntryFolder, EntryFolders, EntryItems, EntrySearchParams } from "./entry-schemas";
import { entryFolderSchema, entryFoldersSchema, entryItemsSchema } from "./entry-schemas";

type EntryState = {
    status: "idle" | "loading" | "succeeded" | "failed";
    folders: EntryFolders;
    items: EntryItems;
    filter: EntrySearchParams;
    hideFilters: boolean;
    hideList: boolean;
    dragMode: boolean;
    selectedFolder: EntryFolder & { isNew: boolean };
};

const initialState: EntryState = {
    status: "idle",
    folders: [],
    items: [],
    filter: {},
    hideFilters: true,
    hideList: false,
    dragMode: false,
    selectedFolder: { id: crypto.randomUUID(), name: "", items: [], count: 0, isNew: true },
};

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

        if (Object.keys(entry.filter).length === 0) {
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
            };
        } else {
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
        }
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

export const updateFolder = createAsyncThunk<
    EntryState,
    { model: EntryFolder },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "entry/folder/update",
    async ({ model }, thunkApi) => {
        const entry = selectEntry(thunkApi.getState());

        const response = await Ajax.post(Backend.Entry.Folder.Update, {
            body: model,
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = entryFolderSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        const items = entry.folders.map((item) => {
            return item.id === model.id ? result.data : item;
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

export const reorderFolder = createAsyncThunk<
    EntryState,
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "entry/folder/reorder",
    async (_arg, thunkApi) => {
        const entry = selectEntry(thunkApi.getState());

        const response = await Ajax.post(Backend.Entry.Folder.Reorder, {
            body: entry.folders.map((item) => item.id),
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        return {
            ...entry,
            status: "succeeded",
        };
    },
    {
        condition(_arg, { getState }) {
            const entry = selectEntry(getState());
            if (entry.status === "loading") return false;
        },
    },
);

export const removeFolder = createAsyncThunk<
    EntryState,
    { id: string },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "entry/folder/remove",
    async ({ id }, thunkApi) => {
        const entry = selectEntry(thunkApi.getState());

        const response = await Ajax.post(Backend.Entry.Folder.Remove, {
            search: { id },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const items = entry.folders.filter((item) => item.id !== id);

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

export const removeEntry = createAsyncThunk<
    EntryState,
    { id: string },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "entry/remove",
    async ({ id }, thunkApi) => {
        const entry = selectEntry(thunkApi.getState());

        const response = await Ajax.post(Backend.Entry.Remove, {
            search: { id },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        return {
            ...entry,
            status: "succeeded",
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
                    if (
                        typeof action.payload.value === "string" &&
                        action.payload.value.trim().length > 0
                    ) {
                        state.filter[action.payload.type] = action.payload.value;
                    } else {
                        delete state.filter[action.payload.type];
                    }
                    break;
                case "includePublic":
                    if (action.payload.value === "true" || action.payload.value === "false") {
                        state.filter[action.payload.type] = action.payload.value;
                    } else {
                        delete state.filter[action.payload.type];
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
        clearFilters: (state) => {
            state.items = [];
            state.filter = {};
        },
        setFolders: (state, action: PayloadAction<EntryFolders>) => {
            state.folders = action.payload;
        },
        setSelectedFolder: (state, action: PayloadAction<EntryFolder>) => {
            state.selectedFolder =
                action.payload && state.selectedFolder?.id == action.payload.id
                    ? { id: crypto.randomUUID(), name: "", items: [], count: 0, isNew: true }
                    : { ...action.payload, isNew: false };
        },
        setSelectedFolderName(state, action: PayloadAction<string>) {
            state.selectedFolder.name = action.payload;
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
            .addCase(updateFolder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateFolder.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.folders = action.payload.folders;
            })
            .addCase(updateFolder.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(reorderFolder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(reorderFolder.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
            })
            .addCase(reorderFolder.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(removeFolder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeFolder.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.folders = action.payload.folders;
            })
            .addCase(removeFolder.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(removeEntry.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeEntry.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
            })
            .addCase(removeEntry.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const {
    setFilter,
    toggleHideFilters,
    toggleHideList,
    clearFilters,
    toggleDragMode,
    setFolders,
    setSelectedFolder,
    setSelectedFolderName,
} = entrySlice.actions;
export const selectEntry = (state: RootState) => state.entry;
export default entrySlice.reducer;
