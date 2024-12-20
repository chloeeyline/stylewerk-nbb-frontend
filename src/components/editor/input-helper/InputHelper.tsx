import type { EntryCell, EntryRow, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";
import { IhCheckbox } from "./IhCheckbox";
import { IhColor } from "./IhColor";
import { IhDateTime } from "./IhDateTime";
import { IhNumber } from "./IhNumber";
import { IhStatic } from "./IhStatic";
import { IhText } from "./IhText";
import { IhList } from "./IhList";
import { IsRequiredFillfiled } from "~/redux/features/editor/editor-hook";
import { useTranslation } from "react-i18next";

const InputHelper = ({ cell, row }: { cell: EntryCell; row: EntryRow }) => {
    const { t } = useTranslation();
    const editor = useAppSelector(selectEditor);
    const props: InputHelperProps = {
        cell,
        row,
        isReadOnly: editor.isPreview === true || editor.isTemplate === true,
        error:
            IsRequiredFillfiled(cell, editor.isPreview, editor.isTemplate) === false
                ? t("formErrors.pleaseEnter", { what: cell.template.text ?? t("formFields.data") })
                : null,
    };

    switch (cell.template.inputHelper) {
        case 1:
            return <IhStatic {...props} />;
        case 3:
            return <IhText {...props} />;
        case 4:
            return <IhNumber {...props} />;
        case 5:
            return <IhCheckbox {...props} />;
        case 6:
            return <IhDateTime {...props} />;
        case 7:
            return <IhColor {...props} />;
        case 8:
            return <IhList {...props} />;
        default:
            return (
                <pre>
                    <code>{JSON.stringify(cell.template, undefined, 2)}</code>
                </pre>
            );
    }
};

export default InputHelper;
