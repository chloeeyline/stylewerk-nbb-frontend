export class NbbError extends Error {
    public name = "NbbError" as const;

    protected _code: number;

    protected _isHttpError: boolean;

    protected _cause: unknown;

    protected _retry?: () => unknown;

    constructor(
        message: string,
        code: number,
        isHttpError: boolean,
        cause: unknown,
        retry?: () => unknown,
    ) {
        super(message);

        this._code = code;

        this._isHttpError = isHttpError;

        if (cause instanceof Error) {
            this._cause = cause;
        } else if (typeof cause === "string") {
            this._cause = new Error(cause);
        } else {
            try {
                this._cause = new Error(JSON.stringify(cause));
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                this._cause = new Error("Something went wrong...");
            }
        }

        this._retry = retry;
    }

    public get code() {
        return this._code;
    }

    public get isHttpError() {
        return this._isHttpError;
    }

    public get cause() {
        return this._cause;
    }

    public get retry() {
        return this._retry;
    }
}
