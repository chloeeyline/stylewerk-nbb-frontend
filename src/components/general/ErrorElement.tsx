export default function ErrorElement({ error }: { error: Error & { code?: number } }) {
    const { name, message, code, cause } = error;

    return (
        <div>
            <h1>
                {name}
                {code && " - " + code}
            </h1>
            <p>{message}</p>
            {cause instanceof Error && <ErrorElement error={cause} />}
        </div>
    );
}
