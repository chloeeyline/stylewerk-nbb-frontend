import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Columns from "~/components/forms/Columns";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import Grid from "~/components/layout/Grid";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import type { ThemeApi } from "~/schemas/themes";
import { getRemoteThemes } from "./api";

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
        <>
            <ul className="d-grid gap-1 p-is-7">
                {themes.map(({ id, name }) => (
                    <li key={id}>
                        <Link to={Routes.Admin.Themes.Manage.replace(RouteParams.ThemeId, id)}>
                            {name} ({id})
                        </Link>
                    </li>
                ))}
            </ul>
            <form
                className="d-grid gap-1"
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
                <Columns>
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
                </Columns>
                <button type="submit" className="btn btn-primary p-1 size-inline-fit">
                    {t("adminThemes.addNewTheme")}
                </button>
            </form>
        </>
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
