import type React from "react";
import { memo } from "react";
import type ReactRouterDom from "react-router-dom";
import { NavLink } from "react-router-dom";
import cls from "~/utils/class-name-helper";

type NavbarProps = React.HTMLAttributes<HTMLElement> & {
    routes: [path: string, name: string][];
    direction?: "horizontal" | "vertical";
    menuProps?: React.MenuHTMLAttributes<HTMLMenuElement>;
    liProps?: React.LiHTMLAttributes<HTMLLIElement>;
    navLinkProps?: ReactRouterDom.NavLinkProps;
};

const Navbar = ({
    routes,
    direction,
    className,
    menuProps,
    liProps,
    navLinkProps,
    ...rest
}: NavbarProps) => {
    return (
        <nav {...rest} className={cls("nav", `nav-${direction ?? "horizontal"}`, className)}>
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

/* export default function Navbar({
    routes,
    direction,
    className,
    menuProps,
    liProps,
    navLinkProps,
    ...rest
}: NavbarProps) {
    return (
        <nav {...rest} className={cls("nav", `nav-${direction ?? "horizontal"}`, className)}>
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
} */

const MemoNavbar = memo(Navbar);

export { MemoNavbar, Navbar };

