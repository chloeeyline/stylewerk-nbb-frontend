import { useCallback, useEffect, useState } from "react";
import { getDummy, getDummyList } from "./dummy";
import type {
    Entry,
    EntryCell,
    EntryFolder,
    EntryInList,
    EntryListResponse,
    EntryResponse,
    EntryRow,
} from "./types";
import wait from "~/utils/wait";

class EntryError extends Error {
    constructor(message: string, public readonly name: string, public readonly code: number, public readonly cause?: EntryError|Error) {
        super(message);
    }
}

class EntriesNotFoundError extends EntryError {
    constructor(message: string, code: number, cause?: EntryError|Error) {
        super(message, "EntriesNotFoundError", code, cause);
    }
}

class EntryNotFoundError extends EntryError {
    constructor(message: string, code: number, cause?: EntryError|Error) {
        super(message, "EntryNotFoundError", code, cause);
    }
}

class EntryBuildingError extends EntryError {
    constructor(message: string, code: number, cause?: EntryError|Error) {
        super(message, "EntryBuildingError", code, cause);
    }
}

const createCell = (cell: unknown, encrypted: boolean): EntryCell | EntryBuildingError => {
    if (
        typeof cell !== "object" ||
        cell === null ||
        !("id" in cell) ||
        typeof cell.id !== "string" ||
        !("type" in cell) ||
        typeof cell.type !== "string" ||
        !("text" in cell) ||
        typeof cell.text !== "string" ||
        !("data" in cell) ||
        typeof cell.data !== "string"
    ) {
        console.log(cell);
        return new EntryBuildingError(`Cell could not be built!`, 400);
    }

    const { id, type, text } = cell;

    switch (type) {
        case "text": {
            if (encrypted) {
                // TODO: implement decryption

                console.log("TODO: implement decryption");
            }

            return {
                id,
                render: {
                    type,
                    text,
                },
            };
        }
        default: {
            return new EntryBuildingError(`Only text fields are implemented right now`, 418);
        }
    }
};

const createRow = (row: unknown, encrypted: boolean): EntryRow | EntryBuildingError => {
    if (
        typeof row !== "object" ||
        row === null ||
        !("id" in row) ||
        typeof row.id !== "string" ||
        !("responsive" in row) ||
        typeof row.responsive !== "boolean" ||
        !("cells" in row) ||
        typeof row.cells !== "object" ||
        Array.isArray(row.cells) === false ||
        row.cells.length === 0
    ) {
        return new EntryBuildingError(`Row could not be built!`, 400);
    }

    const id = row.id;
    const responsive = row.responsive;

    const cells: EntryCell[] = [];

    for (const cell of row.cells) {
        const result = createCell(cell, encrypted);

        if (result instanceof EntryBuildingError) {
            return new EntryBuildingError(`Row could not be built!`, 400, result);
        }

        cells.push(result);
    }

    return { id, responsive, cells };
};

const createEntry = (entry: unknown): Entry | EntryBuildingError => {
    if (
        typeof entry !== "object" ||
        entry === null ||
        !("id" in entry) ||
        typeof entry.id !== "string" ||
        !("name" in entry) ||
        typeof entry.name !== "string" ||
        !("encrypted" in entry) ||
        typeof entry.encrypted !== "boolean" ||
        !("rows" in entry) ||
        typeof entry.rows !== "object" ||
        Array.isArray(entry.rows) === false
    ) {
        return new EntryBuildingError(`Entry could not be built!`, 400);
    }

    const { id, name, encrypted } = entry;

    const rows: EntryRow[] = [];

    for (const row of entry.rows) {
        const result = createRow(row, encrypted);

        if (result instanceof EntryBuildingError) {
            return result;
        }

        rows.push(result);
    }

    return {
        id,
        name,
        rows,
    };
};

const createEntryInList = (entry: unknown): EntryInList | EntryBuildingError => {
    if (
        typeof entry !== "object" ||
        entry === null ||
        !("id" in entry) ||
        typeof entry.id !== "string" ||
        !("name" in entry) ||
        typeof entry.name !== "string"
    ) {
        return new EntryBuildingError(`Entry could not be built!`, 400);
    }

    const { id, name } = entry;

    return { id, name };
};

