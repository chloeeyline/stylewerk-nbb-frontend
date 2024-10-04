import { BACKEND_URL } from "#/general";
import { NbbError } from "~/utils/nbb-error";
import { User, userPromise } from "~/redux/features/user/user-class";
import { genericApiSchema } from "~/schemas/generic-api-response";

type AjaxResponse = { ok: true; result: unknown } | { ok: false; error: NbbError };

export default class Ajax {
    constructor(protected url: string, protected init: RequestInit, protected user?: User) {}

    protected async fetch(): Promise<AjaxResponse> {
        console.log(this.url, this.init, this.user);

        try {
            //* Hint this is just the native fetch function
            const response = await fetch(this.url, this.init);

            if (response.ok !== true) {
                return {
                    ok: false,
                    error: new NbbError(response.statusText, response.status, true, undefined),
                };
            }

            const json = await response.json();

            const { code, codeName, data } = genericApiSchema.parse(json);

            if (code >= 1100) {
                throw new NbbError(codeName ?? "Something went wrong", code, false, undefined);
            }

            return {
                ok: true,
                result: data,
            };
        } catch (error) {
            if (error instanceof NbbError) {
                return {
                    ok: false,
                    error,
                };
            }

            if (error instanceof Error) {
                return {
                    ok: false,
                    error: new NbbError(error.message, 0, false, error),
                };
            }

            return {
                ok: false,
                error: new NbbError(
                    typeof error === "string" ? error : "Something went wrong",
                    0,
                    false,
                    undefined,
                ),
            };
        }
    }

    protected tryAutoLogin() {}

    protected static async setup(
        url: string,
        {
            auth,
            method,
            search,
            body,
        }:
            | {
                  auth?: boolean;
                  method: "GET";
                  search?: Record<string, string>;
                  body?: null;
              }
            | {
                  auth?: boolean;
                  method: "POST";
                  search?: Record<string, string>;
                  body?: object;
              },
    ) {
        const getUrl = () => {
            if (Object.entries(search ?? {}).length <= 0) {
                return `${BACKEND_URL}${url}`;
            }

            return `${BACKEND_URL}${url}?${new URLSearchParams(search).toString()}`;
        };

        const init: RequestInit = {
            method,
            headers: {
                Accept: "application/json",
            },
        };

        if (method === "POST") {
            init.headers = {
                ...init.headers,
                "Content-Type": "application/json",
            };

            init.body = JSON.stringify(body ?? null);
        }

        const user = auth ? await userPromise : undefined;

        if (auth && typeof user !== "undefined" && user.state.status === "loggedIn") {
            init.headers = {
                ...init.headers,
                Authorization: `Bearer ${await user.getToken()}`,
            };
        }

        return new Ajax(getUrl(), init, user);
    }

    public static async get(
        url: string,
        {
            search,
            auth,
        }: {
            search?: Record<string, string>;
            auth?: boolean;
        } = { auth: false },
    ): Promise<AjaxResponse> {
        const ajax = await this.setup(url, {
            auth,
            method: "GET",
            search: search,
        });

        return await ajax.fetch();
    }

    public static async post(
        url: string,
        {
            search,
            body,
            auth,
        }: {
            search?: Record<string, string>;
            body?: object;
            auth?: boolean;
        } = { auth: false },
    ): Promise<AjaxResponse> {
        const ajax = await this.setup(url, {
            auth,
            method: "POST",
            search: search,
            body: body,
        });

        return await ajax.fetch();
    }
}
