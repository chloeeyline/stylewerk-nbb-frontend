import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Backend from "~/constants/backend-routes";
import { DEFAULT_UUID } from "~/constants/general";
import type { AppDispatch, RootState } from "~/redux/store";
import Ajax from "~/utils/ajax";
import { CreateEditor, CreateEntryCell, CreateEntryRow } from "./editor-create";
import type { Editor } from "./editor-schemas";
import { editorSchema } from "./editor-schemas";

export type EditorState = {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: Editor | null;
    isTemplate: boolean;
    isPreview: boolean;
    isNew: boolean;
    selectedEntryRow: string;
    selectedEntryCell: string;
    selectedTemplateRow: string;
    selectedTemplateCell: string;
};

const initialState: EditorState = {
    status: "idle",
    data: null,
    isTemplate: false,
    isPreview: false,
    isNew: false,
    selectedEntryRow: "",
    selectedEntryCell: "",
    selectedTemplateRow: "",
    selectedTemplateCell: "",
};

export const getEditor = createAsyncThunk<
    EditorState,
    { id: string; isTemplate: boolean; isPreview: boolean; isNew: boolean },
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "editor/get-editor",
    async ({ id, isTemplate, isPreview, isNew }, thunkApi) => {
        const editor = selectEditor(thunkApi.getState());

        if (isTemplate && isNew) {
            return {
                ...editor,
                status: "succeeded",
                data: CreateEditor(),
                id: DEFAULT_UUID,
                isTemplate: isTemplate,
                isPreview: isPreview,
                isNew: isNew,
            };
        }

        const path = isTemplate || isNew ? Backend.Editor.GetTemplate : Backend.Editor.GetEntry;

        const response = await Ajax.get(path, {
            search: {
                id: id,
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
            id: id,
            isTemplate: isTemplate,
            isPreview: isPreview,
            isNew: isNew,
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
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(
    "editor/update-editor",
    async (_arg, thunkApi) => {
        const editor = selectEditor(thunkApi.getState());
        const path = editor.isTemplate ? Backend.Editor.UpdateTemplate : Backend.Editor.UpdateEntry;

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

// const persistState = (editor: Editor) => {
//     localStorage.setItem(`draft_${editor.id}`, JSON.stringify(editor));
//     try {
//         let drafts = JSON.parse(localStorage.getItem("drafts") ?? "[]");

//         if (Array.isArray(drafts) === false) {
//             drafts = [];
//         }

//         if (Array.isArray(drafts) && drafts.includes(`draft_${editor.id}`) === false) {
//             drafts.push(`draft_${editor.id}`);
//         }

//         localStorage.setItem("drafts", JSON.stringify(drafts));
//     } catch (error) {
//         localStorage.setItem("drafts", JSON.stringify([`draft_${editor.id}`]));
//     }
// };

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
        setTemplateCell: (
            state,
            action: PayloadAction<{
                type: string;
                value: boolean | number | string;
            }>,
        ) => {
            switch (action.payload.type) {
                case "hideOnEmpty":
                case "isRequired":
                case "inputHelper":
                case "text":
                case "description":
                case "metaData":
                    if (state.data && state.data.items.length > 0) {
                        state.data.items = state.data.items.map((row) => {
                            if (row.templateID === state.selectedTemplateRow) {
                                const tempCellList = row.items.map((cell) => {
                                    if (cell.templateID === state.selectedTemplateCell) {
                                        const tempCell = { ...cell };
                                        const value =
                                            action.payload.type === "inputHelper"
                                                ? Number(action.payload.value)
                                                : action.payload.value;

                                        tempCell.template = {
                                            ...tempCell.template,
                                            [action.payload.type]: value,
                                        };
                                        return {
                                            ...tempCell,
                                        };
                                    }
                                    return cell;
                                });
                                return {
                                    ...row,
                                    items: tempCellList,
                                };
                            }
                            return row;
                        });
                    }
                    break;
            }
        },
        addTemplateRow: (state) => {
            if (state.data) {
                const templateRowID = crypto.randomUUID();
                const templatecellID = crypto.randomUUID();
                state.data.items = [
                    ...state.data.items,
                    CreateEntryRow(templateRowID, templatecellID),
                ];
            }
        },
        addTemplateCell: (state) => {
            if (state.data && state.data.items.length > 0) {
                state.data.items = state.data.items.map((row) => {
                    if (row.templateID === state.selectedTemplateRow) {
                        const temp = { ...row };

                        const templateID = crypto.randomUUID();
                        temp.items.push(CreateEntryCell(templateID));

                        return {
                            ...temp,
                        };
                    }
                    return row;
                });
            }
        },
        removeTemplateRow: (state) => {
            if (state.data && state.data.items.length > 1) {
                state.data.items = state.data.items.filter((row) => {
                    if (row.templateID !== state.selectedTemplateRow) return row;
                });
                state.selectedTemplateRow = "";
                state.selectedTemplateCell = "";
                state.selectedEntryRow = "";
                state.selectedEntryCell = "";
            }
        },
        removeTemplateCell: (state) => {
            if (state.data && state.data.items.length > 1) {
                let stop = false;
                const tempRoowList = state.data.items.map((row) => {
                    if (row.templateID === state.selectedTemplateRow && row.items.length > 0) {
                        if (row.items.length === 1) stop = true;
                        const tempCellList = row.items.filter((cell) => {
                            if (cell.templateID !== state.selectedTemplateCell) return cell;
                        });
                        return {
                            ...row,
                            items: tempCellList,
                        };
                    }
                    return row;
                });

                if (stop) return;
                state.data.items = tempRoowList;
                state.selectedTemplateRow = "";
                state.selectedTemplateCell = "";
                state.selectedEntryRow = "";
                state.selectedEntryCell = "";
            }
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
            if (state.isPreview || !state.isTemplate) return;
            state.selectedEntryRow = action.payload.entryRow;
            state.selectedEntryCell = action.payload.entryCell;
            state.selectedTemplateRow = action.payload.templateRow;
            state.selectedTemplateCell = action.payload.templateCell;
        },
        reset: (state) => {
            state.status = "idle";
            state.data = null;
            state.selectedTemplateRow = "";
            state.selectedTemplateCell = "";
            state.selectedEntryRow = "";
            state.selectedEntryCell = "";
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
                state.isTemplate = action.payload.isTemplate;
                state.isPreview = action.payload.isPreview;
                state.isNew = action.payload.isNew;
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

export const {
    setSelected,
    reset,
    setTemplate,
    setTemplateRow,
    setTemplateCell,
    addTemplateRow,
    addTemplateCell,
    removeTemplateRow,
    removeTemplateCell,
} = editorSlice.actions;
export const selectEditor = (state: RootState) => state.editor;
export default editorSlice.reducer;
