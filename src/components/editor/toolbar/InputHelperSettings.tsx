import { EntryCell } from "~/redux/features/editor/editor-schemas";
import { IhStaticSettings } from "../input-helper/IhStatic";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";
import { IhCheckboxSettings } from "../input-helper/IhCheckbox";
import { IhColorSettings } from "../input-helper/IhColor";
import { IhDateSettings } from "../input-helper/IhDate";
import { IhDateTimeSettings } from "../input-helper/IhDateTime";
import { IhNumberSettings } from "../input-helper/IhNumber";
import { IhTextLongSettings } from "../input-helper/IhTextLong";
import { IhTextShortSettings } from "../input-helper/IhTextShort";
import { IhTimeSettings } from "../input-helper/IhTime";

const InputHelperSettings = ({ cell }: { cell: EntryCell | null }) => {
    if (!cell) return null;
    switch (cell.template.inputHelper) {
        case 1:
            return <IhStaticSettings cell={cell} />;
        case 2:
            return <IhTextShortSettings cell={cell} />;
        case 3:
            return <IhTextLongSettings cell={cell} />;
        case 4:
            return <IhNumberSettings cell={cell} />;
        case 5:
            return <IhCheckboxSettings cell={cell} />;
        case 6:
            return <IhDateSettings cell={cell} />;
        case 7:
            return <IhTimeSettings cell={cell} />;
        case 8:
            return <IhDateTimeSettings cell={cell} />;
        case 9:
            return <IhColorSettings cell={cell} />;
        default:
            return null;
    }
};

export default InputHelperSettings;
