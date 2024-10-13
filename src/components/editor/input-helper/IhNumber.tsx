import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch } from "~/redux/hooks";

const ihNumberSchema = z
    .object({
        min: z.number().safe().optional().catch(undefined).default(undefined),
        max: z.number().safe().optional().catch(undefined).default(undefined),
        step: z.number().safe().optional().catch(undefined).default(undefined),
        integer: z.boolean().catch(false).default(false),
    })
    .strip();

const transformMetadata = (input: unknown) => {
    try {
        if (typeof input !== "string") {
            throw new Error("foo");
        }

        return ihNumberSchema.safeParse(JSON.parse(input));
    } catch (error) {
        return ihNumberSchema.safeParse({});
    }
};

export const IhNumber = ({ cell, isReadOnly }: InputHelperProps) => {
    const temp = transformMetadata(cell.template.metaData);

    if (temp.success === false) return null;

    return (
        <>
            <InputField
                label={cell.template.text ?? ""}
                name={`templaceCell-${cell.templateID}`}
                useNameAsIs={true}
                type="number"
                disabled={isReadOnly}
                required={cell.template.isRequired}
                min={temp.data?.min}
                max={temp.data?.max}
                onChange={() => {}}
            />
        </>
    );
};

export const IhNumberSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();

    const temp = transformMetadata(cell.template.metaData);

    useEffect(() => {
        if (temp.success === false) return;
        dispatch(
            setTemplateCell({
                type: "metaData",
                value: JSON.stringify(temp.data),
            }),
        );
    }, []);

    if (temp.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "min":
            case "max":
            case "step":
                dispatch(
                    setTemplateCell({
                        type: "metaData",
                        value: JSON.stringify({
                            ...temp.data,
                            [e.target.name]: Number(e.target.value),
                        }),
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
        <>
            <InputField
                label={"Minimalwert"}
                useNameAsIs={true}
                name="min"
                type="number"
                value={temp.data.min ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Maximalwert"}
                useNameAsIs={true}
                name="max"
                type="number"
                value={temp.data.max ?? ""}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
