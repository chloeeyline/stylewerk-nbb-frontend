import type { RouteObject } from "react-router-dom";

import { Routes } from "#/routes";

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
        path: Routes.Admin,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin");

            return { Component };
        },
    },
    {
        path: Routes.AdminThemesList,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Themes");

            return { Component };
        },
    },
    {
        path: Routes.AdminThemeManage,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Themes/Manage");

            return { Component };
        },
    },
    {
        path: Routes.AdminTranslationsList,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Translations");

            return { Component };
        },
    },
    {
        path: Routes.AdminTranslationManage,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Translations/Manage");

            return { Component };
        },
    },
    {
        path: Routes.AdminUsersList,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Users");

            return { Component };
        },
    },
    {
        path: Routes.AdminUserManage,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Admin/Users/Manage");

            return { Component };
        },
    },
];
