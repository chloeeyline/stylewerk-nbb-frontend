import type React from "react";
import { memo, useEffect, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Globe from "~/components/Icon/Globe";
import Paintbrush from "~/components/Icon/Paintbrush";
import {
    builtInThemes,
    getRemoteThemes,
    getStoredThemes,
    switchTheme,
} from "~/routes/Admin/Themes/api";
import { ThemeApi } from "~/schemas/themes";
import cls from "~/utils/class-name-helper";
import { getSupportedLanguages } from "~/utils/i18n";

type NavBarLinkProps = {
    type: "link";
    name: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    url: string;
};

type NavBarButtonProps = {
    type: "button";
    name: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onClick: () => Promise<void> | void;
};

type NavbarRoute = NavBarLinkProps | NavBarButtonProps;

type NavbarProps = React.PropsWithChildren<{
    routes: (NavbarRoute | undefined)[];
    className?: string;
    styles?: React.CSSProperties;
    menuProps?: React.MenuHTMLAttributes<HTMLMenuElement>;
}>;

const NavBarLink = ({ name, url, children, style, className }: NavBarLinkProps) => {
    return (
        <li className="d-contents">
            <NavLink
                to={url}
                className={cls("btn btn-loader p-1", className)}
                style={{ flexGrow: 1, flexShrink: 0, ...style }}>
                {children ?? name}
            </NavLink>
        </li>
    );
};

const NavBarButton = ({ name, onClick, children, style, className }: NavBarButtonProps) => {
    const [isPending, startTransition] = useTransition();

    return (
        <li className="d-contents">
            <button
                type="button"
                onClick={() => {
                    startTransition(() => {
                        onClick();
                    });
                }}
                style={{
                    flexGrow: 1,
                    flexShrink: 0,
                    ...style,
                }}
                className={cls("btn btn-loader p-1", isPending ? "pending" : undefined, className)}>
                {children ?? name}
            </button>
        </li>
    );
};

const Switchers = () => {
    const { i18n, t } = useTranslation();
    const [switcherState, setSwitcherState] = useState<{
        languages: Record<string, string>;
        selected: string;
        pending?: string;
        themes: ThemeApi[];
    }>({
        languages: {},
        selected: "system",
        themes: [],
    });

    const themeDialogRef = useRef<HTMLDialogElement>(null);
    const langDialogRef = useRef<HTMLDialogElement>(null);

    const setupClosers = (type: "theme" | "lang") => {
        const abortController = new AbortController();

        switch (type) {
            case "theme":
                document.addEventListener(
                    "keydown",
                    (e) => {
                        if (themeDialogRef.current?.open !== true) {
                            abortController.abort();
                            return;
                        }
                        if (e.key !== "Escape") return;

                        closeDialog("theme");
                        abortController.abort();
                    },
                    { signal: abortController.signal },
                );

                setTimeout(() => {
                    document.addEventListener(
                        "click",
                        (e) => {
                            if (themeDialogRef.current?.open !== true) {
                                abortController.abort();
                                return;
                            }
                            if (
                                !(themeDialogRef.current instanceof HTMLDialogElement) ||
                                !(e.target instanceof Node) ||
                                themeDialogRef.current.contains(e.target)
                            ) {
                                return;
                            }

                            closeDialog("theme");
                            abortController.abort();
                        },
                        {
                            signal: abortController.signal,
                        },
                    );
                }, 250);
                break;
            case "lang":
                document.addEventListener(
                    "keydown",
                    (e) => {
                        if (langDialogRef.current?.open !== true) {
                            abortController.abort();
                            return;
                        }
                        if (e.key !== "Escape") return;

                        closeDialog("lang");
                        abortController.abort();
                    },
                    { signal: abortController.signal },
                );

                setTimeout(() => {
                    document.addEventListener(
                        "click",
                        (e) => {
                            if (langDialogRef.current?.open !== true) {
                                abortController.abort();
                                return;
                            }
                            if (
                                !(langDialogRef.current instanceof HTMLDialogElement) ||
                                !(e.target instanceof Node) ||
                                langDialogRef.current.contains(e.target)
                            ) {
                                return;
                            }

                            closeDialog("lang");
                            abortController.abort();
                        },
                        {
                            signal: abortController.signal,
                        },
                    );
                }, 250);
                break;
        }
    };

    const openDialog = (type: "theme" | "lang") => {
        switch (type) {
            case "theme":
                if (themeDialogRef.current instanceof HTMLDialogElement) {
                    themeDialogRef.current.show();
                }

                closeDialog("lang");

                setupClosers("theme");
                break;
            case "lang":
                if (langDialogRef.current instanceof HTMLDialogElement) {
                    langDialogRef.current.show();
                }

                closeDialog("theme");

                setupClosers("lang");
                break;
        }
    };

    const closeDialog = (type: "theme" | "lang") => {
        console.log("closing: " + type);
        switch (type) {
            case "theme":
                if (themeDialogRef.current instanceof HTMLDialogElement) {
                    themeDialogRef.current.close();
                }
                break;
            case "lang":
                if (langDialogRef.current instanceof HTMLDialogElement) {
                    langDialogRef.current.close();
                }
                break;
        }
    };

    const setDialog = (type: "theme" | "lang", open: boolean) => {
        if (
            !(themeDialogRef.current instanceof HTMLDialogElement) ||
            !(langDialogRef.current instanceof HTMLDialogElement)
        ) {
            return;
        }
        if (open) {
            openDialog(type);
        } else {
            closeDialog(type);
        }
    };

    const allThemes = [...Object.values(builtInThemes), ...switcherState.themes];

    const fetchRemoteThemes = async (innerId?: string) => {
        const themes = await getRemoteThemes();

        setSwitcherState({
            ...switcherState,
            selected: innerId ?? switcherState.selected,
            themes,
        });
    };

    useEffect(() => {
        const selected = getStoredThemes()[0];

        setSwitcherState({
            ...switcherState,
            selected: selected.id,
            pending: selected.id,
        });

        switchTheme(selected.id).then((result) => {
            const innerId = result.ok === true ? selected.id : selected.base;

            if (result.ok === false) {
                switchTheme(innerId).then(() => {
                    setSwitcherState({
                        ...switcherState,
                        selected: innerId,
                        pending: undefined,
                    });
                    fetchRemoteThemes(innerId);
                });
                return;
            }

            fetchRemoteThemes(selected.id);
        });
    }, []);

    return (
        <>
            <li className="p-relative">
                <button
                    type="button"
                    className="btn btn-square p-1"
                    style={{ flexGrow: 0, flexShrink: 0 }}
                    onClick={() => {
                        setDialog("theme", true);
                        fetchRemoteThemes();
                    }}>
                    <Paintbrush className="icon-inline" />
                </button>
                <dialog
                    className="p-absolute inset d-grid gap-1 p-1 rounded-3 bg-base-300 no-border"
                    style={{ "--inset": "calc(100% + 0.5rem) 0 auto auto" }}
                    ref={themeDialogRef}>
                    <div
                        className="d-grid grid-template-columns"
                        style={{ "--grid-template-columns": "1fr auto" }}>
                        <span className="p-i-1 p-b-0 no-line-height">
                            {t("common.language", { count: 2 })}
                        </span>
                        <button
                            type="button"
                            className="btn btn-square"
                            onClick={() => setDialog("theme", false)}>
                            X
                        </button>
                    </div>
                    <ul className="d-contents">
                        {allThemes.map(({ id, name }) => (
                            <li key={id} className="d-contents">
                                <button
                                    type="button"
                                    className={cls(
                                        "btn btn-loader",
                                        switcherState.pending === id ? "pending" : undefined,
                                        switcherState.selected === id
                                            ? "btn-primary active"
                                            : undefined,
                                    )}
                                    onClick={() => {
                                        setSwitcherState({
                                            ...switcherState,
                                            selected: id,
                                            pending: id,
                                        });

                                        switchTheme(id).then(({ ok }) => {
                                            if (ok) {
                                                setSwitcherState({
                                                    ...switcherState,
                                                    selected: id,
                                                    pending: undefined,
                                                });
                                            }
                                        });
                                    }}>
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </dialog>
            </li>
            <li className="p-relative">
                <button
                    type="button"
                    className="btn btn-square p-1"
                    style={{ flexGrow: 0, flexShrink: 0 }}
                    onClick={() => {
                        getSupportedLanguages().then((languages) => {
                            setSwitcherState({
                                ...switcherState,
                                languages,
                            });
                        });
                        setDialog("lang", true);
                    }}>
                    <Globe className="icon-inline" />
                </button>
                <dialog
                    className="p-absolute inset d-grid gap-1 p-1 rounded-3 bg-base-300 no-border"
                    style={{ "--inset": "calc(100% + 0.5rem) 0 auto auto" }}
                    ref={langDialogRef}>
                    <div
                        className="d-grid grid-template-columns"
                        style={{ "--grid-template-columns": "1fr auto" }}>
                        <span className="p-i-1 p-b-0 no-line-height">
                            {t("common.language", { count: 2 })}
                        </span>
                        <button
                            type="button"
                            className="btn btn-square"
                            onClick={() => setDialog("lang", false)}>
                            X
                        </button>
                    </div>
                    <ul className="d-contents">
                        {Object.entries(switcherState.languages).map(([code, name]) => (
                            <li key={code} className="d-contents">
                                <button
                                    type="button"
                                    className={cls(
                                        "btn",
                                        i18n.language === code ? "btn-primary active" : undefined,
                                    )}
                                    onClick={() => i18n.changeLanguage(code)}>
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </dialog>
            </li>
        </>
    );
};

const Navbar = ({ routes, className, ...props }: NavbarProps) => {
    const filtered = routes.filter((route) => typeof route !== "undefined");

    return (
        <nav className={cls("d-grid gap-1", className)} {...props}>
            <menu
                className="d-flex flex-wrap gap-1 reset-list flex-direction-row"
                style={{ justifyContent: "space-evenly" }}>
                {filtered.map((route) =>
                    route.type === "link" ? (
                        <NavBarLink key={route.name} {...route} />
                    ) : (
                        <NavBarButton key={route.name} {...route} />
                    ),
                )}
                <Switchers />
            </menu>
        </nav>
    );
};

const MemoNavbar = memo(Navbar);

export { MemoNavbar, Navbar };
export type { NavbarProps, NavbarRoute };
