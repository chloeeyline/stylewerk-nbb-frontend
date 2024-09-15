import type { TemplatesNotFoundError, TemplateNotFoundError } from "./templates";

interface TemplateFolderApi {
    id: string;
    name: string;
    templates: TemplateApi[];
}

interface TemplateApi {
    id: string;
    name: string;
    encrypted: boolean;
    rows: Array<{
        id: string;
        responsive: boolean;
        cells: Array<{
            id: string;
            type: string;
            text: string;
            data: string;
        }>;
    }>;
}

type TemplateListResponse =
    | {
          ok: true;
          loading: false;
          general: TemplateInList[];
          folders: TemplateFolder[];
      }
    | {
          ok: false;
          loading: false;
          error: TemplatesNotFoundError;
      }
    | {
          ok: false;
          loading: true;
      };

type TemplateResponse =
    | {
          ok: true;
          loading: false;
          template: Template;
      }
    | {
          ok: false;
          loading: false;
          error: TemplateNotFoundError;
      }
    | { ok: false; loading: true };

interface TemplateFolder {
    id: string;
    name: string;
    templates: TemplateInList[];
}

type TemplateInList = Omit<Template, "rows">;

interface Template {
    id: string;
    name: string;
    rows: TemplateRow[];
}

interface TemplateRow {
    id: string;
    responsive: boolean;

    cells: TemplateCell[];
}

interface TemplateCell {
    id: string;
    render: TextFieldRenderDefinition;
}

interface TextFieldRenderDefinition {
    type: "text";
    text: string;
}

export type {
    TemplateFolderApi,
    TemplateApi,
    TemplateListResponse,
    TemplateResponse,
    TemplateFolder,
    TemplateInList,
    Template,
    TemplateRow,
    TemplateCell,
    TextFieldRenderDefinition,
};
