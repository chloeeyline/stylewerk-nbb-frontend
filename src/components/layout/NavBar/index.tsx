import type React from "react";
import { CSSProperties, memo } from "react";
import type ReactRouterDom from "react-router-dom";
import { NavLink } from "react-router-dom";
import cls from "~/utils/class-name-helper";
import styles from "./nav-bar.module.scss";

type NavbarProps = React.PropsWithChildren<{
    routes: [path: string, name: string][];
    direction?: "horizontal" | "vertical";
    className?: string;
    styles?: CSSProperties;
    menuProps?: React.MenuHTMLAttributes<HTMLMenuElement>;
    liProps?: React.LiHTMLAttributes<HTMLLIElement>;
    navLinkProps?: ReactRouterDom.NavLinkProps;
}>;

const Navbar = ({
    routes,
    direction,
    className,
    menuProps,
    liProps,
    navLinkProps,
    ...props
}: NavbarProps) => {
    return (
        <nav {...props} className={cls(styles.nav, styles[direction ?? "horizontal"], className)}>
            <menu {...menuProps}>
                {routes.map(([path, name]) => (
                    <li {...liProps} key={path}>
                        <NavLink {...navLinkProps} to={path}>
                            {name}
                        </NavLink>
                    </li>
                ))}
            </menu>
        </nav>
    );
};

const MemoNavbar = memo(Navbar);

export { MemoNavbar, Navbar };
