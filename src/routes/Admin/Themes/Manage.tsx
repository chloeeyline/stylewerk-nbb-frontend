import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import Download from "~/components/Icon/Download";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import type { Theme } from "~/schemas/themes";
import cls from "~/utils/class-name-helper";
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
    pending: "save" | "delete" | null;
    id: string;
    name: string;
    base: "light" | "dark";
    theme: Theme;
    blob: string | null;
};

const getNameParameter = (): string =>
    new URLSearchParams(document.location.search).get("name") ?? "";

const getFromParameter = (): "light" | "dark" =>
    (new URLSearchParams(document.location.search).get("from") ?? "light") === "dark"
        ? "dark"
        : "light";

const createBlobString = (input: Theme) =>
    URL.createObjectURL(new Blob([JSON.stringify(input)], { type: "octet/stream" }));

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
        <>
            {Object.entries(themeState.theme).map(([key, value]) => (
                <InputField
                    type="color"
                    className="cursor-pointer"
                    key={key}
                    name={key}
                    label={key}
                    value={value}
                    onChange={(e) => {
                        const newThemeState = { ...themeState };

                        newThemeState.theme[key] = e.target.value;

                        newThemeState.blob = createBlobString(newThemeState.theme);

                        setThemeState(newThemeState);
                    }}
                />
            ))}
        </>
    );
};

export default function AdminThemesManage() {
    const { t } = useTranslation();
    const { themeId } = useParams();
    const navigate = useNavigate();

    const [themeState, setThemeState] = useState<ThemeState>({
        loading: false,
        error: null,
        pending: null,
        id: themeId ?? RouteParams.ThemeId,
        name: "",
        base: "light",
        theme: {},
        blob: null,
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
            const name = getNameParameter();
            const from = getFromParameter();
            const baseTheme = from === "dark" ? baseThemes.dark : baseThemes.light;

            setThemeState({
                ...themeState,
                error: null,
                loading: false,
                name,
                base: from,
                theme: baseTheme,
                blob: createBlobString(baseTheme),
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
            blob: createBlobString(theme.data),
        });
    };

    useEffect(() => {
        if (themeState.id === RouteParams.ThemeId) {
            navigate(Routes.Admin.Themes.List);
            return;
        }

        fetchThemeContent();
    }, [themeId]);

    console.log(themeState);

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
                            className="input"
                            label={t("adminThemes.labelId")}
                            name="id"
                            value={themeState.id}
                            readOnly
                        />
                        <InputField
                            className="input"
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
                            className="input"
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
                    <div className="d-flex flex-wrap gap-1">
                        <button
                            type="button"
                            className={cls(
                                "btn",
                                "btn-primary",
                                "btn-loader",
                                themeState.pending === "save" ? "pending" : undefined,
                                "p-1",
                            )}
                            onClick={async () => {
                                setThemeState({
                                    ...themeState,
                                    pending: "save",
                                });
                                const { id, name, base, theme } = themeState;

                                if (name.trim() === "") {
                                    setThemeState({
                                        ...themeState,
                                        error: t("formErrors.pleaseEnter", {
                                            what: t("common.name"),
                                        }),
                                        pending: null,
                                    });
                                    return;
                                }

                                const result = await updateTheme(id, name, base, theme);

                                if (result.ok === false) {
                                    setThemeState({
                                        ...themeState,
                                        error: t(`errorCodes.${result.error.message}`),
                                        pending: null,
                                    });
                                    return;
                                }

                                setThemeState({
                                    ...themeState,
                                    error: null,
                                    pending: null,
                                });

                                await fetchThemeContent();
                            }}>
                            {t("adminThemes.saveTheme")}
                        </button>
                        {Object.keys(builtInThemes).includes(themeState.id) ? null : (
                            <button
                                type="button"
                                className={cls(
                                    "btn",
                                    "btn-loader",
                                    themeState.pending === "delete" ? "pending" : undefined,
                                    "p-1",
                                )}
                                onClick={async () => {
                                    setThemeState({
                                        ...themeState,
                                        pending: "delete",
                                    });
                                    const result = await deleteTheme(themeState.id);

                                    if (result.ok === false) {
                                        setThemeState({
                                            ...themeState,
                                            error: t(`errorCodes.${result.error.message}`),
                                            pending: null,
                                        });
                                        return;
                                    }

                                    navigate(Routes.Admin.Themes.List);
                                }}>
                                {t("adminThemes.deleteTheme")}
                            </button>
                        )}
                        <a
                            className="btn btn-accent p-1"
                            href={themeState.blob ?? "#"}
                            download={themeState.name + ".json"}>
                            {t("common.download")}
                            <Download className="icon-inline m-is-1" fill="currentColor" />
                        </a>
                    </div>
                </Grid>
            </ScrollContainer>
        </Grid>
    );
}
