import type React from "react";
import { memo, useEffect, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
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
    url: string;
};

type NavBarButtonProps = {
    type: "button";
    name: string;
    onClick: () => Promise<void> | void;
};

type NavbarRoute = NavBarLinkProps | NavBarButtonProps;

type NavbarProps = React.PropsWithChildren<{
    routes: (NavbarRoute | undefined)[];
    className?: string;
    styles?: React.CSSProperties;
    menuProps?: React.MenuHTMLAttributes<HTMLMenuElement>;
}>;

const NavBarLink = ({ name, url }: NavBarLinkProps) => {
    return (
        <li className="d-contents">
            <NavLink style={{ flexGrow: 1, flexShrink: 0 }} className="btn btn-loader" to={url}>
                {name}
            </NavLink>
        </li>
    );
};

const NavBarButton = ({ name, onClick }: NavBarButtonProps) => {
    const [isPending, startTransition] = useTransition();

    return (
        <li className="d-contents">
            <button
                type="button"
                style={{ flexGrow: 1, flexShrink: 0 }}
                className={cls("btn", "btn-loader", isPending ? "pending" : undefined)}
                onClick={() => {
                    startTransition(() => {
                        onClick();
                    });
                }}>
                {name}
            </button>
        </li>
    );
};

const ThemeSwitcher = () => {
    const { t } = useTranslation();
    const [switcherState, setSwitcherState] = useState<{
        selected: string;
        pending?: string;
        themes: ThemeApi[];
    }>({
        selected: "system",
        themes: [],
    });

    const dialogRef = useRef<HTMLDialogElement>(null);

    const setDialogOpen = (open: boolean) => {
        if (!(dialogRef.current instanceof HTMLDialogElement)) return;

        if (open) {
            dialogRef.current.show();
            return;
        }

        dialogRef.current.close();
    };

    const allThemes = [...Object.values(builtInThemes), ...switcherState.themes];

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
                    getRemoteThemes().then((themes) => {
                        setSwitcherState({
                            ...switcherState,
                            selected: innerId,
                            pending: undefined,
                            themes: themes,
                        });
                    });
                });
                return;
            }

            getRemoteThemes().then((themes) => {
                setSwitcherState({
                    ...switcherState,
                    selected: selected.id,
                    pending: undefined,
                    themes: themes,
                });
            });
        });
    }, []);

    return (
        <li className="p-relative">
            <button
                type="button"
                style={{ flexGrow: 1, flexShrink: 0 }}
                className={cls("btn", "btn-loader")}
                onClick={() => setDialogOpen(true)}>
                Theme
            </button>
            <dialog
                className="p-absolute inset d-grid gap-1 p-1 rounded-3 bg-base-300 no-border"
                style={{ "--inset": "calc(100% + 0.5rem) 0 auto auto" }}
                ref={dialogRef}>
                <div
                    className="d-grid grid-template-columns"
                    style={{ "--grid-template-columns": "1fr auto" }}>
                    <span className="p-i-1 p-b-0 no-line-height">
                        {t("common.language", { count: 2 })}
                    </span>
                    <button type="button" className="btn" onClick={() => setDialogOpen(false)}>
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
    );
};

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
    const [isPending, startTransition] = useTransition();
    const [switcherState, setSwitcherState] = useState<{
        languages: Record<string, string>;
    }>({
        languages: {},
    });

    const dialogRef = useRef<HTMLDialogElement>(null);

    const setDialogOpen = (open: boolean) => {
        if (!(dialogRef.current instanceof HTMLDialogElement)) return;

        if (open) {
            dialogRef.current.show();
            return;
        }

        dialogRef.current.close();
    };

    return (
        <li className="p-relative">
            <button
                type="button"
                style={{ flexGrow: 1, flexShrink: 0 }}
                className={cls("btn", "btn-loader", isPending ? "pending" : undefined)}
                onClick={() => {
                    startTransition(() => {
                        getSupportedLanguages().then((languages) => {
                            setSwitcherState({
                                ...switcherState,
                                languages,
                            });
                        });
                        setDialogOpen(true);
                    });
                }}>
                i81n
            </button>
            <dialog
                className="p-absolute inset d-grid gap-1 p-1 rounded-3 bg-base-300 no-border"
                style={{ "--inset": "calc(100% + 0.5rem) 0 auto auto" }}
                ref={dialogRef}>
                <div
                    className="d-grid grid-template-columns"
                    style={{ "--grid-template-columns": "1fr auto" }}>
                    <span className="p-i-1 p-b-0 no-line-height">
                        {t("common.language", { count: 2 })}
                    </span>
                    <button type="button" className="btn" onClick={() => setDialogOpen(false)}>
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
    );
};

const Navbar = ({ routes, ...props }: NavbarProps) => {
    const filtered = routes.filter((route) => typeof route !== "undefined");

    return (
        <nav {...props}>
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
                <ThemeSwitcher />
                <LanguageSwitcher />
            </menu>
        </nav>
    );
};

const MemoNavbar = memo(Navbar);

export { MemoNavbar, Navbar };
export type { NavbarProps, NavbarRoute };
