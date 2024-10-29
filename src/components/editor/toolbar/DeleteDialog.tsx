import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Cross from "~/components/Icon/Cross";
import Trash from "~/components/Icon/Trash";

export default function DeleteDialog({
    message,
    onDelete,
}: {
    message: string;
    onDelete: () => Promise<{ ok: true; redirectTo?: string } | { ok: false; error: string }>;
}) {
    const { t } = useTranslation();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);

    return (
        <>
            <button
                type="button"
                className="btn btn-error p-0"
                onClick={() => {
                    if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                    dialogRef.current.showModal();
                }}>
                <Trash className="icon-inline m-ie-0" />
                {t("common.delete")}
            </button>
            {createPortal(
                <dialog
                    ref={dialogRef}
                    className="inset-0 m-auto p-2 rounded-4 shadow no-border p-relative overflow-visible">
                    <button
                        type="button"
                        className="btn btn-primary btn-square p-absolute"
                        style={{
                            insetInlineStart: "auto",
                            insetInlineEnd: "-1em",
                            insetBlockStart: "-1em",
                            insetBlockEnd: "auto",
                        }}
                        onClick={() => {
                            if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                            dialogRef.current.close();
                        }}>
                        <Cross className="icon-inline" />
                    </button>
                    <h2>{t("common.delete").toUpperCase()}</h2>
                    <p>{message}</p>
                    {error !== null ? (
                        <span className="d-block m-be-0 error">{t(`errorCodes.${error}`)}</span>
                    ) : null}
                    <button
                        className="btn btn-accent p-1 m-bs-0 size-inline-100"
                        onClick={async () => {
                            const result = await onDelete();

                            if (result.ok !== true) {
                                setError(result.error);
                                return;
                            }

                            if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                            dialogRef.current.close();

                            if (typeof result.redirectTo === "string") {
                                navigate(result.redirectTo);
                            }
                        }}>
                        {t("common.yes")}
                    </button>
                </dialog>,
                document.body,
            )}
        </>
    );
}
