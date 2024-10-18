import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "~/components/forms/InputField";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import BackendRoutes from "~/constants/backend-routes";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import type { TranslationContent } from "~/schemas/translations";
import { translationContentSchema, translationSchema } from "~/schemas/translations";
import Ajax from "~/utils/ajax";
import { deleteLanguage, updateLanguage } from "./api";

type TranslationState = {
    loading: boolean;
    error: string | null;
    code: string;
    name: string;
    data: TranslationContent;
};

const getFromParameter = () => new URLSearchParams(document.location.search).get("from") ?? "de";

const getLanguage = async (
    code: string,
    failureCode?: string,
): Promise<
    | { ok: true; code: string; name: string; data: TranslationContent }
    | { ok: false; error: string }
> => {
    const response = await Ajax.get(BackendRoutes.Language.Details, { search: { code } });

    if (response.ok === false) {
        if (typeof failureCode === "string")
            return {
                ok: false,
                error: response.error.message,
            };
        return await getLanguage(getFromParameter(), code);
    }

    const result = await translationSchema.safeParseAsync(response.result);

    if (result.success === false || result.data.data === null) {
        if (typeof failureCode === "string")
            return {
                ok: false,
                error: result?.error?.message ?? "Data is unset",
            };
        return await getLanguage(getFromParameter(), code);
    }

    try {
        const translationResult = await translationContentSchema.safeParseAsync(
            JSON.parse(result.data.data),
        );

        if (translationResult.success === false) {
            if (typeof failureCode === "string") {
                return {
                    ok: false,
                    error: translationResult.error.message,
                };
            }
            return await getLanguage(getFromParameter(), code);
        }

        return {
            ok: true,
            code: typeof failureCode === "string" ? failureCode : result.data.code,
            name: typeof failureCode === "string" ? "" : result.data.name,
            data: translationResult.data,
        };
    } catch (error) {
        if (typeof failureCode === "string") {
            return {
                ok: false,
                error: "Something went wrong!",
            };
        }
        return await getLanguage(getFromParameter(), code);
    }
};

const LanguageEditor = ({
    translationState,
    setTranslationState,
}: {
    translationState: TranslationState;
    setTranslationState: React.Dispatch<TranslationState>;
}) => {
    return (
        <div style={{ display: "grid" }} className="gap-1">
            {Object.entries(translationState.data).map(([ns, translations]) => (
                <div key={ns} style={{ display: "grid" }} className="gap-1">
                    {Object.entries(translations).map(([key, value]) => (
                        <div
                            key={key}
                            style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}
                            className="gap-1">
                            <span>
                                {ns}.{key}:
                            </span>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                    const newTranslationState = { ...translationState };

                                    newTranslationState.data[ns][key] = e.target.value;

                                    setTranslationState(newTranslationState);
                                }}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default function AdminTranslationsManage() {
    const { t } = useTranslation();
    const { translationId } = useParams();
    const navigate = useNavigate();

    const [translationState, setTranslationState] = useState<TranslationState>({
        loading: false,
        error: null,
        code: translationId ?? RouteParams.TranslationId,
        name: "",
        data: {},
    });

    const fetchTranslationContent = async () => {
        if (translationState.loading === true) return;

        setTranslationState({
            ...translationState,
            loading: true,
        });

        if (translationState.code === RouteParams.TranslationId) {
            setTranslationState({
                ...translationState,
                error: t("common.invalidId"),
                loading: false,
            });
            return;
        }

        const result = await getLanguage(translationState.code);

        if (result.ok === false) {
            setTranslationState({
                ...translationState,
                error: result.error,
                loading: false,
            });
            return;
        }

        setTranslationState({
            ...translationState,
            name: result.name,
            error: null,
            data: result.data,
            loading: false,
        });
    };

    useEffect(() => {
        if (translationState.code === RouteParams.TranslationId) {
            navigate(Routes.Admin.Translations.List);
            return;
        }
        fetchTranslationContent();
    }, [translationId]);

    if (translationState.code === RouteParams.TranslationId) {
        return null;
    }

    return (
        <Grid layout="header" className="size-block-100">
            <div>
                <Link to={Routes.Admin.Translations.List}>{t("common.back")}</Link>
                <h1>{t("nav.adminTranslationsManage")}</h1>
            </div>
            <ScrollContainer direction="vertical">
                <Grid layout="headerFooter" className="size-block-100 gap-1">
                    <div>
                        <InputField
                            label={t("adminTranslations.labelCode")}
                            name="code"
                            value={translationState.code}
                            readOnly
                        />
                        <InputField
                            label={t("adminTranslations.labelName")}
                            name="name"
                            value={translationState.name}
                            onChange={(e) => {
                                setTranslationState({
                                    ...translationState,
                                    name: e.target.value,
                                });
                            }}
                        />
                        <InputField
                            type="file"
                            label={t("adminTranslations.labelUploadJson")}
                            name="json"
                            accept=".json"
                            onChange={(e) => {
                                if (e.target.files === null || e.target.files.length === 0) return;

                                const fileReader = new FileReader();

                                fileReader.addEventListener(
                                    "load",
                                    (f) => {
                                        if (typeof f.target?.result !== "string") return;

                                        try {
                                            const result = translationContentSchema.safeParse(
                                                JSON.parse(f.target.result),
                                            );

                                            if (result.success === false) {
                                                e.target.files = null;
                                                return;
                                            }

                                            setTranslationState({
                                                ...translationState,
                                                data: result.data,
                                            });
                                            e.target.files = null;
                                        } catch (error) {
                                            e.target.files = null;
                                        }
                                    },
                                    false,
                                );

                                fileReader.readAsText(e.target.files[0], "UTF-8");
                            }}
                        />
                    </div>
                    <ScrollContainer direction="vertical">
                        <LanguageEditor
                            translationState={translationState}
                            setTranslationState={setTranslationState}
                        />
                    </ScrollContainer>
                    <div>
                        <button
                            type="button"
                            onClick={async () => {
                                const { code, name, data } = translationState;

                                if (name.trim() === "") {
                                    setTranslationState({
                                        ...translationState,
                                        error: t("formErrors.pleaseEnter", { what: t("common.name")}),
                                    });
                                    return;
                                }

                                const result = await updateLanguage(code, name, data);

                                if (result.ok === false) {
                                    setTranslationState({
                                        ...translationState,
                                        error: t(`errorCodes.${result.error.message}`),
                                    });
                                    return;
                                }

                                await fetchTranslationContent();
                            }}>
                            {t("adminTranslations.saveLanguage")}
                        </button>
                        {["de", "en"].includes(translationState.code) ? null : (
                            <button
                                type="button"
                                onClick={async () => {
                                    const result = await deleteLanguage(translationState.code);

                                    if (result.ok === false) {
                                        alert(t(`errorCodes.${result.error.message}`));
                                        return;
                                    }

                                    navigate(Routes.Admin.Translations.List);
                                }}>
                                {t("adminTranslations.deleteLanguage")}
                            </button>
                        )}
                    </div>
                </Grid>
            </ScrollContainer>
        </Grid>
    );
}
