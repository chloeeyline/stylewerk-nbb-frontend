import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Backend from "~/constants/backend-routes";
import type { AppDispatch, RootState } from "~/redux/store";
import Ajax from "~/utils/ajax";
import type { Editor } from "./editor-schemas";
import { editorSchema } from "./editor-schemas";

type EditorState = {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: Editor | null;
    isTemplate: boolean;
    selectedEntryRow: string;
    selectedEntryCell: string;
    selectedTemplateRow: string;
    selectedTemplateCell: string;
};

const initialState: EditorState = {
    status: "idle",
    data: null,
    isTemplate: false,
    selectedEntryRow: "",
    selectedEntryCell: "",
    selectedTemplateRow: "",
    selectedTemplateCell: "",
};

export const getEditor = createAsyncThunk<
    EditorState,
    { id: string; isTemplate: boolean },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "editor/get-editor",
    async ({ id, isTemplate }, thunkApi) => {
        const editor = selectEditor(thunkApi.getState());
        const path = isTemplate ? Backend.Editor.GetTemplate : Backend.Editor.GetEntry;

        const response = await Ajax.get(path, {
            search: {
                id,
            },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = editorSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        return {
            ...editor,
            status: "succeeded",
            data: result.data,
        };
    },
    {
        condition(_arg, { getState }) {
            const editor = selectEditor(getState());

            if (editor.status === "loading") {
                return false;
            }
        },
    },
);

export const updateEditor = createAsyncThunk<
    EditorState,
    { isTemplate: boolean },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "editor/update-editor",
    async ({ isTemplate }, thunkApi) => {
        const editor = selectEditor(thunkApi.getState());
        const path = isTemplate ? Backend.Editor.UpdateTemplate : Backend.Editor.UpdateEntry;

        const response = await Ajax.post(path, {
            body: {
                ...editor.data,
            },
            auth: true,
        });

        if (response.ok === false) {
            return thunkApi.rejectWithValue(response.error);
        }

        const result = editorSchema.safeParse(response.result);

        if (result.success === false) {
            return thunkApi.rejectWithValue(result.error);
        }

        return {
            ...editor,
            status: "succeeded",
            data: result.data,
        };
    },
    {
        condition(_arg, { getState }) {
            const editor = selectEditor(getState());

            if (editor.status === "loading") {
                return false;
            }
        },
    },
);

const persistState = (editor: Editor) => {
    localStorage.setItem(`draft_${editor.id}`, JSON.stringify(editor));
    try {
        let drafts = JSON.parse(localStorage.getItem("drafts") ?? "[]");

        if (Array.isArray(drafts) === false) {
            drafts = [];
        }

        if (Array.isArray(drafts) && drafts.includes(`draft_${editor.id}`) === false) {
            drafts.push(`draft_${editor.id}`);
        }

        localStorage.setItem("drafts", JSON.stringify(drafts));
    } catch (error) {
        localStorage.setItem("drafts", JSON.stringify([`draft_${editor.id}`]));
    }
};

const editorSlice = createSlice({
    name: "editor",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTemplate: (
            state,
            action: PayloadAction<{
                type: string;
                value: string | undefined;
            }>,
        ) => {
            switch (action.payload.type) {
                case "name":
                case "description":
                case "tags":
                    const value = action.payload.value?.trim() ?? "";
                    if (state.data && value.length > 0) {
                        state.data.template[action.payload.type] = value;
                    }
                    break;
            }
        },
        setTemplateRow: (
            state,
            action: PayloadAction<{
                type: string;
                value: boolean;
            }>,
        ) => {
            switch (action.payload.type) {
                case "canWrapCells":
                case "canRepeat":
                case "hideOnNoInput":
                    if (state.data && state.data.items.length > 0) {
                        state.data.items = state.data.items.map((row) => {
                            if (row.templateID === state.selectedTemplateRow) {
                                const temp = { ...row };
                                temp.template = {
                                    ...temp.template,
                                    [action.payload.type]: action.payload.value,
                                };
                                return {
                                    ...temp,
                                };
                            }
                            return row;
                        });
                    }
                    break;
            }
        },
        addTemplateRow: (state) => {
            if (state.data && state.data.items.length > 0) {
                state.data.items = state.data.items.map((row) => {
                    if (row.templateID === state.selectedTemplateRow) {
                        const temp = { ...row };

                        const templateID = crypto.randomUUID();
                        const ID = crypto.randomUUID();

                        temp.items.push({
                            id: ID,
                            data: "",
                            templateID: crypto.randomUUID(),
                            template: {
                                id: templateID,
                                inputHelper: 0,
                                hideOnEmpty: false,
                                isRequired: false,
                                text: "",
                                description: "",
                                metaData: "",
                            },
                        });

                        return {
                            ...temp,
                        };
                    }
                    return row;
                });
            }
        },
        removeTemplateRow: (state) => {
            if (state.data && state.data.items.length > 0) {
                state.data.items = state.data.items.filter((row) => {
                    row.templateID !== state.selectedTemplateRow;
                });
                state.selectedTemplateRow = "";
                state.selectedTemplateCell = "";
                state.selectedEntryRow = "";
                state.selectedEntryCell = "";
            }
        },
        setIsTemplate(state, action: PayloadAction<boolean>) {
            state.isTemplate = action.payload;
        },
        setSelected: (
            state,
            action: PayloadAction<{
                entryRow: string;
                entryCell: string;
                templateRow: string;
                templateCell: string;
            }>,
        ) => {
            state.selectedEntryRow = action.payload.entryRow;
            state.selectedEntryCell = action.payload.entryCell;
            state.selectedTemplateRow = action.payload.templateRow;
            state.selectedTemplateCell = action.payload.templateCell;
        },
        reset: (state) => {
            state.status = "idle";
            state.data = null;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getEditor.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getEditor.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(getEditor.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(updateEditor.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateEditor.fulfilled, (state, action) => {
                if (action.payload.status !== "succeeded") return;
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(updateEditor.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { setTemplate, setSelected, reset, setTemplateRow, setIsTemplate, addTemplateRow } =
    editorSlice.actions;
export const selectEditor = (state: RootState) => state.editor;
export default editorSlice.reducer;
