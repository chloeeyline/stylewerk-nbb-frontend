import { useEffect } from "react";
import { z } from "zod";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const ihMetaDataSchema = z
    .object({
        min: z.string().optional().catch(undefined).default(undefined),
        max: z.string().optional().catch(undefined).default(undefined),
        value: z.string().optional().catch(undefined).default(undefined),
        type: z.number().int().safe().nonnegative().catch(0).default(0),
    })
    .strip();

const ihDataSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

const transformMetaData = (input: unknown) => {
    try {
        if (typeof input !== "string") throw new Error("foo");
        return ihMetaDataSchema.safeParse(JSON.parse(input));
    } catch (error) {
        return ihMetaDataSchema.safeParse({});
    }
};

const transformData = (input: unknown) => {
    try {
        if (typeof input !== "string") throw new Error("foo");
        return ihDataSchema.safeParse(JSON.parse(input));
    } catch (error) {
        return ihDataSchema.safeParse({});
    }
};

export const IhStatic = ({ cell }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = transformMetaData(cell.template.metaData);
    const data = transformData(cell.data);
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    return <div>{cell.template.text ?? cell.template.text ?? ""}</div>;
};

export const IhStaticSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const temp = transformMetaData(cell.template.metaData);

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
            case "value":
                dispatch(
                    setTemplateCell({
                        type: "metaData",
                        value: JSON.stringify({
                            ...temp.data,
                            [e.target.name]: e.target.value,
                        }),
                    }),
                );
                break;
            case "type":
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
            default:
                return;
        }
    };

    return (
        <div>
            <pre>
                <code>{JSON.stringify(cell.template.metaData ?? {}, undefined, 2)}</code>
            </pre>
        </div>
    );
};
