import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import Backend from "#/backend-routes";
import { DEFAULT_UUID } from "#/general";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import type { AppDispatch, RootState } from "~/redux/store";
import Ajax from "~/utils/ajax";
import { CreateEditor, CreateEntryCell, CreateEntryRow } from "./editor-create";
import type { Editor, EntryRow } from "./editor-schemas";
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
            if (editor.status === "loading") return false;
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
            if (editor.status === "loading") return false;
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
    reducers: {
        setEntry: (
            state,
            action: PayloadAction<{
                type: string;
                value: boolean | string | number | null;
            }>,
        ) => {
            if (state.data === null) return;
            switch (action.payload.type) {
                case "name":
                case "tags":
                case "folderID":
                    if (typeof action.payload.value == "string") {
                        if (action.payload.value.trim().length === 0) action.payload.value = null;
                        state.data[action.payload.type] = action.payload.value;
                    }
                    break;
                case "isEncrypted":
                case "isPublic":
                    if (typeof action.payload.value == "boolean")
                        state.data[action.payload.type] = Boolean(action.payload.value);
                    break;
            }
        },
        setTemplate: (
            state,
            action: PayloadAction<{
                type: string;
                value: boolean | string | number | null;
            }>,
        ) => {
            if (state.data === null) return;
            switch (action.payload.type) {
                case "name":
                case "description":
                case "tags":
                    if (typeof action.payload.value == "string") {
                        if (action.payload.value.trim().length === 0) action.payload.value = null;
                        state.data.template[action.payload.type] = action.payload.value;
                    }
                    break;
                case "isPublic":
                    if (typeof action.payload.value == "boolean")
                        state.data.template[action.payload.type] = Boolean(action.payload.value);
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
            if (state.data === null || state.data.items.length === 0) return;
            switch (action.payload.type) {
                case "canRepeat":
                case "hideOnNoInput":
                    state.data.items = state.data.items.map((row) => {
                        if (row.templateID === state.selectedTemplateRow) {
                            return {
                                ...row,
                                template: {
                                    ...row.template,
                                    [action.payload.type]: action.payload.value,
                                },
                            };
                        }
                        return row;
                    });
                    break;
            }
        },
        setTemplateCell: (
            state,
            action: PayloadAction<{ type: string; value: boolean | number | string | null }>,
        ) => {
            if (state.data === null || state.data.items.length === 0) return;
            var stop: boolean = false;
            state.data.items = state.data.items.map((row) => {
                if (row.templateID === state.selectedTemplateRow) {
                    return {
                        ...row,
                        items: row.items.map((cell) => {
                            if (cell.templateID === state.selectedTemplateCell) {
                                let value: boolean | number | string | null = null;

                                switch (action.payload.type) {
                                    case "hideOnEmpty":
                                    case "isRequired":
                                        if (typeof action.payload.value === "boolean")
                                            value = Boolean(action.payload.value);
                                        else stop = true;
                                        break;
                                    case "inputHelper":
                                        if (typeof action.payload.value === "string")
                                            value = Number(action.payload.value);
                                        else stop = true;
                                        break;
                                    case "text":
                                    case "description":
                                        if (typeof action.payload.value === "string")
                                            value = String(action.payload.value);
                                        else stop = true;
                                        break;
                                    default:
                                        stop = true;
                                        break;
                                }
                                if (stop) return cell;

                                return {
                                    ...cell,
                                    template: {
                                        ...cell.template,
                                        [action.payload.type]: value,
                                    },
                                };
                            }
                            return cell;
                        }),
                    };
                }
                return row;
            });
        },
        addEntryRow: (state, action: PayloadAction<string>) => {
            if (state.data === null) return;
            const row = state.data.items.find((row) => row.id === action.payload);
            if (typeof row === "undefined") return;
            const index = state.data.items.indexOf(row);
            let newRow = {
                id: crypto.randomUUID(),
                templateID: row.templateID,
                template: { ...row.template },
                items: row.items.map((cell) => {
                    return {
                        id: crypto.randomUUID(),
                        templateID: cell.templateID,
                        template: { ...cell.template },
                        data: null,
                    };
                }),
            };

            state.data.items = [
                ...state.data.items.slice(0, index + 1),
                newRow,
                ...state.data.items.slice(index + 1),
            ];
        },
        addTemplateRow: (state) => {
            if (state.data === null) return;
            state.data.items = [
                ...state.data.items,
                CreateEntryRow(crypto.randomUUID(), crypto.randomUUID()),
            ];
        },
        addTemplateCell: (state, action: PayloadAction<string>) => {
            if (state.data === null || state.data.items.length === 0) return;
            state.data.items = state.data.items.map((row) => {
                if (row.templateID === action.payload) {
                    row.items.push(CreateEntryCell(crypto.randomUUID()));
                    return {
                        ...row,
                    };
                }
                return row;
            });
        },
        removeEntryRow: (state, action: PayloadAction<string>) => {
            if (state.data === null) return;
            const row = state.data.items.find((row) => row.id === action.payload);
            if (
                typeof row === "undefined" ||
                (!row.template.canRepeat &&
                    state.data.items.filter((item) => item.templateID === row.templateID).length <=
                        1)
            )
                return;
            state.data.items = [...state.data.items.filter((item) => item.id !== action.payload)];
        },
        removeTemplateRow: (state, action: PayloadAction<string>) => {
            if (state.data === null || state.data.items.length <= 1) return;
            state.data.items = state.data.items.filter((row) => {
                if (row.templateID !== action.payload) return row;
            });
            state.selectedTemplateRow = "";
            state.selectedTemplateCell = "";
            state.selectedEntryRow = "";
            state.selectedEntryCell = "";
        },
        removeTemplateCell: (
            state,
            action: PayloadAction<{ templateRow: string; templateCell: string }>,
        ) => {
            if (state.data === null) return;
            let stop = false;
            const tempRowList = state.data.items.map((row) => {
                if (row.templateID === action.payload.templateRow && row.items.length > 0) {
                    if (row.items.length === 1) stop = true;
                    return {
                        ...row,
                        items: row.items.filter((cell) => {
                            if (cell.templateID !== action.payload.templateCell) return cell;
                        }),
                    };
                }
                return row;
            });

            if (stop) return;
            state.data.items = tempRowList;
            state.selectedTemplateRow = "";
            state.selectedTemplateCell = "";
            state.selectedEntryRow = "";
            state.selectedEntryCell = "";
        },
        setMetadata: (state, action: PayloadAction<string | null>) => {
            if (state.data === null || state.data.items.length === 0) return;
            state.data.items = state.data.items.map((row) => {
                if (row.templateID === state.selectedTemplateRow) {
                    return {
                        ...row,
                        items: row.items.map((cell) => {
                            if (cell.templateID === state.selectedTemplateCell) {
                                return {
                                    ...cell,
                                    template: {
                                        ...cell.template,
                                        metaData: action.payload,
                                    },
                                };
                            }
                            return cell;
                        }),
                    };
                }
                return row;
            });
        },
        setData: (
            state,
            action: PayloadAction<{ rowID: string; cellID: string; data: string | null }>,
        ) => {
            if (state.data === null || state.data.items.length === 0) return;
            state.data.items = state.data.items.map((row) => {
                if (row.id === action.payload.rowID) {
                    return {
                        ...row,
                        items: row.items.map((cell) => {
                            if (cell.id === action.payload.cellID) {
                                return {
                                    ...cell,
                                    data: action.payload.data,
                                };
                            }
                            return cell;
                        }),
                    };
                }
                return row;
            });
        },
        setRows: (state, action: PayloadAction<EntryRow[]>) => {
            if (state.data) state.data.items = action.payload;
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
            if (
                state.selectedEntryRow !== action.payload.entryRow ||
                state.selectedEntryCell !== action.payload.entryCell ||
                state.selectedTemplateRow !== action.payload.templateRow ||
                state.selectedTemplateCell !== action.payload.templateCell
            ) {
                state.selectedEntryRow = action.payload.entryRow;
                state.selectedEntryCell = action.payload.entryCell;
                state.selectedTemplateRow = action.payload.templateRow;
                state.selectedTemplateCell = action.payload.templateCell;
            } else {
                state.selectedTemplateRow = "";
                state.selectedTemplateCell = "";
                state.selectedEntryRow = "";
                state.selectedEntryCell = "";
            }
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
                const hasChanged = state.data?.id !== action.payload.data?.id;
                state.data = action.payload.data;
                if (action.payload.data === null || hasChanged === false) return;
                if (state.isTemplate) {
                    window.history.pushState(
                        {},
                        "",
                        Routes.Templates.Edit.replace(
                            RouteParams.TemplateId,
                            action.payload.data.templateID,
                        ).replace(RouteParams.IsNew, "false"),
                    );
                } else {
                    window.history.pushState(
                        {},
                        "",
                        Routes.Entries.Edit.replace(
                            RouteParams.EntryId,
                            action.payload.data.id,
                        ).replace(RouteParams.IsNew, "false"),
                    );
                }
            })
            .addCase(updateEditor.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const {
    setEntry,
    setTemplate,
    setTemplateRow,
    setTemplateCell,
    addEntryRow,
    addTemplateRow,
    addTemplateCell,
    removeEntryRow,
    removeTemplateRow,
    removeTemplateCell,
    setMetadata,
    setData,
    setRows,
    setSelected,
    reset,
} = editorSlice.actions;
export const selectEditor = (state: RootState) => state.editor;
export default editorSlice.reducer;