const createFolder = (folder: unknown): EntryFolder | EntryBuildingError => {
    if (
        typeof folder !== "object" ||
        folder === null ||
        !("id" in folder) ||
        typeof folder.id !== "string" ||
        !("name" in folder) ||
        typeof folder.name !== "string" ||
        !("entries" in folder) ||
        typeof folder.entries !== "object" ||
        Array.isArray(folder.entries) === false
    ) {
        return new EntryBuildingError(`Folder could not be built!`, 400);
    }

    const { id, name } = folder;

    const entries: EntryInList[] = [];

    for (const entry of folder.entries) {
        const result = createEntryInList(entry);

        if (result instanceof EntryBuildingError) {
            return result;
        }

        entries.push(result);
    }

    return {
        id,
        name,
        entries,
    };
};

const getEntry = async (id: string): Promise<EntryResponse> => {
    await wait(500);

    try {
        const response = await getDummy(id);

        if (response.ok === false) {
            throw new EntryNotFoundError(response.statusText, response.status);
        }

        const entry = createEntry(await response.json());

        if (entry instanceof EntryBuildingError) {
            throw entry;
        }

        return {
            ok: true,
            loading: false,
            entry,
        };
    } catch (error) {
        const message = `Entry with the id ${id} could not be found!`;
        let code = 400;
        let cause: Error | undefined = undefined;

        if (error instanceof EntryNotFoundError || error instanceof EntryBuildingError) {
            code = error.code;
        }

        if (error instanceof Error) {
            cause = error;
        }

        return {
            ok: false,
            loading: false,
            error: new EntryNotFoundError(message, code, cause),
        };
    }
};

const getEntries = async (err: boolean = false): Promise<EntryListResponse> => {
    await wait(500);

    try {
        const response = await getDummyList(err);

        if (response.ok === false) {
            throw new EntriesNotFoundError(response.statusText, response.status);
        }

        const json = await response.json();

        if (
            typeof json !== "object" ||
            json === null ||
            !("general" in json) ||
            Array.isArray(json.general) === false ||
            !("folders" in json) ||
            Array.isArray(json.folders) === false
        ) {
            throw new EntriesNotFoundError("JSON could not be parsed!", 400);
        }

        const general: EntryInList[] = [];

        for (const entry of json.general) {
            const result = createEntry(entry);

            if (result instanceof EntryBuildingError) {
                throw result;
            }

            general.push(result);
        }

        const folders: EntryFolder[] = [];

        for (const folder of json.folders) {
            const result = createFolder(folder);

            if (result instanceof EntryBuildingError) {
                throw result;
            }

            folders.push(result);
        }

        return {
            ok: true,
            loading: false,
            general,
            folders,
        };
    } catch (error) {
        const message = `Entries could not be found!`;
        let code = 400;
        let cause: Error | undefined = undefined;

        if (
            error instanceof EntriesNotFoundError ||
            error instanceof EntryBuildingError ||
            error instanceof EntryNotFoundError
        ) {
            code = error.code;
        }

        if (error instanceof Error) {
            cause = error;
        }

        return {
            ok: false,
            loading: false,
            error: new EntriesNotFoundError(message, code, cause),
        };
    }
};

const useEntry = (id: string): [result: EntryResponse, refresh: () => void] => {
    const [result, setResult] = useState<EntryResponse>({ ok: false, loading: true });

    const refresh = useCallback(() => {
        setResult({ ok: false, loading: true });

        getEntry(id).then((response) => {
            setResult(response);
        });
    }, [id]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return [result, refresh];
};

const useEntries = (err: boolean = false): [result: EntryListResponse, refresh: () => void] => {
    const [result, setResult] = useState<EntryListResponse>({ ok: false, loading: true });

    const refresh = useCallback(() => {
        setResult({ ok: false, loading: true });

        getEntries(err).then((response) => {
            setResult(response);
        });
    }, [err]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return [result, refresh];
};

export { EntryError, EntriesNotFoundError, EntryNotFoundError, useEntries, useEntry };
