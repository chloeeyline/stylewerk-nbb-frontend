import { store } from "~/redux/store";
import { BACKEND_URL } from "~/constants/general";

import { NbbError } from "~/redux/features/error/nbb-error";

const errorDispatcher = (error: Error | null) => {
    return store.dispatch({
        type: "error",
        payload: error,
    });
};

/* type AjaxInit = {
    auth?: boolean;
    method: "GET" | "POST";
    body?: object;
    search?: Record<string, string>;
    isOnRetry?: boolean;
}; */

type AjaxFetchMethod = (
    input: string,
    init: {
        auth?: boolean;
        method: "GET" | "POST";
        body?: object;
        search?: Record<string, string>;
    },
) => Promise<unknown>;

type AjaxPostMethod = (
    url: string,
    init: {
        body?: object;
        auth?: boolean;
    },
) => Promise<unknown>;

type AjaxGetMethod = (
    url: string,
    init: {
        search?: Record<string, string>;
        auth?: boolean;
    },
) => Promise<unknown>;

class Ajax {
    constructor(
        protected url: string,
        protected init: RequestInit,
        protected auth: boolean = false,
    ) {
        // Foo
    }

    protected fetch(
        input: string | URL | globalThis.Request,
        init?: RequestInit,
    ): Promise<Response>;

    protected tryAutoLogin() {

    }

    public static async get(
        url: string,
        {
            search,
            auth,
        }: {
            search?: Record<string, string>;
            auth?: boolean;
        },
    ): Promise<unknown> {
        console.log(url, search, auth);
        return;
    }

    public static async post(
        url: string,
        {
            search,
            auth,
        }: {
            search?: Record<string, string>;
            auth?: boolean;
        },
    ): Promise<unknown> {
        // Foo

        console.log(url, search, auth);

        return;
    }
}

/* class AjaxError extends Error {
    public name = "AjaxError" as const;

    constructor(
        message: string,
        public readonly code: number,
        public readonly isHttpError: boolean,
    ) {
        super(message);
    }
} */

/* export function ajaxPromise(
    url: string,
    { auth, method, body, search }: AjaxInit,
): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const request: { input: string; init: RequestInit } = {
            input: url,
            init: {
                method,
                headers: {
                    Accept: "application/json",
                },
            },
        };

        if (method === "POST") {
            request.init.headers = {
                ...request.init.headers,
                "Content-Type": "application/json",
            };

            request.init.body = JSON.stringify(body);
        }

        if (auth === true) {
            const user = store.getState().user.user;

            request.init.headers = {
                ...request.init.headers,
                Authorization: `Bearer ${user?.token ?? ""}`,
            };
        }

        const retry = ((
            resolver: (value: unknown) => void,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rejector: (reason?: any) => void,
            request: { input: string; init: RequestInit },
        ) => {
            fetch(request.input, request.init)
                .then((response) => {
                    response
                        .json()
                        .then((value) => {
                            resolver(value);
                        })
                        .catch((reason) => {
                            rejector(reason);
                        });
                })
                .catch((reason) => {
                    rejector(reason);
                });
        }).bind(undefined, resolve, reject, request);

        try {
            fetch(request.input, request.init)
                .then((response) => {
                    response
                        .json()
                        .then((value) => {
                            resolve(value);
                        })
                        .catch((reason) => {
                            throw reason;
                        });
                })
                .catch((reason) => {
                    throw reason;
                });
        } catch (err) {
            if (err instanceof NbbError) {
                errorDispatcher(err);
                return null;
            }

            errorDispatcher(new NbbError("Something went wrong!", 0, false, err, retry));
        }
    });
}

export async function ajax(
    url: string,
    { auth, method, body, search }: AjaxInit,
): Promise<unknown> {
    try {
        const request: { input: string; init: RequestInit } = {
            input: url,
            init: {
                method,
                headers: {
                    Accept: "application/json",
                },
            },
        };

        const init: RequestInit = {
            method,
            headers: {
                Accept: "application/json",
            },
        };

        if (method === "POST") {
            request.init.headers = {
                ...request.init.headers,
                "Content-Type": "application/json",
            };

            request.init.body = JSON.stringify(body);
        }

        if (auth === true) {
            const user = store.getState().user.user;

            request.init.headers = {
                ...request.init.headers,
                Authorization: `Bearer ${user?.token ?? ""}`,
            };
        }

        if (typeof search !== "undefined") {
            request.input += `?${new URLSearchParams(search).toString()}`;
        }

        const response = await fetch(request.input, request.init);

        if (response.ok !== true) {
            throw new NbbError(response.statusText, response.status, true);
        }
    } catch (err) {
        if (err instanceof NbbError) {
            errorDispatcher(err);
            return null;
        }

        errorDispatcher(new NbbError("Something went wrong!", 0, false, err));

        return null;
    }
} */
