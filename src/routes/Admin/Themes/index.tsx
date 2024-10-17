import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import InputField from "~/components/forms/InputField";
import Download from "~/components/Icon/Download";
import Grid from "~/components/layout/Grid";
import BackendRoutes from "~/constants/backend-routes";
import { BACKEND_URL } from "~/constants/general";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import type { ThemeApi } from "~/schemas/themes";
import { getRemoteThemes } from "./api";
import SelectField from "~/components/forms/SelectField";

const Themes = () => {
    const { t } = useTranslation();

    const [themesState, setThemesState] = useState<{
        loading: boolean;
        error: string | null;
        themes: ThemeApi[];
    }>({
        loading: false,
        error: null,
        themes: [],
    });

    const newThemeRef = useRef<HTMLInputElement>(null);
    const fromThemeRef = useRef<HTMLSelectElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (themesState.loading === true) return;
        setThemesState({
            ...themesState,
            loading: true,
        });
        getRemoteThemes().then((themes) => {
            setThemesState({
                ...themesState,
                themes,
                loading: false,
                error: null,
            });
        });
    }, []);

    const { loading, error, themes } = themesState;

    if (loading) {
        return <div>{t("common.loading")}</div>;
    }

    if (error !== null) {
        return <div>{error}</div>;
    }

    return (
        <ul>
            {themes.map(({ id, name }) => (
                <li key={id}>
                    <Link to={Routes.Admin.Themes.Manage.replace(RouteParams.ThemeId, id)}>
                        {name} ({id})
                    </Link>
                    <a
                        className="p-is-1"
                        href={`${BACKEND_URL}${BackendRoutes.ColorTheme.Index}?id=${id}`}
                        download={`${name}.json`}>
                        <Download className="icon-inline" fill="currentColor" />
                    </a>
                </li>
            ))}
            <li>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (newThemeRef.current === null || fromThemeRef.current === null) return;

                        const newId = newThemeRef.current.value;
                        const fromId = fromThemeRef.current.value;

                        if (newId.length == 0) {
                            newThemeRef.current.value = "Id too short!";
                            return;
                        }

                        navigate(
                            Routes.Admin.Themes.Manage.replace(
                                RouteParams.ThemeId,
                                crypto.randomUUID(),
                            ) +
                                `?name=${newId}` +
                                (fromId.length !== 0 ? `&from=${fromId}` : ""),
                        );
                    }}>
                    <InputField
                        label={t("adminThemes.labelNewName")}
                        name="newName"
                        ref={newThemeRef}
                    />
                    <SelectField
                        label={t("adminThemes.labelFromId")}
                        name="from"
                        ref={fromThemeRef}
                        options={[
                            ["light", "Light"],
                            ["dark", "Dark"],
                        ]}
                    />
                    <button type="submit">{t("adminThemes.addNewTheme")}</button>
                </form>
            </li>
        </ul>
    );
};

export default function AdminThemesList() {
    const { t } = useTranslation();

    return (
        <Grid layout="header">
            <div>
                <Link to={Routes.Admin.Index}>{t("common.back")}</Link>
                <h1>{t("nav.adminThemes")}</h1>
            </div>
            <Themes />
        </Grid>
    );
}
