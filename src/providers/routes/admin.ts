import type { RouteObject } from "react-router-dom";

import { Admin } from "#/routes";

/**
 * All routes regarding admins
 * - index route
 * - list themes
 * - manage themes
 * - list translations
 * - manage translations
 * - list users
 * - manage users
 */
export const adminRoutes: RouteObject[] = [
    {
        path: Admin.Index,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin");

            return { Component };
        },
    },
    {
        path: Admin.Themes.List,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Themes");

            return { Component };
        },
    },
    {
        path: Admin.Themes.Manage,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Themes/Manage");

            return { Component };
        },
    },
    {
        path: Admin.Translations.List,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Translations");

            return { Component };
        },
    },
    {
        path: Admin.Translations.Manage,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Translations/Manage");

            return { Component };
        },
    },
    {
        path: Admin.Users.List,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Users");

            return { Component };
        },
    },
    {
        path: Admin.Users.Manage,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Users/Manage");

            return { Component };
        },
    },
];
