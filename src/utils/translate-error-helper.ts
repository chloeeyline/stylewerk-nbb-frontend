import type { TFunction } from "i18next";

export default function translateError(key: string, t: TFunction<"translation", undefined>) {
    const translationKey = `errorCodes.${key}`;
    const translated = t(`errorCodes.${key}`);

    if (translationKey === translated) {
        return `${t("errorCodes.GeneralError")} (${key})`;
    }

    return translated;
}
