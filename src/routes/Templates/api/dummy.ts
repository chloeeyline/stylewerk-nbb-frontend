import type { TemplateApi, TemplateFolderApi } from "./types";

const templateOne: TemplateApi = {
    id: "e1",
    name: "Foo",
    encrypted: false,
    rows: [
        {
            id: "r1",
            responsive: false,
            cells: [
                {
                    id: "c1",
                    type: "text",
                    text: "There is only a single cell in this row.",
                    data: "",
                },
            ],
        },
        {
            id: "r2",
            responsive: false,
            cells: [
                {
                    id: "c2",
                    type: "text",
                    text: "There are two non responsive cells in this row.",
                    data: "",
                },
                {
                    id: "c3",
                    type: "text",
                    text: "This is the second one.",
                    data: "",
                },
            ],
        },
        {
            id: "r3",
            responsive: true,
            cells: [
                {
                    id: "c4",
                    type: "text",
                    text: "There are two responsive cells in this row.",
                    data: "",
                },
                {
                    id: "c5",
                    type: "text",
                    text: "This is the second one.",
                    data: "",
                },
            ],
        },
    ],
};

const templateTwo: TemplateApi = {
    id: "e2",
    name: "Bar",
    encrypted: false,
    rows: [
        {
            id: "r4",
            responsive: false,
            cells: [
                {
                    id: "c6",
                    type: "text",
                    text: "This template only has a single row and a single cell.",
                    data: "",
                },
            ],
        },
    ],
};

const folderOne: TemplateFolderApi = {
    id: "f1",
    name: "Test",
    templates: [templateTwo],
};

const dummies: Record<string, TemplateApi> = {
    e1: templateOne,
    e2: templateTwo,
};

const getDummy = async (id: string) => {
    if (id in dummies) {
        return new Response(JSON.stringify(dummies[id]), { status: 200 });
    }

    return new Response(null, { status: 404, statusText: "Template could not be found" });
};

const getDummyList = async (err: boolean = false) => {
    if (err) {
        return new Response(null, {
            status: 401,
            statusText: "Unauthorized",
        });
    }

    return new Response(
        JSON.stringify({
            general: [templateOne],
            folders: [folderOne],
        }),
        {
            status: 200,
        },
    );
};

export { getDummy, getDummyList };
