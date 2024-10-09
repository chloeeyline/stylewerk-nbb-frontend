import { BACKEND_URL } from "#/general";
import { getAccessToken } from "~/redux/features/user/user-api";
import { genericApiSchema } from "~/schemas/generic-api-response";
import type { NbbError } from "~/schemas/nbb-error";
import { createNbbError, nbbErrorSchema } from "~/schemas/nbb-error";

type AjaxResponse = { ok: true; result: unknown } | { ok: false; error: NbbError };

export default class Ajax {
    constructor(protected url: string, protected init: RequestInit) {}

    protected async fetch(): Promise<AjaxResponse> {
        try {
            //* Hint this is just the native fetch function
            const response = await fetch(this.url, this.init);

            if (response.ok !== true) {
                return {
                    ok: false,
                    error: createNbbError(response.status, response.statusText, true),
                };
            }

            const json = await response.json();

            const { code, codeName, data } = genericApiSchema.parse(json);

            if (code >= 1100) {
                return {
                    ok: false,
                    error: createNbbError(code, codeName, false, undefined),
                };
            }

            return {
                ok: true,
                result: data,
            };
        } catch (error) {
            const result = nbbErrorSchema.safeParse(error);

            if (result.success) {
                return {
                    ok: false,
                    error: result.data,
                };
            }

            if (error instanceof Error) {
                return {
                    ok: false,
                    error: createNbbError(0, error.message, false),
                };
            }

            return {
                ok: false,
                error: createNbbError(
                    0,
                    typeof error === "string" ? error : "Something went wrong",
                    false,
                ),
            };
        }
    }

    // protected tryAutoLogin() {}

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

        if (auth) {
            const token = await getAccessToken();

            if (typeof token === "string") {
                init.headers = {
                    ...init.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }

        return new Ajax(getUrl(), init);
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
            search,
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
            search,
            body,
        });

        return await ajax.fetch();
    }
}
