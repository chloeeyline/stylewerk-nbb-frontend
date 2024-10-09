import { BACKEND_URL } from "#/general";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import type { HttpBackendOptions } from "i18next-http-backend";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import BackendRoutes from "~/constants/backend-routes";
import Ajax from "./ajax";

const refineLanguageResponse = (data: unknown): Record<string, string> => {
    const langs: Record<string, string> = {};

    if (Array.isArray(data)) {
        data.forEach((lang) => {
            if (
                typeof lang !== "object" ||
                lang === null ||
                !("code" in lang) ||
                typeof lang.code !== "string" ||
                !("name" in lang) ||
                typeof lang.name !== "string"
            ) {
                return;
            }

            langs[lang.code] = lang.name;
        });
    }

    return langs;
};

/**
 *
 * @returns An array of supported languages or undefined should they not be fetchable.
 */
export const getSupportedLanguages = async (): Promise<Record<string, string> | {}> => {
    try {
        const response = await Ajax.get(BackendRoutes.Language.List);

        if (response.ok !== true) {
            return {};
        }

        return refineLanguageResponse(response.result);
    } catch (error) {
        // TODO add logging
        console.error(error);
        return {};
    }
};

i18n.use(HttpBackend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init<HttpBackendOptions>({
        detection: {
            order: ["localStorage", "navigator"],
        },
        fallbackLng: "de",
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: `${BACKEND_URL}${BackendRoutes.Language.Index}?code={{lng}}`,
            crossDomain: true,
        },
    });

i18n.on("languageChanged", (lng) => {
    document.documentElement.setAttribute("lang", lng);
});

export default i18n;
