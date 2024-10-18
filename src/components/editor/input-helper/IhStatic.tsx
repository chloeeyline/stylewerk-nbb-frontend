import { useEffect } from "react";
import { z } from "zod";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { setTemplateCell } from "~/redux/features/editor/editor-slice";
import { useAppDispatch } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

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

export const IhStatic = ({ cell }: InputHelperProps) => {
    // const editor = useAppSelector(selectEditor);
    // const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataSchema.safeParse(saveParseEmptyObject(cell.data));
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    return <div>{cell.template.text ?? cell.template.text ?? ""}</div>;
};

export const IhStaticSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));

    useEffect(() => {
        if (metadata.success === false) return;
        dispatch(
            setTemplateCell({
                type: "metaData",
                value: JSON.stringify(metadata.data),
            }),
        );
    }, []);

    if (metadata.success === false) return null;

    // const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!e.target.value) return;
    //     switch (e.target.name) {
    //         case "min":
    //         case "max":
    //         case "value":
    //             dispatch(
    //                 setTemplateCell({
    //                     type: "metaData",
    //                     value: JSON.stringify({
    //                         ...metadata.data,
    //                         [e.target.name]: e.target.value,
    //                     }),
    //                 }),
    //             );
    //             break;
    //         case "type":
    //             dispatch(
    //                 setTemplateCell({
    //                     type: "metaData",
    //                     value: JSON.stringify({
    //                         ...metadata.data,
    //                         [e.target.name]: Number(e.target.value),
    //                     }),
    //                 }),
    //             );
    //             break;
    //         default:
    //             return;
    //     }
    // };

    return (
        <div>
            <pre>
                <code>{JSON.stringify(cell.template.metaData ?? {}, undefined, 2)}</code>
            </pre>
        </div>
    );
};
