import { Language } from "~/constants/backend-routes";
import { createNbbError } from "~/schemas/nbb-error";
import Ajax from "~/utils/ajax";
import i18n from "~/utils/i18n";

export const updateLanguage = async (
    code: string,
    name: string,
    data: Record<string, Record<string, string>>,
) => {
    const result = await Ajax.post(Language.Update, {
        auth: true,
        body: {
            code,
            name,
            data: JSON.stringify(data),
        },
    });

    if (result.ok === false) {
        return result;
    }

    await i18n.reloadResources(code);

    return result;
};

export const deleteLanguage = async (code: string) => {
    if (["de", "en"].includes(code)) {
        return { ok: false, error: createNbbError(1101, "DataIsInvalid", false) };
    }

    const result = await Ajax.post(Language.Remove, {
        search: {
            code,
        },
        auth: true,
    });

    if (result.ok === false) {
        return result;
    }

    await i18n.reloadResources();

    return result;
};
