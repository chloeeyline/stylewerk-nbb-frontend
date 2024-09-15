import type { EntriesNotFoundError, EntryNotFoundError } from "./entries";

interface EntryFolderApi {
    id: string;
    name: string;
    entries: EntryApi[];
}

interface EntryApi {
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

type EntryListResponse =
    | {
          ok: true;
          loading: false;
          general: EntryInList[];
          folders: EntryFolder[];
      }
    | {
          ok: false;
          loading: false;
          error: EntriesNotFoundError;
      }
    | {
          ok: false;
          loading: true;
      };

type EntryResponse =
    | {
          ok: true;
          loading: false;
          entry: Entry;
      }
    | {
          ok: false;
          loading: false;
          error: EntryNotFoundError;
      }
    | { ok: false; loading: true };

interface EntryFolder {
    id: string;
    name: string;
    entries: EntryInList[];
}

type EntryInList = Omit<Entry, "rows">;

interface Entry {
    id: string;
    name: string;
    rows: EntryRow[];
}

interface EntryRow {
    id: string;
    responsive: boolean;

    cells: EntryCell[];
}

interface EntryCell {
    id: string;
    render: TextFieldRenderDefinition;
}

interface TextFieldRenderDefinition {
    type: "text";
    text: string;
}

export type {
    EntryFolderApi,
    EntryApi,
    EntryListResponse,
    EntryResponse,
    EntryFolder,
    EntryInList,
    Entry,
    EntryRow,
    EntryCell,
    TextFieldRenderDefinition,
};
