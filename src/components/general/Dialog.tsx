import type React from "react";
import { useEffect, useRef } from "react";

export default function Dialog({
    open,
    notModal,
    children,
    ...props
}: React.DialogHTMLAttributes<HTMLDialogElement> & {
    notModal?: boolean;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const abortControllerRef = useRef<AbortController>();

    const getAbortController = () => {
        if (typeof abortControllerRef.current === "undefined") {
            abortControllerRef.current = new AbortController();
        }

        return abortControllerRef.current;
    };

    const openDialog = () => {
        if (!(dialogRef.current instanceof HTMLDialogElement)) return;

        if (typeof abortControllerRef.current !== "undefined") {
            abortControllerRef.current.abort();
        }

        const abortController = getAbortController();

        if (notModal === true) {
            dialogRef.current.show();
            return;
        }

        dialogRef.current.showModal();
    };

    const closeDialog = () => {
        if (!(dialogRef.current instanceof HTMLDialogElement)) return;

        dialogRef.current.close();
    };

    useEffect(() => {
        if (!(dialogRef.current instanceof HTMLDialogElement)) return;
        if (dialogRef.current.open === open) return;

        if (open === true) {
            openDialog();
        } else {
            closeDialog();
        }
    }, [open]);

    return (
        <dialog ref={dialogRef} {...props}>
            {children}
        </dialog>
    );
}
