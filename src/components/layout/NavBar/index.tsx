import type React from "react";
import { CSSProperties, memo } from "react";
import { NavLink } from "react-router-dom";
import cls from "~/utils/class-name-helper";
import styles from "./nav-bar.module.scss";
import LanguageSwitcher from "~/components/general/LanguageSwitcher";

type NavbarRoute =
    | {
          type: "link";
          name: string;
          url: string;
      }
    | {
          type: "button";
          name: string;
          onClick: () => void;
      };

type NavbarProps = React.PropsWithChildren<{
    routes: (NavbarRoute | undefined)[];
    direction?: "horizontal" | "vertical";
    className?: string;
    styles?: CSSProperties;
    menuProps?: React.MenuHTMLAttributes<HTMLMenuElement>;
}>;

const NavbarItem = ({ route }: { route: NavbarRoute }) => {
    if (route.type === "link") {
        return (
            <li>
                <NavLink to={route.url}>{route.name}</NavLink>
            </li>
        );
    }

    return (
        <li>
            <button type="button" onClick={() => route.onClick()}>
                {route.name}
            </button>
        </li>
    );
};

const Navbar = ({ routes, direction, className, ...props }: NavbarProps) => {
    const filtered = routes.filter((route) => typeof route !== "undefined");

    return (
        <nav {...props} className={cls(styles.nav, styles[direction ?? "horizontal"], className)}>
            <menu>
                {filtered.map((route) => (
                    <NavbarItem key={route.name} route={route} />
                ))}
                <li>
                    <LanguageSwitcher />
                </li>
            </menu>
        </nav>
    );
};

const MemoNavbar = memo(Navbar);

export { MemoNavbar, Navbar };
export type { NavbarRoute, NavbarProps };
