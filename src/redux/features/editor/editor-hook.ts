import { AppDispatch } from "~/redux/store";
import { safeStringify, saveParseEmptyObject } from "~/utils/safe-json";
import {
    ihDataTextSchema,
    ihDataNumberSchema,
    ihDataCheckboxSchema,
    ihDataColorSchema,
    ihDataListSchema,
    ihDataDateTimeSchema,
} from "./editor-data-schema";
import { EntryCell, EntryRow } from "./editor-schemas";
import { EditorState, selectEditor, setData, setMetadata } from "./editor-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";

const callSetData = (
    dispatch: AppDispatch,
    editor: EditorState,
    cell: EntryCell,
    row: EntryRow,
    value: unknown,
) => {
    if (editor.isPreview) return;
    if (typeof value === "undefined" || value === null) {
        dispatch(setData({ cellID: cell.id, rowID: row.id, data: null }));
        return;
    }
    dispatch(
        setData({
            cellID: cell.id,
            rowID: row.id,
            data: safeStringify(value)?.data ?? null,
        }),
    );
};

const callSetMetaData = (dispatch: AppDispatch, value: unknown) => {
    if (typeof value === "undefined" || value === null) {
        dispatch(setMetadata(null));
        return;
    }
    dispatch(setMetadata(safeStringify(value)?.data ?? null));
};

export function useInputHelper(cell: EntryCell, row: EntryRow) {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const setData = callSetData.bind(null, dispatch, editor, cell, row);
    const setMetaData = callSetMetaData.bind(null, dispatch);

    return {
        setData,
        setMetaData,
    };
}

export function ValidColorValue(data?: string | null, metadata?: string | null) {
    const value = data ?? metadata ?? "";

    if (value.length !== 7 || value.startsWith("#") === false) {
        return undefined;
    }

    return value;
}

export function IsRequiredFillfiled(
    cell: EntryCell,
    isPreview: boolean,
    isTemplate: boolean,
): boolean {
    if (
        cell.template.isRequired === false ||
        cell.template.inputHelper === 1 ||
        isPreview === true ||
        isTemplate === true
    )
        return true;
    const data = saveParseEmptyObject(cell.data);
    switch (cell.template.inputHelper) {
        case 3:
            const resultText = ihDataTextSchema.safeParse(data);
            if (
                resultText.success === false ||
                typeof resultText.data.value === "undefined" ||
                resultText.data.value === null ||
                (typeof resultText.data.value === "string" &&
                    resultText.data.value.trim().length === 0)
            )
                return false;
            return true;
        case 4:
            const resultNumber = ihDataNumberSchema.safeParse(data);
            if (
                resultNumber.success === false ||
                typeof resultNumber.data.value === "undefined" ||
                resultNumber.data.value === null
            )
                return false;
            return true;
        case 5:
            const resultCheckbox = ihDataCheckboxSchema.safeParse(data);
            if (
                resultCheckbox.success === false ||
                typeof resultCheckbox.data.value === "undefined" ||
                resultCheckbox.data.value === null
            )
                return false;
            return true;
        case 6:
            const resultDateTime = ihDataDateTimeSchema.safeParse(data);
            if (
                resultDateTime.success === false ||
                typeof resultDateTime.data.value === "undefined" ||
                resultDateTime.data.value === null ||
                (typeof resultDateTime.data.value === "string" &&
                    resultDateTime.data.value.trim().length === 0)
            )
                return false;
            return true;
        case 7:
            const resultColor = ihDataColorSchema.safeParse(data);
            if (
                resultColor.success === false ||
                typeof resultColor.data.value === "undefined" ||
                resultColor.data.value === null
            )
                return false;
            return true;
        case 8:
            const resultList = ihDataListSchema.safeParse(data);
            if (
                resultList.success === false ||
                typeof resultList.data.value === "undefined" ||
                resultList.data.value === null ||
                (typeof resultList.data.value === "string" &&
                    resultList.data.value.trim().length === 0)
            )
                return false;
            return true;
        default:
            return true;
    }
}
