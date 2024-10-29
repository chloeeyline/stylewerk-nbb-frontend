import BackendRoutes from "#/backend-routes";
import { createNbbError } from "~/schemas/nbb-error";
import type { CompleteTheme, Theme, ThemeApi } from "~/schemas/themes";
import { completeThemeSchema, themeApiSchema } from "~/schemas/themes";
import Ajax from "~/utils/ajax";
import { safeParse, safeStringify } from "~/utils/safe-json";

export const baseThemes = {
    light: {
        "--clr-primary": "#da77f2",
        "--clr-primary-content": "#000000",
        "--clr-primary-active": "#e599f7",
        "--clr-accent": "#ffd43b",
        "--clr-accent-content": "#000000",
        "--clr-accent-active": "#ffe066",
        "--clr-neutral": "#d8d8d8",
        "--clr-neutral-content": "#000000",
        "--clr-neutral-active": "#e5e5e5",
        "--clr-base-100": "#ffffff",
        "--clr-base-200": "#f2f2f2",
        "--clr-base-300": "#e6e6e6",
        "--clr-header": "#191111",
        "--clr-body": "#402b2b",
        "--clr-info": "#4dabf7",
        "--clr-info-content": "#000000",
        "--clr-info-active": "#74c0fc",
        "--clr-success": "#a9e34b",
        "--clr-success-content": "#000000",
        "--clr-success-active": "#c0eb75",
        "--clr-warning": "#ffa94d",
        "--clr-warning-content": "#000000",
        "--clr-warning-active": "#ffc078",
        "--clr-error": "#ff8787",
        "--clr-error-content": "#000000",
        "--clr-error-active": "#ffa8a8",
        "--clr-shadow": "#9a9178",
    },
    dark: {
        "--clr-primary": "#3b5bdb",
        "--clr-primary-content": "#ffffff",
        "--clr-primary-active": "#2f44ad",
        "--clr-accent": "#099268",
        "--clr-accent-content": "#ffffff",
        "--clr-accent-active": "#066649",
        "--clr-neutral": "#313b47",
        "--clr-neutral-content": "#ffffff",
        "--clr-neutral-active": "#252c35",
        "--clr-base-100": "#1d232a",
        "--clr-base-200": "#191e24",
        "--clr-base-300": "#15191e",
        "--clr-header": "#e5ebf9",
        "--clr-body": "#b7c0d2",
        "--clr-info": "#1971c2",
        "--clr-info-content": "#ffffff",
        "--clr-info-active": "#145591",
        "--clr-success": "#66a80f",
        "--clr-success-content": "#ffffff",
        "--clr-success-active": "#4c7a0b",
        "--clr-warning": "#f08c00",
        "--clr-warning-content": "#ffffff",
        "--clr-warning-active": "#b35c00",
        "--clr-error": "#e03131",
        "--clr-error-content": "#ffffff",
        "--clr-error-active": "#b02525",
    },
};

export const builtInThemes: Record<"dark" | "light" | "system" | "colorful", ThemeApi> = {
    dark: {
        id: "dark",
        name: "Dark",
        base: "dark",
        data: null,
    },
    light: {
        id: "light",
        name: "Light",
        base: "light",
        data: null,
    },
    system: {
        id: "system",
        name: "System",
        base: "system",
        data: null,
    },
    colorful: {
        id: "colorful",
        name: "Colorful",
        base: "colorful",
        data: null,
    },
};

export const persist = (theme: ThemeApi) => {
    const result = safeStringify(theme);

    if (result.ok === false) {
        return;
    }

    localStorage.setItem("theme", result.data);
};

const getBuiltInThemeApi = (id?: string): ThemeApi => {
    switch (id) {
        case "light":
            return {
                ...builtInThemes.light,
            };
        case "dark":
            return {
                ...builtInThemes.dark,
            };
        case "colorful":
            return {
                ...builtInThemes.colorful,
            };
        case "system":
        default:
            return {
                ...builtInThemes.system,
            };
    }
};

