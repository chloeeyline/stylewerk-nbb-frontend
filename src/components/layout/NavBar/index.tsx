import type React from "react";
import { memo, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import cls from "~/utils/class-name-helper";
import { getSupportedLanguages } from "~/utils/i18n";
import styles from "./nav-bar.module.scss";

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
    direction?: "horizontal" | "vertical";
    className?: string;
    styles?: React.CSSProperties;
    menuProps?: React.MenuHTMLAttributes<HTMLMenuElement>;
}>;

const NavBarLink = ({ name, url }: NavBarLinkProps) => {
    return (
        <li>
            <NavLink className="btn btn-loader" to={url}>
                {name}
            </NavLink>
        </li>
    );
};

const NavBarButton = ({ name, onClick }: NavBarButtonProps) => {
    const [isPending, startTransition] = useTransition();

    return (
        <li>
            <button
                type="button"
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
        <li className={styles.langswitcher}>
            <button
                type="button"
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
            <dialog ref={dialogRef}>
                <div>
                    <span>Language</span>
                    <button type="button" className="btn" onClick={() => setDialogOpen(false)}>
                        Close
                    </button>
                </div>
                <ul>
                    {Object.entries(switcherState.languages).map(([code, name]) => (
                        <li key={code}>
                            <button
                                type="button"
                                className={cls(
                                    "btn",
                                    i18n.language === code ? "btn-primary" : undefined,
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

    return (
        <select
            value={i18n.language}
            onChange={(e) => {
                i18n.changeLanguage(e.target.value);
            }}>
            {Object.entries(switcherState.languages).map(([code, name]) => (
                <option key={code} value={code}>
                    {name}
                </option>
            ))}
        </select>
    );
};

const Navbar = ({ routes, direction, className, ...props }: NavbarProps) => {
    const filtered = routes.filter((route) => typeof route !== "undefined");

    return (
        <nav {...props} className={cls(styles.nav, styles[direction ?? "horizontal"], className)}>
            <menu>
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
