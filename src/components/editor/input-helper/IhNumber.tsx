import { useEffect, useState } from "react";
import { z } from "zod";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch } from "~/redux/hooks";

const ihNumberSchema = z
    .object({
        min: z.number().safe().catch(0).default(0),
        max: z.number().safe().catch(100).default(100),
        step: z.number().safe().catch(1).default(1),
        integer: z.boolean().catch(false).default(false),
    })
    .strip();

type IhNumberMetadata = z.infer<typeof ihNumberSchema>;

export const IhNumber = ({ cell, isReadOnly }: InputHelperProps) => {
    const temp = ihNumberSchema.safeParse(cell.template.metaData ?? {});
    if (temp.success === false) return null;
    return (
        <>
            <input
                type="number"
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                min={temp.data?.min}
                max={temp.data?.max}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};

export const IhNumberSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const [metadata, setMetadata] = useState<IhNumberMetadata>({
        min: 0,
        max: 100,
        step: 1,
        integer: false,
    });

    useEffect(() => {
        const temp = ihNumberSchema.safeParse(cell.template.metaData);
        if (temp.success === false) return;
        setMetadata(temp.data);
    }, [cell]);

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "min":
            case "max":
            case "step":
                const temp = {
                    ...metadata,
                    [e.target.name]: Number(e.target.value),
                };
                setMetadata(temp);
                dispatch(
                    setTemplateCell({
                        type: "metadata",
                        value: JSON.stringify(metadata),
                    }),
                );
                break;
            case "integer":
                break;
            default:
                return;
        }
    };

    return (
        <div>
            <input
                name="min"
                type="number"
                value={metadata.min ?? ""}
                onChange={dispatchCellSettings}
            />
            <label htmlFor="min">Minimalwert</label>
            <input
                name="max"
                type="number"
                value={metadata.max ?? ""}
                onChange={dispatchCellSettings}
            />
            <label htmlFor="max">Maximalwert</label>
        </div>
    );
};
