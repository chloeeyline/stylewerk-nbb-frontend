export class NbbError extends Error {
    protected _name = "NbbError" as const;
    protected _code: number;
    protected _isHttp: boolean;
    protected _cause: unknown;

    constructor(message: string, code: number, isHttp: boolean, cause: unknown) {
        super(message);

        this._code = code;

        this._isHttp = isHttp;

        if (cause instanceof Error) {
            this._cause = cause;
        } else if (typeof cause === "string") {
            this._cause = new Error(cause);
        } else {
            this._cause = new Error("Something went wrong...");
        }
    }

    public get name() {
        return this._name;
    }

    public get code() {
        return this._code;
    }

    public get isHttp() {
        return this._isHttp;
    }

    public get cause() {
        return this._cause;
    }
}
