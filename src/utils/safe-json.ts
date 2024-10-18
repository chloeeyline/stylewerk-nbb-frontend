export const safeParse = (
    input: string,
):
    | { ok: true; data: unknown; error?: undefined }
    | { ok: false; data?: undefined; error: unknown } => {
    try {
        return {
            ok: true,
            data: JSON.parse(input),
        };
    } catch (error) {
        return {
            ok: false,
            error,
        };
    }
};

export const safeStringify = (
    input: unknown,
):
    | { ok: true; data: string; error?: undefined }
    | { ok: false; data?: undefined; error: unknown } => {
    try {
        return {
            ok: true,
            data: JSON.stringify(input),
        };
    } catch (error) {
        return {
            ok: false,
            error,
        };
    }
};
