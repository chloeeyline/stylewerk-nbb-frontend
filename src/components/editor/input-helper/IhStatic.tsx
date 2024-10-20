import { useEffect } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { setMetadata } from "~/redux/features/editor/editor-slice";
import { useAppDispatch } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

const ihMetaDataSchema = z
    .object({
        color: z.string().optional().catch(undefined).default(undefined),
        fontsize: z.number().safe().optional().catch(undefined).default(undefined),
    })
    .strip();

export const IhStatic = ({ cell }: InputHelperProps) => {
    // const editor = useAppSelector(selectEditor);
    // const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    if (metadata.success === false) return null;

    return (
        <div style={{ color: metadata.data.color ?? "", fontSize: metadata.data.fontsize ?? "" }}>
            {cell.template.text ?? ""}
        </div>
    );
};

export const IhStaticSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));

    useEffect(() => {
        if (metadata.success === false) return;
        dispatch(setMetadata(JSON.stringify(metadata.data)));
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "color":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: e.target.value,
                        }),
                    ),
                );
                break;
            case "fontsize":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: Number(e.target.value),
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
            <InputField
                label={"Textfarbe"}
                useNameAsIs={true}
                name="color"
                type="color"
                value={metadata.data.color ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                label={"Textgröße"}
                useNameAsIs={true}
                name="fontsize"
                min={10}
                type="number"
                value={metadata.data.fontsize ?? ""}
                onChange={dispatchCellSettings}
            />
        </>
    );
};
