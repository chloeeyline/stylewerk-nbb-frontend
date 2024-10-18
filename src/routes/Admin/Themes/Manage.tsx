import type React from "react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import type { Theme } from "~/schemas/themes";
import {
    applyTheme,
    baseThemes,
    builtInThemes,
    deleteTheme,
    loadFromPersistance,
    loadTheme,
    updateTheme,
} from "./api";

type ThemeState = {
    loading: boolean;
    error: string | null;
    id: string;
    name: string;
    base: "light" | "dark";
    theme: Theme;
};

const getNameParameter = (): string =>
    new URLSearchParams(document.location.search).get("name") ?? "";

const getFromParameter = (): "light" | "dark" =>
    (new URLSearchParams(document.location.search).get("from") ?? "light") === "dark"
        ? "dark"
        : "light";

const ThemeEditor = ({
    themeState,
    setThemeState,
}: {
    themeState: ThemeState;
    setThemeState: React.Dispatch<ThemeState>;
}) => {
    applyTheme(themeState.theme, themeState.base);

    useEffect(
        () => () => {
            document.documentElement.setAttribute("style", "");

            const theme = loadFromPersistance();

            document.documentElement.dataset.theme = theme.base;

            loadTheme(theme.id).then((themeData) => {
                if (themeData !== null) {
                    applyTheme(themeData.data);
                }
            });
        },
        [],
    );

    return (
        <div
            className="d-grid gap-1 grid-template-columns"
            style={{ "--grid-template-columns": "auto auto 1fr" }}>
            {Object.entries(themeState.theme).map(([key, value]) => (
                <Fragment key={key}>
                    <span>{key}:</span>
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => {
                            const newThemeState = { ...themeState };

                            newThemeState.theme[key] = e.target.value;

                            setThemeState(newThemeState);
                        }}
                    />
                    <span className="font-mono">({value})</span>
                </Fragment>
            ))}
        </div>
    );
};

export default function AdminThemesManage() {
    const { t } = useTranslation();
    const { themeId } = useParams();
    const navigate = useNavigate();

    const [themeState, setThemeState] = useState<ThemeState>({
        loading: false,
        error: null,
        id: themeId ?? RouteParams.ThemeId,
        name: "",
        base: "light",
        theme: {},
    });

    const fetchThemeContent = async () => {
        if (themeState.loading === true) return;

        setThemeState({
            ...themeState,
            loading: true,
        });

        if (themeState.id === RouteParams.ThemeId) {
            setThemeState({
                ...themeState,
                error: "Invalid theme-id",
                loading: false,
            });
            return;
        }

        const theme = await loadTheme(themeState.id);

        if (theme === null) {
            setThemeState({
                ...themeState,
                error: null,
                loading: false,
                name: getNameParameter(),
                base: getFromParameter(),
                theme: getFromParameter() === "dark" ? baseThemes.dark : baseThemes.light,
            });
            return;
        }

        setThemeState({
            ...themeState,
            error: null,
            loading: false,
            name: theme.name,
            base: theme.base !== "system" ? theme.base : "light",
            theme: theme.data,
        });
    };

    useEffect(() => {
        if (themeState.id === RouteParams.ThemeId) {
            navigate(Routes.Admin.Themes.List);
            return;
        }

        fetchThemeContent();
    }, [themeId]);

    return (
        <Grid layout="header" className="size-block-100">
            <div>
                <Link to={Routes.Admin.Themes.List}>{t("common.back")}</Link>
                <h1>{t("nav.adminThemesManage")}</h1>
            </div>
            <ScrollContainer direction="vertical">
                <Grid layout="headerFooter" className="size-block-100 gap-1">
                    <div>
                        <InputField
                            label={t("adminThemes.labelId")}
                            name="id"
                            value={themeState.id}
                            readOnly
                        />
                        <InputField
                            label={t("adminThemes.labelName")}
                            name="name"
                            value={themeState.name}
                            onChange={(e) => {
                                setThemeState({
                                    ...themeState,
                                    name: e.target.value,
                                });
                            }}
                        />
                        <SelectField
                            label={t("adminThemes.labelBase")}
                            name="base"
                            value={themeState.base}
                            options={[
                                ["light", "Light"],
                                ["dark", "Dark"],
                            ]}
                            onChange={(e) => {
                                setThemeState({
                                    ...themeState,
                                    base: e.target.value === "dark" ? "dark" : "light",
                                });
                            }}
                        />
                    </div>
                    <ScrollContainer direction="vertical">
                        <ThemeEditor themeState={themeState} setThemeState={setThemeState} />
                    </ScrollContainer>
                    <div>
                        <button
                            type="button"
                            onClick={async () => {
                                const { id, name, base, theme } = themeState;

                                if (name.trim() === "") {
                                    setThemeState({
                                        ...themeState,
                                        error: t("formErrors.pleaseEnter", {
                                            what: t("common.name"),
                                        }),
                                    });
                                    return;
                                }

                                const result = await updateTheme(id, name, base, theme);

                                if (result.ok === false) {
                                    setThemeState({
                                        ...themeState,
                                        error: t(`errorCodes.${result.error.message}`),
                                    });
                                    return;
                                }

                                await fetchThemeContent();
                            }}>
                            {t("adminThemes.saveTheme")}
                        </button>
                        {Object.keys(builtInThemes).includes(themeState.id) ? null : (
                            <button
                                type="button"
                                onClick={async () => {
                                    const result = await deleteTheme(themeState.id);

                                    if (result.ok === false) {
                                        alert(t(`errorCodes.${result.error.message}`));
                                        return;
                                    }

                                    navigate(Routes.Admin.Translations.List);
                                }}>
                                {t("adminThemes.deleteTheme")}
                            </button>
                        )}
                    </div>
                </Grid>
            </ScrollContainer>
        </Grid>
    );
}
