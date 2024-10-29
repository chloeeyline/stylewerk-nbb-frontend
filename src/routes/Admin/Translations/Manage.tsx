import type React from "react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";

import BackendRoutes from "#/backend-routes";
import RouteParams from "#/route-params";
import Routes from "#/routes";
import InputField from "~/components/forms/InputField";
import Download from "~/components/Icon/Download";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import type { TranslationContent } from "~/schemas/translations";
import { translationContentSchema, translationSchema } from "~/schemas/translations";
import Ajax from "~/utils/ajax";
import cls from "~/utils/class-name-helper";
import { deleteLanguage, updateLanguage } from "./api";
import UserGuard from "~/components/general/UserGuard";
import Save from "~/components/Icon/Save";
import Cross from "~/components/Icon/Cross";

type TranslationState = {
    loading: boolean;
    pending: "save" | "delete" | null;
    error: string | null;
    code: string;
    name: string;
    data: TranslationContent;
    blob: string | null;
};

const getFromParameter = () => new URLSearchParams(document.location.search).get("from") ?? "de";

const createBlobString = (input: Record<string, Record<string, string>>) =>
    URL.createObjectURL(new Blob([JSON.stringify(input)], { type: "octet/stream" }));

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
        <>
            {Object.entries(translationState.data).map(([ns, translations]) => (
                <Fragment key={ns}>
                    {Object.entries(translations).map(([key, value]) => (
                        <InputField
                            key={key}
                            label={`${ns}.${key}`}
                            name={`${ns}.${key}`}
                            value={value}
                            className="input"
                            onChange={(e) => {
                                const newTranslationState = { ...translationState };

                                newTranslationState.data[ns][key] = e.target.value;
                                newTranslationState.blob = createBlobString(
                                    newTranslationState.data,
                                );

                                setTranslationState(newTranslationState);
                            }}
                        />
                    ))}
                </Fragment>
            ))}
        </>
    );
};

const AdminTranslationsManage = () => {
    const { t } = useTranslation();
    const { translationId } = useParams();
    const navigate = useNavigate();

    const [translationState, setTranslationState] = useState<TranslationState>({
        loading: false,
        pending: null,
        error: null,
        code: translationId ?? RouteParams.TranslationId,
        name: "",
        data: {},
        blob: null,
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
            blob: createBlobString(result.data),
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
        <Grid layout="headerFooter" className="gap-1">
            <div>
                <Link to={Routes.Admin.Translations.List}>{t("common.back")}</Link>
                <h1>{t("nav.adminTranslationsManage")}</h1>
            </div>
            <Grid layout="header" className="gap-1">
                <div>
                    {translationState.error !== null ? <span>{translationState.error}</span> : null}
                    <InputField
                        className="input"
                        label={t("adminTranslations.labelCode")}
                        name="code"
                        value={translationState.code}
                        readOnly
                    />
                    <InputField
                        className="input"
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
                        className="input"
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
            </Grid>
            <div className="d-flex flex-wrap gap-1">
                <button
                    type="button"
                    className={cls(
                        "btn btn-primary btn-loader p-1",
                        translationState.pending === "save" ? "pending" : undefined,
                    )}
                    onClick={async () => {
                        setTranslationState({
                            ...translationState,
                            pending: "save",
                        });
                        const { code, name, data } = translationState;

                        if (name.trim() === "") {
                            setTranslationState({
                                ...translationState,
                                error: t("formErrors.pleaseEnter", {
                                    what: t("common.name"),
                                }),
                                pending: null,
                            });
                            return;
                        }

                        const result = await updateLanguage(code, name, data);

                        if (result.ok === false) {
                            setTranslationState({
                                ...translationState,
                                error: t(`errorCodes.${result.error.message}`),
                                pending: null,
                            });
                            return;
                        }

                        setTranslationState({
                            ...translationState,
                            error: null,
                            pending: null,
                        });

                        await fetchTranslationContent();
                    }}>
                    {t("adminTranslations.saveLanguage")}
                    <Save className="icon-inline m-is-1" />
                </button>
                {["de", "en"].includes(translationState.code) ? null : (
                    <button
                        type="button"
                        className={cls(
                            "btn btn-error btn-loader p-1",
                            translationState.pending === "delete" ? "pending" : undefined,
                        )}
                        onClick={async () => {
                            setTranslationState({
                                ...translationState,
                                pending: "delete",
                            });
                            const result = await deleteLanguage(translationState.code);

                            if (result.ok === false) {
                                setTranslationState({
                                    ...translationState,
                                    error: t(`errorCodes.${result.error.message}`),
                                    pending: null,
                                });
                                return;
                            }

                            navigate(Routes.Admin.Translations.List);
                        }}>
                        {t("adminTranslations.deleteLanguage")}
                        <Cross className="icon-inline m-is-1" />
                    </button>
                )}
                <a
                    className="btn btn-accent p-1"
                    href={translationState.blob ?? "#"}
                    download={translationState.name + ".json"}>
                    {t("common.download")}
                    <Download className="icon-inline m-is-1" />
                </a>
            </div>
        </Grid>
    );
};

export default function AdminTranslationsManageGuarded() {
    return (
        <UserGuard>
            <AdminTranslationsManage />
        </UserGuard>
    );
}
