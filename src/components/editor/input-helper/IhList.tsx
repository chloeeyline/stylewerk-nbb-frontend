import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import TextareaField from "~/components/forms/TextareaField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setData, setMetadata } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

const ihMetaDataSchema = z
    .object({
        list: z
            .array(z.tuple([z.string(), z.string()]))
            .catch([
                ["1", "Lang"],
                ["2", "Mittel"],
                ["3", "Kurz"],
            ])
            .default([
                ["1", "Lang"],
                ["2", "Mittel"],
                ["3", "Kurz"],
            ]),
        value: z.string().optional().catch(undefined).default(undefined),
        radiobuttons: z.boolean().catch(false).default(false),
    })
    .strip();

const ihDataSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

export const IhList = ({ cell, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataSchema.safeParse(saveParseEmptyObject(cell.data));
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    if (metadata.data.radiobuttons === true) {
        return (
            <div className="d-flex gap-2">
                {metadata.data.list.map(([key, value]) => (
                    <InputField
                        key={key}
                        type="radio"
                        label={value}
                        name={cell.id}
                        checked={data.data.value === key}
                        onChange={(e) => {
                            if (editor.isPreview) return;
                            if (e.target.value.length === 0) {
                                dispatch(setData(null));
                                return;
                            }
                            const temp = {
                                ...data.data,
                                value: e.target.value,
                            };
                            dispatch(setData(JSON.stringify(temp)));
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <SelectField
            required={cell.template.isRequired}
            disabled={isReadOnly}
            name="list"
            label={cell.template.text ?? ""}
            options={metadata.data.list}
            value={data.data.value ?? metadata.data.value ?? ""}
            onChange={(e) => {
                if (editor.isPreview) return;
                if (e.target.value.length === 0) {
                    dispatch(setData(null));
                    return;
                }
                const temp = {
                    ...data.data,
                    value: e.target.value,
                };
                dispatch(setData(JSON.stringify(temp)));
            }}
        />
    );
};

export const IhListSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));

    useEffect(() => {
        if (metadata.success === false) return;
        dispatch(setMetadata(JSON.stringify(metadata.data)));
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "value":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: e.target.value,
                        }),
                    ),
                );
                break;
            default:
                return;
        }
    };

    const dispatchCellSettings2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "radiobuttons":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: e.target.checked,
                        }),
                    ),
                );
                break;
            default:
                return;
        }
    };

    return (
        <>
            <SelectField
                required={cell.template.isRequired}
                name="value"
                label={"Standartwert"}
                options={metadata.data.list}
                value={metadata.data.value ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="checkbox"
                label="Radiobuttons verwenden"
                name="radiobuttons"
                checked={metadata.data.radiobuttons ?? false}
                onChange={dispatchCellSettings2}
            />
        </>
    );
};