export const loadFromPersistance = (): ThemeApi => {
    const fromStorage = localStorage.getItem("theme");

    const result = safeParse(fromStorage ?? "{}");

    if (result.ok === false) {
        return {
            ...getBuiltInThemeApi(),
        };
    }

    const parsed = themeApiSchema.safeParse(result.data);

    if (parsed.success === false) {
        return {
            ...getBuiltInThemeApi(),
        };
    }

    return {
        ...parsed.data,
    };
};

export const getStoredThemes = (): [selected: ThemeApi, themes: ThemeApi[]] => [
    loadFromPersistance(),
    Object.values(builtInThemes),
];

export const getRemoteThemes = async (): Promise<ThemeApi[]> => {
    const response = await Ajax.get(BackendRoutes.ColorTheme.List);

    if (response.ok === false) {
        return [];
    }

    const parsed = await themeApiSchema.array().safeParseAsync(response.result);

    if (parsed.success === false) {
        return [];
    }

    return parsed.data;
};

export const loadTheme = async (id: string): Promise<CompleteTheme | null> => {
    if (Object.keys(builtInThemes).includes(id)) {
        return null;
    }

    const apiResponse = await Ajax.get(BackendRoutes.ColorTheme.Details, {
        search: { id },
    });

    if (apiResponse.ok === false) {
        return null;
    }

    const outerResult = await themeApiSchema.safeParseAsync(apiResponse.result);

    if (outerResult.success === false || typeof outerResult.data.data !== "string") {
        return null;
    }

    const parsed = safeParse(outerResult.data.data);

    if (parsed.ok === false) {
        return null;
    }

    const innerResult = await completeThemeSchema.safeParseAsync({
        ...outerResult.data,
        data: parsed.data,
    });

    if (innerResult.success === false) {
        return null;
    }

    return innerResult.data;
};

export const switchBase = (base: "dark" | "light" | "system" | "colorful") => {
    document.documentElement.dataset.theme = base;
};

export const switchTheme = async (id: string) => {
    if (Object.keys(builtInThemes).includes(id)) {
        document.documentElement.setAttribute("style", "");

        const theme = getBuiltInThemeApi(id);

        switchBase(theme.base);

        persist({
            id: theme.id,
            name: theme.name,
            base: theme.base,
            data: theme.data,
        });

        return { ok: true };
    }

    const theme = await loadTheme(id);

    if (theme === null) {
        return { ok: false, error: createNbbError(1102, "NoDataFound", false) };
    }

    document.documentElement.dataset.theme = theme.base === "dark" ? "dark" : "light";

    switchBase(theme.base);

    applyTheme(theme.data);

    persist({
        id: theme.id,
        name: theme.name,
        base: theme.base,
        data: null,
    });

    return { ok: true };
};

export const applyTheme = (data: Theme, scheme?: string) => {
    document.documentElement.setAttribute(
        "style",
        (typeof scheme === "string" ? `color-scheme:${scheme};` : "") +
            Object.entries(data)
                .map(([key, value]) => `${key}:${value};`)
                .join(""),
    );
};

export const deleteTheme = (id: string) =>
    Ajax.post(BackendRoutes.ColorTheme.Remove, {
        auth: true,
        search: { id },
    });

export const updateTheme = async (id: string, name: string, base: string, data: Theme) => {
    if (base !== "dark" && base !== "light") {
        return { ok: false, error: createNbbError(1101, "DataIsInvalid", false) };
    }

    const stringified = safeStringify(data);

    if (stringified.ok === false) {
        return { ok: false, error: createNbbError(1101, "DataIsInvalid", false) };
    }

    const result = await Ajax.post(BackendRoutes.ColorTheme.Update, {
        auth: true,
        body: {
            id,
            name,
            base,
            data: stringified.data,
        },
    });

    if (result.ok === false) {
        return result;
    }

    applyTheme(data);

    return result;
};
