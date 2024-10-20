import { EntryCell } from "~/redux/features/editor/editor-schemas";
import { IhCheckboxSettings } from "../input-helper/IhCheckbox";
import { IhDateTimeSettings } from "../input-helper/IhDateTime";
import { IhNumberSettings } from "../input-helper/IhNumber";
import { IhStaticSettings } from "../input-helper/IhStatic";
import { IhTextSettings } from "../input-helper/IhText";
import { IhColorSettings } from "../input-helper/IhColor";

export default function InputHelperSettings({ cell }: { cell: EntryCell | null }) {
    if (!cell) return null;
    switch (cell.template.inputHelper) {
        case 1:
            return <IhStaticSettings cell={cell} />;
        case 3:
            return <IhTextSettings cell={cell} />;
        case 4:
            return <IhNumberSettings cell={cell} />;
        case 5:
            return <IhCheckboxSettings cell={cell} />;
        case 6:
            return <IhDateTimeSettings cell={cell} />;
        case 7:
            return <IhColorSettings cell={cell} />;
        default:
            return null;
    }
}
