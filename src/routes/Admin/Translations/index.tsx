import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import Download from "~/components/Icon/Download";
import Grid from "~/components/layout/Grid";
import BackendRoutes from "~/constants/backend-routes";
import { BACKEND_URL } from "~/constants/general";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import type { Translation } from "~/schemas/translations-schema";
import { translationSchema } from "~/schemas/translations-schema";
import Ajax from "~/utils/ajax";
import translateError from "~/utils/translate-error-helper";

const Translations = () => {
    const { t } = useTranslation();

    const [translationsState, setTranslationState] = useState<{
        loading: boolean;
        error: string | null;
        translations: Translation[];
    }>({
        loading: false,
        error: null,
        translations: [],
    });

    const newLangRef = useRef<HTMLInputElement>(null);
    const fromLangRef = useRef<HTMLSelectElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await Ajax.get(BackendRoutes.Language.List);

            if (response.ok === false) {
                setTranslationState({
                    ...translationsState,
                    error: translateError(response.error.message, t),
                    loading: false,
                });
                return;
            }

            const result = await translationSchema.array().safeParseAsync(response.result);

            if (result.success === false) {
                setTranslationState({
                    ...translationsState,
                    error: t("errorCodes.GeneralError"),
                    loading: false,
                });
                return;
            }

            setTranslationState({
                ...translationsState,
                translations: result.data,
                error: null,
                loading: false,
            });
        })();
    }, []);

    const { loading, error, translations } = translationsState;

    if (loading) {
        return <div>{t("common.loading")}</div>;
    }

    if (error !== null) {
        return <div>{error}</div>;
    }

    return (
        <ul>
            {translations.map(({ code, name }) => (
                <li key={code}>
                    <Link
                        to={Routes.Admin.Translations.Manage.replace(
                            RouteParams.TranslationId,
                            code,
                        )}>
                        {name} ({code})
                    </Link>
                    <a
                        className="p-is-1"
                        href={`${BACKEND_URL}${BackendRoutes.Language.Index}?code=${code}`}
                        download={`${name}.json`}>
                        <Download className="icon-inline" fill="currentColor" />
                    </a>
                </li>
            ))}
            <li>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (newLangRef.current === null || fromLangRef.current === null) return;

                        const newCode = newLangRef.current.value;
                        const fromCode = fromLangRef.current.value;

                        if (newCode.length == 0 || newCode.length >= 6) {
                            newLangRef.current.value = "Code too long!";
                            return;
                        }

                        navigate(
                            Routes.Admin.Translations.Manage.replace(
                                RouteParams.TranslationId,
                                newCode,
                            ) + (fromCode.length !== 0 ? `?from=${fromCode}` : ""),
                        );
                    }}>
                    <InputField
                        label={t("adminTranslations.labelNewCode")}
                        name="newCode"
                        ref={newLangRef}
                    />
                    <SelectField
                        label={t("adminTranslations.labelFromCode")}
                        name="fromCode"
                        ref={fromLangRef}
                        options={[
                            { code: "", name: t("adminTranslations.fromCodeDefault") },
                            ...translations,
                        ].map(({ code, name }) => [code, name])}
                    />
                    <button type="submit">{t("adminTranslations.addNewLanguage")}</button>
                </form>
            </li>
        </ul>
    );
};

export default function AdminTranslationsList() {
    const { t } = useTranslation();

    return (
        <Grid layout="header">
            <div>
                <Link to={Routes.Admin.Index}>{t("common.back")}</Link>
                <h1>{t("nav.adminTranslations")}</h1>
            </div>
            <Translations />
        </Grid>
    );
}
