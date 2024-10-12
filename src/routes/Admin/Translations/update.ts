import { Language } from "~/constants/backend-routes";
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
