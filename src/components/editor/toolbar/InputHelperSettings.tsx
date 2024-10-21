import { IhCheckboxSettings } from "~/components/editor/input-helper/IhCheckbox";
import { IhColorSettings } from "~/components/editor/input-helper/IhColor";
import { IhDateTimeSettings } from "~/components/editor/input-helper/IhDateTime";
import { IhNumberSettings } from "~/components/editor/input-helper/IhNumber";
import { IhStaticSettings } from "~/components/editor/input-helper/IhStatic";
import { IhTextSettings } from "~/components/editor/input-helper/IhText";
import type { EntryCell } from "~/redux/features/editor/editor-schemas";
import { IhListSettings } from "../input-helper/IhList";

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
        case 8:
            return <IhListSettings cell={cell} />;
        default:
            return null;
    }
}
