import type React from "react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import Cross from "~/components/Icon/Cross";
import InputField from "~/components/forms/InputField";

export default function DeleteDialog({
    initial,
    setInitial,
    onDelete,
    message,
}: {
    initial: boolean;
    setInitial: React.Dispatch<boolean>;
    onDelete: () => void;
    message?: string;
}) {
    const { t } = useTranslation();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [doNotShowAgain, setDoNotShowAgain] = useState<boolean>(false);

    return (
        <>
            <button
                type="button"
                className="btn btn-error btn-square p-0"
                onClick={() => {
                    if (initial !== true) {
                        onDelete();
                        return;
                    }

                    if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                    dialogRef.current.showModal();
                    return;
                }}>
                <Cross className="fill-current-color" />
            </button>
            {initial === true
                ? createPortal(
                      <dialog
                          ref={dialogRef}
                          className="inset-0 m-auto p-none no-border overflow-visible"
                          style={{
                              backgroundColor: "transparent",
                          }}>
                          <fieldset className="fieldset shadow p-relative overflow-visible">
                              <legend className="legend">{t("common.delete").toUpperCase()}</legend>

                              <button
                                  type="button"
                                  className="btn btn-primary btn-square p-absolute"
                                  style={{
                                      insetInlineStart: "auto",
                                      insetInlineEnd: "-1em",
                                      insetBlockStart: "-1.75em",
                                      insetBlockEnd: "auto",
                                  }}
                                  onClick={() => {
                                      if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                                      dialogRef.current.close();
                                  }}>
                                  <Cross className="icon-inline" />
                              </button>

                              {typeof message === "string" ? <p>{message}</p> : null}

                              <InputField
                                  type="checkbox"
                                  label={t("common.doNotShowAgain")}
                                  name="donotshowagain"
                                  value={doNotShowAgain ? 1 : 0}
                                  onChange={() => setDoNotShowAgain(!doNotShowAgain)}
                              />

                              <button
                                  className="btn btn-accent p-1 m-bs-0"
                                  onClick={async () => {
                                      if (doNotShowAgain === true) {
                                          setInitial(!initial);
                                      }

                                      onDelete();

                                      if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                                      dialogRef.current.close();
                                  }}>
                                  {t("common.yes")}
                              </button>
                          </fieldset>
                      </dialog>,
                      document.body,
                  )
                : null}
        </>
    );
}
