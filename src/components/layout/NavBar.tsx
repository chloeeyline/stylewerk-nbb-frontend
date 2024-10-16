import type React from "react";
import { memo, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
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

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
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
        <li className="p-relative d-contents">
            <button
                type="button"
                style={{ flexGrow: 1, flexShrink: 0 }}
                className={cls(
                    "btn",
                    "btn-loader",
                    isPending ? "pending" : undefined
                )}
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
                style={{ "--inset": "1rem 1rem auto auto" }}
                ref={dialogRef}>
                <div
                    className="d-grid grid-template-columns"
                    style={{ "--grid-template-columns": "1fr auto" }}>
                    <span className="p-i-1 p-b-0 no-line-height">Language</span>
                    <button type="button" className="btn" onClick={() => setDialogOpen(false)}>
                        Close
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
                <LanguageSwitcher />
            </menu>
        </nav>
    );
};

const MemoNavbar = memo(Navbar);

export { MemoNavbar, Navbar };
export type { NavbarProps, NavbarRoute };
