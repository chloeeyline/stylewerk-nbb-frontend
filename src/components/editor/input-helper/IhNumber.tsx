import { useRef } from "react";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";

export const IhNumber = ({ cell, isReadOnly }: InputHelperProps) => {
    return (
        <>
            <input
                type="number"
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};

export const IhNumberSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = {
            min: minRef.current?.value ?? "",
            max: maxRef.current?.value ?? "",
        };
        dispatch(
            setTemplateCell({
                type: "metadata",
                value: JSON.stringify(data),
            }),
        );
    };

    return (
        <div>
            <input ref={minRef} name="min" type="number" onChange={dispatchCellSettings} />
            <label htmlFor="min">Minimalwert</label>
            <input ref={maxRef} name="max" type="number" onChange={dispatchCellSettings} />
            <label htmlFor="max">Maximalwert</label>
        </div>
    );
};
