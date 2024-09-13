import type React from "react";
import type ReactRouter from "react-router-dom";

/** A module the exports a React Component either as default or Component */
type ComponentModule = { default: React.ComponentType } | { Component: React.ComponentType };

/** A module the exports a LoaderFunction either as default or loader */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoaderModule<Context = any> =
    | { default: ReactRouter.LoaderFunction<Context> }
    | { loader: ReactRouter.LoaderFunction<Context> };

/** A module the exports a ActionFunction either as default or action */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionModule<Context = any> =
    | { default: ReactRouter.ActionFunction<Context> }
    | { action: ReactRouter.ActionFunction<Context> };

/** Which keys should be included from RouteObject in the return Type */
type IncludedRouteKeys = "Component" | "loader" | "lazy";

/** A function that when called returns a Promise for a Component-, Loader- or ActionModule. */
type LazyModuleFunction<R extends ComponentModule | LoaderModule | ActionModule> = () => Promise<R>;

/**
 * The return value of the lazyRoute-helper.
 * @see {lazyRoute}
 */
type LazyRouteFunctionReturn = ReactRouter.LazyRouteFunction<
    Pick<ReactRouter.RouteObject, IncludedRouteKeys>
>;

type LazyRouteFunction = <
    T extends LazyModuleFunction<ComponentModule>,
    K extends LazyModuleFunction<LoaderModule>,
    V extends LazyModuleFunction<ActionModule>,
>(
    /** A function that returns a Promise resolving to a ComponentModule */
    component: T,
    /** An object of further functions that return Modules */
    optional?: {
        /** An optional function that returns a Promise resolving to a LoaderModule */
        loader?: K;
        /** An optional function that returns a Promise resolving to a ActionModule */
        action?: V;
    },
) => LazyRouteFunctionReturn;

/**
 * Function that extracts a Component, loader and action from three different modules.
 * If the module has a default import that will be used, as a fallback if the module has the specific export it will also be used.
 * The modules will be loaded in parallel and lazy on first navigation.
 *
 * @returns A function that returns a Promise which when resolved includes the Routes Component and possible loader and action.
 */
export const lazyRoute: LazyRouteFunction = (component, optional = {}) => {
    // Rename the functions to resolve to modules and create dummy resolvers if necessary
    const componentFunction = component;
    const loaderFunction = optional?.loader ?? (() => ({ loader: undefined }));
    const actionFunction = optional?.action ?? (() => ({ action: undefined }));

    return async () => {
        const [componentModule, loaderModule, actionModule] = await Promise.all([
            componentFunction(),
            loaderFunction(),
            actionFunction(),
        ]);

        const Component =
            "default" in componentModule ? componentModule.default : componentModule.Component;
        const loader = "default" in loaderModule ? loaderModule.default : loaderModule.loader;
        const action = "default" in actionModule ? actionModule.default : actionModule.action;

        return {
            Component,
            loader,
            action,
        };
    };
};
