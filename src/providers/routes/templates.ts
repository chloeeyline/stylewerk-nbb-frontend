import type { RouteObject } from "react-router-dom";

import { Routes } from "#/routes";
/**
 * All routes regarding templates
 * - list route
 * - view route
 * - edit route
 */
export const templatesRoutes: RouteObject[] = [
    {
        path: Routes.TemplatesList,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Templates/Layout");

            return { Component };
        },
        children: [
            {
                path: Routes.TemplatesList,
                lazy: async () => {
                    const { default: Component } = await import("~/routes/Templates");

                    return { Component };
                },
            },
            {
                path: Routes.TemplateView,
                lazy: async () => {
                    const { default: Component } = await import("~/routes/Templates/View");

                    return { Component };
                },
            },
        ],
    },
    {
        path: Routes.TemplateEdit,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Templates/Edit");

            return { Component };
        },
    },
];
