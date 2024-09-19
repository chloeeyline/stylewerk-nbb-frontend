import type { RouteObject } from "react-router-dom";

import { Routes } from "#/routes";

/**
 * All routes regarding entries
 * - list route
 * - view route
 * - edit route
 */
export const entriesRoutes: RouteObject[] = [
    {
        path: Routes.EntriesList,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Entries/Layout");

            return { Component };
        },
        children: [
            {
                path: Routes.EntriesList,
                lazy: async () => {
                    const { default: Component } = await import("~/routes/Entries");

                    return { Component };
                },
            },
            {
                path: Routes.EntryView,
                lazy: async () => {
                    const { default: Component } = await import("~/routes/Entries/View");

                    return { Component };
                },
            },
        ],
    },
    {
        path: Routes.EntryEdit,
        lazy: async () => {
            const { default: Component } = await import("~/routes/Entries/Edit");

            return { Component };
        },
    },
];
