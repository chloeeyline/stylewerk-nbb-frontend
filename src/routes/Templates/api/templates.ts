import { useCallback, useEffect, useState } from "react";
import wait from "~/utils/wait";
import { getDummy, getDummyList } from "./dummy";
import type {
    Template,
    TemplateCell,
    TemplateFolder,
    TemplateInList,
    TemplateListResponse,
    TemplateResponse,
    TemplateRow,
} from "./types";

class TemplateError extends Error {
    constructor(
        message: string,
        public readonly name: string,
        public readonly code: number,
        public readonly cause?: TemplateError | Error,
    ) {
        super(message);
    }
}

class TemplatesNotFoundError extends TemplateError {
    constructor(message: string, code: number, cause?: TemplateError | Error) {
        super(message, "TemplatesNotFoundError", code, cause);
    }
}

class TemplateNotFoundError extends TemplateError {
    constructor(message: string, code: number, cause?: TemplateError | Error) {
        super(message, "TemplateNotFoundError", code, cause);
    }
}

class TemplateBuildingError extends TemplateError {
    constructor(message: string, code: number, cause?: TemplateError | Error) {
        super(message, "TemplateBuildingError", code, cause);
    }
}

const createCell = (cell: unknown, encrypted: boolean): TemplateCell | TemplateBuildingError => {
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
        return new TemplateBuildingError(`Cell could not be built!`, 400);
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
            return new TemplateBuildingError(`Only text fields are implemented right now`, 418);
        }
    }
};

const createRow = (row: unknown, encrypted: boolean): TemplateRow | TemplateBuildingError => {
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
        return new TemplateBuildingError(`Row could not be built!`, 400);
    }

    const id = row.id;
    const responsive = row.responsive;

    const cells: TemplateCell[] = [];

    for (const cell of row.cells) {
        const result = createCell(cell, encrypted);

        if (result instanceof TemplateBuildingError) {
            return new TemplateBuildingError(`Row could not be built!`, 400, result);
        }

        cells.push(result);
    }

    return { id, responsive, cells };
};

const createTemplate = (template: unknown): Template | TemplateBuildingError => {
    if (
        typeof template !== "object" ||
        template === null ||
        !("id" in template) ||
        typeof template.id !== "string" ||
        !("name" in template) ||
        typeof template.name !== "string" ||
        !("encrypted" in template) ||
        typeof template.encrypted !== "boolean" ||
        !("rows" in template) ||
        typeof template.rows !== "object" ||
        Array.isArray(template.rows) === false
    ) {
        return new TemplateBuildingError(`Template could not be built!`, 400);
    }

    const { id, name, encrypted } = template;

    const rows: TemplateRow[] = [];

    for (const row of template.rows) {
        const result = createRow(row, encrypted);

        if (result instanceof TemplateBuildingError) {
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

const createTemplateInList = (template: unknown): TemplateInList | TemplateBuildingError => {
    if (
        typeof template !== "object" ||
        template === null ||
        !("id" in template) ||
        typeof template.id !== "string" ||
        !("name" in template) ||
        typeof template.name !== "string"
    ) {
        return new TemplateBuildingError(`Template could not be built!`, 400);
    }

    const { id, name } = template;

    return { id, name };
};

const createFolder = (folder: unknown): TemplateFolder | TemplateBuildingError => {
    if (
        typeof folder !== "object" ||
        folder === null ||
        !("id" in folder) ||
        typeof folder.id !== "string" ||
        !("name" in folder) ||
        typeof folder.name !== "string" ||
        !("templates" in folder) ||
        typeof folder.templates !== "object" ||
        Array.isArray(folder.templates) === false
    ) {
        return new TemplateBuildingError(`Folder could not be built!`, 400);
    }

    const { id, name } = folder;

    const templates: TemplateInList[] = [];

    for (const template of folder.templates) {
        const result = createTemplateInList(template);

        if (result instanceof TemplateBuildingError) {
            return result;
        }

        templates.push(result);
    }

    return {
        id,
        name,
        templates,
    };
};

const getTemplate = async (id: string): Promise<TemplateResponse> => {
    await wait(500);

    try {
        const response = await getDummy(id);

        if (response.ok === false) {
            throw new TemplateNotFoundError(response.statusText, response.status);
        }

        const template = createTemplate(await response.json());

        if (template instanceof TemplateBuildingError) {
            throw template;
        }

        return {
            ok: true,
            loading: false,
            template,
        };
    } catch (error) {
        const message = `Template with the id ${id} could not be found!`;
        let code = 400;
        let cause: Error | undefined = undefined;

        if (error instanceof TemplateNotFoundError || error instanceof TemplateBuildingError) {
            code = error.code;
        }

        if (error instanceof Error) {
            cause = error;
        }

        return {
            ok: false,
            loading: false,
            error: new TemplateNotFoundError(message, code, cause),
        };
    }
};

const getTemplates = async (err: boolean = false): Promise<TemplateListResponse> => {
    await wait(500);
    
    try {
        const response = await getDummyList(err);

        if (response.ok === false) {
            throw new TemplateNotFoundError(response.statusText, response.status);
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
            throw new TemplateNotFoundError("JSON could not be parsed!", 400);
        }

        const general: TemplateInList[] = [];

        for (const entry of json.general) {
            const result = createTemplate(entry);

            if (result instanceof TemplateBuildingError) {
                throw result;
            }

            general.push(result);
        }

        const folders: TemplateFolder[] = [];

        for (const folder of json.folders) {
            const result = createFolder(folder);

            if (result instanceof TemplateBuildingError) {
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
        const message = `Templates could not be found!`;
        let code = 400;
        let cause: Error | undefined = undefined;

        if (
            error instanceof TemplatesNotFoundError ||
            error instanceof TemplateBuildingError ||
            error instanceof TemplateNotFoundError
        ) {
            code = error.code;
        }

        if (error instanceof Error) {
            cause = error;
        }

        return {
            ok: false,
            loading: false,
            error: new TemplatesNotFoundError(message, code, cause),
        };
    }
};

const useTemplate = (id: string): [result: TemplateResponse, refresh: () => void] => {
    const [result, setResult] = useState<TemplateResponse>({ ok: false, loading: true });

    const refresh = useCallback(() => {
        setResult({ ok: false, loading: true });

        getTemplate(id).then((response) => {
            setResult(response);
        });
    }, [id]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return [result, refresh];
};

const useTemplates = (
    err: boolean = false,
): [result: TemplateListResponse, refresh: () => void] => {
    const [result, setResult] = useState<TemplateListResponse>({ ok: false, loading: true });

    const refresh = useCallback(() => {
        setResult({ ok: false, loading: true });

        getTemplates(err).then((response) => {
            setResult(response);
        });
    }, [err]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return [result, refresh];
};

export { TemplateError, TemplateNotFoundError, TemplatesNotFoundError, useTemplate, useTemplates };

