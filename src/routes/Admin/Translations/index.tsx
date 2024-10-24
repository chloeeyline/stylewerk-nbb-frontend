import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import BackendRoutes from "#/backend-routes";
import RouteParams from "#/route-params";
import Routes from "#/routes";
import Columns from "~/components/forms/Columns";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import Grid from "~/components/layout/Grid";
import type { Translation } from "~/schemas/translations";
import { translationSchema } from "~/schemas/translations";
import Ajax from "~/utils/ajax";
import translateError from "~/utils/translate-error-helper";
import UserGuard from "~/components/general/UserGuard";

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
        <>
            <ul className="d-grid gap-1 p-is-7">
                {translations.map(({ code, name }) => (
                    <li key={code}>
                        <Link
                            to={Routes.Admin.Translations.Manage.replace(
                                RouteParams.TranslationId,
                                code,
                            )}>
                            {name} ({code})
                        </Link>
                    </li>
                ))}
            </ul>
            <form
                className="d-grid gap-1"
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
                <fieldset className="d-grid gap-0 rounded-2 p-1 bg-base-200 no-border">
                    <Columns>
                        <InputField
                            className="input bg-base-300"
                            label={t("adminTranslations.labelNewCode")}
                            name="newCode"
                            ref={newLangRef}
                        />
                        <SelectField
                            className="input bg-base-300"
                            label={t("adminTranslations.labelFromCode")}
                            name="fromCode"
                            ref={fromLangRef}
                            options={[
                                { code: "", name: t("adminTranslations.fromCodeDefault") },
                                ...translations,
                            ].map(({ code, name }) => [code, name])}
                        />
                    </Columns>
                    <button type="submit" className="btn btn-primary p-1 m-bs-0 size-inline-fit">
                        {t("adminTranslations.addNewLanguage")}
                    </button>
                </fieldset>
            </form>
        </>
    );
};

const AdminTranslationsList = () => {
    const { t } = useTranslation();

    return (
        <Grid layout="header" className="gap-1">
            <h1>{t("nav.adminTranslations")}</h1>
            <Translations />
        </Grid>
    );
};

export default function AdminTranslationsListGuarded() {
    return (
        <UserGuard>
            <AdminTranslationsList />
        </UserGuard>
    );
}
