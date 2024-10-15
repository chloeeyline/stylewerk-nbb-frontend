import { Editor, EntryCell, EntryRow, Template, TemplateCell, TemplateRow } from "./editor-schemas";

const CreateEditor = () => {
    const templateID = crypto.randomUUID();
    const templateRowID = crypto.randomUUID();
    const templateCellID = crypto.randomUUID();
    var newEditor: Editor = {
        id: crypto.randomUUID(),
        folderID: null,
        templateID: templateID,
        name: null,
        tags: null,
        isEncrypted: false,
        isPublic: false,
        template: CreateTemplate(templateID),
        items: [CreateEntryRow(templateRowID, templateCellID)],
    };
    return newEditor;
};

const CreateTemplate = (templateID: string): Template => {
    return {
        id: templateID,
        name: null,
        description: null,
        tags: null,
    };
};

const CreateEntryRow = (templateRowID: string, templateCellID: string): EntryRow => {
    return {
        id: crypto.randomUUID(),
        templateID: templateRowID,
        template: CreateTemplateRow(templateRowID),
        items: [CreateEntryCell(templateCellID)],
    };
};
const CreateTemplateRow = (templateRowID: string): TemplateRow => {
    return {
        id: templateRowID,
        canRepeat: false,
        canWrapCells: false,
        hideOnNoInput: false,
    };
};
const CreateEntryCell = (templateCellID: string): EntryCell => {
    return {
        id: crypto.randomUUID(),
        data: null,
        templateID: templateCellID,
        template: CreateTemplateCell(templateCellID),
    };
};
const CreateTemplateCell = (templateCellID: string): TemplateCell => {
    return {
        id: templateCellID,
        inputHelper: 1,
        hideOnEmpty: false,
        isRequired: false,
        text: "Feld",
        description: null,
        metaData: null,
    };
};

export {
    CreateEditor,
    CreateEntryCell,
    CreateEntryRow,
    CreateTemplate,
    CreateTemplateCell,
    CreateTemplateRow,
};
