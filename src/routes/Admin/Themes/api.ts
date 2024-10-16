import BackendRoutes, { ColorTheme } from "~/constants/backend-routes";
import { createNbbError } from "~/schemas/nbb-error";
import {
    CompleteTheme,
    completeThemeSchema,
    Theme,
    ThemeApi,
    themeApiSchema,
} from "~/schemas/themes";
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
    },
    light: {
        id: "light",
        name: "Light",
        base: "light",
    },
    system: {
        id: "system",
        name: "System",
        base: "system",
    },
    colorful: {
        id: "colorful",
        name: "Colorful",
        base: "light",
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
    const result = safeParse(localStorage.getItem("theme") ?? "{}");

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

    const apiResponse = await Ajax.get(BackendRoutes.ColorTheme.Index, {
        search: { id },
    });

    if (apiResponse.ok === false) {
        return null;
    }

    const result = await completeThemeSchema.safeParseAsync(apiResponse.result);

    if (result.success === false) {
        return null;
    }

    return result.data;
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
    Ajax.post(ColorTheme.Remove, {
        auth: true,
        body: { id },
    });

export const updateTheme = async (id: string, name: string, base: string, data: Theme) => {
    if (base !== "dark" && base !== "light") {
        return { ok: false, error: createNbbError(1101, "DataIsInvalid", false) };
    }

    const stringified = safeStringify(data);

    if (stringified.ok === false) {
        return { ok: false, error: createNbbError(1101, "DataIsInvalid", false) };
    }

    const result = await Ajax.post(ColorTheme.Update, {
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
