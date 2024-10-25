import { IhCheckboxSettings } from "~/components/editor/input-helper/IhCheckbox";
import { IhColorSettings } from "~/components/editor/input-helper/IhColor";
import { IhDateTimeSettings } from "~/components/editor/input-helper/IhDateTime";
import { IhNumberSettings } from "~/components/editor/input-helper/IhNumber";
import { IhStaticSettings } from "~/components/editor/input-helper/IhStatic";
import { IhTextSettings } from "~/components/editor/input-helper/IhText";
import type { EntryCell, EntryRow, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { IhListSettings } from "../input-helper/IhList";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";

export default function InputHelperSettings({
    cell,
    row,
}: {
    cell: EntryCell | null;
    row: EntryRow | null;
}) {
    const editor = useAppSelector(selectEditor);
    if (row === null || cell === null) return null;
    const props: InputHelperProps = {
        cell,
        row,
        isReadOnly: editor.isPreview === true || editor.isTemplate === true,
        error: null,
    };

    switch (cell.template.inputHelper) {
        case 1:
            return <IhStaticSettings {...props} />;
        case 3:
            return <IhTextSettings {...props} />;
        case 4:
            return <IhNumberSettings {...props} />;
        case 5:
            return <IhCheckboxSettings {...props} />;
        case 6:
            return <IhDateTimeSettings {...props} />;
        case 7:
            return <IhColorSettings {...props} />;
        case 8:
            return <IhListSettings {...props} />;
        default:
            return null;
    }
}
