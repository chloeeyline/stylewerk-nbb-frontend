import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

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
    return (
        <div>
            <input name="min" type="number" />
            <label htmlFor="min">Minimalwert</label>
            <input name="max" type="number" />
            <label htmlFor="max">Maximalwert</label>
        </div>
    );
};
