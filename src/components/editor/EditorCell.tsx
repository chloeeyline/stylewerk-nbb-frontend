import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setSelected } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { IhStatic } from "./input-helper/IhStatic";
import { IhTextShort } from "./input-helper/IhTextShort";
import { IhCheckbox } from "./input-helper/IhCheckbox";
import { IhColor } from "./input-helper/IhColor";
import { IhDate } from "./input-helper/IhDate";
import { IhDateTime } from "./input-helper/IhDateTime";
import { IhNumber } from "./input-helper/IhNumber";
import { IhTextLong } from "./input-helper/IhTextLong";
import { IhTime } from "./input-helper/IhTime";

const EditorCell = ({
    cell,
    entryRowID,
    templateRowID,
    isReadOnly,
}: {
    cell: EntryCell;
    entryRowID: string;
    templateRowID: string;
    isReadOnly: boolean;
}) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const select = () => {
        dispatch(
            setSelected({
                entryRow: entryRowID,
                entryCell: cell.id,
                templateRow: templateRowID,
                templateCell: cell.templateID,
            }),
        );
    };

    const getInputHelper = (inputHelper: number) => {
        const props: InputHelperProps = { cell, isReadOnly };

        switch (inputHelper) {
            case 1:
                return <IhStatic {...props} />;
            case 2:
                return <IhTextShort {...props} />;
            case 3:
                return <IhTextLong {...props} />;
            case 4:
                return <IhNumber {...props} />;
            case 5:
                return <IhCheckbox {...props} />;
            case 6:
                return <IhDate {...props} />;
            case 7:
                return <IhTime {...props} />;
            case 8:
                return <IhDateTime {...props} />;
            case 9:
                return <IhColor {...props} />;
            default:
                return (
                    <pre>
                        <code>{JSON.stringify(cell.template, undefined, 2)}</code>
                    </pre>
                );
        }
    };

    return (
        <div
            onClick={select}
            style={{
                backgroundColor: cell.templateID == editor.selectedTemplateCell ? "blue" : "",
                padding: "0.5rem",
            }}
            className="lcell"
            title={cell.template?.description ?? ""}>
            {getInputHelper(cell.template.inputHelper)}
        </div>
    );
};

export default EditorCell;
