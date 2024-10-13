import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Grid from "~/components/layout/Grid";
import BackendRoutes from "~/constants/backend-routes";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import type { Translation } from "~/schemas/translations-schema";
import { translationSchema } from "~/schemas/translations-schema";
import Ajax from "~/utils/ajax";

const Translations = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [translations, setTranslations] = useState<Translation[]>([]);

    const newLangRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const fetchTranslations = async () => {
        const response = await Ajax.get(BackendRoutes.Language.List);

        if (response.ok === false) {
            setError(response.error.message);
            setLoading(false);
            return;
        }

        const result = await translationSchema.array().safeParseAsync(response.result);

        if (result.success === false) {
            setError("error parsing data");
            setLoading(false);
            return;
        }

        setTranslations(result.data);
        setLoading(false);
        setError(null);
    };

    useEffect(() => {
        fetchTranslations();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
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
                        {name}
                    </Link>
                </li>
            ))}
            <li>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (newLangRef.current === null) return;

                        const newCode = newLangRef.current.value ?? "";

                        if (newCode.length == 0 || newCode.length >= 6) {
                            newLangRef.current.value = "Code too long!";
                            return;
                        }

                        navigate(
                            Routes.Admin.Translations.Manage.replace(
                                RouteParams.TranslationId,
                                newCode,
                            ),
                        );
                    }}>
                    <input type="text" ref={newLangRef} />
                    <button type="submit">Add language</button>
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
                <Link to={Routes.Admin.Index}>{t("nav.admin")}</Link>
                <h1>Admin - TranslationsList</h1>
            </div>
            <Translations />
        </Grid>
    );
}
